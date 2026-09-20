const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./authRoutes');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://fullstack-login-app-seven.vercel.app'],
  credentials: true
}));
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Auth server is running!' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});