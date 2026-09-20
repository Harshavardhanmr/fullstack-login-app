const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const userRepo = require('./userRepository');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'Lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
};

const signup = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;
    if (!name || !email || !phone || !password || !confirmPassword)
      return res.status(400).json({ message: 'All fields are required.' });
    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match.' });
    const existingUser = await userRepo.findUserByUsername(name);
    if (existingUser)
      return res.status(409).json({ message: 'Username already taken.' });
    const existingEmail = await userRepo.findUserByEmail(email);
    if (existingEmail)
      return res.status(409).json({ message: 'Email already registered.' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = await userRepo.createUser(name, email, phone, hashedPassword);
    return res.status(201).json({ message: 'Account created successfully!', userId });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password)
      return res.status(400).json({ message: 'Username and password required.' });
    const user = await userRepo.findUserByUsername(name);
    if (!user)
      return res.status(401).json({ message: 'Invalid username or password.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid username or password.' });
    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('auth_token', token, cookieOptions);
    return res.status(200).json({
      message: 'Login successful!',
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await userRepo.findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

const logout = (req, res) => {
  res.clearCookie('auth_token', { httpOnly: true, sameSite: 'Lax' });
  return res.status(200).json({ message: 'Logged out.' });
};

module.exports = { signup, login, getMe, logout };