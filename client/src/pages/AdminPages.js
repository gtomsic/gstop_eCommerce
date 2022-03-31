import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import AdminSteps from "../components/AdminSteps"
import AdminUserspage from "./AdminUsersPage"
import AdminOrderPage from "./AdminOrderPage"
import AdminProductPage from "./AdminProductPage"

const AdminPages = () => {
  const [page, setPage] = React.useState("orders")
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userLogin.userInfo)
  React.useEffect(() => {
    if (!userInfo.is_admin) {
      navigate("/")
    }
  }, [userInfo])

  const pageChange = (pageName) => {
    setPage(pageName)
  }
  return (
    <div>
      <h1 className="text-2xl text-orange-300 p-3">Admin Page</h1>
      <div className="mb-1">
        <AdminSteps page={page} pageChange={pageChange} />
      </div>
      {page === "users" && <AdminUserspage />}
      {page === "orders" && <AdminOrderPage />}
      {page === "products" && <AdminProductPage />}
    </div>
  )
}

export default AdminPages
