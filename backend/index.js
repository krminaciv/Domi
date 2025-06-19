const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

// 1. Middlewares
app.use(cors())
app.use(express.json())

// test index
app.get("/", (req,res) => {
    res.send("API is working")
})

// DATABASE test
const db = require("./config/db")
app.get("/testdb", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()")
        res.json(result.rows)
    } catch (err) {
        res.status(500).send("Error connecting to the db.")
    }
})

// ROUTES
const userRoutes = require("./routes/users")
app.use("/api/users", userRoutes)

const homeRoutes = require("./routes/homes")
app.use("/api/homes", homeRoutes)


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is working on a port ${PORT}`))