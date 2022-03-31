const { v4: uuid } = require("uuid")
const asyncHandler = require("express-async-handler")
const db = require("../models")

module.exports = {
  // PUT update is_paid
  // Private Products api/orders/ispaid/:id
  payOrder: asyncHandler(async (req, res) => {
    console.log(req.body)
    const payment = await db.Payment.create({
      id: uuid(),
      ...req.body,
      user_id: req.user.id,
      order_id: req.params.order_id,
    })
    if (payment) {
      const updateOrder = await db.Order.update(
        { is_paid: true, paid_at: Date.now() },
        {
          where: { id: req.params.order_id, user_id: req.user.id },
          returning: true,
          raw: true,
          plain: true,
        }
      )
      if (updateOrder) {
        res.status(200).json(updateOrder[1])
      } else {
        res.status(404)
        throw new Error("Orders not found")
      }
    }
  }),
  // Get All Orders
  // Private Products
  getOrderItems: asyncHandler(async (req, res) => {
    const orderItems = await db.Order.findAll({
      order: [["createdAt", "DESC"]],
      where: { user_id: req.user.id },
      include: [db.Item, db.Address],
    })
    if (orderItems) {
      res.status(200).json(orderItems)
    }
  }),
  // Get all Products
  // Private POST /api/orders
  addOrderItems: asyncHandler(async (req, res) => {
    const {
      cartItems,
      shippingAddress,
      paymentMode,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body

    if (cartItems && cartItems === 0) {
      res.status(400)
      throw new Error("You have not order items")
      return
    } else {
      const order = await db.Order.create({
        id: uuid(),
        tax_price: taxPrice,
        shipping_price: shippingPrice,
        total_price: totalPrice,
        payment_mode: paymentMode,
        items_price: itemsPrice,
        user_id: req.user.id,
      })
      const newOrderArray = cartItems.map((item) => ({
        id: uuid(),
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: Number(item.price),
        user_id: req.user.id,
        order_id: order.id,
        product_id: item.product,
      }))
      const items = await db.Item.bulkCreate(newOrderArray)
      const address = await db.Address.create({
        id: uuid(),
        ...shippingAddress,
        user_id: req.user.id,
        order_id: order.id,
      })
      res.status(201).json({ orderItems: order, items, address })
    }
  }),
}
