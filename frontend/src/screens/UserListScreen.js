import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap'
import   {useDispatch, useSelector}  from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message.js';
import { listUsers, deleteUser } from '../actions/userActions.js';

 

const UserListScreen = () => {
    let navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const {loading, error, users} = userList;  

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo} = userLogin;

  const userDelete = useSelector(state => state.userDelete);
  const {success:successDelete} = userDelete;
  
  const deleteHandler = (id) => {
    // console.log('delete')
    if(window.confirm('Are you sure ? This action cannot be undone!')){
        dispatch(deleteUser(id));
    }
  }

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
     dispatch(listUsers())
    }else{
      navigate('/login');
    }
  }, [dispatch, navigate, successDelete, userInfo])

  return (
    <div>
        <h1>Users</h1>
        { loading? <Loader /> 
        : error ? <Message variant='danger'>{error}</Message>
    : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>E-MAIL</th>
                    <th>ADMIN</th>
                    <th>EDIT</th>
                    <th>DEL</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td><a href={`mailto: ${user.email}`}>{user.email}</a></td>
                        <td>
                            {user.isAdmin ?( <i className='fas fa-check' style={{color: 'green'}}></i>)
                            :(
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}
                            </td>
                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() => {
                                deleteHandler(user._id)}}>
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

export default UserListScreen