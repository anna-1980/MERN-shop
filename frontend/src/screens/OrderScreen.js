import { useEffect, useState} from 'react';
import axios from 'axios';
import {  Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import   {useDispatch, useSelector}  from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader';
// import { saveShippingAddress } from '../actions/cartActions.js';
import { getOrderDetails } from '../actions/orderActions.js';


const OrderScreen = ( ) => {
    let params = useParams();
    const orderId = params.id;
    // console.log(orderId);
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate(); 
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, success, error, loading } = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    //rename the existing var 
    const { success: successPay,  loading: loadingPay } = orderPay;
    // console.log(`id missing PARAMS for ID ${params.id}`)
    // console.log(`OrderScreen -  ${order}`)
 
    
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId} = await axios.get('/api/config/paypal')
            // console.log( clientId )
            const script = document.createElement('script') 
            script.type = 'text/javascript' 
            script.async = true 
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}` 
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        addPayPalScript()
        if(!order || successPay ){
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            if(!window.paypal){   //if the order isn't paid it will ass PayPal script
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
        //a check to ensure it is the most recent order is being display
        if(!order || order._id !== orderId){
            dispatch(getOrderDetails(orderId))
        }

    }, [order, orderId, successPay]);

  return  loading ? <Loader /> 
  : error ? <Message variant='danger'>{error}</Message> 
  :  <>
   
  <Row>
       <Col md={8} className="m-auto mt-4">
           <ListGroup variant='flush'>
               <ListGroup.Item>
                   <h5>Order number:&#160;{order._id} placed successfully</h5>
                   <br />
                   <h2>Shipping: </h2>
                 
                    <h5>Name:&#160;{order.user.name}</h5>
                    <br />
                    <h5>Email:<a href={`mailto: ${order.user.email}`}>&#160;{order.user.email}</a></h5>
                    <br />
                    <h5>Address:&#160;
                        <br />
                       {order.shippingAddress.address},&#160;
                       {order.shippingAddress.city},&#160;
                       {order.shippingAddress.postalCode},&#160;
                       {order.shippingAddress.country} 
                       {order.isDelivered 
                    ? <Message variant='success'>Delivered on&#160;{order.DeliveredAt} </Message>
                    : <Message variant="danger">Not Delivered</Message>}
                    </h5>
               </ListGroup.Item>
               <ListGroup.Item>
                   <p>
                   <h2>Payment Method</h2>
                   <strong>{order.paymentMethod}</strong>
                   </p>
                   {order.isPaid 
                    ? <Message variant='success'>Paid on&#160;{order.paidAt} </Message>
                    : <Message variant="danger">Not Paid</Message>}
               </ListGroup.Item>
               <ListGroup.Item>
                   <h2>Order Items</h2>
                    {order.orderItems.lenght === 0 ? 
                    <Message> Order Is Empty</Message>
                : (
                    <ListGroup variant ="flush">
                        {
                        order.orderItems.map((item, index) => ( 
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
                            <Col>$ {order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>$ {order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>$ {order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Price:</Col>
                            <Col>$ {order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                   
                    {/* <ListGroup.Item>
                            <Button 
                            type='button'
                            className='btn=block'
                            disabled={cart.cartItems === 0}
                            onClick={placeOrderHandler}>Place Order</Button>
                    </ListGroup.Item> */}
                </ListGroup>
            </Card>
        </Col>
   </Row>
  </>
}

export default OrderScreen