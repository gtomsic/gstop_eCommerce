import * as React from "react"
import { useDispatch, useSelector } from "react-redux"

import Product from "../components/Product"
import { listProducts } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const HomePage = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  React.useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  return (
    <React.Fragment>
      <h1 className="text-lg pb-5 md:text-2xl">
        Our Products | Shop with us now
      </h1>
      {loading ? (
        <Loader text="Loading Products..." />
      ) : error ? (
        <Message color="orangeRed" text={error} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      )}
    </React.Fragment>
  )
}

export default HomePage
