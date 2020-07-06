import data from "./data"

export default {
    validateCarrier: function (value) {
        return data.carrier.filter(item => item.code === value).length === 1;
    },
    validatePhoneNumber: function (value) {
        const pattern = /[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]|[ \[\]{}()<>?|₩/`~!@#$%^&*\-_+=,.;:\"'\\]/g;
        if (pattern.test(value)) {
            return false;
        }

        return value.length === 10 || value.length === 11;
    },
    validateRegisterNumber: function (value) {
        const pattern = /[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]|[ \[\]{}()<>?|₩/`~!@#$%^&*\-_+=,.;:\"'\\]/g;
        if (pattern.test(value)) {
            return false;
        }

        return value.length === 7;
    },
    validateName: function (value) {
        const pattern = /[a-zA-Z0-9]|[ \[\]{}()<>?|₩/`~!@#$%^&*\-_+=,.;:\"'\\]/g;
        if (pattern.test(value)) {
            return false;
        }

        return value.length > 0 && value.length <= 10;
    },
    validateTerms: function (value) {
        for (let i = 0; i < data.terms.length; i++) {
            if (data.terms[i].required && value.indexOf(data.terms[i].termsId) === -1) {
                return false;
            }
        }

        return true;
    },
    validateAll: function (value) {
        if (!value.carrierCode || !this.validateCarrier(value.carrierCode)) {
            return false;
        }
        if (!value.phoneNumber || !this.validatePhoneNumber(value.phoneNumber)) {
            return false;
        }
        if (!value.registerNumber || !this.validateRegisterNumber(value.registerNumber)) {
            return false;
        }
        if (!value.name || !this.validateName(value.name)) {
            return false;
        }

        return value.termsCode && this.validateTerms(value.termsCode);
    }
};