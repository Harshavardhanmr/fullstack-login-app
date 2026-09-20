require('dotenv').config();
const pool = require('./db');

(async () => {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
    console.log('✅ users table created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to create table:', err.message);
    process.exit(1);
  }
})();