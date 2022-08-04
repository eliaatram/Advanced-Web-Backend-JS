let validator = require('validator');

const validateEmail = (input) => validator.isEmail(input);

const validatePhone = (input) => validator.isMobilePhone(input, 'fr-FR');

const checkBillingsFetching = (req) => {

    let sql = `SELECT * FROM billings `

    let params = []

    if (req.country || req.area || req.city || req.street || req.street_number) {
        sql += 'WHERE TRUE'

        if (req.country !== undefined) {
            sql += ` AND country = ?`
            params.push(req.country);
        }
        if (req.area !== undefined) {
            sql += ` AND area = ?`
            params.push(req.area);
        }
        if (req.city !== undefined) {
            sql += ` AND city = ?`
            params.push(req.city);
        }
        if (req.street !== undefined) {
            sql += ` AND street = ?`
            params.push(req.street);
        }
        if (req.street_number !== undefined) {
            sql += ` AND street_number = ?`
            params.push(req.street_number);
        }
    }

    sql += ';'
    return { sql, params }
}
module.exports = {
    validateEmail,
    validatePhone,
    checkBillingsFetching
}