import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { savePaymentMode } from "../actions/cartActions"
import Steps from "../components/Steps"

const PaymentMethod = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [paymentMode, setPaymentMode] = React.useState("PayPal")
  const shippingAddress = useSelector((state) => state.cart.shippingAddress)
  React.useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping")
    }
  }, [])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMode(paymentMode))
    navigate("/placeorder")
  }
  return (
    <div className="flex justify-center">
      <form
        onSubmit={submitHandler}
        className="mt-10 max-w-[600px] w-full p-4 bg-gray-800 bg-opacity-50 rounded-lg"
      >
        <div className="mb-8">
          <Steps step1={true} step2={true} step3={true} />
        </div>
        <h2 className="text-xl">Mode of Payment</h2>
        <div className="mt-2 flex items-center">
          <i className="fa-brands fa-cc-paypal text-3xl mr-4 text-white "></i>
          <input
            value="PayPal"
            onChange={(e) => setPaymentMode(e.target.value)}
            id="PayPal"
            name="payment"
            type="radio"
            checked
            className="p-2 rounded-md bg-slate-200 text-gray-800"
          />
          <label htmlFor="PayPal" className="ml-2">
            Paypal or Credit Card
          </label>
        </div>
        {/* <div className="mt-2 flex items-center">
          <i className="fa-brands fa-cc-stripe text-3xl mr-4 text-white "></i>
          <input
            value="Stripe"
            onChange={(e) => setPaymentMode(e.target.value)}
            id="Stripe"
            name="payment"
            type="radio"
            className="p-2 rounded-md bg-slate-200 text-gray-800"
          />
          <label htmlFor="Stripe" className="ml-2">
            Stripe
          </label>
        </div> */}

        <button
          type="submit"
          className="p-3 mt-5 w-full bg-cyan-800 hover:bg-orange-300 duration-300 rounded-md text-white uppercase"
        >
          Next
        </button>
      </form>
    </div>
  )
}

export default PaymentMethod
