import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Row, Col, Image} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap'
import   {useDispatch, useSelector}  from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message.js';
import { listProducts, deleteProduct, createNewProduct } from '../actions/ProductActions.js';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants.js';

const ProductListScreen = () => {
    let navigate = useNavigate();
  const dispatch = useDispatch();

//------- bringing in state from reduc (from store.js with useSelector-------//

  const productList = useSelector( state => state.productList )  //grabb the piece of state the way you called it in the STORE: const reducer = combineReducers({ productList: productListReducer,
  const { loading, error, products} = productList //destructures parts of that state that could be sent down, you jut pull it from the state here 
 
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo} = userLogin;

  const productDelete = useSelector( state => state.productDelete )   
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

  const productCreateNew = useSelector( state => state.productCreateNew )   
  const { loading: loadingNewProduct, error: errorNewProduct, success: successNewProduct, product: createdNewProduct} = productCreateNew

//-------handlers-------//
  const deleteHandler = (id) => {
    if(window.confirm('Are you sure ? This action cannot be undone!')){
      dispatch(deleteProduct(id))  
    }
  }

  const createProductHandler = (product) => {
    dispatch(createNewProduct());
    console.log(productCreateNew)
  }
  // console.log(productCreateNew.product._id)

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET})

    if(!userInfo.isAdmin){
      navigate('/login');
    }
    if(successNewProduct){
      navigate(`/admin/product/${productCreateNew.product._id}/edit`);
    }else{
      dispatch(listProducts())
    }
  }, [dispatch, navigate, userInfo, successDelete, successNewProduct, createdNewProduct])

  return (
    <div>
        <Row className='align-items-center'>
            <Col >
            <h1>Products</h1>
            </Col>
            {/* <Col className='text-right' > */}
                <Button  className='my-3'  variant='success' onClick={createProductHandler}>
                   <i className='fas fa-plus'>	&nbsp;	&nbsp;Add new Product</i>
                </Button>
            {/* </Col> */}
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingNewProduct && <Loader />}
        {errorNewProduct && <Message variant='danger'>{errorNewProduct}</Message>}
        { loading? <Loader /> 
        : error ? <Message variant='danger'>{error}</Message>
    : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>IMAGE</th>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>
                        <Row>
                          <Col lg={8} >
                           <Image src={product.image} alt={product.name} fluid rounded></Image> 
                          </Col>
                        </Row>
                        </td>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() => {
                                deleteHandler(product._id)}}>
                            <i className='fas fa-trash'></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )}
    </div>
  )
}

export default ProductListScreen