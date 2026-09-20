const pool = require('./db');

(async () => {
  try {
    const [tables] = await pool.query('SHOW TABLES;');
    console.log('Tables:', tables);

    const [columns] = await pool.query('DESCRIBE users;');
    console.log('Columns:', columns);

    const [users] = await pool.query('SELECT * FROM users;');
    console.log('Users:', users);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();