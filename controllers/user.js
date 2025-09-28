import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

import validateEmail from "../utils/validateEmail.js";
import validateUsername from "../utils/validateUsername.js";
import validatePassword from "../utils/validatePassword.js";
import matchPasswords from "../utils/matchPasswords.js";
import hashPassword from "../utils/hashPassword.js";

const userControllers = {
  // REGISTER
  register: async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
      const userExist = await User.findOne({ email });
      if (userExist)
        return res.status(400).json({ message: "User already exists, please login!" });

      if (
        !validateEmail(email) ||
        !validateUsername(username) ||
        !validatePassword(password) ||
        !matchPasswords(password, rePassword)
      ) {
        return res.status(400).json({ message: "Invalid email, username, or passwords do not match" });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = new User({ email, username, password: hashedPassword });
      await newUser.save();

      res.status(201).json({
        user: { id: newUser._id, username: newUser.username, email: newUser.email },
        message: "User created successfully!",
      });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ message: "Server error during registration" });
    }
  },

  // LOGIN
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const userExist = await User.findOne({ email });
      if (!userExist) return res.status(400).json({ message: "Invalid email or password." });

      const isValid = await bcrypt.compare(password, userExist.password);
      if (!isValid) return res.status(400).json({ message: "Invalid email or password." });

      const token = jwt.sign(
        { user: { id: userExist._id, username: userExist.username, email: userExist.email } },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // localhost
        sameSite: "lax",
      });

      res.status(200).json({
        id: userExist._id,
        username: userExist.username,
        message: "User logged in successfully!",
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error during login" });
    }
  },

  // VERIFY
  verify: async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "No token, not authorized" });

      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      res.status(200).json({
        user: decoded.user,
        message: "User verified successfully",
      });
    } catch (err) {
      console.error("Verify error:", err);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  },

  // LOGOUT
  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "User logged out successfully!" });
    } catch (err) {
      console.error("Logout error:", err);
      res.status(500).json({ message: "Server error during logout" });
    }
  },
};

export default userControllers;
