import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import logo from "../assets/gstop.png"

import Container from "./Container"
import { logout } from "../actions/userActions"

const routesPath = [
  { to: "/", name: "home", icon: "fa-solid fa-house" },
  { to: "/cart", name: "cart", icon: "fa-solid fa-cart-shopping" },
]

const Header = () => {
  const [active, setActive] = React.useState("")
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const user = useSelector((state) => state.userLogin.userInfo)
  const numberItems = cartItems.reduce((acc, curr) => acc + curr.qty, 0)
  let path = pathname.split("/")[1]
  React.useEffect(() => {
    if (!path) {
      path = "home"
    }
    setActive(path)
  }, [path])

  const logoutHandler = () => {
    dispatch(logout())
    navigate("/login")
  }

  const renderedMenu = routesPath.map((item) => (
    <Link
      key={item.to}
      className={`border-b-2 border-transparent text-gray-300 uppercase mx-2 ${
        active === item.name
          ? "border-orange-300 text-orange-300 duration-300"
          : "hover:border-orange-300 hover:text-orange-300 duration-300"
      }`}
      to={item.to}
    >
      <li className="relative">
        <i className={item.icon}></i>
        <span className="ml-2">{item.name}</span>
        {item.name === "cart" && numberItems !== 0 && (
          <span className="absolute bg-red-500 text-white px-1 text-xs mt-[-10px] left-[10px] rounded-lg">
            {numberItems}
          </span>
        )}
      </li>
    </Link>
  ))

  return (
    <header className="w-full z-30 fixed drop-shadow-lg bg-gray-800 bg-opacity-80 text-gray-300">
      <Container>
        <div className="h-[60px] flex flex-row items-center justify-between">
          <div className="text-orange-300 bold text-2xl self-center">
            <Link to="/">
              <img src={logo} alt="gstop logo" className="w-[60px] ml-3" />
            </Link>
          </div>
          <ul className="flex flex-row items-center text-md md:text-sm">
            {renderedMenu}
            {user && user.is_admin && (
              <Link
                onClick={() => setActive("admin")}
                className={`border-b-2 border-transparent text-white uppercase mx-2  ${
                  active === "admin"
                    ? "border-orange-300 text-orange-300 duration-300"
                    : "hover:border-orange-300 hover:text-orange-300 duration-300"
                }`}
                to="/admin"
              >
                <li className="relative">
                  <i className="fa-solid fa-screwdriver-wrench"></i>
                  <span className="ml-2 hidden md:inline-block">Dashboard</span>
                </li>
              </Link>
            )}
            {!user ? (
              <Link
                className={`border-b-2 border-transparent text-gray-300 uppercase mx-2 ${
                  active === "login"
                    ? "border-orange-300 text-orange-300 duration-300"
                    : "hover:border-orange-300 hover:text-orange-300 duration-300"
                }`}
                to="/login"
              >
                <li className="relative">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <span className="ml-2">Login</span>
                </li>
              </Link>
            ) : (
              <React.Fragment>
                <Link
                  onClick={() => setActive(user.id)}
                  className={`border-b-2 border-transparent text-white uppercase mx-2  ${
                    active === user.id
                      ? "border-orange-300 text-orange-300 duration-300"
                      : "hover:border-orange-300 hover:text-orange-300 duration-300"
                  }`}
                  to="/profile"
                >
                  <li className="relative">
                    <i className="fa-solid fa-user"></i>
                    <span className="ml-2 hidden md:inline-block">
                      {user.first_name + " " + user.last_name}
                    </span>
                  </li>
                </Link>
                <li
                  onClick={logoutHandler}
                  className="border-b-2 border-transparent cursor-pointer mx-2  hover:border-orange-300 hover:text-orange-300 duration-300  uppercase  "
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span className="ml-2 hidden md:inline-block">Logout</span>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </Container>
    </header>
  )
}

export default Header
