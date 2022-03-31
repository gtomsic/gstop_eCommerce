import React from "react"
import { Link } from "react-router-dom"
import Ratings from "./Ratings"

const Product = ({ product }) => {
  return (
    <div className=" flex flex-col w-full text-dark border border-gray-500 rounded-md overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="flex justify-center">
          <img className="w-full" src={product.image} alt={product.name} />
        </div>
      </Link>
      <div className="flex-1">
        <Link to={`/product/${product.id}`}>
          <h4 className="p-3 text-sm">{product.name}</h4>
        </Link>
      </div>

      <div className="text-xl text-bold text-dark bg-gray-700 py-3 px-2 my-1 cursor-pointer">
        <Link to={`/review/${product.id}`}>
          <Ratings
            rating={
              product.Reviews &&
              product.Reviews.reduce(
                (acc, curr) =>
                  acc + curr.rating / Number(product.Reviews.length),
                0
              ).toFixed(1)
            }
            text={`of ${product.Reviews && product.Reviews.length} reviews`}
          />
        </Link>
      </div>
      <h2 className="text-xl text-bold text-gray-300 bg-gray-700 py-3 px-3">
        Price: $ {product.price}
      </h2>
    </div>
  )
}

export default Product
