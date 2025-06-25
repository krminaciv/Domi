const pool = require("../config/db");

// Add new home
const createHome = async (req, res) => {
  const { title, description, price, location, image_url } = req.body;

  try {
    const newHome = await pool.query(
      `INSERT INTO homes (title, description, price, location, image_url, user_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, price, location, image_url, req.user.id]
    );

    res.status(200).json(newHome.rows[0]);
  } catch (err) {
    console.error("Create home error:", err.message);
    res.status(500).json({ error: "Failed to create home" });
  }
};

// Get all homes
const getAllHomes = async (req, res) => {
  try {
    const allHomes = await pool.query(`
      SELECT homes.*, users.name AS owner_name, users.email AS owner_email
      FROM homes
      JOIN users ON homes.user_id = users.id
      ORDER BY created_at DESC
    `);

    res.json(allHomes.rows);
  } catch (err) {
    console.error("Fetch all homes error:", err.message);
    res.status(500).json({ error: "Failed to fetch homes" });
  }
};

// Get single home
const getHomeById = async (req, res) => {
  const { id } = req.params;

  try {
    const home = await pool.query(`
      SELECT homes.*, users.name AS owner_name, users.email AS owner_email
      FROM homes
      JOIN users ON homes.user_id = users.id
      WHERE homes.id = $1
    `, [id]);

    if (home.rows.length === 0) {
      return res.status(404).json({ error: "Home not found" });
    }

    res.json(home.rows[0]);
  } catch (err) {
    console.error("Fetch home error:", err.message);
    res.status(500).json({ error: "Failed to fetch home" });
  }
};

// Update home
const updateHome = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, image_url } = req.body;

  try {
    const home = await pool.query("SELECT * FROM homes WHERE id = $1", [id]);

    if (home.rows.length === 0) {
      return res.status(404).json({ error: "Home not found" });
    }

    if (home.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: "You are not authorized to edit this home" });
    }

    const updatedHome = await pool.query(
      `UPDATE homes
       SET title = $1, description = $2, price = $3, location = $4, image_url = $5
       WHERE id = $6
       RETURNING *`,
      [title, description, price, location, image_url, id]
    );

    res.json(updatedHome.rows[0]);
  } catch (err) {
    console.error("Update home error:", err.message);
    res.status(500).json({ error: "Failed to update home" });
  }
};

// Delete home
const deleteHome = async (req, res) => {
  const { id } = req.params;

  try {
    const home = await pool.query("SELECT * FROM homes WHERE id = $1", [id]);

    if (home.rows.length === 0) {
      return res.status(404).json({ error: "Home not found" });
    }

    if (home.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: "You are not authorized to delete this home" });
    }

    await pool.query("DELETE FROM homes WHERE id = $1", [id]);

    res.json({ message: "Home deleted successfully" });
  } catch (err) {
    console.error("Delete home error:", err.message);
    res.status(500).json({ error: "Failed to delete home" });
  }
};

module.exports = {
  createHome,
  getAllHomes,
  getHomeById,
  updateHome,
  deleteHome
};
