import React from "react"

const Steps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="grid grid-cols-4 text-center text-sm order">
      {step1 ? (
        <div className="py-3 bg-blue-500 bg-opacity-50 text-white">Paid</div>
      ) : (
        <div className="py-3 bg-gray-700 text-gray-500">Paid</div>
      )}
      {step2 ? (
        <div className="py-3 bg-blue-500 bg-opacity-50 text-white">
          Processing
        </div>
      ) : (
        <div className="py-3 bg-gray-700 text-gray-500">Processing</div>
      )}
      {step3 ? (
        <div className="py-3 bg-blue-500 bg-opacity-50 text-white">Shipped</div>
      ) : (
        <div className="py-3 bg-gray-700 text-gray-500">Shipped</div>
      )}
      {step4 ? (
        <div className="py-3 bg-blue-500 bg-opacity-50 text-white">
          Delivered
        </div>
      ) : (
        <div className="py-3 bg-gray-700 text-gray-500">Delivered</div>
      )}
    </div>
  )
}

export default Steps
