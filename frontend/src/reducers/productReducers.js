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
         PRODUCT_CREATE_REQUEST,
         PRODUCT_CREATE_SUCCESS,
         PRODUCT_CREATE_FAIL,
         PRODUCT_CREATE_RESET,
         PRODUCT_UPDATE_REQUEST,
         PRODUCT_UPDATE_SUCCESS,
         PRODUCT_UPDATE_FAIL,
         PRODUCT_UPDATE_RESET,
         PRODUCT_CREATE_REVIEW_REQUEST,
         PRODUCT_CREATE_REVIEW_SUCCESS,
         PRODUCT_CREATE_REVIEW_FAIL,
         PRODUCT_CREATE_REVIEW_RESET,
        } from '../constants/productConstants.js'

export const productListReducer = (state = { products: []}, action) => {

    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return{ 
        //---what is returned from the backend controller---//
                loading: false, 
                products: action.payload.products, 
                currentPageNumber: action.payload.currentPageNumber, 
                pages: action.payload.pages}
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
            return {  ...state, loading: true}
        case PRODUCT_DETAILS_SUCCESS:
            return{ loading: false, product: action.payload} //make sure it is SINGULAR one PRODUCT
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        default:
        return state  //the initial state state = { products: []}
    }

} 
export const productDeleteReducer = (state = {}, action) => {

    switch(action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true  }
        case PRODUCT_DELETE_SUCCESS:
            return{ loading: false, success: true} //make sure it is SINGULAR one PRODUCT
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload}
        default:
        return state  //the initial state state = { products: []}
    }} 

export const createNewProductReducer = (state = {}, action) => {

    switch(action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true  }
        case PRODUCT_CREATE_SUCCESS:
            return{ loading: false, success: true, product: action.payload} //make sure it is SINGULAR one PRODUCT
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return { }
        default:
        return state  //the initial state state = { products: []}
    }} 

export const productUpdateReducer = (state = {product:{}}, action) => {

    switch(action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true  }
        case PRODUCT_UPDATE_SUCCESS:
            return{ loading: false, success: true, product: action.payload} //make sure it is SINGULAR one PRODUCT
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload}
        case PRODUCT_UPDATE_RESET:
            return {product:{}}
        default:
        return state  //the initial state state = { products: []}
    }} 

export const productReviewCreateReducer = (state = {}, action) => {

    switch(action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true  }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return{ loading: false, success: true }  
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return {product:{}}
        default:
        return state  //the initial state state = { products: []}
    }} 
// reducer takes 2 things, the initial STATE and an ACTION
//when you create an ACTION reducer you gonna dispatch action to this reducer
//ACTION might also have a payload with the data we fetched formt eh server
//initial state for the products is an empty array: state = { products: []}
// then we eveluate the type that is in the action object so we use switch for that
// 3 types of actions 1) product list request - when we make fetch request 2) product List sucess when we get sucessful response and we get the data 3) fails - sent an error throught the state
//we gonna fill the product state with that payload : products: action.payload  
//the switch/case cases are usually put in a constants variable bacause they should not change new file in src = constants 