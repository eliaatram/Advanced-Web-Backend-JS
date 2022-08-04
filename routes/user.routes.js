const express = require('express');
const router = express.Router();

const user = require('../services/user.service');

router.post('/signup', user.signup);

module.exports = router