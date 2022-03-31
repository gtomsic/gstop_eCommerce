import * as React from "react"
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { addToCart, removeCartItem } from "../actions/cartActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const CartPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  const id = params.id
  const qty = location.search ? Number(location.search.split("=")[1]) : 1
  React.useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeCartHandler = (id) => {
    dispatch(removeCartItem(id))
  }

  const checkOutHandler = () => {
    navigate(`/login?redirect=shipping`)
  }

  return (
    <React.Fragment>
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 bg-none text-white hover:text-orange-300  hover:bg-gray-800  duration-300"
      >
        <i className="fa-solid fa-angle-left"></i>
        <span className="ml-2">Back</span>
      </button>
      <div className="md:grid md:grid-cols-3 mt-5 text-gray-800">
        <div className="col-span-2 md:border grid gap-3 md:gap-1 md:border-gray-100 md:p-3">
          {cartItems.length === 0 ? (
            <Message text="Your cart is currently empty" />
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product}
                className="bg-gray-200 bg-opacity-90 flex flex-col p-3 md:mb-0 md:flex-row md:items-center"
              >
                <Link to={`/product/${item.product}`}>
                  <img
                    className="w-full mb-5 md:mb-0 md:w-[100px]"
                    src={item.image}
                    alt={item.name}
                  />
                </Link>
                <div className="flex-1 px-3">
                  <h1>Price: $ {item.price}</h1>
                  <Link to={`/product/${item.product}`}>
                    <p>{item.name}</p>
                  </Link>
                </div>
                <div className="flex flex-col md:block">
                  {item.count_in_stock > 0 && (
                    <label className="flex-1 mb-3 md:mb-0 md:inline-block bg-none mt-4">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        className="form-select w-full  py-[6px] px-3 block md:w-[80px] bg-none border bg-gray-300 border-gray-200 mr-1  text-gray-800"
                      >
                        {[...Array(Number(item.count_in_stock)).keys()].map(
                          (num) => {
                            return (
                              <option key={num + 1} value={num + 1}>
                                {num + 1}
                              </option>
                            )
                          }
                        )}
                      </select>
                    </label>
                  )}
                  <button
                    onClick={() => removeCartHandler(item.product)}
                    className="px-3 flex-1 py-3 md:py-1 bg-gray-700 text-white  hover:bg-red-500 hover:text-gray-100 duration-300"
                  >
                    <i className="fa-solid fa-trash"></i>
                    <span className="ml-2">Remove</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-1 pl-0 pt-8 md:pl-3 md:pt-0">
          <div className="text-white p-3 bg-gray-800 flex justify-between">
            <span>Total Price</span>
            <span>
              ${" "}
              {cartItems
                .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="text-gray-800 bg-gray-200 p-3  flex justify-between">
            <span>Items</span>
            <span>{cartItems.reduce((acc, curr) => acc + curr.qty, 0)}</span>
          </div>
          <button
            onClick={checkOutHandler}
            disabled={cartItems.length === 0}
            className={`p-3 my-3 w-full ${
              cartItems.length === 0
                ? "bg-gray-200 text-gray-400"
                : "bg-sky-700 hover:bg-sky-500  duration-300 text-white"
            }`}
          >
            Proceed to Check Out
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CartPage
