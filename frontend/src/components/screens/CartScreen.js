import { useEffect } from "react";
import {Link, useParams, useNavigate, useLocation, Route} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import Message from "../Message.js";
import { addToCart } from "../../actions/cartActions.js";



const CartScreen = () => {
    console.log('connected to CartScreen')
    let params = useParams();
    let navigate = useNavigate();
    let location = useLocation();
    
    // const productId = 'somethingurl';
    const productId = location.pathname ? location.pathname.split('/')[2] : 1;
    const qty = location.search ? location.search.split('=')[1] : 1;
 
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart ; //pull cartItems from state(cart)
    


    useEffect(() => {
      console.log("check content");
      // console.log(location.search);
      // console.log(productId);
      // console.log(location.pathname);
      // console.log(location.search.split('='))
      // console.log( cartItems);
      console.log(qty)

      if(productId){
        dispatch(addToCart(productId, qty))  //you get it from the url
      }

       
    }, [dispatch, productId, qty])


  return (
    <>
    <div>Hello CART</div>
 
    </>
  )
}

export default CartScreen