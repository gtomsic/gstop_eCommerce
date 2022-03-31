import * as React from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getOrders, payOrderAction } from "../actions/orderActions"
import OrderDetails from "../components/OrderDetails"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import Loader from "../components/Loader"
import { ORDER_PAY_RESET } from "../constants/orderContants"

const ProfilePage = () => {
  const [payPalSdk, setPaypalSdk] = React.useState(false)
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [message, setMessage] = React.useState(null)
  const [update, setUpdate] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { error, user } = userDetails

  const updatedProfile = useSelector((state) => state.updatedProfile)
  const { success } = updatedProfile

  const orderItems = useSelector((state) => state.orderItems)
  const { loading, orders } = orderItems

  const orderPaid = useSelector((state) => state.orderPaid)
  const { loading: loadingPay, success: paymentSuccess } = orderPaid

  const successPaymentHandler = (order_id, mode, paymentResult) => {
    console.log(paymentResult)
    const payment = {
      payment_id: paymentResult.id,
      payment_method: mode,
      status: paymentResult.status,
      email: paymentResult.payer.email_address,
    }
    dispatch(payOrderAction(order_id, payment))
  }

  React.useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.className = "paypal_script"
      console.log("From sdk")
      document.body.appendChild(script)
      script.onload(() => {
        setPaypalSdk(true)
      })
    }
    if (paymentSuccess) {
      addPayPalScript()
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrders())
    }
  }, [dispatch, orders, paymentSuccess])

  React.useEffect(() => {
    dispatch(getOrders())
  }, [])

  React.useEffect(() => {
    if (!userInfo) {
      navigate(`/login}`)
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    }
    if (user.id !== userInfo.id) {
      dispatch(getUserDetails("profile"))
    } else {
      setFirstName(user.first_name)
      setLastName(user.last_name)
      setEmail(user.email)
      setPassword("")
      setConfirmPassword("")
    }
    if (success && !update) {
      setUpdate(true)
      setFirstName(userInfo.first_name)
      setLastName(userInfo.last_name)
      setEmail(userInfo.email)
      setPassword("")
      setConfirmPassword("")
      setTimeout(() => {
        setUpdate(false)
      }, 5000)
    }
  }, [dispatch, success, user, navigate, userInfo])

  const updateHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Password don't match")
      return
    } else {
      dispatch(
        updateUserProfile({
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        })
      )
    }
  }
  return (
    <div className="w-full min-h-[30vh] flex flex-col-reverse md:grid md:grid-cols-3 gap-3 md:mt-10">
      <div className="bg-gray-800 bg-opacity-60 p-3 col-span-2">
        <div className="text-xl text-center p-3 bg-cyan-700 bg-opacity-50 mb-3  tracking-widest">
          Order History
        </div>
        {loading ? (
          <Loader text="Please wait try to load your order details" />
        ) : orders ? (
          orders.map((order) => (
            <OrderDetails
              key={order.id}
              order={order}
              paypalSdk={payPalSdk}
              paymentHandler={successPaymentHandler}
            />
          ))
        ) : (
          <Loader text="Please wait try to load your order details" />
        )}
      </div>
      <div>
        <form
          onSubmit={updateHandler}
          className="md:min-w-auto md:sticky top-[70px] bg-gray-800 bg-opacity-60 flex flex-col  overflow-hidden p-3"
        >
          <div
            className={`text-xl text-center p-3 mb-3  tracking-widest ${
              update
                ? "bg-orange-300 text-white duration-500 ease-in-out"
                : "bg-gray-700 duration-500 ease-in-out"
            }`}
          >
            {update ? "Profile Updated" : "Profile Details"}
          </div>
          <div className="mt-2 flex flex-col">
            <label htmlFor="first_name" className="uppercase px-2">
              First Name
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
              className="p-2 rounded-md bg-gray-200 text-gray-800"
            />
          </div>
          <div className="mt-2 flex flex-col">
            <label htmlFor="" className="uppercase px-2">
              Last Name
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="last_name"
              name="password"
              type="text"
              placeholder="Password"
              className="p-2 rounded-md bg-gray-200 text-gray-800"
            />
          </div>
          <div className="mt-2 flex flex-col">
            <label htmlFor="email" className="uppercase px-2">
              email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="p-2 rounded-md bg-gray-200 text-gray-800"
            />
          </div>
          <div className="mt-2 flex flex-col">
            <label htmlFor="password" className="uppercase px-2">
              password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="p-2 rounded-md bg-gray-200 text-gray-800"
            />
          </div>
          <div className="mt-2 flex flex-col">
            <label htmlFor="confirm_password" className="uppercase px-2">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              className="p-2 rounded-md bg-gray-200 text-gray-800"
            />
          </div>
          {message && <div className="pl-2 pt-3 text-red-500">{message}</div>}
          {error && <div className="pl-2 pt-3 text-red-500">{error}</div>}
          <button
            type="submit"
            className="p-3 mt-5 bg-blue-400 hover:bg-orange-300 duration-300 rounded-md text-white uppercase"
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
