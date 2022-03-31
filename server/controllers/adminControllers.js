const asyncHandler = require("express-async-handler")
const db = require("../models")
module.exports = {
  adminUpdateUser: asyncHandler(async (req, res) => {
    if (!req.user.is_admin) {
      res.status(401)
      throw new Error("Administrator request only")
      return
    }
    const response = await db.User.update(
      { ...req.body },
      { where: { id: req.body.id } }
    )
    if (response) {
      res.status(201).json(response)
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  }),
  adminDeleteUser: asyncHandler(async (req, res) => {
    if (!req.user.is_admin) {
      res.status(401)
      throw new Error("Administrator request only")
      return
    }
    const response = await db.User.destroy({ where: { id: req.params.id } })
    if (response) {
      res.status(201).json(response)
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  }),
  adminOrderLists: asyncHandler(async (req, res) => {
    if (!req.user.is_admin) {
      res.status(401)
      throw new Error("Administrator request only")
      return
    }
    const response = await db.Order.findAll({
      where: { is_paid: true },
      order: [["createdAt", "DESC"]],
      include: [db.Item, db.Address, db.Payment, db.User],
    })
    if (response) {
      res.status(201).json(response)
    } else {
      res.status(404)
      throw new Error("Orders not found")
    }
  }),
  adminUpdateOrderShippment: asyncHandler(async (req, res) => {
    if (!req.user.is_admin) {
      res.status(401)
      throw new Error("Administrator request only")
      return
    }
    const response = await db.Order.update(
      { is_shipped: true },
      {
        where: { id: req.body.id },
      }
    )
    if (response) {
      res.status(201).json(response)
    } else {
      res.status(404)
      throw new Error("Order not found")
    }
  }),

  adminControllerDelivered: asyncHandler(async (req, res) => {
    if (!req.user.is_admin) {
      res.status(401)
      throw new Error("Administrator request only")
      return
    }
    const response = await db.Order.update(
      { is_delivered: true, delivered_at: Date.now() },
      {
        where: { id: req.body.id },
      }
    )
    if (response) {
      res.status(201).json(response)
    } else {
      res.status(404)
      throw new Error("Order not found")
    }
  }),
}
