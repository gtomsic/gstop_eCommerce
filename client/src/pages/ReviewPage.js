import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import Ratings from "../components/Ratings"
import ModalDialog from "../components/ModalDialog"

import {
  actionCreateProductReview,
  actionDeleteProductReview,
  actionGetProductReview,
} from "../actions/actionReviews"

import Loader from "../components/Loader"
import Message from "../components/Message"

const ReviewPage = () => {
  const [isEdit, setIsEdit] = React.useState(false)
  const [isDelete, setIsDelete] = React.useState(false)
  const [editRating, setEditRating] = React.useState(1)
  const [editComment, setEditComment] = React.useState("")
  const [rating, setRating] = React.useState(1)
  const [comment, setComment] = React.useState("")
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const { loading, error, reviews } = useSelector(
    (state) => state.productReviews
  )
  const { userInfo } = useSelector((state) => state.userLogin)
  React.useEffect(() => {
    dispatch(actionGetProductReview(params.id))
  }, [params])

  const submitReviewHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const data = {
      product_id: reviews.id,
      name: `${userInfo.first_name} ${userInfo.last_name}`,
      user_id: userInfo.id,
      rating: Number(rating),
      comment,
    }
    dispatch(actionCreateProductReview(data))
    setRating(1)
    setComment("")
  }

  const submitDeleteHandler = (id) => {
    dispatch(actionDeleteProductReview(id, reviews.id))
  }

  const submitEditHandler = () => {
    console.log({ editRating, editComment })
    setIsEdit(false)
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 bg-none  hover:bg-gray-800 text-white hover:text-orange-300 duration-300"
      >
        <i className="fa-solid fa-angle-left"></i>
        <span className="ml-2">Back</span>
      </button>
      {loading && <Loader text="Loading product and reviews" />}{" "}
      {error && <Message color="orangeRed" text={error} />}
      {reviews && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-gray-800 bg-opacity-50">
          <div className="p-3  ">
            <div className="p-3 text-xl text-orange-300 bg-gray-700 text-center">
              {" "}
              Product{" "}
            </div>
            <div className="grid grid-cols-1 gap-2">
              <img src={reviews.image} alt={reviews.name} className="w-full" />
              <div className="bg-gray-700 text-orange-300 p-3 text-center">
                Price $ {reviews.price}
              </div>
              <div className="bg-gray-700 text-orange-300 p-3 text-center">
                <Ratings
                  rating={
                    reviews.Reviews &&
                    reviews.Reviews.reduce(
                      (acc, curr) =>
                        acc + curr.rating / Number(reviews.Reviews.length),
                      0
                    ).toFixed(1)
                  }
                  text={`of ${
                    reviews.Reviews && reviews.Reviews.length
                  } reviews`}
                />
              </div>
              <div className="p-3">
                <h1 className="text-xl">Description</h1>
                <p>{reviews.description}</p>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="p-3 text-xl text-orange-300 bg-gray-700 text-center">
              {" "}
              Reviews{" "}
            </div>
            <div className="flex flex-col">
              {userInfo && userInfo.id && (
                <>
                  <label className="block mt-4">
                    <span className="text-white">Product Rate</span>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="form-select mt-1 py-2 px-3 block w-full bg-gray-200 rounded-md text-gray-800"
                    >
                      {[...Array(5).keys()].map((num) => {
                        return (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded-md p-3 text-gray-700 mt-4"
                    name="comments"
                    id="comments"
                    rows="7"
                    placeholder="Write your comment here..."
                  ></textarea>
                  <button
                    onClick={submitReviewHandler}
                    className="p-3 mt-4 rounded-md bg-orange-300 hover:bg-orange-500 duration-300 text-white"
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
            <div className="my-4 grid gap-2">
              {reviews.Reviews &&
                reviews.Reviews.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-md bg-gray-800 text-white"
                    >
                      <div className="flex justify-between">
                        <span> {item.name}</span>
                        {userInfo && item.user_id === userInfo.id && (
                          <div className="grid grid-cols-2">
                            <span
                              onClick={() => {
                                setIsEdit(true)
                                setEditRating(Number(item.rating))
                                setEditComment(item.comment)
                              }}
                              className="py-1 px-4 cursor-pointer hover:bg-orange-300 bg-opacity-50 duration-300 text-orange-500"
                            >
                              <i className="fa-solid fa-file-pen"></i>
                            </span>
                            <span
                              onClick={() => submitDeleteHandler(item.id)}
                              className="py-1 px-4 cursor-pointer hover:bg-red-400 bg-opacity-50 duration-300 text-red-500"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </span>
                          </div>
                        )}
                      </div>
                      <Ratings rating={Number(item.rating)} text={`ratings`} />
                      <div className="py-5">{item.comment}</div>
                      <div className="mt-5 text-gray-500">
                        {moment(item.createdAt).fromNow()}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )}
      {/* DIALOG FOR EDIT RATING */}
      <ModalDialog isOpen={isEdit} closeModal={() => setIsEdit(false)}>
        <div className="p-3 bg-gray-800 text-orange-300">Editing Rating</div>
        <div>
          {userInfo && userInfo.id && (
            <>
              <label className="block mt-4">
                <span className="text-white">Product Rate</span>
                <select
                  value={editRating}
                  onChange={(e) => setEditRating(e.target.value)}
                  className="form-select mt-1 py-2 px-3 block w-full bg-gray-200 rounded-md text-gray-800"
                >
                  {[...Array(5).keys()].map((num) => {
                    return (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    )
                  })}
                </select>
              </label>
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="w-full rounded-md p-3 bg-gray-200 text-gray-700 mt-4"
                name="comments"
                id="comments"
                rows="7"
                placeholder="Write your comment here..."
              ></textarea>
              <button
                onClick={submitEditHandler}
                className="p-3 mt-4 rounded-md w-full bg-blue-300 hover:bg-blue-500 duration-300 text-white"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </ModalDialog>
    </div>
  )
}

export default ReviewPage
