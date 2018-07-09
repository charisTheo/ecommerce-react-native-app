const validate = (val, rules, connectedValue) => {
    let isValid = true;

    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':
              isValid = isValid && emailValidator(val);
              break;
            case 'minLength':
              isValid = isValid && minLengthValidator(val, rules[rule]);
              break;
            case 'equalTo':
              isValid = isValid && equalToValidator(val, connectedValue[rule]);
              break;
            case 'isEmpty':
              isValid = isValid && !isEmptyValidator(val);
              break;
            default:
              isValid = true;
        }
    }
    return isValid;
}

const emailValidator = val => {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        val
    );
}

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
}

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
}

const isEmptyValidator = val => {
    return val.length === 0 || val === "";
}

export default validate;