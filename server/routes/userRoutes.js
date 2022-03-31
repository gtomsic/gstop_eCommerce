const express = require("express")
const router = express.Router()
const {
  loginUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
} = require("../controllers/users")
const { auth, admin } = require("../middleware/authMiddleware")

router.post("/", registerUser)
router.get("/", auth, admin, getAllUsers)
router.post("/login", loginUser)
router.get("/profile", auth, getUserProfile)
router.put("/profile", auth, updateUserProfile)

module.exports = router
