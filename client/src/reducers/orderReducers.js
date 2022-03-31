import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_GET_ITEMS_FAIL,
  ORDER_GET_ITEMS_REQUEST,
  ORDER_GET_ITEMS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderContants"

export const orderCreateOrder = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, orderItems: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderGetItems = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_GET_ITEMS_REQUEST:
      return { loading: true }
    case ORDER_GET_ITEMS_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_GET_ITEMS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderPayItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true }
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}
