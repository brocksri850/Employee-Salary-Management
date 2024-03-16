const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JwtConfig = require("../utils/jwtConfig");


exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username or password is missing
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create the new user
    const newUser = await User.create({ username, password });

    // Optionally, you may want to handle other roles, not just 'admin'
    if (newUser.role === 'admin') {
      console.log('Admin user created successfully');
    }

    // Return success response
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error occurred during signup:', error);
    return res.status(500).json({ error: 'An error occurred during signup' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide both username and password' });
    }

    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password is correct
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JwtConfig.secret,
      {
        expiresIn: '3h',
        notBefore: JwtConfig.notBefore,
        algorithm: JwtConfig.algorithm,
      });

    res.status(200).json({ userId: user._id, username: username, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Logout user (dummy implementation as token-based authentication doesn't require explicit logout)
exports.logout = async (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
