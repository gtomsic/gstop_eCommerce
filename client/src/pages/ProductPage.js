import * as React from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Ratings from "../components/Ratings"
import { listProductDetails } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductPage = () => {
  const [qty, setQty] = React.useState(1)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { product, error, loading } = productDetails
  React.useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [params.id, dispatch])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }
  return (
    <React.Fragment>
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 bg-none  hover:bg-gray-800 text-white hover:text-orange-300 duration-300"
      >
        <i className="fa-solid fa-angle-left"></i>
        <span className="ml-2">Back</span>
      </button>
      {loading ? (
        <Loader text="Get Product Details" />
      ) : error ? (
        <Message color="orangeRed" text={error} />
      ) : (
        <div className="my-5 grid grid-cols-1 md:grid-cols-2">
          <div className=" bg-gray-800">
            <img src={product.image} alt={product.name} className="w-full" />
            <h2 className="text-xl p-3 text-orange-300">{product.name}</h2>
            <p className="px-3 pb-5 text-gray-300">
              Description: {product.description}
            </p>
            <div className="p-3">
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
                  text={`of ${
                    product.Reviews && product.Reviews.length
                  } reviews`}
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col pt-1 md:pt-0 md:px-3">
            <div className="bg-gray-200 text-gray-800 p-3 flex flex-row justify-between">
              <span>Price: </span> <span>$ {product.price}</span>{" "}
            </div>
            <div className="bg-gray-200 text-gray-800 p-3 mt-1 flex flex-row justify-between">
              <span>Status:</span>{" "}
              <span>
                {product.count_in_stock > 0 ? "In Stock" : "Out Of Stock"}
              </span>
            </div>
            {product.count_in_stock > 0 && (
              <label className="block mt-4">
                <span className="text-white">Qty</span>
                <select
                  onChange={(e) => setQty(e.target.value)}
                  value={qty}
                  className="form-select mt-1 py-2 px-3 block w-full bg-gray-200 rounded-md text-gray-800"
                >
                  {[...Array(Number(product.count_in_stock)).keys()].map(
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
              onClick={addToCartHandler}
              disabled={Number(product.count_in_stock) === 0}
              className={`p-3 my-3 border border-gray-100 hover:border-blue-400 ${
                Number(product.count_in_stock) === 0
                  ? "bg-gray-200 text-gray-400"
                  : "bg-gray-800 hover:bg-blue-400  duration-300 text-gray-50"
              }`}
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default ProductPage
