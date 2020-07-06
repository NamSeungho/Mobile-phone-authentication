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

export default {
    handleSelectCarrier: function () {
        document.getElementById('input_phone_number').focus();

        detectRequestButtonStatus();
    },
    handleBlurCarrier: function () {
        if (validator.validateCarrier(this.value)) {
            this.parentElement.classList.remove('error');
        } else {
            this.parentElement.classList.add('error');
        }
    },
    handleInputPhoneNumber: function () {
        const pattern = /[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]|[ \[\]{}()<>?|₩/`~!@#$%^&*\-_+=,.;:\"'\\]/g;
        let value = this.value.replace(pattern, '');

        if (value.length > 11) {
            value = value.substr(0, 11);
        }

        if (this.parentElement.classList.contains('error') && validator.validatePhoneNumber(value)) {
            this.parentElement.classList.remove('error');
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
            this.parentElement.classList.remove('error');
        } else {
            this.parentElement.classList.add('error');
        }
    },
    handleInputRegisterNumber: function () {
        const pattern = /[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]|[ \[\]{}()<>?|₩/`~!@#$%^&*\-_+=,.;:\"'\\]/g;
        let value = this.value.replace(pattern, '');

        if (value.length > 7) {
            value = value.substr(0, 7);
        }

        if (this.parentElement.classList.contains('error') && validator.validateRegisterNumber(value)) {
            this.parentElement.classList.remove('error');
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
            this.parentElement.classList.remove('error');
        } else {
            this.parentElement.classList.add('error');
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

        if (this.parentElement.classList.contains('error') && validator.validateName(this.value)) {
            this.parentElement.classList.remove('error');
        }

        detectRequestButtonStatus();
    },
    handleBlurName: function () {
        if (validator.validateName(this.value)) {
            this.parentElement.classList.remove('error');
        } else {
            this.parentElement.classList.add('error');
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