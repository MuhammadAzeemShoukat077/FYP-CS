const User = require('../models/user');

// Get user profile
async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getProfile };
