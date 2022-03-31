import {
  CART_ADD_ITEM,
  CART_EMPTY_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_MODE_OF_PAYMENT,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartContants"
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(
        (el) => el.product === item.product
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cart) =>
            cart.product === existItem.product ? item : cart
          ),
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_MODE_OF_PAYMENT:
      return {
        ...state,
        paymentMode: action.payload,
      }
    case CART_EMPTY_ITEM:
      return { ...state, cartItems: [] }
    default:
      return state
  }
}
