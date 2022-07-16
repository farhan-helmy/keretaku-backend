const express = require("express");
const healthCheckController = require('../controllers/health')

const router = new express.Router();

router.post('/health-check', healthCheckController.healthCheck)

module.exports = router