const express = require("express")
const { auth } = require("../middleware/authMiddleware")
const router = express.Router()
const {
  addOrderItems,
  getOrderItems,
  payOrder,
} = require("../controllers/orders")

router.route("/").post(auth, addOrderItems)
router.route("/").get(auth, getOrderItems)
router.route("/pay/:order_id").put(auth, payOrder)

module.exports = router
