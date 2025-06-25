const pool = require("../config/db");

async function getHomesByOwner(ownerId) {
  const result = await pool.query(
    "SELECT * FROM homes WHERE user_id = $1 ORDER BY created_at DESC",
    [ownerId]
  );
  return result.rows;
}

module.exports = { getHomesByOwner };