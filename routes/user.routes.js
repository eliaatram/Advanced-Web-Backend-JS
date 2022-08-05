const express = require('express');
const router = express.Router();

const user = require('../services/user.service');

router.post('/signup', user.signup);
router.post('/login', user.login);

module.exports = router