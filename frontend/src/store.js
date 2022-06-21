import {legacy_createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer} from './reducers/productReducers' 
import { cartReducer } from './reducers/cartReducers.js';
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer,
    userListReducer, 
    userDeleteReducer
} from './reducers/userReducers.js';
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListMyReducer, 
 } from './reducers/orderReducers.js'

const reducer = combineReducers({
    productList: productListReducer,      // this will be the producsList reducer part of the STATE, you can get that piece of state in components by useSelector 
    productDetails: productDetailsReducer,  //breaking it up into single reducers helps to deal with bugs and fix errors
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderListMyReducer,
});

 

const userInfoFromStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo'))
: null ; // if no user data in local storage then return null

// check/bring in the shipping address from LocalStorage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
? JSON.parse(localStorage.getItem('shippingAddress'))
: {} ; 

// check/bring in payment Method from LocalStorage
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') 
? JSON.parse(localStorage.getItem('paymentMethod'))
: {} ; 

const cartItemsFromStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems'))
: [] ;

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: paymentMethodFromStorage},
    // cart: { cartItem: "cart loaded"}
    userLogin: { userInfo: userInfoFromStorage},
};

const middleware = [thunk];

const store = legacy_createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)));


export default store;