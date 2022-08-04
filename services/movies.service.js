const statusCodes = require('../utils/constants/statusCodes');
const db = require('../database');
const { checkMoviesFetching } = require('../utils/helpers/utils');

const getMovies = async (req, res) => {

    let { sql, params } = checkMoviesFetching(req.query);

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

module.exports = {
    getMovies
}