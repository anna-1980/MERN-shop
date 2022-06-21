// reducer for a product list
import { PRODUCT_LIST_REQUEST,
         PRODUCT_LIST_SUCCESS,
         PRODUCT_LIST_FAIL,
         PRODUCT_DETAILS_REQUEST,
         PRODUCT_DETAILS_SUCCESS,
         PRODUCT_DETAILS_FAIL,
         PRODUCT_DELETE_REQUEST,
         PRODUCT_DELETE_SUCCESS,
         PRODUCT_DELETE_FAIL,
        } from '../constants/productConstants.js'

export const productListReducer = (state = { products: []}, action) => {

    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return{ loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload}
        default:
        return state  //the initial state state = { products: []}
    }

} 

export const productDetailsReducer = (
    state = { product: {reviews: []}}, 
    action) => {

    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return{ loading: false, product: action.payload} //make sure it is SINGULAR one PRODUCT
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        default:
        return state  //the initial state state = { products: []}
    }

} 
export const productDeleteReducer = (
    state = {}, 
    action) => {

    switch(action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true  }
        case PRODUCT_DELETE_SUCCESS:
            return{ loading: false, success: true} //make sure it is SINGULAR one PRODUCT
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload}
        default:
        return state  //the initial state state = { products: []}
    }

} 
// reducer takes 2 things, the initial STATE and an ACTION
//when you create an ACTION reducer you gonna dispatch action to this reducer
//ACTION might also have a payload with the data we fetched formt eh server
//initial state for the products is an empty array: state = { products: []}
// then we eveluate the type that is in the action object so we use switch for that
// 3 types of actions 1) product list request - when we make fetch request 2) product List sucess when we get sucessful response and we get the data 3) fails - sent an error throught the state
//we gonna fill the product state with that payload : products: action.payload  
//the switch/case cases are usually put in a constants variable bacause they should not change new file in src = constants 