import axios from "axios"
import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DETAIL_FAIL,
  REVIEW_DETAIL_REQUEST,
  REVIEW_DETAIL_SUCCESS,
} from "../constants/reviewContants"

export const actionGetProductReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_DETAIL_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.get(`/api/review/${id}`, config)
    dispatch({ type: REVIEW_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: REVIEW_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const actionCreateProductReview =
  (reviewObj) => async (dispatch, getState) => {
    try {
      dispatch({ type: REVIEW_CREATE_REQUEST })
      const { userInfo } = getState().userLogin
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(`/api/review`, reviewObj, config)
      dispatch({ type: REVIEW_CREATE_SUCCESS, payload: data })
      dispatch(actionGetProductReview(reviewObj.product_id))
    } catch (error) {
      dispatch({
        type: REVIEW_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const actionDeleteProductReview =
  (review_id, product_id) => async (dispatch, getState) => {
    try {
      dispatch({ type: REVIEW_DELETE_REQUEST })
      const { userInfo } = getState().userLogin
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.delete(`/api/review/${review_id}`, config)
      dispatch({ type: REVIEW_DELETE_SUCCESS, payload: data })
      dispatch(actionGetProductReview(product_id))
    } catch (error) {
      dispatch({
        type: REVIEW_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
