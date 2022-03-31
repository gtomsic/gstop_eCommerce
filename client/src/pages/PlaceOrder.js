import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Steps from "../components/Steps"
import { createOrder } from "../actions/orderActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { CART_EMPTY_ITEM } from "../constants/cartContants"

const PlaceOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.userLogin.userInfo)
  const orderCreate = useSelector((state) => state.orderCreate)
  const { cartItems, shippingAddress, paymentMode } = cart
  const { loading, success, error } = orderCreate
  cart.itemsPrice = Number(
    cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0).toFixed(2)
  )
  cart.shippingPrice = cart.itemsPrice > 3000 ? 0 : 85.99
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))
  cart.totalPrice = Number(
    (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      cart.taxPrice
    ).toFixed(2)
  )
  const submitHandler = (e) => {
    e.preventDefault()
    navigate("/placeorder")
  }
  const orderHandler = (e) => {
    e.preventDefault()
    dispatch(createOrder({ ...cart }))
  }
  React.useEffect(() => {
    if (success) {
      navigate("/profile")
      localStorage.removeItem("cartItems")
      localStorage.removeItem("paymentMode")
      localStorage.removeItem("shippingAddress")
      dispatch({ type: CART_EMPTY_ITEM })
    }
  }, [success, navigate])
  return (
    <div className="flex justify-center ">
      {loading && <Loader text="Please wait order in process" />}
      {error ? (
        <Message
          color="orangeRed"
          text={error || "Something is wrong please try again later"}
        />
      ) : (
        <form
          onSubmit={submitHandler}
          className="mt-10 w-full grid grid-cols-5 gap-5  md:p-4 overflow-hidden bg-gray-800 bg-opacity-50 rounded-lg"
        >
          <div className="bg-gray-800 bg-opacity-70 col-span-5 md:col-span-2">
            <div className="pb-2">
              <Steps step1={true} step2={true} step3={true} step4={true} />
            </div>
            <h2 className="text-xl py-2 px-4 bg-gray-700 bg-opacity-50 text-white">
              Shipping Info
            </h2>
            <div className="py-1 px-4 grid grid-cols-3">
              <span className="text-gray-500">Name:</span>
              <span className="col-span-2">{`${user.first_name} ${user.last_name}`}</span>
            </div>
            <div className="py-1 px-4 grid grid-cols-3">
              <span className="text-gray-500">Street:</span>
              <span className="col-span-2">{shippingAddress.street}</span>
            </div>
            <div className="py-1 px-4 grid grid-cols-3">
              <span className="text-gray-500">City:</span>
              <span className="col-span-2">{shippingAddress.city} </span>
            </div>
            <div className="py-1 px-4 grid grid-cols-3">
              <span className="text-gray-500">State:</span>
              <span className="col-span-2">{shippingAddress.state} </span>
            </div>
            <div className="py-1 px-4 grid grid-cols-3">
              <span className="text-gray-500">Country:</span>
              <span className="col-span-2">{shippingAddress.country}</span>
            </div>
            <div className="py-1 px-4 grid grid-cols-3">
              <span className="text-gray-500">Postal Code:</span>
              <span className="col-span-2">{shippingAddress.zip_code}</span>
            </div>
          </div>

          <div className="col-span-5 md:col-span-3">
            <h2 className="text-xl py-2 px-4 bg-gray-700 bg-opacity-50 text-white">
              Order Items
            </h2>
            <div className="grid gir-cols-1 gap-1 mt-2">
              {cartItems.length === 0 ? (
                <Message color="You have no cart items" />
              ) : (
                cartItems.map((item) => {
                  return (
                    <div
                      key={item.product}
                      className="bg-gray-800 py-1 px-1 flex"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-[80px]"
                      />
                      <div className="px-3 flex-1">
                        <p>{item.name}</p>
                        <p className="text-orange-300">$ {item.price}</p>
                      </div>
                      <div className="px-3 flex flex-col p-2 bg-gray-700 bg-opacity-40">
                        <div className="flex-1">Qty</div>
                        <div className="flex-1 w-full flex justify-center items-center border-t-2  border-gray-400">
                          {item.qty}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
          <div className="col-span-5">
            <div className="bg-blue-500 bg-opacity-70">
              <h2 className="text-xl py-2 px-4 bg-gray-800 text-white">
                Mode of Payment
              </h2>
              <p className="py-3 text-xl px-4">{paymentMode}</p>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div className="text-xl py-2 px-4 bg-gray-700 bg-opacity-50  text-white flex justify-between">
                <span>Total</span>
                <span>
                  {"$ " +
                    cartItems
                      .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                      .toFixed(2)}
                </span>
              </div>
              <div className="text-xl py-2 px-4 bg-gray-700 bg-opacity-50  text-white flex justify-between">
                <span>Total Items</span>
                <span>
                  {cartItems.reduce((acc, curr) => acc + curr.qty, 0)} qty
                </span>
              </div>
              <div className="text-xl py-2 px-4 bg-gray-700 bg-opacity-50  text-white flex justify-between">
                <span>Shipping</span>
                <span>{"$ " + cart.shippingPrice}</span>
              </div>
              <div className="text-xl py-2 px-4 bg-gray-700 bg-opacity-50  text-white flex justify-between">
                <span>Tax 15%</span>
                <span>{"$ " + cart.taxPrice}</span>
              </div>
              <div className="text-3xl py-2 px-4 bg-gray-700 bg-opacity-50  text-white flex justify-between">
                <span>Total Price</span>
                <span>{"$" + cart.totalPrice}</span>
              </div>
            </div>

            <button
              onClick={orderHandler}
              type="submit"
              className="p-3 mt-5 w-full bg-cyan-800 hover:bg-orange-300 duration-300 rounded-md text-white uppercase"
            >
              Place your Order
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default PlaceOrder
