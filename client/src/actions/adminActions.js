import axios from "axios"
import {
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELIVERED_UPDATE_FAIL,
  ADMIN_DELIVERED_UPDATE_REQUEST,
  ADMIN_DELIVERED_UPDATE_SUCCESS,
  ADMIN_ORDERS_LIST_FAIL,
  ADMIN_ORDERS_LIST_REQUEST,
  ADMIN_ORDERS_LIST_SUCCESS,
  ADMIN_SHIPPING_UPDATE_FAIL,
  ADMIN_SHIPPING_UPDATE_REQUEST,
  ADMIN_SHIPPING_UPDATE_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
} from "../constants/adminContants"
import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productContants"
import { listProducts } from "./productActions"
import { userLists } from "./userActions"

export const adminActionUpdateUser =
  (userObj) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_UPDATE_USER_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.put("/api/admin/users", userObj, config)

      dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data })
      dispatch(userLists())
    } catch (error) {
      dispatch({ type: ADMIN_UPDATE_USER_FAIL, payload: error })
    }
  }
export const adminActionDeleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DELETE_USER_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/api/admin/users/${id}`, config)
    dispatch({ type: ADMIN_DELETE_USER_SUCCESS, payload: data })
    dispatch(userLists())
  } catch (error) {
    dispatch({ type: ADMIN_DELETE_USER_FAIL, payload: error })
  }
}

export const adminActionOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ORDERS_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/admin/orders`, config)
    dispatch({ type: ADMIN_ORDERS_LIST_SUCCESS, payload: data })
    dispatch(userLists())
  } catch (error) {
    dispatch({ type: ADMIN_ORDERS_LIST_FAIL, payload: error })
  }
}

export const adminActionShippingUpdate =
  (orderId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_SHIPPING_UPDATE_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/admin/orders`,
        { id: orderId },
        config
      )
      dispatch({ type: ADMIN_SHIPPING_UPDATE_SUCCESS, payload: data })
      dispatch(adminActionOrderList())
    } catch (error) {
      dispatch({ type: ADMIN_SHIPPING_UPDATE_FAIL, payload: error })
    }
  }

export const adminDeliveredAction = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DELIVERED_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `/api/admin/orders/delivered`,
      { id: orderId },
      config
    )
    dispatch({ type: ADMIN_DELIVERED_UPDATE_SUCCESS, payload: data })
    dispatch(adminActionOrderList())
  } catch (error) {
    dispatch({ type: ADMIN_DELIVERED_UPDATE_FAIL, payload: error })
  }
}

export const actionProductUpdate = (dataObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/products`, dataObj, config)
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
    dispatch(listProducts())
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error })
  }
}

export const actionProductDelete =
  (product_id) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.delete(`/api/products/${product_id}`, config)
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data })
      dispatch(listProducts())
    } catch (error) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error })
    }
  }
