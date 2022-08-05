const express = require('express');
const router = express.Router();

const billings = require('../services/billings.service');

router.get('/', billings.getBillings);
router.post('/add/billing', billings.addBilling);

module.exports = router