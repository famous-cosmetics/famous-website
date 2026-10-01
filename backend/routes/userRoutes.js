
const express = require("express");
const { registerUser } = require("../controllers/usersController/resgister.Controller");
const loginUser = require("../controllers/usersController/login.Controller");
const router = express.Router();





router.post("/login/Admin", loginUser)

router.post("/create/Admin", registerUser)










module.exports = router;