const express = require('express');
const transactionController = require('../controller/transactionController');

const router = express.Router();

router.post('/create-transaction', transactionController.composeTransaction);

module.exports = router;
