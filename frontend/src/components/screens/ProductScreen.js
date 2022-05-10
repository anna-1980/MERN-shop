import {useEffect, useState} from 'react';
 
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import {useParams, useNavigate} from 'react-router-dom';
// import axios from 'axios';
import Rating from '../Rating';
import Message from '../Message.js';
import Loader from '../Loader.js';
import { useDispatch, useSelector} from 'react-redux';
import { listProductDetails } from '../../actions/ProductActions.js'
 

const ProductScreen = () => {
  // const [product, setProduct] = useState({});
const [qtn, setQtn]= useState(0);
const  dispatch = useDispatch();
const productDetails = useSelector(state => state.productDetails)
const { loading,  error, product} = productDetails 
let params = useParams();
let navigate = useNavigate();
console.log(params)

  useEffect(() => {
   
    dispatch(listProductDetails(params.id))
   
  }, [dispatch])

  const addToCartHandler = () => {
  
    // console.log(navigate);
    navigate(`/cart/${params.id}?qty=${qtn}`);
    // history.push(`/cart/${params.id}?qty=${qty}`)
     
  }

  
  // const product = products.find((p) => p._id === params.id)
  // console.log(product)
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
    (
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

            <ListGroup.Item>
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
    )
    }

    </>
  )
}

export default ProductScreen