import {legacy_createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer} from './reducers/productReducers' 

const reducer = combineReducers({
    productList: productListReducer,      // this will be the producsList reducer part of the STATE, you can get that piece of state in components by useSelector 
    productDetails: productDetailsReducer,  //breaking it up into single reducers helps to deal with bugs and fix errors
});

const initialState = {};

const middleware = [thunk];

const store = legacy_createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)));


export default store;