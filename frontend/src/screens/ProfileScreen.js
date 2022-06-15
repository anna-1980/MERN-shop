import {useState, useEffect} from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Col, Row, Table} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import   {useDispatch, useSelector}  from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message.js';
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'; 
import { listMyOrders } from '../actions/orderActions';


const ProfileScreen = () => {
  let location = useLocation();
  let navigate = useNavigate();
//------- caleed to pull STATE form Redux -------//
  const dispatch = useDispatch();

  //-------the component's state-------//
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const [confirmPassword, setConfirmPassword] =useState('');
  const [message, setMessage] =useState(null);
  

//------- getting data form Redux STATE: store.js combineReducers -------//
  const userDetails = useSelector((state) => state.userDetails);
  const {loading, error, user} = userDetails;
//   console.log(userDetails.user.name)

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const {loading:loadingOrders, error:errorOrders, orders} = orderMyList;


  //-------dispatch actions in useEffect-------//
  useEffect(() => {
     if(!userInfo){
         navigate('/login')
      //  console.log('user logged in')
     }else{
        if(!user.name || success){
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        }else{
            setName(userDetails.user.name)
            setEmail(userDetails.user.email) 
        }
     }
  }, [dispatch, navigate, userInfo, user, success])
  
  const submitHandler = (e) => {
    e.preventDefault()
//-------DISPATCH REGISTERed User Profile-------//
     if( password !== confirmPassword) {
        setMessage('Passwords do not match')
     }else{
//-------Dispatch update profile-------//
        dispatch(updateUserProfile({
            id: user._id,
            name,
            email, 
            password
        }))
    }
  }

    return (
     <Row>
         <Col md={3}>
         <h2>User Profile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated Successfully</Message>}
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
        <Row>
          <Button type='submit' variant='primary' className="mt-4">
            Update
          </Button>
        </Row>
      </Form>
         </Col>
         <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader />
            : errorOrders 
            ? <Message variant="danger">{errorOrders}</Message>
            : <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                        <Row className='m-auto mt-2'>
                          <i className="fas fa-times " style={{color: 'red' }}></i>
                        </Row>
                      )}</td>
                      <td>{order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ): (
                        <Row className='m-auto mt-2 '>
                         <i className="fas fa-times" style={{color: 'magenta' }}></i>
                        </Row>
                      )
                    }</td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='light' className='btn-sm'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>}
         </Col>
     </Row>

  )
}

export default ProfileScreen