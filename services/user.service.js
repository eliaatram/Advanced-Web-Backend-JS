const statusCodes = require('../utils/constants/statusCodes');
const db = require('../database');
const { validateEmail, validatePhone } = require('../utils/helpers/utils');

const signup = async (req, res) => {
  let body = req.body

  if (!body.firstname || !body.lastname || !body.dob || !body.gender || !body.country
    || !body.area || !body.city || !body.street || !body.street_number || !body.username
    || !body.password || !body.email || !body.phone_number) {
    res.status(statusCodes.missingParameters).json({
      message: "Missing parameters"
    });
  }
  else {
    if (validateEmail(body.email)) {
      if (validatePhone(body.phone_number)) {
        db.query(`SELECT address_id FROM billings WHERE (country = ? AND area = ?
          AND city = ? AND street = ? AND street_number = ?);`, [body.country, body.area,
        body.city, body.street, body.street_number],
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
                db.query(`SELECT email FROM contacts WHERE email = ?;`, body.email,
                  (err, rows) => {
                    if (err) res.status(statusCodes.queryError).json({
                      error: err
                    });
                    else {
                      if (rows[0]) {
                        res.status(statusCodes.fieldAlreadyExists).json({
                          message: "Contact already exists"
                        });
                      }
                      else {
                        db.query(`SELECT username FROM users WHERE username = ?;`, body.username,
                          (err, rows) => {
                            if (err) res.status(statusCodes.queryError).json({
                              error: err
                            });
                            else {
                              if (rows[0]) {
                                res.status(statusCodes.fieldAlreadyExists).json({
                                  message: "Username is taken"
                                });
                              }
                              else {
                                db.query(`INSERT INTO billings (country, area, city, street, street_number)
                                values (?,?,?,?,?);`, [body.country, body.area, body.city,
                                body.street, body.street_number],
                                  (err, rows) => {
                                    if (err) res.status(statusCodes.queryError).json({
                                      error: err
                                    });
                                    else {
                                      db.query(`INSERT INTO contacts (email, firstname, lastname, phone_number,
                                        dob, gender, address_id) values (?,?,?,?,?,?,?);`, [body.email, body.firstname,
                                      body.lastname, body.phone_number, body.dob, body.gender, rows.insertId],
                                        (err, rows) => {
                                          if (err) res.status(statusCodes.queryError).json({
                                            error: err
                                          });
                                          else {
                                            db.query(`INSERT INTO users (username, password, email, role_id)
                                            values (?,?,?,?);`, [body.username, body.password, body.email, 1],
                                              (err, rows) => {
                                                if (err) res.status(statusCodes.queryError).json({
                                                  error: err
                                                });
                                                else res.status(statusCodes.success).json({
                                                  message: "Account created successfully"
                                                });
                                              });
                                          }
                                        });
                                    }
                                  });
                              }
                            }
                          });
                      }
                    }
                  });
              }
            }
          });
      }
      else {
        res.status(statusCodes.badRequest).json({
          error: "Invalid phone format"
        });
      }
    }
    else {
      res.status(statusCodes.badRequest).json({
        error: "Invalid email format"
      });
    }
  }
}

const login = async (req, res) => {
  let { username, password } = req.body

  if (!username || !password) {
    res.status(statusCodes.missingParameters).json({ message: "Missing parameters" });
  }
  else {
    db.query(`SELECT email FROM users WHERE (username = ? AND password = ?);`, [username, password],
      (err, rows) => {
        if (err) res.status(statusCodes.queryError).json({
          error: err
        });
        else {
          if (rows[0]) {
            let { email } = rows[0]

            db.query(`SELECT firstname, lastname FROM contacts C INNER JOIN users U
            ON C.email = U.email WHERE U.email = ?;`, email,
              (err, rows) => {
                if (err) res.status(statusCodes.queryError).json({
                  error: err
                });
                else {
                  if (rows[0]) {
                    res.status(statusCodes.success).json({
                      data: {
                        username: username,
                        firstname: rows[0].firstname,
                        lastname: rows[0].lastname,
                        email: email
                      }
                    });
                  }
                  else res.status(statusCodes.notFound).json({
                    message: "Contact not found"
                  });
                }
              });
          }
          else res.status(statusCodes.notFound).json({
            message: "User not found"
          });
        }
      });
  }
}

module.exports = {
  signup,
  login
}