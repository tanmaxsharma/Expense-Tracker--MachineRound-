const pool = require("../config/db");

const getAll = async (userId) => {
    const [rows] = await pool.query(
        "SELECT * FROM categories WHERE user_id IS NULL OR user_id = ?",
        [userId],
    );
    return rows;
};

const create = async (name, type, userId) => {
    const [result] = await pool.query(
        "INSERT INTO categories (name, type, user_id) VALUES (?, ?, ?)",
        [name, type, userId],
    );
    return { id: result.insertId, name, type, userId };
};

module.exports = { getAll, create };
