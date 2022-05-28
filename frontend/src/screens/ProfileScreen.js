import {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, row, Col, Row} from 'react-bootstrap';
import   {useDispatch, useSelector}  from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message.js';
import FormContainer from '../components/FormContainer.js';
import { getUserDetails } from '../actions/userActions.js'
 


const ProfileScreen = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const [confirmPassword, setConfirmPassword] =useState('');
  const [message, setMessage] =useState(null);
  
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const {loading, error, user} = userDetails;
  console.log(userDetails.user.name)

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  

  useEffect(() => {
     if(!userInfo){
         navigate('/login')
      //  console.log('user logged in')
     }else{
        if(!user.name){
            dispatch(getUserDetails('profile'))
        }else{
            setName(userDetails.user.name)
            setEmail(userDetails.user.email) 

        }
     }

  }, [dispatch, navigate, userInfo, user])
  
  const submitHandler = (e) => {
    e.preventDefault()
     //DISPATCH REGISTER
     if( password !== confirmPassword) {
        setMessage('Passwords do not match')
     }else{
//Dispatch update profile
      
    }
  }

    return (
     <Row>
         <Col md={3}>
         <h2>User Profile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
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

        <Form.Group controlId= 'email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type='email' 
            placeholder='Enter Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId= 'password'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>


        <Form.Group controlId= 'confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='Confirm Password' 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>
         </Col>
         <Col md={9}>
            <h2>My Orders</h2>
         </Col>
     </Row>

  )
}

export default ProfileScreen