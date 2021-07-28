const express = require('express');
const healtController = require('../controller/healthController');

const router = express.Router();

router.get('/health', healtController);

module.exports = router;
