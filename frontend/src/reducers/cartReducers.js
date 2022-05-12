import { CART_ADD_ITEM } from '../constants/cartConstants.js'

export const cartReducer = (state = { cartItems:[]}, action) => {
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

          default: 
            return state
    }
}