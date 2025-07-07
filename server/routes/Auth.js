const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { route } = require("./Noteroute");
const middleware = require("../middleware/middleware");
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashpassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", user: { name, email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(201)
      .json({ message: "logged in successfully", token, user: { name: user.name, _id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
});


router.get('/verify', middleware, async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

module.exports = router;
