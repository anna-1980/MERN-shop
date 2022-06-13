import {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, row, Col, Row} from 'react-bootstrap';
import   {useDispatch, useSelector}  from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message.js';
import {login} from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js';


const LoginScreen = () => {
  let location = useLocation();
  let navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'
  
  // console.log(`from LoginScreen ${location}`)

  useEffect(() => {
     if(userInfo){
         navigate(redirect)
      //  console.log('user logged in')
     }

  }, [navigate, userInfo, redirect])
  
  const submitHandler = (e) => {
    e.preventDefault()
    // DISPATCH LOGIN
    dispatch(login(email, password))
    //console.log('form')
  }

    return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit = {submitHandler}>
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

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

        <Row className='py-3'>
          <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}`
          : '/register'}> Register hier</Link>
          </Col>
        </Row>
    </FormContainer>

  )
}

export default LoginScreen