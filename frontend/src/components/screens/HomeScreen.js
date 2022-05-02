import {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../Product';
// import axios from 'axios';
// import products from '../../products'
import { useDispatch, useSelector} from 'react-redux';
import  { listProducts } from '../../actions/ProductActions.js'; //you fire it off in useEffects

import Message from '../Message.js';
import Loader from '../Loader.js';

const HomeScreen = () => {
  // const [products, setProducts = useState([])

  //to muse Dispatch we need to declare a var and set it to useDispatch
  const dispatch = useDispatch();

  const productList = useSelector( state => state.productList )  //grabb the piece of state the way you called it in the STORE: const reducer = combineReducers({ productList: productListReducer,
  const { loading, error, products} = productList //destructures parts of that state that could be sent down, you jut pull it from the state here
  
  
  useEffect(() => {

    dispatch(listProducts()) //fire the action to get the products, through the REDUCER down to STATE
  
    // const fetchProducts = async () => {
    //   const {data} = await axios.get('/api/products')
    //   setProducts(data)
    // }
    // fetchProducts()
  }, [dispatch])

 

  return (
    <> 
      <h1>Latest product</h1>
      {loading ? (
      <Loader />   //is it loading?
      ) : error ? (          // else, if there is an error we show that error
      <Message
      variant='danger'
      >{error}</Message>
      ) : (
        <Row>
        {products.map( product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>

            <Product  product={product}/>

          </Col>
        ))}

      </Row>
      )               
       }
  

    </>
  )
}

export default HomeScreen;