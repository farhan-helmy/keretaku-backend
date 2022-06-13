const express = require("express");
const auth = require("../middleware/auth");
const usersController = require("../controllers/user");

const router = new express.Router();

router.post("/users/register", usersController.createUser);
router.post("/users/login", usersController.loginUser);


module.exports = router