let validator = require('validator');

const validateEmail = (input) => validator.isEmail(input);

const validatePhone = (input) => validator.isMobilePhone(input, 'fr-FR');


module.exports = {
    validateEmail,
    validatePhone
}