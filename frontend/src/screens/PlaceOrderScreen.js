import {useState} from 'react';
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import   {useDispatch, useSelector}  from 'react-redux';
import Message from '../components/Message.js';
import CheckoutSteps from './CheckoutSteps.js';
import { saveShippingAddress } from '../actions/cartActions.js';

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)
    console.log(cart.cartItems)
  return (
   <>
   <CheckoutSteps step1 step2 step3 step4/>
   <Row>
       <Col md={8}>
           <ListGroup variant='flush'>
               <ListGroup.Item>
                   <h2>Shipping</h2>
                   <p>
                       <strong>Address:</strong>
                       {cart.shippingAddress.address}, 
                       {cart.shippingAddress.city},
                       {cart.shippingAddress.postalCode},
                       {cart.shippingAddress.country}
                   </p>
               </ListGroup.Item>
               <ListGroup.Item>
                   <h2>Payment Method</h2>
                   <strong>Method: 
                       {cart.paymentMethod.paymentMethod}
                   </strong>
               </ListGroup.Item>
               <ListGroup.Item>
                   <h2>Order Items</h2>
                    {cart.cartItems.lenght === 0 ? 
                    <Message> Your Cart Is Empty</Message>
                : (
                    <ListGroup variant ="flush">
                        {cart.cartItems.map((item, index) => ( 
                            <ListGroup.Item key={index}>
                                <Row md={1}>
                                    <Col>
                                        <Image src={item.image} alt={item.name}
                                        fluid
                                        rouded
                                        ></Image>
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}  
               </ListGroup.Item>
           </ListGroup>
       </Col>
   </Row>
   </>
  )
}

export default PlaceOrderScreen