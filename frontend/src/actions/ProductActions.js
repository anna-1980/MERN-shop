import { 
    PRODUCT_LIST_REQUEST, //action
    PRODUCT_LIST_SUCCESS, //action
    PRODUCT_LIST_FAIL    //action
   } from '../constants/productConstants.js';
import axios from 'axios';

//action creator function, actions are the : case PRODUCT_LIST_REQUEST: return { loading: true, products: [] }
// actions are being dispatched to a reducer          

   export const listProducts = () => async (dispatch) => {      // what thinks allows to do is add a function witho=in a function like async so:
       //the above function/action has to be fired in the component to work in HOME-Screen
        try {
            dispatch({type:PRODUCT_LIST_REQUEST })

            const { data } = await axios.get('/api/product') //this should give us the data
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

   // what this action is gonna do is what we did in useEffect, we fetched from /API/products and we mapped throgght them