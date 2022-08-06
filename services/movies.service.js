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

const addMovie = async (req, res) => {
    let { title, release_date, author, type, poster,
        backdrop_poster, overview } = req.body

    if (!title || !release_date || !author || !type || !poster || !backdrop_poster
        || !overview) {
        res.status(statusCodes.missingParameters).json({
            message: "Missing parameters"
        });
    }
    else {
        db.query(`SELECT title FROM movies WHERE (title = ? AND release_date = ?);`,
            [title, release_date],
            (err, rows) => {
                if (err) res.status(statusCodes.queryError).json({
                    error: err
                });
                else {
                    if (rows[0]) {
                        res.status(statusCodes.fieldAlreadyExists).json({
                            message: "Movie already exists"
                        });
                    }
                    else {
                        db.query(`INSERT INTO movies SET ?;`, req.body,
                            (err, rows) => {
                                if (err) res.status(statusCodes.queryError).json({
                                    error: err
                                });
                                else res.status(statusCodes.success).json({
                                    message: "Movie added successfully"
                                });
                            });
                    }
                }
            });
    }
}

module.exports = {
    getMovies,
    addMovie
}