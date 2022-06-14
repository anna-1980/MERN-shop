import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
 } from '../constants/cartConstants.js'

export const cartReducer = (state = { cartItems:[], shippingAddress: {},  paymentMethod:{}}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
          const item = action.payload //to check if there is already an item in the cart
          
          const existItem = state.cartItems.find( (x) => x.product === item.product) //that checks if product/items exist and it will have item or false
        
          if(existItem) {
             return{
                 ...state,   //if item does exist
                 cartItems: state.cartItems.map((x) => 
                 x.product === existItem.product ? item : x
                 ), // for each x, if x.product id = existItem.product which is the id we will return itterration 
            } 
          }else {
              return {
                  ...state, 
                  cartItems:[...state.cartItems, item] //if item doesnt exist
              }
          }
          case CART_REMOVE_ITEM:
            return {
                ...state, 
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
          case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state, 
                shippingAddress: action.payload,  
                // the data passed in from the form in ShippingScreen
            }
          case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state, 
                paymentMethod: action.payload,  // the data passed in from the form in ShippingScreen
            }

          default: 
            return state
    }
}