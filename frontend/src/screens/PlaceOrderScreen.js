import {useState} from 'react';
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import   {useDispatch, useSelector}  from 'react-redux';
import Message from '../components/Message.js';
import CheckoutSteps from './CheckoutSteps.js';
import { saveShippingAddress } from '../actions/cartActions.js';

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)
    // console.log(cart.cartItems)

    // make sure 2 decimal places are showign at all times
   const addDecimals = (num) => {
       return (Math.round(num *100)/ 100).toFixed(2)
   }
    //calculate Prices:
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 50 ? 0 : 50) 
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.TotalPrice = addDecimals((Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2))

    const placeOrderHandler = () => {
        console.log('you have placed the order')
    }

  return (
   <>
   <CheckoutSteps step1 step2 step3 step4/>
   <Row>
       <Col md={8} className="m-auto">
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
                        {
                        cart.cartItems.map((item, index) => ( 
                            <ListGroup.Item key={index}>
                                <Row >
                                    <Col md={2}>
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
                                    <Col md={4}>
                                        
                        {/* calculate the total of the order */}
                                        
                                        {item.qty} x {item.price} =  {(item.qty * item.price).toFixed(2)} 

                                    </Col>
                                 
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}  
               </ListGroup.Item>
           </ListGroup>
       </Col>
       <Col md={4}>
            <Card md={4} sm={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>{cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>{cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>{cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Price:</Col>
                            <Col>{cart.TotalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                            <Button 
                            type='button'
                            className='btn=block'
                            disabled={cart.cartItems ===0}
                            onClick={placeOrderHandler}>Place Order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
   </Row>
   </>
  )
}

export default PlaceOrderScreen