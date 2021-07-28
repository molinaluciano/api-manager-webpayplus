const express = require('express');
const router = express.Router();
const healthRoute = require('./healthRoute');
const transactionRoute = require('./transactionRoute');

router.use(healthRoute);
router.use(transactionRoute);

module.exports = router;

