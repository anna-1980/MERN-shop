import { 
    PRODUCT_LIST_REQUEST, //action
    PRODUCT_LIST_SUCCESS, //action
    PRODUCT_LIST_FAIL,    //action
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
   } from '../constants/productConstants.js';
import axios from 'axios';

//action creator function, actions are the : case PRODUCT_LIST_REQUEST: return { loading: true, products: [] }
// actions are being dispatched to a reducer          

   export const listProducts = () => async (dispatch) => {      // what thinks allows to do is add a function witho=in a function like async so:
       //the above function/action has to be fired in the component to work in HOME-Screen
        try {
            dispatch({type:PRODUCT_LIST_REQUEST })

            const { data } = await axios.get('/api/products') //this should give us the data
            //now
            dispatch ({
                type: PRODUCT_LIST_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: 
                 error.response && error.response.data.message
                 ? error.response.data.message
                 : error.message,
            })
        }
   
    };

    export const listProductDetails = (id) => async (dispatch) => {      // what thinks allows to do is add a function witho=in a function like async so:
        //the above function/action has to be fired in the component to work in HOME-Screen
         try {
             dispatch({type:PRODUCT_DETAILS_REQUEST })
 
             const { data } = await axios.get(`/api/products/${id}`) //this should give us the data
             //now
             dispatch ({
                 type: PRODUCT_DETAILS_SUCCESS,
                 payload: data
             })
         } catch (error) {
             dispatch({
                 type: PRODUCT_DETAILS_FAIL,
                 payload: 
                  error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
             })
         }
    
     };
   // what this action is gonna do is what we did in useEffect, we fetched from /API/products and we mapped throgght them

   export const deleteProduct = (id) => async (dispatch, getState) => {        
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })
//-------destructure from useState  -> userLogin -> userInfo which is in userLogin-------//
        const { userLogin: { userInfo }} = getState(); 
        const config = {
//------- pass in the authorization -------//
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            },
        }
        await axios.delete(
            `/api/products/${id}`, config) //the id comes from the deleteProduct function parameter

//-------paasing in the data which are the particulat user's orders-------/
        dispatch ({
            type:  PRODUCT_DELETE_SUCCESS, 
        })

    } catch (error){
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: 
             error.response && error.response.data.message
             ? error.response.data.message
             : error.message,
        })
    }
} 

    export const createNewProduct = () => async (dispatch, getState) => {        
        try{
            dispatch({
                type: PRODUCT_CREATE_REQUEST,
            })
    //-------destructure from useState  -> userLogin -> userInfo which is in userLogin-------//
            const { userLogin: { userInfo }} = getState(); 
            const config = {
    //------- pass in the authorization -------//
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }}
    const {data} = await axios.post(`/api/products/`, {}, config)  // second argument is empty object because we make post req. but not sending any data

    //-------paasing in the data which are the particulat user's orders-------/
            dispatch ({
                type:  PRODUCT_CREATE_SUCCESS, 
                payload: data   //the newly creatred product
            })

        } catch (error){
            dispatch({
                type: PRODUCT_CREATE_FAIL,
                payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
        }
    } 


    export const updateProduct = (product) => async (dispatch, getState) => {        
        try{
            dispatch({
                type: PRODUCT_UPDATE_REQUEST,
            })
    //-------destructure from useState  -> userLogin -> userInfo which is in userLogin-------//
            const { userLogin: { userInfo }} = getState(); 
            const config = {
    //------- pass in the authorization -------//
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${userInfo.token}`
                }}
    const {data} = await axios.put(`/api/products/${product._id}`, product, config)  // second argument is empty object because we make post req. but not sending any data

    //-------paasing in the data which are the particulat user's orders-------/
            dispatch ({
                type:  PRODUCT_UPDATE_SUCCESS, 
                payload: data    
            })

        } catch (error){
            dispatch({
                type: PRODUCT_UPDATE_FAIL,
                payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
        }
    } 

    export const createProductReview = (productId, review) => async (dispatch, getState) => {        
        try{
            dispatch({
                type: PRODUCT_CREATE_REVIEW_REQUEST,
            })
    //-------destructure from useState  -> userLogin -> userInfo which is in userLogin-------//
            const { userLogin: { userInfo }} = getState(); 
            const config = {
    //------- pass in the authorization -------//
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${userInfo.token}`
                }}

        await axios.post(`/api/products/${productId}/reviews`, review, config)  // second argument is empty object because we make post req. but not sending any data

            dispatch ({
                type:  PRODUCT_CREATE_REVIEW_SUCCESS, 
            })

        } catch (error){
            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAIL,
                payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            })
        }
    } 