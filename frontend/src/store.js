import {legacy_createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer} from './reducers/productReducers' 
import { cartReducer } from './reducers/cartReducers.js';

const reducer = combineReducers({
    productList: productListReducer,      // this will be the producsList reducer part of the STATE, you can get that piece of state in components by useSelector 
    productDetails: productDetailsReducer,  //breaking it up into single reducers helps to deal with bugs and fix errors
    cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems'))
: [] ;

const initialState = {
    cart: { cartItems: cartItemsFromStorage}
    // cart: { cartItem: "cart loaded"}
};

const middleware = [thunk];

const store = legacy_createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)));


export default store;