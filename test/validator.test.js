import validator from '../src/validator'

describe('통신사 검증', () => {
    test('SKT', () => {
        expect(validator.validateCarrier('SKT')).toBe(true);
    });

    test('LGTMVNO', () => {
        expect(validator.validateCarrier('LGTMVNO')).toBe(true);
    });

    test('LG U+', () => {
        expect(validator.validateCarrier('LG U+')).toBe(false);
    });
});

describe('휴대폰 번호 검증', () => {
    test('01012345678', () => {
        expect(validator.validatePhoneNumber('01012345678')).toBe(true);
    });

    test('0101234567', () => {
        expect(validator.validatePhoneNumber('0101234567')).toBe(true);
    });

    test('010123456789', () => {
        expect(validator.validatePhoneNumber('010123456789')).toBe(false);
    });

    test('abcdefghijk', () => {
        expect(validator.validatePhoneNumber('abcdefghijk')).toBe(false);
    });
});

describe('주민등록번호 검증', () => {
    test('1234567', () => {
        expect(validator.validateRegisterNumber('1234567')).toBe(true);
    });

    test('123456', () => {
        expect(validator.validateRegisterNumber('123456')).toBe(false);
    });

    test('abc1234', () => {
        expect(validator.validateRegisterNumber('abc1234')).toBe(false);
    });

    test('abcdefg', () => {
        expect(validator.validateRegisterNumber('abcdefg')).toBe(false);
    });
});

describe('이름 검증', () => {
    test('남승호', () => {
        expect(validator.validateName('남승호')).toBe(true);
    });

    test('가나다라마바사아자차', () => {
        expect(validator.validateName('가나다라마바사아자차')).toBe(true);
    });

    test('가나다라마바사아자차카', () => {
        expect(validator.validateName('가나다라마바사아자카차카')).toBe(false);
    });

    test('', () => {
        expect(validator.validateName('')).toBe(false);
    });

    test('abc', () => {
        expect(validator.validateName('abc')).toBe(false);
    });

    test('남승호1', () => {
        expect(validator.validateName('남승호1')).toBe(false);
    });

    test('남승호a', () => {
        expect(validator.validateName('남승호a')).toBe(false);
    });

    test('남승호&', () => {
        expect(validator.validateName('남승호&')).toBe(false);
    });
});

describe('약관 검증', () => {
    test('[\'1\', \'2\', \'3\']', () => {
        expect(validator.validateTerms(['1', '2', '3'])).toBe(true);
    });

    test('[\'1\', \'2\', \'3\', \'4\']', () => {
        expect(validator.validateTerms(['1', '2', '3', '4'])).toBe(true);
    });

    test('[\'1\', \'2\', \'4\']', () => {
        expect(validator.validateTerms(['1', '2', '4'])).toBe(false);
    });

    test('[\'4\']', () => {
        expect(validator.validateTerms(['4'])).toBe(false);
    });

    test('[]', () => {
        expect(validator.validateTerms([])).toBe(false);
    });
});

describe('전체 검증', () => {
    test('Pass case', () => {
        expect(validator.validateAll({
            name : '남승호',
            registerNumber: '9101221',
            carrierCode: 'SKT',
            phoneNumber: '01012345678',
            termsCode: ['1', '2', '3']
        })).toBe(true);
    });

    test('Fail case - name', () => {
        expect(validator.validateAll({
            registerNumber: '9101221',
            carrierCode: 'SKT',
            phoneNumber: '01012345678',
            termsCode: ['1', '2', '3']
        })).toBe(false);
    });

    test('Fail case - terms', () => {
        expect(validator.validateAll({
            name : '남승호',
            registerNumber: '9101221',
            carrierCode: 'SKT',
            phoneNumber: '01012345678',
            termsCode: ['1', '2', '4']
        })).toBe(false);
    });
});
