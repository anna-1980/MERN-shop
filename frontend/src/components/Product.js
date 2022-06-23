import React from 'react';
import { Card, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import   { useSelector}  from 'react-redux';
import Rating from './Rating';


const Product = ({product}) => {
  let navigate = useNavigate();

  const userLogin = useSelector( state => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userLogin)
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top'/> 
        </Link>
        <Card.Body>
        <Link to={`/product/${product._id}`}>
        <Card.Title  as='div' ><strong>{product.name}</strong></Card.Title> 
        </Link>
        <Card.Text as="div">
          <Rating 
          value={product.rating} 
          text={`${product.numReviews} reviews`}
           />
        </Card.Text>
        <Card.Text as='h3'>$ {product.price}</Card.Text>
        </Card.Body>
        {userInfo && userInfo.isAdmin && (
          <LinkContainer md={4} className="ms-auto d-grid gap-2" to={`/admin/product/${product._id}/edit`}>
            <Button variant='light' className='p-1 m-0'  >
               <i className='fas fa-edit'></i>
              </Button>  
          </LinkContainer>
        )}
   
    </Card>
  )
}



export default Product;