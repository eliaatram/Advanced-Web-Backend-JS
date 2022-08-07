const express = require('express');
const router = express.Router();

const ratings = require('../services/ratings.service');

router.get('/movie/:id', ratings.getMovieRating);
router.post('/add/rating', ratings.addMovieRating);
router.put('/edit/rating/:id', ratings.editMovieRating);
router.delete('/delete/:id', ratings.deleteMovieRating);

module.exports = router