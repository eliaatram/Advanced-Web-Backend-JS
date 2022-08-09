const statusCodes = require('../utils/constants/statusCodes');
const db = require('../database/mysql');
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

const getMostSeen = async (req, res) => {
    let { type } = req.query

    let sql = `SELECT movie_id, S.title, S.release_date, author, type, poster, backdrop_poster, count(S.title) as times_seen
    FROM seen_movies AS S INNER JOIN movies AS M on (S.title = M.title AND S.release_date = M.release_date)`

    if (type) {
        sql += ' WHERE M.type = ?'
    }

    sql += ' GROUP BY S.title, S.release_date ORDER BY times_seen desc LIMIT 10;'
    db.query(sql, type,
        (err, rows) => {
            if (err) res.status(statusCodes.queryError).json({
                error: err
            });
            else {
                if (rows[0]) {
                    res.status(statusCodes.success).json({
                        data: rows
                    });
                }
                else {
                    res.status(statusCodes.notFound).json({
                        message: "No movies found"
                    });
                }
            }
        });
}

module.exports = {
    getMovies,
    addMovie,
    getMostSeen
}