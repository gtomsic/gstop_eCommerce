import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../actions/userActions"
import Loader from "../components/Loader"

const LoginPage = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split("=")[1] : ""

  React.useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`)
    }
  }, [userInfo, navigate, redirect])

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <div className="w-full min-h-[60vh] flex flex-col justify-center items-center">
      {loading && <Loader text="Checking your credentials to login" />}
      <form
        onSubmit={loginHandler}
        className="min-w-[350px] md:min-w-[400px] border border-gray-500 bg-gray-800 rounded-md min-h-[300px] flex flex-col  overflow-hidden p-3"
      >
        <div className="text-2xl text-center p-5 border border-gray-700 mb-3 tracking-widest">
          LOGIN
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
            type="text"
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
        {error && <div className="pl-2 pt-3 text-red-500">{error}</div>}
        <p className="pl-2 pt-3">
          Don't have account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <span className="ml-3 text-blue-400 hover:text-orange-300 duration-300">
              Register
            </span>
          </Link>
        </p>
        <button
          type="submit"
          className="p-3 mt-5 bg-blue-400 hover:bg-orange-300 duration-300 rounded-md text-white uppercase"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
