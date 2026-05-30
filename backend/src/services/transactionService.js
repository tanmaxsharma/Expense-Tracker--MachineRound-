const pool = require("../config/db");

// create transaction
const create = async (
  userId,
  { category_id, amount, type, date, description },
) => {
  const [result] = await pool.query(
    "INSERT INTO transactions (user_id, category_id, amount, type, date, description) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, category_id, amount, type, date, description],
  );
  return { id: result.insertId };
};

// Get all with filter + pagination
const getAll = async (
  userId,
  { page = 1, limit = 10, category_id, start_date, end_date },
) => {
  let query = `
    SELECT t.*, c.name as category_name 
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ?
  `;
  const params = [userId];

  if (category_id) {
    query += " AND t.category_id = ?";
    params.push(category_id);
  }
  if (start_date) {
    query += " AND t.date >= ?";
    params.push(start_date);
  }
  if (end_date) {
    query += " AND t.date <= ?";
    params.push(end_date);
  }

  query += " ORDER BY t.date DESC LIMIT ? OFFSET ?";
  params.push(Number(limit), (Number(page) - 1) * Number(limit));

  const [rows] = await pool.query(query, params);
  return rows;
};

// Update
const update = async (
  id,
  userId,
  { category_id, amount, type, date, description },
) => {
  const [result] = await pool.query(
    `UPDATE transactions 
     SET category_id=?, amount=?, type=?, date=?, description=?
     WHERE id=? AND user_id=?`,
    [category_id, amount, type, date, description, id, userId],
  );
  if (result.affectedRows === 0)
    throw { status: 404, message: "Transaction not found" };
  return { id };
};

// Delete
const remove = async (id, userId) => {
  const [result] = await pool.query(
    "DELETE FROM transactions WHERE id = ? AND user_id = ?",
    [id, userId],
  );
  if (result.affectedRows === 0)
    throw { status: 404, message: "Transaction not found" };
  return { id };
};

const getMonthlySummary = async (userId) => {
  const [rows] = await pool.query(
    `SELECT 
      c.name as category,
      t.type,
      MONTH(t.date) as month,
      YEAR(t.date) as year,
      SUM(t.amount) as total
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ?
      AND MONTH(t.date) = MONTH(CURDATE())
      AND YEAR(t.date) = YEAR(CURDATE())
    GROUP BY c.name, t.type, MONTH(t.date), YEAR(t.date)
    ORDER BY total DESC`,
    [userId],
  );
  return rows;
};

// Dashboard summary
const getDashboardSummary = async (userId) => {
  const [rows] = await pool.query(
    `SELECT
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense,
      SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance
    FROM transactions
    WHERE user_id = ?
      AND MONTH(date) = MONTH(CURDATE())
      AND YEAR(date) = YEAR(CURDATE())`,
    [userId],
  );
  return rows[0];
};

module.exports = {
  create,
  getAll,
  update,
  remove,
  getMonthlySummary,
  getDashboardSummary,
};
