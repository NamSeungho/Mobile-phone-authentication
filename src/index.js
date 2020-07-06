require('../resources/index.css');

import data from "./data"
import event from './event';

function renderTerms () {
    const termsAllItem = document.getElementById('terms_all_item');
    const termsArea = document.getElementById('terms_area');

    for (let i = 0; i < data.terms.length; i++) {
        const termsItem = document.createElement('label');
        termsItem.className = 'terms_item';

        const termsTitle = document.createElement('span');
        termsTitle.className = 'contents_title';

        const termsText = document.createTextNode(data.terms[i].title);

        const termsCheckBox = document.createElement('input');
        termsCheckBox.id = 'input_terms_' + data.terms[i].termsId;
        termsCheckBox.className = 'input_terms';
        termsCheckBox.type = 'checkbox';
        termsCheckBox.value = data.terms[i].termsId;

        const termsCheckMark = document.createElement('span');
        termsCheckMark.className = 'terms_check';

        termsTitle.appendChild(termsText);

        termsItem.appendChild(termsCheckBox);
        termsItem.appendChild(termsTitle);
        termsItem.appendChild(termsCheckMark);

        termsArea.insertBefore(termsItem, termsAllItem);
    }
}

const renderCarrier = function () {
    const selectCarrier = document.getElementById('select_carrier');

    const carrierOptionAll = document.createElement('option');
    carrierOptionAll.value = '';
    carrierOptionAll.setAttribute('disabled', 'disabled');
    carrierOptionAll.setAttribute('selected', 'selected');

    const carrierTitleAll = document.createTextNode('선택');

    carrierOptionAll.appendChild(carrierTitleAll);
    selectCarrier.appendChild(carrierOptionAll);

    for (let i = 0; i < data.carrier.length; i++) {
        const carrierOption = document.createElement('option');
        carrierOption.value = data.carrier[i].code;

        const carrierTitle = document.createTextNode(data.carrier[i].description);

        carrierOption.appendChild(carrierTitle);
        selectCarrier.appendChild(carrierOption);
    }
};

renderCarrier();
renderTerms();

// 통신사 이벤트 처리
document.getElementById('select_carrier').addEventListener('change', event.handleSelectCarrier);
document.getElementById('select_carrier').addEventListener('blur', event.handleBlurCarrier);

// 핸드폰 번호 이벤트 처리
document.getElementById('input_phone_number').addEventListener('input', event.handleInputPhoneNumber);
document.getElementById('input_phone_number').addEventListener('blur', event.handleBlurPhoneNumber);

// 주민등록 번호 이벤트 처리
document.getElementById('input_register_number').addEventListener('input', event.handleInputRegisterNumber);
document.getElementById('input_register_number').addEventListener('blur', event.handleBlurRegisterNumber);

// 이름 이벤트 처리
document.getElementById('input_name').addEventListener('input', event.handleInputName);
document.getElementById('input_name').addEventListener('blur', event.handleBlurName);

// 약관 이벤트 처리
document.getElementById('input_terms_all').addEventListener('change', event.handleChangeTermsAllItem);
const inputItems = document.getElementsByClassName('input_terms');
for (let index = 0; index < inputItems.length; index++) {
    inputItems[index].addEventListener('change', event.handleChangeTermsItem);
}

// 인증번호 요청 이벤트 처리
document.getElementById('request_button').addEventListener('click', event.handleClickRequestButton);
