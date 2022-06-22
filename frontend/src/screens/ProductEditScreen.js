import axios from 'axios';
import {useState, useEffect} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import   {useDispatch, useSelector}  from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message.js';
import { listProductDetails, updateProduct } from '../actions/ProductActions.js'
import FormContainer from '../components/FormContainer.js';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let params = useParams();
    const productId = params.id;
  
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] =useState('');
    const [brand, setBrand] =useState('');
    const [category, setCategory] =useState('');
    const [countInStock, setCountInStock] =useState(0);
    const [description, setDescription] =useState('');
    //-------for Multer image upload functionality-------/
    const [uploading, setUploading] =useState(false);
    
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;
    
    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }  
        }
           
    }, [dispatch, productId, product, navigate, successUpdate])

//---START---- Handlers-------//
    const submitHandler = (e) => {
      e.preventDefault()
    //    console.log('update product')
        dispatch(updateProduct(
            {_id: productId,
            name,
            price,
            image,
            brand,
            category, 
            countInStock,
            description} 
        ))}
    const uploadFileHandler = async (e) => {
    //------- since only one file is gonna be uploaded it is the first item in the array-------//
        const file = e.target.files[0];
        const formData = new FormData();
    //-------make sure this 'image' matches the name you gave to the upload in the backend-------// 
        formData.append('image', file);
        console.log(formData)
        console.log(e.target.files[0])
        setUploading(true);
        try{
        //---like for the headers, the content type for image upload is very important---//
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }    
        const {data} = await axios.post('/api/upload', formData, config)
    //---what is getting passed from the backend is the path and it is the path that is passed in data ntht comes back---//
        setImage(data);
        setUploading(false);
        }catch(error){
            console.log(error);
            alert('Only files with extension JPEG, JPG, PNG ')
            setUploading(false);
        }
    }
//---END---- Handlers-------// 

      return (
        <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        : (
<Form onSubmit = {submitHandler}>
        <Form.Group controlId= 'name'>
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type='name' 
              placeholder='Enter name' 
              value={name} 
              onChange={(e) => setName(e.target.value)}>
            </Form.Control>
          </Form.Group>
  
          <Form.Group controlId= 'price'>
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type='number' 
              placeholder='Enter price' 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group  >
            <Form.Label>Image</Form.Label>
            <Form.Control 
              type='text' 
              placeholder='Enter image url' 
              value={image} 
              onChange={(e) => setImage(e.target.value)}>
            </Form.Control>
             
            <Form.Control 
            type='file'
            id='image-file'
            label='Browse'
            custom
            onChange={uploadFileHandler}
            ></Form.Control>
            
            {uploading && <Loader />}
          </Form.Group>
  
          <Form.Group controlId= 'brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control 
              type='text' 
              placeholder='Enter brand name' 
              value={brand} 
              onChange={(e) => setBrand(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId= 'category'>
            <Form.Label>Category</Form.Label>
            <Form.Control 
              type='text' 
              placeholder='product category' 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId= 'count in stock'>
            <Form.Label>Count in stock</Form.Label>
            <Form.Control 
              type='number' 
              placeholder='Enter count in stock' 
              value={countInStock} 
              onChange={(e) => setCountInStock(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId= 'description'>
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type='text' 
              placeholder='Enter description' 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
        )}
        
      </FormContainer>
  
        </>
    )
  }

export default ProductEditScreen