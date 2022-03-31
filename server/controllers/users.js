const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { v4: uuid } = require("uuid")
const db = require("../models")
const generateToken = require("../middleware/generateToken")
const { decrypt, encrypt } = require("../utils/encryptDecrypt")

module.exports = {
  // Register new User
  // Public Routes POST /api/users
  registerUser: asyncHandler(async (req, res) => {
    const { email, first_name, last_name, password } = req.body
    console.log(req.body)
    const userExists = await db.User.findOne({ where: { email } })
    if (userExists) {
      res.status(400)
      throw new Error("User already email exists")
    }
    const user = await db.User.create({
      id: uuid(),
      email,
      first_name,
      last_name,
      password: encrypt(password),
    })
    console.log(user)
    if (user) {
      res.status(200).json({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: user.is_admin,
        token: generateToken(user.id),
      })
    } else {
      res.status(400)
      throw new Error("Invalid data")
    }
  }),

  // Login and Authentication get Token
  // Public Routes POST /api/users/login
  loginUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await db.User.findOne({ where: { email } })
    // const validatePassword = await bcrypt.compare(password, user.password);
    if (user && decrypt(password, user.password)) {
      res.json({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: user.is_admin,
        token: generateToken(user.id),
      })
    } else {
      res.status(401)
      throw new Error("Invalid email or password")
    }
  }),
  // User Profile
  // Private Routes GET /api/users/profile
  getUserProfile: asyncHandler(async (req, res) => {
    const user = req.user
    if (user) {
      res.send(user)
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  }),
  // Update user Profile
  // Private Routes PUT /api/users/profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const user = await db.User.findOne({ where: { id: req.user.id } })
    if (user) {
      user.first_name = req.body.first_name || user.first_name
      user.last_name = req.body.last_name || user.last_name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = encrypt(req.body.password)
      }
      const updatedUser = await db.User.update(
        {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
        },
        { where: { id: req.user.id }, returning: true, raw: true, plain: true }
      )
      if (!updatedUser[1].id) {
        throw new Error("Try to update your data but unsuccessful")
      }
      res.status(200).json({
        id: updatedUser[1].id,
        first_name: updatedUser[1].first_name,
        last_name: updatedUser[1].last_name,
        email: updatedUser[1].email,
        is_admin: updatedUser[1].is_admin,
        token: generateToken(updatedUser[1].id),
      })
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  }),
  // Get all users
  // Private Routes GET /api/users
  getAllUsers: asyncHandler(async (req, res) => {
    const response = await db.User.findAll({})
    res.status(200).json(response)
  }),
}
