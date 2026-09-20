const pool = require('./db');

const createUser = async (name, email, phone, hashedPassword) => {
  const [result] = await pool.execute(
    'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
    [name, email, phone, hashedPassword]
  );
  return result.insertId;
};

const findUserByUsername = async (name) => {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE name = ? LIMIT 1', [name]
  );
  return rows[0] || null;
};

const findUserById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT id, name, email, phone, created_at FROM users WHERE id = ? LIMIT 1', [id]
  );
  return rows[0] || null;
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    'SELECT id FROM users WHERE email = ? LIMIT 1', [email]
  );
  return rows[0] || null;
};

module.exports = { createUser, findUserByUsername, findUserById, findUserByEmail };