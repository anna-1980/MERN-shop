import { useEffect} from 'react';
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import   {useDispatch, useSelector}  from 'react-redux';
import Message from '../components/Message.js';
import CheckoutSteps from './CheckoutSteps.js';
// import { saveShippingAddress } from '../actions/cartActions.js';
import { createOrder } from '../actions/orderActions.js';


const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate(); 
    const cart = useSelector(state => state.cart)
    const userLogin = useSelector( state => state.userLogin);
    const { userInfo } = userLogin;
    // console.log(cart.cartItems)
    const { shippingAddress }= cart; 
    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;
    // console.log(`id missing from ORDER ${order}`)
    // make sure 2 decimal places are showign at all times
   const addDecimals = (num) => {
       return (Math.round(num *100)/ 100).toFixed(2)
    }

    console.log(userInfo)

    //calculate Prices:
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 50 ? 0 : 50) ;
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = addDecimals((Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2));
   
    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`);
            // console.log(`from placeOrderScreen, should be UserId ${order.user}`)
            console.log(`from placeOrderScreen, should be Address ${Object.values(order)}`)
        }
      // eslint-disable-next-line
    }, [  success ]);
 
    
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            // shippingAddress: { 
            //     address: 'cart.shippingAddress.address',
            //     city:  'cart.shippingAddress.city',
            //     postalCode: 'cart.shippingAddress.postalCode',
            //     country: 'cart.shippingAddress.country',
            //  },
            paymentMethod: cart.paymentMethod.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

  return (
   <>
   <CheckoutSteps step1 step2 step3 step4/>
   <Row>
       <Col md={8} className="m-auto">
           <ListGroup variant='flush'>
               <ListGroup.Item>
               <h2>Shipping to: </h2>
                   <br />
                    <h5>Name:&#160;{userInfo.name}</h5>
                    <br />
                    <h5>Email:<a href={`mailto: `}>&#160;{userInfo.email}</a></h5>
                    <br />
                    <h5>Address:&#160;
                        <br />
                       {cart.shippingAddress.address},&#160;
                       {cart.shippingAddress.city},&#160;
                       {cart.shippingAddress.postalCode},&#160;
                       {cart.shippingAddress.country} 
                    </h5>
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
                            <Col>$ {cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>$ {cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>$ {cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Price:</Col>
                            <Col>$ {cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                     
                            <Button 
                            type='button'
                            className='btn=block'
                            disabled={cart.cartItems === 0}
                            onClick={placeOrderHandler}>Place Order</Button>
                     
                </ListGroup>
            </Card>
        </Col>
   </Row>
   </>
  )
}

export default PlaceOrderScreen