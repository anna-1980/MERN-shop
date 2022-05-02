import {legacy_createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer} from './reducers/productReducers' 

const reducer = combineReducers({
    productList: productListReducer,      // this will be the producsList reducer part of the STATE, you can get that piece of state in components by useSelector 
});

const initialState = {};

const middleware = [thunk];

const store = legacy_createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)));


export default store;