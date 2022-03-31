import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { userLists } from "../actions/userActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import DialogBox from "../components/DialogBox"

import {
  adminActionDeleteUser,
  adminActionUpdateUser,
} from "../actions/adminActions"

const AdminUsersPage = () => {
  const dispatch = useDispatch()
  const [dialog, setDialog] = React.useState(false)
  const [admin, setAdmin] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [id, setId] = React.useState("")
  const usersList = useSelector((state) => state.usersList)
  const { users, loading, error } = usersList
  React.useEffect(() => {
    dispatch(userLists())
  }, [dispatch])

  const editModeHandler = (user) => {
    setEdit(true)
    setAdmin(user.is_admin)
    setId(user.id)
    setFirstName(user.first_name)
    setLastName(user.last_name)
    setEmail(user.email)
  }

  const saveModeHander = (user) => {
    setEdit(false)
    const data = {
      id,
      first_name: firstName,
      last_name: lastName,
      email,
    }
    if (user.is_admin !== admin) {
      data.is_admin = admin
    } else {
      data.is_admin = user.is_admin
    }
    dispatch(adminActionUpdateUser(data))
  }

  const deleteHandler = () => {
    dispatch(adminActionDeleteUser(id))
    setDialog(false)
  }

  return (
    <div className="grid gap-1 ">
      <div className="grid grid-cols-5 bg-gray-800 bg-opacity-30 text-orange-300 text-center text-lg py-3">
        <span>Is Admin</span> <span>First Name</span> <span>Last Name</span>{" "}
        <span>Email</span>
      </div>
      {loading ? (
        <Loader text="Request and loading users" />
      ) : error ? (
        <Message color="orangeRed" text="error" />
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-5 gap-1 bg-gray-500 bg-opacity-50"
          >
            {/* 
            Is Admin 
            This is for changing admin access
            */}
            {edit && id === user.id ? (
              <div
                className={`${
                  admin
                    ? "text-green-500 text-2xl bg-white"
                    : "text-orange-500 text-2xl  bg-white"
                } flex justify-center items-center`}
              >
                {admin ? (
                  <i
                    onClick={() => setAdmin(false)}
                    className="fa-solid fa-square-check cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setAdmin(true)}
                    className="fa-solid fa-square-xmark cursor-pointer"
                  ></i>
                )}
              </div>
            ) : (
              <div
                className={`${
                  user.is_admin
                    ? "text-green-500 text-2xl  bg-gray-800"
                    : "text-orange-500 text-2xl  bg-gray-800"
                } flex justify-center items-center`}
              >
                {user.is_admin ? (
                  <i className="fa-solid fa-square-check"></i>
                ) : (
                  <i className="fa-solid fa-square-xmark"></i>
                )}
              </div>
            )}

            {/* First Name */}
            {edit && id === user.id ? (
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-gray-800 py-2 px-3"
              />
            ) : (
              <div className="py-2 px-3 bg-gray-800">{user.first_name}</div>
            )}
            {/* Last name */}
            {edit && id === user.id ? (
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="text-gray-800 py-2 px-3"
              />
            ) : (
              <div className="py-2 px-3 bg-gray-800">{user.last_name}</div>
            )}
            {/* Email */}
            {edit && id === user.id ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-800 py-2 px-3"
              />
            ) : (
              <div className="py-2 px-3 bg-gray-800">{user.email}</div>
            )}
            <div className="bg-gray-800 grid grid-cols-2 gap-1 text-center">
              {edit && id === user.id ? (
                <button
                  onClick={() => saveModeHander(user)}
                  className="py-2 px-3 bg-blue-400 hover:bg-blue-500 duration-300"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => editModeHandler(user)}
                  className="py-2 px-3 bg-gray-500 hover:bg-gray-700 duration-300"
                >
                  Edit
                </button>
              )}
              {edit && id === user.id ? (
                <button
                  onClick={() => {
                    setEdit(false)
                    setAdmin(false)
                  }}
                  className="py-2 px-3 bg-gray-800 hover:bg-gray-500 duration-300"
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setDialog(true)
                      setId(user.id)
                      setFirstName(user.first_name)
                      setLastName(user.last_name)
                    }}
                    className="py-2 px-3 bg-red-400 hover:bg-red-500 duration-300"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
      <DialogBox
        title="Are you sure you want to delete this user"
        openClose={dialog}
        message={`${firstName} ${lastName}, Caution this is connot be undone!`}
        closeModal={() => setDialog(false)}
      >
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => setDialog(false)}
            className="py-2 px-3 bg-gray-400 hover:bg-gray-800 duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteHandler()}
            className="py-2 px-3 bg-red-400 hover:bg-red-500 duration-300"
          >
            Confirm
          </button>
        </div>
      </DialogBox>
    </div>
  )
}

export default AdminUsersPage
