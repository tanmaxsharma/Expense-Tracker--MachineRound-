const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (name, email, password) => {
  // check if user exists
  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) throw { status: 400, message: 'Email already registered' };

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // insert user
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, hash]
  );

  return { id: result.insertId, name, email };
};

const login = async (email, password) => {
  const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) throw { status: 401, message: 'Invalid credentials' };

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw { status: 401, message: 'Invalid credentials' };

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email } };
};

module.exports = { register, login };

