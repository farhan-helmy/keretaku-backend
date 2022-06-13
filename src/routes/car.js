const express = require("express");
const auth = require("../middleware/auth");
const carController = require("../controllers/car")

const router = new express.Router();

router.post("/car/register", auth, carController.registerCar)

module.exports = router

