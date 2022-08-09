let validator = require('validator');

const validateEmail = (input) => validator.isEmail(input);

const validatePhone = (input) => validator.isMobilePhone(input, 'fr-FR');

const checkMoviesFetching = (req) => {

  let sql = `SELECT * FROM movies `

  let params = []

  if (req.id || req.title || req.author || req.type || req.release_date) {
    sql += 'WHERE TRUE'

    if (req.id !== undefined) {
      sql += ` AND movie_id = ?`
      params.push(req.id);
    }
    if (req.title !== undefined) {
      sql += ` AND title = ?`
      params.push(req.title);
    }
    if (req.author !== undefined) {
      sql += ` AND author = ?`
      params.push(req.author);
    }
    if (req.type !== undefined) {
      sql += ` AND type = ?`
      params.push(req.type);
    }
    if (req.release_date !== undefined) {
      sql += ` AND release_date = ?`
      params.push(req.release_date);
    }
  }

  sql += ' ORDER BY release_date DESC;'
  return { sql, params }
}

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
  checkMoviesFetching,
  checkBillingsFetching
}
