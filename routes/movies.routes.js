const express = require('express');
const router = express.Router();

const movies = require('../services/movies.service');

router.get('/', movies.getMovies);

module.exports = router