const express = require("express")
const register = require("./register")
const login = require("./login")
const feedback = require("./feedback")
const final_update = require("./final_update")
const user_update = require("./user_update")
const router = express.Router(); // Create an instance of the router

// const register = require("./register")
// const jwt = require("jsonwebtoken");
// const db = require("../routes/db-config");
// const bcrypt = require("bcrypt");
// const flash = require("express-flash")

router.post("/register", register)
router.post("/login", login)
router.post("/feedback", feedback)
router.post("/final_update", final_update)
router.post("/user_update", user_update)

module.exports = router;
