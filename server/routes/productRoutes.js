const express = require("express")
const router = express.Router()
const {
  getProducts,
  getProduct,
  controllerProductDelete,
  controllerProductUpdate,
} = require("../controllers/products")
const { auth, admin } = require("../middleware/authMiddleware")

router.route("/").get(getProducts)
router.route("/:id").get(getProduct)
router.route("/:id").delete(auth, admin, controllerProductDelete)
router.route("/").put(auth, admin, controllerProductUpdate)

module.exports = router
