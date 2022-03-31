import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import {
  adminDeleteuserReducer,
  adminDeliveredUpdateReducer,
  adminOrderListReducer,
  adminShippingUpdateReducer,
  adminUpdateUser,
  reducerProductDelete,
  reducerProductUpdate,
} from "../reducers/adminReducers"
import { cartReducer } from "../reducers/cartReducers"
import {
  orderCreateOrder,
  orderGetItems,
  orderPayItemsReducer,
} from "../reducers/orderReducers"

import {
  productListReducer,
  productDetailsReducer,
} from "../reducers/productReducers"
import {
  reducerCreateProductReview,
  reducerDeleteProductReview,
  reducerGetProductReview,
} from "../reducers/reducerReviews"
import {
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "../reducers/userReducers"

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updatedProfile: userUpdateProfileReducer,
  orderCreate: orderCreateOrder,
  orderItems: orderGetItems,
  orderPaid: orderPayItemsReducer,
  usersList: userListReducer,
  admins: adminUpdateUser,
  adminDeletedUser: adminDeleteuserReducer,
  orders: adminOrderListReducer,
  shippings: adminShippingUpdateReducer,
  deliveredUpdate: adminDeliveredUpdateReducer,
  productUpdate: reducerProductUpdate,
  productDeleted: reducerProductDelete,
  productReviews: reducerGetProductReview,
  createdReview: reducerCreateProductReview,
  deletedReview: reducerDeleteProductReview,
})

const cartItemFromLocal = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const userInfoFromLocal = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const userDetailsFromLocal = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {}

const shippingAddressFromLocal = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

const paymentModeFromLocal = localStorage.getItem("paymentMode")
  ? JSON.parse(localStorage.getItem("paymentMode"))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemFromLocal,
    shippingAddress: shippingAddressFromLocal,
    paymentMode: paymentModeFromLocal,
  },
  userLogin: { userInfo: userInfoFromLocal },
  userDetails: { user: userDetailsFromLocal },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
