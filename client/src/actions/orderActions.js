import axios from "axios"
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_GET_ITEMS_FAIL,
  ORDER_GET_ITEMS_REQUEST,
  ORDER_GET_ITEMS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderContants"

export const payOrderAction =
  (order_id, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST })
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
        `api/orders/pay/${order_id}`,
        paymentResult,
        config
      )
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_GET_ITEMS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`api/orders`, config)
    dispatch({ type: ORDER_GET_ITEMS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_GET_ITEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`api/orders`, order, config)
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
