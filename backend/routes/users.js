const express = require("express")
const bcrypt = require("bcrypt")
const pool = require("../config/db")
const jwt = require("jsonwebtoken")
const verifyToken = require("../middleware/auth");
const db = require("../config/db");

const router = express.Router()

// POST /api/users/register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email])

        if(existingUser.rows.length > 0){
            return res.status(400).json({error: "Email already exists"})
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        )

        res.status(201).json(newUser.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({error: "Server error"})
    }
})


// POST /api/users/login
router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])

        if(user.rows.length === 0){
            return res.status(400).json({ error: "Invalid email or password" })
        }

        const dbUser = user.rows[0]

        const isMatch = await bcrypt.compare(password, dbUser.password)
        if(!isMatch){
            return res.status(400).json({ error: "Invalid email or password" })
        }

        //generate JWT
        const token = jwt.sign(
            { id: dbUser.id, email: dbUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.json({
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token: token
        })

    } catch(err) {
        console.error(err)
        res.status(500).json({error: "Server error"})
    }
})


// GET /api/users/profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query("SELECT id, name, email FROM users WHERE id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router