const User = require("../models/User")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

exports.register = async (req, res) => {
  const { username, password } = req.body

  try {
    const userExists = await User.findOne({ username })

    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = await User.create({
      username,
      password,
      isAdmin: username === "admin", // Example logic for setting admin
    })

    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    const matchedPassword = await user.matchPassword(password)

    if (user && matchedPassword) {
      res.json({
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}
