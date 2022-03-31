const { v4: uuid } = require("uuid")
const asyncHandler = require("express-async-handler")
const db = require("../models")

module.exports = {
  // Get Products and Review
  // Public Products
  controllerGetProductReview: asyncHandler(async (req, res) => {
    const response = await db.Product.findOne({
      where: { id: req.params.id },
      include: [{ model: db.Review, order: [["createdAt", "DESC"]] }],
    })
    if (response) {
      res.status(200).json(response)
    }
  }),

  controllerCreateProductReview: asyncHandler(async (req, res) => {
    const id = uuid()
    const response = await db.Review.create({ ...req.body, id })
    if (response) {
      res.status(200).json(response)
    }
  }),

  controllerDeleteProductReview: asyncHandler(async (req, res) => {
    const response = await db.Review.destroy({ where: { id: req.params.id } })
    if (response) {
      res.status(200).json(response)
    }
  }),
}
