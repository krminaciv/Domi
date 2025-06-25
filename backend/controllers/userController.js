const pool = require("../config/db");
const { getHomesByOwner } = require("../models/homeModel");

const getProfile = async (req, res) => {
  try {
    const userRes = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.user.id]
    );
    const user = userRes.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const homes = await getHomesByOwner(user.id);

    res.json({
      ...user,
      homes,
    });
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getProfile,
};