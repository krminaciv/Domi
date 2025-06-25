const express = require("express")
const bcrypt = require("bcrypt")
const pool = require("../config/db")
const jwt = require("jsonwebtoken")
const verifyToken = require("../middleware/auth")
const db = require("../config/db")

const { getProfile } = require("../controllers/userController")
const { register, login } = require("../controllers/authController")

const router = express.Router()

// POST /api/users/register
router.post("/register", register)

// POST /api/users/login
router.post("/login", login)

// GET /api/users/profile
router.get("/profile", verifyToken, getProfile)


module.exports = router