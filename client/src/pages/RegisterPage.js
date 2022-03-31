import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { register } from "../actions/userActions"
import Loader from "../components/Loader"

const RegisterPage = () => {
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [message, setMessage] = React.useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const redirect = location.search ? location.search.split("=")[1] : ""

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  React.useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`)
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    }
  }, [userInfo, navigate, redirect])

  const registerHandler = (e) => {
    e.preventDefault()
    if (confirmPassword.length < 6) {
      setMessage("Password at least 6 characters")
      return
    } else if (password !== confirmPassword) {
      setMessage("Password don't match")
      return
    }
    dispatch(register(firstName, lastName, email, password))
  }
  return (
    <div className="w-full min-h-[60vh] flex justify-center">
      {loading && <Loader text="Registration in progress please wait" />}
      <form
        onSubmit={registerHandler}
        className="min-w-[350px] md:min-w-[400px] border bg-gray-800 rounded-md min-h-[300px] flex flex-col  overflow-hidden p-3 mt-11"
      >
        <div className="text-2xl text-center p-5 border border-gray-700 mb-3 uppercase tracking-widest">
          Register
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
            className="p-2 rounded-md text-gray-800"
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
            name="last_name"
            type="text"
            placeholder="Last Name"
            className="p-2 rounded-md text-gray-800"
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
            className="p-2 rounded-md text-gray-800"
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
            className="p-2 rounded-md text-gray-800"
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
            className="p-2 rounded-md text-gray-800"
          />
        </div>
        {message && <div className="pl-2 pt-3 text-red-500">{message}</div>}
        {error && <div className="pl-2 pt-3 text-red-500">{error}</div>}
        <p className="pl-2 pt-3">
          Have account?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            <span className="ml-3 text-blue-400 hover:text-orange-300 duration-300">
              Login
            </span>
          </Link>
        </p>
        <button
          type="submit"
          className="p-3 mt-5 bg-blue-400 hover:bg-orange-300 duration-300 rounded-md text-white uppercase"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
