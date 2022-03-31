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

export const adminUpdateUser = (state = { updatedUser: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { loading: true }
    case ADMIN_UPDATE_USER_SUCCESS:
      return {
        loading: false,
        admins: { ...state, updatedUser: action.payload },
      }
    case ADMIN_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminDeleteuserReducer = (state = { deletedUser: {} }, action) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUEST:
      return { loading: true }
    case ADMIN_DELETE_USER_SUCCESS:
      return {
        loading: false,
        admins: { ...state, deletedUser: action.payload },
      }
    case ADMIN_DELETE_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminOrderListReducer = (state = { paidOrders: [] }, action) => {
  switch (action.type) {
    case ADMIN_ORDERS_LIST_REQUEST:
      return { loading: true }
    case ADMIN_ORDERS_LIST_SUCCESS:
      return {
        loading: false,
        paidOrders: action.payload,
      }
    case ADMIN_ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminShippingUpdateReducer = (
  state = { shippingUpdate: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_SHIPPING_UPDATE_REQUEST:
      return { loading: true }
    case ADMIN_SHIPPING_UPDATE_SUCCESS:
      return {
        loading: false,
        shippingUpdate: action.payload,
      }
    case ADMIN_SHIPPING_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminDeliveredUpdateReducer = (
  state = { delivered: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_DELIVERED_UPDATE_REQUEST:
      return { loading: true }
    case ADMIN_DELIVERED_UPDATE_SUCCESS:
      return {
        loading: false,
        delivered: action.payload,
      }
    case ADMIN_DELIVERED_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reducerProductUpdate = (
  state = { updatedProduct: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        updatedProduct: action.payload,
      }
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reducerProductDelete = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        deletedProduct: action.payload,
      }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
