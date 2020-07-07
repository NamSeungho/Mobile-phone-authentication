import validator from "./validator";

// 인증번호 결과 객체 생성 함수
function generateResultObject () {
    const termsCode = [];
    const inputItems = document.getElementsByClassName('input_terms');
    for (let index = 0; index < inputItems.length; index++) {
        if (inputItems[index].checked) {
            termsCode.push(inputItems[index].value);
        }
    }

    return {
        name : document.getElementById('input_name').value,
        registerNumber: document.getElementById('input_register_number').value.replace(/[-]/g, ''),
        carrierCode: document.getElementById('select_carrier').value,
        phoneNumber: document.getElementById('input_phone_number').value.replace(/[ ]/g, ''),
        termsCode: termsCode
    };
}

// 인증번호 요청 버튼 상태값 감지 함수
function detectRequestButtonStatus () {
    const result = generateResultObject();

    document.getElementById('request_button').disabled = !validator.validateAll(result);
}

// 현재 입력값 폼이 오류 상태인지 확인
function containsError (element) {
    return element.classList.contains('error');
}

// validator 통과를 못 할 경우 error 클래스 부여
function addError (element) {
    return element.classList.add('error');
}

// validator 통과를 했다면 error 클래스 제거
function removeError (element) {
    return element.classList.remove('error');
}

export default {
    handleSelectCarrier: function () {
        document.getElementById('input_phone_number').focus();

        detectRequestButtonStatus();
    },
    handleBlurCarrier: function () {
        if (validator.validateCarrier(this.value)) {
            removeError(this.parentElement);
        } else {
            addError(this.parentElement);
        }
    },
    handleInputPhoneNumber: function () {
        const pattern = /[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]|[ \[\]{}()<>?|₩/`~!@#$%^&*\-_+=,.;:\"'\\]/g;
        let value = this.value.replace(pattern, '');

        if (value.length > 11) {
            value = value.substr(0, 11);
        }

        if (containsError(this.parentElement) && validator.validatePhoneNumber(value)) {
            removeError(this.parentElement);
        }

        if (value.length <= 3) {
            this.value = value;
        } else if (value.length <= 7) {
            this.value = value.substr(0, 3) + ' ' + value.substr(3);
        } else {
            this.value = value.substr(0, 3) + ' ' + value.substr(3, value.length-7) + ' ' + value.substr(value.length-4, 4);
        }

        // 핸드폰번호 11자리 입력 시, 주민등록 번호 이벤트로 포커스
        if (value.length === 11) {
            document.getElementById('input_register_number').focus();
        }

        detectRequestButtonStatus();
    },
    handleBlurPhoneNumber: function () {
        // 입력창에 입력되어있는 띄어쓰기를 제거한 후 유효성 체크 로직 수행
        const value = this.value.replace(/[ ]/g, '');

        if (validator.validatePhoneNumber(value)) {
            removeError(this.parentElement);
        } else {
            addError(this.parentElement);
        }
    },
    handleInputRegisterNumber: function () {
        const pattern = /[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]|[ \[\]{}()<>?|₩/`~!@#$%^&*\-_+=,.;:\"'\\]/g;
        let value = this.value.replace(pattern, '');

        if (value.length > 7) {
            value = value.substr(0, 7);
        }

        if (containsError(this.parentElement) && validator.validateRegisterNumber(value)) {
            removeError(this.parentElement);
        }

        if (value.length === 7) {
            this.value = value.substr(0, 6) + '-' + value.substr(6);

            document.getElementById('input_name').focus();
        } else {
            this.value = value;
        }

        detectRequestButtonStatus();
    },
    handleBlurRegisterNumber: function () {
        // 입력창에 입력되어있는 대쉬(-)를 제거한 후 유효성 체크 로직 수행
        const value = this.value.replace(/[-]/g, '');

        if (validator.validateRegisterNumber(value)) {
            removeError(this.parentElement);
        } else {
            addError(this.parentElement);
        }
    },
    handleInputName: function () {
        const pattern = /[a-zA-Z0-9]|[ \[\]{}()<>?|₩/`~!@#$%^&*\-_+=,.;:\"'\\]/g;
        const value = this.value.replace(pattern, '');

        if (value.length > 10) {
            this.value = value.substr(0, 10);
        } else {
            this.value = value;
        }

        if (containsError(this.parentElement) && validator.validateName(this.value)) {
            removeError(this.parentElement);
        }

        detectRequestButtonStatus();
    },
    handleBlurName: function () {
        if (validator.validateName(this.value)) {
            removeError(this.parentElement);
        } else {
            addError(this.parentElement);
        }
    },
    handleChangeTermsAllItem: function () {
        const inputItems = document.getElementsByClassName('input_terms');
        for (let index = 0; index < inputItems.length; index++) {
            inputItems[index].checked = this.checked;
        }

        detectRequestButtonStatus();
    },
    handleChangeTermsItem: function () {
        const inputItems = document.getElementsByClassName('input_terms');
        let allChecked = true;
        for (let index = 0; index < inputItems.length; index++) {
            if (inputItems[index].checked === false) {
                allChecked = false;
                break;
            }
        }

        document.getElementById('input_terms_all').checked = allChecked;

        detectRequestButtonStatus();
    },
    handleClickRequestButton: function () {
        const result = generateResultObject();

        if (this.disabled || !validator.validateAll(result)) {
            return false;
        }

        console.log(result);
    }
};