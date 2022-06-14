import { useEffect} from 'react';
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
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
    const dispatch = useDispatch();
    let navigate = useNavigate(); 
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, success, error, loading } = orderDetails;
    // console.log(`id missing PARAMS for ID ${params.id}`)
    console.log(`OrderScreen -  ${order}`)
 
    
    useEffect(() => {
         dispatch(getOrderDetails(orderId))
      
    }, [   ]);

  return  loading ? <Loader /> 
  : error ? <Message variant='danger'>{error}</Message> 
  :  <>
  <h1>Order  {order._id}</h1>
  <Row>
       <Col md={8} className="m-auto">
           <ListGroup variant='flush'>
               <ListGroup.Item>
                   <h2>Shipping Address: </h2>
                    
                    <p>
                       {order.shippingAddress.address},&#160;
                       {order.shippingAddress.city},&#160;
                       {order.shippingAddress.postalCode},&#160;
                       {order.shippingAddress.country} 
                   </p>
               </ListGroup.Item>
               <ListGroup.Item>
                   <h2>Payment Method</h2>
                   <strong>{order.paymentMethod} 
                   </strong>
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
                            <Col>{order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>{order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>{order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Price:</Col>
                            <Col>{order.totalPrice}</Col>
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