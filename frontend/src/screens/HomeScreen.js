import {useEffect} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {useParams, useNavigate} from 'react-router-dom';
import Product from '../components/Product';
// import axios from 'axios';
// import products from '../../products'
import { useDispatch, useSelector} from 'react-redux';
import  { listProducts } from '../actions/ProductActions.js'; //you fire it off in useEffects

import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import Pagination from '../components/Pagination';

const HomeScreen = () => {
const navigate = useNavigate();
//to use Dispatch we need to declare a var and set it to useDispatch
const dispatch = useDispatch();
//-------for the search functionality--------------------------------//
  const params = useParams();
  const pageNumber = params.pageNumber;


  const productList = useSelector( state => state.productList )  //grabb the piece of state the way you called it in the STORE: const reducer = combineReducers({ productList: productListReducer,
  const { loading, error, products, currentPageNumber, pages} = productList //destructures parts of that state that could be sent down, you jut pull it from the state here
  
  const userLogin = useSelector( state => state.userLogin); 
  const {userInfo} = userLogin;
  
  useEffect(() => {
//-------if search keyword enteresd, see productActions--------------//
    dispatch(listProducts(params.keyword , pageNumber)) //fire the action to get the products, through the REDUCER down to STATE
    // console.log(paramsKeyword.keyword)
  }, [dispatch, params.keyword, pageNumber])
  // console.log(userInfo.name);

//-------Handlers----------------------------------------------------//
const continueShoppingHandler = () => {
  navigate(`/`);
}

  return (
    <> 
      <h1>Latest product</h1>
{/* //-------Display loggen in user name-----------------------------// */}    
      {  userInfo  ? (
         
         <Col sx={6} md={6}>
         {/* <h4>Logged In as: {userInfo.name}</h4> */}
         <h4>Logged In as: {userInfo.name} </h4>
           
         </Col>
      )
      :
     ( <Col sx={6} md={6}>
      <h4>Welcome stranger</h4>
      </Col>)
       }
{/* //-------show go back button after search complete----------------// */}
{ params.keyword && (
         <Row>
            <Button 
              type="button" 
              className="'btn-block ml-auto mb-4"
              variant="outline-dark"
              onClick={continueShoppingHandler} >
                Go Back
              </Button>
         </Row>
      )}
{/* //-------display available products--------------------------------// */}
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

     { products.length === 0 && <Message variant='warning'>Sorry, no product match</Message> }
     <Pagination currentPageNumber={currentPageNumber} pages={pages} />
    </>
  )
}

export default HomeScreen;