const express = require("express")
const router = express.Router()

const {
  adminUpdateUser,
  adminDeleteUser,
  adminOrderLists,
  adminUpdateOrderShippment,
  adminControllerDelivered,
} = require("../controllers/adminControllers")
const { auth, admin } = require("../middleware/authMiddleware")

router.put("/users", auth, admin, adminUpdateUser)
router.delete("/users/:id", auth, admin, adminDeleteUser)
router.get("/orders", auth, admin, adminOrderLists)
router.put("/orders", auth, admin, adminUpdateOrderShippment)
router.put("/orders/delivered", auth, admin, adminControllerDelivered)

module.exports = router
