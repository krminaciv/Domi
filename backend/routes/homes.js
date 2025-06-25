const express = require("express");
const pool = require("../config/db");
const verifyToken = require("../middleware/auth");
const router = express.Router()

const {
  createHome,
  getAllHomes,
  getHomeById,
  updateHome,
  deleteHome
} = require("../controllers/homeController");

// POST /api/homes   -  add new Home
router.post("/", verifyToken, createHome)


// GET /api/homes
router.get("/", getAllHomes)


// GET /api/homes/:id
router.get("/:id", getHomeById)


//PUT /api/homes/:id
router.put("/:id", verifyToken, updateHome)


// DELETE /api/homes/:id
router.delete("/:id", verifyToken, deleteHome)


module.exports = router;
