import * as React from "react"
import { useDispatch, useSelector } from "react-redux"

import Loader from "../components/Loader"
import Message from "../components/Message"
import ModalDialog from "../components/ModalDialog"
import { listProducts } from "../actions/productActions"
import {
  actionProductDelete,
  actionProductUpdate,
} from "../actions/adminActions"

const AdminProductPage = () => {
  const [name, setName] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [brand, setBrand] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [productItem, setProductItem] = React.useState({})
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  React.useEffect(() => {
    setName(productItem.name)
    setPrice(productItem.price)
    setCategory(productItem.category)
    setBrand(productItem.brand)
    setDescription(productItem.description)
    dispatch(listProducts())
  }, [dispatch, productItem])

  const productEditHandler = () => {
    const data = {
      id: productItem.id,
      name,
      price: Number(price).toFixed(2),
      category,
      brand,
      description,
    }
    dispatch(actionProductUpdate(data))
    console.log(data)
    setEditModal(false)
  }

  const productDeleteHandler = () => {
    dispatch(actionProductDelete(productItem.id))
    setDeleteModal(false)
  }
  return (
    <div className="grid gap-1 ">
      <div className="p-3 grid gap-1 grid-cols-9 text-center text-orange-300 bg-gray-800 ">
        <div className="col-span-2">ID</div>
        <div className="col-span-3">NAME</div>
        <div>PRICE</div>
        <div>CATEGORY</div>
        <div>BRAND</div>
      </div>
      {loading && <Loader text="Please wait try loading all products" />}
      {error && (
        <Message
          color="orangeRed"
          text="Sorry something wrong with please contact the database administrator."
        />
      )}
      {products &&
        products.map((item, index) => {
          return (
            <div key={item.id} className="grid grid-cols-9 gap-1 bg-gray-500">
              <div className="col-span-2 bg-gray-800 p-2 flex justify-center items-center">
                {item.id}
              </div>
              <div className="col-span-3 bg-gray-800 p-2 flex items-center">
                {item.name}
              </div>
              <div className="bg-gray-800 p-2 flex justify-center items-center">
                $ {item.price}
              </div>
              <div className="bg-gray-800 p-2 flex items-center">
                {item.category}
              </div>
              <div className="bg-gray-800 p-2 flex items-center">
                {item.brand}
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  setProductItem(item)
                  setDeleteModal(false)
                  setEditModal(true)
                }}
                className="bg-gray-800 grid grid-cols-2 "
              >
                <div className="bg-blue-500 bg-opacity-40 hover:text-white flex justify-center items-center hover:bg-blue-700 duration-500 cursor-pointer">
                  Edit
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    setProductItem(item)
                    setEditModal(false)
                    setDeleteModal(true)
                  }}
                  className="bg-red-500 hover:text-white flex justify-center items-center hover:bg-red-700 duration-500 cursor-pointer"
                >
                  Delete
                </div>
              </div>
            </div>
          )
        })}
      {/* MODAL DIALOG EDIT PRODUCT HERE */}
      <ModalDialog isOpen={editModal} closeModal={() => setEditModal(false)}>
        <div className="p-3 bg-gray-800 text-xl">
          <h1 className="text-2xl py-3">Edit Product ID</h1>
          <p className="text-orange-300">{productItem.id}</p>
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="first_name" className="uppercase px-2 text-gray-500">
            Product Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            type="text"
            placeholder="Product Name"
            className="p-2 rounded-md bg-gray-200 text-gray-800"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="first_name" className="uppercase px-2 text-gray-500">
            Product Price
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            name="price"
            type="text"
            placeholder="Product Price"
            className="p-2 rounded-md bg-gray-200 text-gray-800"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="first_name" className="uppercase px-2 text-gray-500">
            Product Category
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            name="category"
            type="text"
            placeholder="Product Categor"
            className="p-2 rounded-md bg-gray-200 text-gray-800"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="first_name" className="uppercase px-2 text-gray-500">
            Product Brand
          </label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            id="brand"
            name="brand"
            type="text"
            placeholder="Product Brand"
            className="p-2 rounded-md bg-gray-200 text-gray-800"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="first_name" className="uppercase px-2 text-gray-500">
            Product Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            name="description"
            type="text"
            rows="7"
            placeholder="Product Description"
            className="p-2 rounded-md bg-gray-200 text-gray-800"
          />
        </div>
        <div className="grid grid-cols-2 gap-1 mt-4">
          <button
            onClick={() => setEditModal(false)}
            className="py-2 px-3 bg-blue-400 hover:bg-blue-800 duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => productEditHandler()}
            className="py-2 px-3 bg-cyan-500 hover:bg-cyan-700 duration-300"
          >
            Save
          </button>
        </div>
      </ModalDialog>
      {/* MODAL DIALOG EDIT PRODUCT HERE */}
      <ModalDialog
        isOpen={deleteModal}
        closeModal={() => setDeleteModal(false)}
      >
        <div className="p-3 bg-gray-800 text-xl">
          <h1 className="text-2xl py-3">Are you sure to delete this product</h1>
          <p className="text-orange-300">{productItem.id}</p>
        </div>
        <div className="text-gray-700 my-4">
          <p>{productItem.name}</p>
          <p>Deleting this product couldn't be undone.</p>
          <p>Please confirm if you are sure.</p>
        </div>
        <div className="grid grid-cols-2 gap-1 mt-4">
          <button
            onClick={() => setDeleteModal(false)}
            className="py-2 px-3 bg-blue-400 hover:bg-blue-800 duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => productDeleteHandler()}
            className="py-2 px-3 bg-red-500 hover:bg-red-700 duration-300"
          >
            Confirm
          </button>
        </div>
      </ModalDialog>
    </div>
  )
}

export default AdminProductPage
