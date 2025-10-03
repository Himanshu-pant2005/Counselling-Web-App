const StudentProfile = require('../models/StudentProfile');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT (reusable)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
exports.authenticateToken = authenticateToken;

// Submit Student Form
exports.submitForm = async (req, res) => {
  try {
    const { highSchoolMarks, tenPlusTwoMarks, branchChoices } = req.body;
    const userId = req.user.userId;

    // Check if profile already exists
    let profile = await StudentProfile.findOne({ userId });
    if (profile) {
      return res.status(400).json({ message: 'Profile already submitted' });
    }

    // Create new profile
    profile = new StudentProfile({
      userId,
      highSchoolMarks,
      tenPlusTwoMarks,
      branchChoices,
    });
    await profile.save();

    res.status(201).json({ message: 'Form submitted successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};