import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  adminActionOrderList,
  adminActionShippingUpdate,
  adminDeliveredAction,
} from "../actions/adminActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import ModalDialog from "../components/ModalDialog"

const AdminOrderPage = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDialog, setIsDialog] = React.useState(false)
  const [user, setUser] = React.useState({})
  const [orderId, setOrderId] = React.useState("")
  const [items, setItems] = React.useState([])
  const [address, setAddress] = React.useState({})
  const [payments, setPayments] = React.useState([])
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders)
  const { loading, error, paidOrders } = orders

  React.useEffect(() => {
    dispatch(adminActionOrderList())
  }, [dispatch])

  const confirmedShippment = () => {
    setIsOpen(false)
    dispatch(adminActionShippingUpdate(orderId))
  }

  const confirmedDelivery = () => {
    setIsDialog(false)
    dispatch(adminDeliveredAction(orderId))
  }

  return (
    <div className="grid gap-1">
      {loading && <Loader text="Gettings orders" />}
      {error && <Message text={error} />}
      <div className="grid grid-cols-11 text-center text-lg py-3 text-orange-300">
        <div className="col-span-3">Order Id</div>
        <div>Tax</div>
        <div>ShipPrice</div>
        <div>Items</div>
        <div>Total</div>
        <div>IsPaid</div>
        <div>Shipped</div>
        <div>Delivered</div>
        <div>Payment</div>
      </div>
      {paidOrders &&
        paidOrders.map((item) => {
          return (
            <div key={item.id} className="grid grid-cols-11 gap-1 text-center">
              <div className={`bg-gray-800 py-1 px-2 col-span-3`}>
                {item.id}
              </div>
              <div className={`bg-gray-800 py-1 px-2`}>$ {item.tax_price}</div>
              <div className={`bg-gray-800 py-1 px-2`}>
                $ {item.shipping_price}
              </div>
              <div className={`bg-gray-800 py-1 px-2`}>
                $ {item.items_price}
              </div>
              <div className={`bg-gray-800 py-1 px-2`}>
                $ {item.total_price}
              </div>
              <div
                className={`bg-gray-800 ${
                  item.is_paid && "text-green-500"
                } py-1 px-2 text-center text-lg`}
              >
                {item.is_paid ? (
                  <i className="fa-solid fa-square-check"></i>
                ) : (
                  <i className="fa-solid fa-square-xmark"></i>
                )}
              </div>
              <div
                onClick={() => {
                  setIsOpen(true)
                  setOrderId(item.id)
                  setItems(item.Items)
                  setAddress(item.Address)
                  setPayments(item.Payments)
                  setUser(item.User)
                }}
                className={`bg-gray-800  ${
                  item.is_shipped && "text-green-500"
                } py-1 px-2 text-center text-lg cursor-pointer`}
              >
                {item.is_shipped ? (
                  <i className="fa-solid fa-square-check"></i>
                ) : (
                  <i className="fa-solid fa-square-xmark"></i>
                )}
              </div>
              <div
                onClick={() => {
                  setIsDialog(true)
                  setOrderId(item.id)
                  setItems(item.Items)
                  setAddress(item.Address)
                  setPayments(item.Payments)
                  setUser(item.User)
                }}
                className={`bg-gray-800 ${
                  item.is_delivered && "text-green-500"
                } py-1 px-2 text-center text-lg cursor-pointer`}
              >
                {item.is_delivered ? (
                  <i className="fa-solid fa-square-check"></i>
                ) : (
                  <i className="fa-solid fa-square-xmark"></i>
                )}
              </div>
              <div className={`bg-gray-800 py-1 px-2`}>{item.payment_mode}</div>
            </div>
          )
        })}
      {/* Modal Dialog Here */}
      <ModalDialog isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <h3 className="text-white text-2xl mb-4 p-3 bg-gray-800">
          Is all items shipped?
        </h3>
        <div className="grid gap-1 text-gray-700">
          {items &&
            items.map((order, index) => {
              return (
                <div
                  key={order.id}
                  className="grid grid-cols-7 bg-gray-300 p-2"
                >
                  <img src={order.image} alt={order.name} />
                  <div className="col-span-5 px-3">{order.name}</div>
                  <div className="text-center">
                    <div>QTY</div>
                    <div>
                      {" "}
                      <strong>{order.qty}</strong>{" "}
                    </div>
                  </div>
                </div>
              )
            })}
          <div className="p-3 bg-gray-300 rounded-lg">
            <h2 className="p-2 bg-gray-800 text-orange-300">ID# {orderId}</h2>
            <div className="p-2 mt-2 bg-gray-800 text-white">
              <h2 className="p-2 bg-gray-600">Shipping Info</h2>
              <p>Name: {`${user.first_name} ${user.last_name}`}</p>
              <p>Street: {address.street}</p>
              <p>City: {address.city}</p>
              <p>State: {address.state}</p>
              <p>Country: {address.country}</p>
              <p>Postal Code: {address.zip_code}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-4 gap-1">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="py-2 px-3 bg-gray-800 outline-none hover:bg-gray-500 
            duration-300"
          >
            Cancel
          </button>
          <button
            onClick={confirmedShippment}
            type="button"
            className="py-2 px-3 bg-cyan-700 hover:bg-cyan-500 duration-300"
          >
            Confirm
          </button>
        </div>
      </ModalDialog>
      {/* Modal Dialog Here */}
      <ModalDialog isOpen={isDialog} closeModal={() => setIsDialog(false)}>
        <h3 className="text-white text-2xl mb-4 p-3 bg-gray-800">
          Is order items delivered?
        </h3>
        <div className="grid gap-1 text-gray-700">
          {items &&
            items.map((order, index) => {
              return (
                <div
                  key={order.id}
                  className="grid grid-cols-7 bg-gray-300 p-2"
                >
                  <img src={order.image} alt={order.name} />
                  <div className="col-span-5 px-3">{order.name}</div>
                  <div className="text-center">
                    <div>QTY</div>
                    <div>
                      {" "}
                      <strong>{order.qty}</strong>{" "}
                    </div>
                  </div>
                </div>
              )
            })}
          <div className="p-3 bg-gray-300 rounded-lg">
            <h2 className="p-2 bg-gray-800 text-orange-300">ID# {orderId}</h2>
            <div className="p-2 mt-2 bg-gray-800 text-white">
              <h2 className="p-2 bg-gray-600">Shipping Info</h2>
              <p>Name: {`${user.first_name} ${user.last_name}`}</p>
              <p>Street: {address.street}</p>
              <p>City: {address.city}</p>
              <p>State: {address.state}</p>
              <p>Country: {address.country}</p>
              <p>Postal Code: {address.zip_code}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-4 gap-1">
          <button
            type="button"
            onClick={() => setIsDialog(false)}
            className="py-2 px-3 bg-gray-800 outline-none hover:bg-gray-500 
            duration-300"
          >
            Cancel
          </button>
          <button
            onClick={confirmedDelivery}
            type="button"
            className="py-2 px-3 bg-cyan-700 hover:bg-cyan-500 duration-300"
          >
            Confirm
          </button>
        </div>
      </ModalDialog>
    </div>
  )
}

export default AdminOrderPage
