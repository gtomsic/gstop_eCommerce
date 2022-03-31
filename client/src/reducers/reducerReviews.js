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

export const reducerGetProductReview = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DETAIL_REQUEST:
      return { ...state, loading: true }
    case REVIEW_DETAIL_SUCCESS:
      return { loading: false, reviews: action.payload }
    case REVIEW_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reducerCreateProductReview = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return { ...state, loading: true }
    case REVIEW_CREATE_SUCCESS:
      return { loading: false, createdReview: action.payload }
    case REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reducerDeleteProductReview = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DELETE_REQUEST:
      return { ...state, loading: true }
    case REVIEW_DELETE_SUCCESS:
      return { loading: false, deletedReview: action.payload }
    case REVIEW_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
