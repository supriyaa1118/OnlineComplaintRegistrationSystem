const User = require("../models/User");

// =======================
// Register User
// =======================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Register Request:", req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    console.log("User Registered:", user);

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Login User
// =======================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login Email:", email);
    console.log("Login Password:", password);

    // Check if user exists
    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};