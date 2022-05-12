import { useEffect } from "react";
import {Link, useParams, useNavigate, useLocation, Route} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import Message from "../Message.js";
import { addToCart, removeFromCart } from "../../actions/cartActions.js";



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
    
    const removeFromCartHandler = (id) => {
      // console.log("remove from cart function");
    dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
      navigate(`/login?redirect=shipping`);
    }

    const continueShoppingHandler = () => {
      navigate(`/`);
    }
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
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 
        ? (<Message>
          You have no items in your Cart
          <br></br>
         <Link to='/'> Go Back</Link>
            </Message>)
        : (
          <ListGroup variant='flush'> 
          {cartItems.map( (item) => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded></Image> 
                {/* data comes from cartAction */}
                </Col>
                <Col md={4}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}
               {/* changing qty option , should update state */}
                  <Form.Control 
                  as='select' 
                  value={item.qty} 
                  onChange={(e)=> 
                      dispatch(addToCart(item.product, Number(e.target.value)))}
                      >
                    {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type='button' variant='light' onClick={
                    ()=> removeFromCartHandler(item.product)}       
                     ><i className="fas fa-trash"></i></Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
          </ListGroup>
        )
          }
      </Col>
      <Col md={4}>
          <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Subtotal (
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                    ) Items</h2>
                    ${
                      cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).
                      toFixed(2)
                    }
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button 
                  type="button" 
                  className="'btn-block" 
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}>Go to Checkout</Button>
                </ListGroup.Item>
            </ListGroup>
          </Card>
      </Col>

      </Row>
      <Row>
        <ListGroup.Item>
          <Button 
            type="button" 
            className="'btn-block"
            variant="flush"
            onClick={continueShoppingHandler} >
              Continue Shopping
            </Button>
        </ListGroup.Item>
      </Row>
 
    </>
  )
}

export default CartScreen