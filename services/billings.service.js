const statusCodes = require('../utils/constants/statusCodes');
const db = require('../database');
const { checkBillingsFetching } = require('../utils/helpers/utils');

const getBillings = async (req, res) => {
    let { sql, params } = checkBillingsFetching(req.query);

    db.query(sql, params,
        (err, rows) => {
            if (err) res.status(statusCodes.queryError).json({
                error: err
            });
            else res.status(statusCodes.success).json({
                data: rows
            });
        });
}

const addBilling = async (req, res) => {

    let { country, area, city, street, street_number } = req.body

    if (!country || !area || !city || !street || !street_number) {
        res.status(statusCodes.missingParameters).json({
            message: "Missing parameters"
        });
    }
    else {
        let { sql, params } = checkBillingsFetching(req.body);

        db.query(sql, params,
            (err, rows) => {
                if (err) res.status(statusCodes.queryError).json({
                    error: err
                });
                else {
                    if (rows[0]) {
                        res.status(statusCodes.fieldAlreadyExists).json({
                            message: "Billing address already exists"
                        });
                    }
                    else {
                        db.query(`INSERT INTO billings SET ?;`, req.body,
                            (err, rows) => {
                                if (err) res.status(statusCodes.queryError).json({
                                    error: err
                                });
                                else res.status(statusCodes.success).json({
                                    message: "Billing address added"
                                });
                            });
                    }
                }
            });
    }
}

module.exports = {
    getBillings,
    addBilling
}