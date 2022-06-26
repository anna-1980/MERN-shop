import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import {useParams, useNavigate} from 'react-router-dom';
import Rating from '../components/Rating';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { useDispatch, useSelector} from 'react-redux';
import { listProductDetails, createProductReview } from '../actions/ProductActions.js';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
 
 

const ProductScreen = () => {
  let params = useParams();
  let navigate = useNavigate();
  const  dispatch = useDispatch();

//-------state for local component-------//
  const [qtn, setQtn]= useState(1);
  const [rating, setRating]= useState(0);
  const [userComment, setUserComment]= useState('');

//-------Bring from redux state-------//
const productDetails = useSelector(state => state.productDetails)
const { loading,  error, product } = productDetails 

const userLogin = useSelector(state => state.userLogin);
const {userInfo} = userLogin;

const productReview = useSelector(state => state.productReview );
const {error: errorProductReview, success: successProductReview } = productReview ;

//-------Handlers-------//
  const submitHandler = (e) =>{
   
    e.preventDefault()
    dispatch(createProductReview(params.id, {
    //-----comming in from the component state-----//
      comment: userComment,
      rating, 
     }
     ))
     console.log(userComment)
  }  
  const addToCartHandler = () => {
    // console.log(navigate);
    navigate(`/cart/${params.id}?qty=${qtn}`);
    // history.push(`/cart/${params.id}?qty=${qty}`)
  }
  useEffect(() => {
    
    if(successProductReview){
      alert('Review Submitted!')
      setRating(0)
      setUserComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(params.id))
    // console.log(`object ${Object.values(product)}`)
    // console.log(`problem getting reviews displayed ${product.createdAt}`)
     
    // console.log(params);
  }, [dispatch, successProductReview   ])


  
  // const product = products.find((p) => p._id === params.id)
  // console.log(product)
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
    (
      <>
          <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Price: €{product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Price:
                    </Col>
                    <Col>
                      <strong>€ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      Status:
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                      <Form.Control as='select' value={qtn} onChange={(e)=> 
                      setQtn(e.target.value)}>
                    {   [...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className='row justify-content-md-center'>
                  <Button 
                  onClick={addToCartHandler}
                  className='btn-block' 
                  type='button'
                  disabled={product.countInStock === 0}
                  >Add to Cart</Button>
                </ListGroup.Item>

              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message variant='warning'>No reviews yet</Message>}
          <ListGroup variant="flush">
              {product.reviews.map((rev) => ( 
                // console.log(rev)
                <ListGroup.Item key = {rev._id}>
                  <strong>{rev.name}</strong>
                  <Rating 
                  value={rev.rating}
                  
                  />
                  <p>{rev.createdAt.substring(0, 10)}</p>
                  <p>Review Comment:</p>
                  <p>{rev.comment}</p>
                </ListGroup.Item> 
               ))
              }
            <ListGroup.Item>
              <h2>Write a customer review</h2>
              {errorProductReview && (
                <Message variant='danger'>{errorProductReview}</Message>
              )}
              {userInfo ? 
              (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='rating' >
                    <Form.Label>Rating</Form.Label>
                    <Form.Control 
                    as='select' 
                    value={rating}
                    onChange={ (e) => setRating(e.target.value)}>
                      <option value=''>Select...</option>     
                      <option value='1'>1 - Poor</option>     
                      <option value='2'>2 - Fair</option>     
                      <option value='3'>3 - Good</option>     
                      <option value='4'>4 - Very Good</option>     
                      <option value='5'>5 - Outstanding</option>     
                    </Form.Control>
                  </Form.Group>
                  <Form.Group 
                  controlId='comment'>Comment</Form.Group>
                  <Form.Control
                  as='textarea'
                  row='3'
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  ></Form.Control>
                  <Button
                  type='submit'
                  variant='primary'>
                    Submit
                  </Button>
                </Form>
              ) 
              : <Message>Please <Link to='/login'>Sign in</Link> to write a review</Message>}
            </ListGroup.Item>
          </ListGroup>
          
          </Col>
        </Row>
      </>
    )}
    </>
  )
}

export default ProductScreen