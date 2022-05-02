import {useEffect, useState} from 'react';
import Product from '../Product';
import {Row, Col} from 'react-bootstrap';
// import axios from 'axios';
// import products from '../../products'
import { useDispatch, useSelector} from 'react-redux';
import  { listProducts } from '../../actions/ProductActions.js'; //you fire it off in useEffects

const HomeScreen = () => {
  // const [products, setProducts = useState([])

  //to muse Dispatch we need to declare a var and set it to useDispatch
  const dispatch = useDispatch();

  const productList = useSelector( state => state.productList )  //get the piece of state the way you called it in the STORE: const reducer = combineReducers({ productList: productListReducer,
  const { loading, error, products} = productList //destructures parts of that state that could be sent down, you jut pull it from the state here
  
  
  useEffect(() => {

    dispatch(listProducts())
  
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
      <h2 >Loading...</h2>   //is it loading?
      ) : error ? (          // else, if there is an error we show that error
      <h3>{error}</h3>
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