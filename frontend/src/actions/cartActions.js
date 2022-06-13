import axios from 'axios';  // because we need to make a request the the API to get the data for that particular product
import {CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants.js';

export const addToCart = (id, qty) => async (dispatch, getState) => {
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

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
//it is gonna take the Form data from the ShippingScreen
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}