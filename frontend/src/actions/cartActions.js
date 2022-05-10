import axios from 'axios';  // because we need to make a request the the API to get the data for that particular product
import {CART_ADD_ITEM} from '../constants/cartConstants.js';

export const addToCart = (id, qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch ({
        type: CART_ADD_ITEM, 
        payload: {
                product: data._id, 
                name: data.name, 
                image: data.image, 
                price: data.price, 
                countInStock: data.countInStock, 
                qty
        }
    })

    localStorage.setItem('cartTtems', JSON.stringify(getState().cart.cartItems))

}
