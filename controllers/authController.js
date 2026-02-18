const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    // Auto-create user if not found (demo mode)
    if (!user) {
      user = await User.create({
        name: "New User",
        email: email.toLowerCase(),
        password: "TEMP",
        role: "patient",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = login;
