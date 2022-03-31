const { v4: uuid } = require("uuid")
const asyncHandler = require("express-async-handler")
const db = require("../models")

module.exports = {
  // Get all Products
  // Public Routes
  getProducts: asyncHandler(async (req, res) => {
    const products = await db.Product.findAll({ include: [db.Review] })
    res.status(200).json(products)
  }),
  // Get all Product
  // Public Routes
  getProduct: asyncHandler(async (req, res) => {
    const product = await db.Product.findOne({
      where: { id: req.params.id },
      include: [db.Review],
    })
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404)
      throw new Error("Product not found")
    }
  }),

  // Delete a product
  // Private Routes Admin /api/product
  controllerProductDelete: asyncHandler(async (req, res) => {
    if (!req.user.is_admin) {
      res.status(401)
      throw new Error("Administrator request only")
      return
    }
    const product = await db.Product.destroy({ where: { id: req.params.id } })
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404)
      throw new Error("Product not found")
    }
  }),

  // Update a product
  // Private Routes Admin /api/product
  controllerProductUpdate: asyncHandler(async (req, res) => {
    console.log(req.body)
    if (!req.user.is_admin) {
      res.status(401)
      throw new Error("Administrator request only")
      return
    }
    const product = await db.Product.update(
      { ...req.body },
      { where: { id: req.body.id } }
    )
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404)
      throw new Error("Product not found")
    }
  }),
}
