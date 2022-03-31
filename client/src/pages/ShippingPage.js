import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress } from "../actions/cartActions"
import Message from "../components/Message"
import Steps from "../components/Steps"

const ShippingPage = () => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress)
  const [street, setStreet] = React.useState("")
  const [city, setCity] = React.useState("")
  const [state, setState] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [zip_code, setZipCode] = React.useState("")
  const [message, setMessage] = React.useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (shippingAddress && shippingAddress.street) {
      setStreet(shippingAddress.street)
      setCity(shippingAddress.city)
      setState(shippingAddress.state)
      setCountry(shippingAddress.country)
      setZipCode(shippingAddress.zip_code)
    }
  }, [shippingAddress])
  const submitHandler = (e) => {
    e.preventDefault()
    if (street && city && state && country && zip_code) {
      dispatch(saveShippingAddress({ street, city, state, country, zip_code }))
      setMessage("")
      navigate("/payment")
    } else {
      setMessage(
        "All fields are required! Please complete the shipping address"
      )
    }
  }
  return (
    <div className="flex justify-center">
      <form
        onSubmit={submitHandler}
        className="mt-10 max-w-[600px] w-full p-4 bg-gray-800 bg-opacity-50 rounded-lg"
      >
        <div className="mb-8">
          <Steps step1={true} step2={true} />
        </div>

        {message && (
          <div className="my-3">
            <Message color="orangeRed" text={message} />
          </div>
        )}
        <h2 className="text-xl">Shipping Address</h2>
        <div className="mt-2 flex flex-col">
          <label htmlFor="first_name" className="px-2">
            Street
          </label>
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            id="street"
            name="street"
            type="text"
            placeholder="Street"
            className="p-2 rounded-md bg-slate-200 text-gray-800"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="first_name" className="px-2">
            City
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            id="city"
            name="city"
            type="text"
            placeholder="City"
            className="p-2 rounded-md bg-slate-200 text-gray-800"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="first_name" className="px-2">
            State/Province
          </label>
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            id="state"
            name="state"
            type="text"
            placeholder="State/Province"
            className="p-2 rounded-md bg-slate-200 text-gray-800"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="first_name" className="px-2">
            Country
          </label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            id="country"
            name="country"
            type="text"
            placeholder="Country"
            className="p-2 rounded-md bg-slate-200 text-gray-800"
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="first_name" className="px-2">
            Postal Code / Zip Code
          </label>
          <input
            value={zip_code}
            onChange={(e) => setZipCode(e.target.value)}
            id="zip_code"
            name="zip_code"
            type="text"
            placeholder="Zip Code"
            className="p-2 rounded-md bg-slate-200 text-gray-800"
          />
        </div>

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

export default ShippingPage
