import {useState, useEffect} from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import   {useDispatch, useSelector}  from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message.js';
import { getUserDetails } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js';

const UserEditScreen = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    const userId = params.id;
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] =useState(false);
    
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;
    
    console.log(`from UserEditScreen ${location.search}`)
  
    useEffect(() => {
      if(!user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
      }else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }, [dispatch, userId, user])
    
    const submitHandler = (e) => {
      e.preventDefault()
      console.log( 'you clicked the button')
    }
  
      return (
        <>
        <Link to='/admin/userList' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
        <h1>Edit User</h1>
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
  
          <Form.Group controlId= 'email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type='email' 
              placeholder='Enter Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId= 'isAdmin'>
            <Form.Check 
              type='checkbox' 
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}>
            </Form.Check>
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

export default UserEditScreen