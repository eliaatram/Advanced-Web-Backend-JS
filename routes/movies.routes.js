const express = require('express');
const router = express.Router();

const movies = require('../services/movies.service');

router.get('/', movies.getMovies);
router.post('/add/movie', movies.addMovie);
router.get('/most_seen', movies.getMostSeen);

module.exports = router