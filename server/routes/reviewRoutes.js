const express = require("express")
const router = express.Router()

const {
  controllerGetProductReview,
  controllerCreateProductReview,
  controllerDeleteProductReview,
} = require("../controllers/reviewControllers")
const { auth } = require("../middleware/authMiddleware")

router.post("/", auth, controllerCreateProductReview)
router.get("/:id", controllerGetProductReview)
router.delete("/:id", controllerDeleteProductReview)

module.exports = router
