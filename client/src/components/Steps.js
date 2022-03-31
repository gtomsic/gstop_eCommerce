import React from "react"
import { useNavigate, Link } from "react-router-dom"

const Steps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="grid grid-cols-4 text-center text-sm steps">
      {step1 ? (
        <Link
          to={`/login`}
          className="py-3 bg-cyan-700 bg-opacity-50 text-white"
        >
          Login
        </Link>
      ) : (
        <div className="py-3 bg-gray-700 text-gray-500">Login</div>
      )}
      {step2 ? (
        <Link
          to={`/shipping`}
          className="py-3 bg-cyan-700 bg-opacity-50 text-white"
        >
          Shipping
        </Link>
      ) : (
        <div className="py-3 bg-gray-700 text-gray-500">Shipping</div>
      )}
      {step3 ? (
        <Link
          to={`/payment`}
          className="py-3 bg-cyan-700 bg-opacity-50 text-white"
        >
          Payment
        </Link>
      ) : (
        <div className="py-3 bg-gray-700 text-gray-500">Payment</div>
      )}
      {step4 ? (
        <Link
          to={`/placeorder`}
          className="py-3 bg-cyan-700 bg-opacity-50 text-white"
        >
          Place Order
        </Link>
      ) : (
        <div className="py-3 bg-gray-700 text-gray-500">Place Order</div>
      )}
    </div>
  )
}

export default Steps
