import * as React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { PayPalButton } from "react-paypal-button-v2"

import OrderStatus from "./OrderStatus"

const OrderDetails = ({ order, paymentHandler }) => {
  const beforeTaxPrice = order.Items.reduce(
    (acc, curr) => acc + Number(curr.price) * Number(curr.qty),
    0
  ).toFixed(2)
  const successPaymentHandler = (paymentResult) => {
    paymentHandler(order.id, order.payment_mode, paymentResult)
  }
  return (
    <div className="my-5 grid gap-1 rounded-md bg-gray-800 bg-opacity-50 overflow-hidden">
      <OrderStatus
        step1={order.is_paid}
        step2={order.is_paid}
        step3={order.is_shipped}
        step4={order.is_delivered}
      />
      <div className="bg-gray-700 bg-opacity-30 p-2">
        <p>
          Order ID : <span className="text-orange-300">{order.id}</span>
        </p>
        <p>Time of Order : {moment(order.createdAt).fromNow()}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-3 gap-2">
          {order.Items.map((item) => (
            <div
              key={item.id}
              className="p-2 rounded-md bg-cyan-500 bg-opacity-10"
            >
              <Link to={`/product/${item.product_id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="pt-2">
                <p>QTY - {item.qty}</p>
                <p>Price $ {item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <h1 className="p-3 mt-2 bg-gray-800  text-xl flex justify-between text-orange-300">
          <span>Before Tax/Shipping</span> <span>$ {beforeTaxPrice}</span>
        </h1>
        <h1 className="p-3 mt-2 bg-gray-800  text-xl flex justify-between text-orange-300">
          <span>Shipping Price</span> <span>$ {order.shipping_price}</span>
        </h1>
        <h1 className="p-3 mt-1 bg-gray-800  text-xl flex justify-between text-orange-300">
          <span>Tax 15%</span> <span>$ {order.tax_price}</span>
        </h1>
        <h1 className="p-3 mt-1 bg-gray-800  text-2xl flex justify-between text-orange-300">
          <span>Total Price</span> <span>$ {order.total_price}</span>
        </h1>
        {order.is_paid ? (
          order.is_delivered ? (
            <button
              disabled={!order.is_delivered}
              className={`${
                order.is_delivered
                  ? "bg-gray-900 text-white hover:bg-gray-800 duration-300"
                  : "bg-gray-600 text-gray-500"
              } mt-2 p-3 rounded-lg w-full`}
            >
              Return
            </button>
          ) : (
            <button
              disabled={order.is_shipped}
              className={`${
                !order.is_shipped
                  ? "bg-orange-300 text-white hover:bg-orange-500 duration-300"
                  : "bg-gray-600 text-gray-500"
              } mt-2 p-3 rounded-lg w-full`}
            >
              Request To Cancel Order
            </button>
          )
        ) : (
          <div className="relative z-10">
            <PayPalButton
              amount={order.total_price}
              onSuccess={successPaymentHandler}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
