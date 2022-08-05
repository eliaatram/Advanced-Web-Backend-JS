const express = require('express');
const router = express.Router();

const user = require('../services/user.service');

router.post('/signup', user.signup);
router.post('/login', user.login);
router.post('/add/movie', user.addMovieToSeen);

module.exports = router