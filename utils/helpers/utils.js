let validator = require('validator');

const validateEmail = (input) => validator.isEmail(input);

const validatePhone = (input) => validator.isMobilePhone(input, 'fr-FR');

const checkMoviesFetching = (req) => {

  let sql = `SELECT * FROM movies `

  let params = []

  if (req.title || req.author || req.type || req.release_date) {
    sql += 'WHERE TRUE'

    if (req.title !== undefined) {
      sql += ` AND movie_title = ?`
      params.push(req.title);
    }
    if (req.author !== undefined) {
      sql += ` AND movie_author = ?`
      params.push(req.author);
    }
    if (req.type !== undefined) {
      sql += ` AND movie_type = ?`
      params.push(req.type);
    }
    if (req.release_date !== undefined) {
      sql += ` AND movie_release_date >= ?`
      params.push(req.release_date);
    }
  }

  sql += ' ORDER BY movie_release_date DESC;'
  return { sql, params }
}

module.exports = {
  validateEmail,
  validatePhone,
  checkMoviesFetching
}
