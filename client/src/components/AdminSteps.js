import React from "react"

const AdminSteps = ({ page, pageChange }) => {
  const stepsHandler = (route) => {
    pageChange(route)
  }
  return (
    <div className="grid grid-cols-3 text-center text-sm order">
      <div
        onClick={() => stepsHandler("users")}
        className={`py-3 ${
          page === "users" ? "bg-blue-500" : "bg-gray-800"
        } bg-opacity-70 hover:bg-blue-500 duration-500 cursor-pointer text-white`}
      >
        Users
      </div>

      <div
        onClick={() => stepsHandler("orders")}
        className={`py-3 ${
          page === "orders" ? "bg-blue-500" : "bg-gray-800"
        } bg-opacity-70 hover:bg-blue-500 duration-500 cursor-pointer text-white`}
      >
        Orders
      </div>

      <div
        onClick={() => stepsHandler("products")}
        className={`py-3 ${
          page === "products" ? "bg-blue-500" : "bg-gray-800"
        } bg-opacity-70 hover:bg-blue-500 duration-500 cursor-pointer text-white`}
      >
        Products
      </div>
    </div>
  )
}

export default AdminSteps
