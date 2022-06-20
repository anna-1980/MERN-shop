import { useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Table} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap'
import   {useDispatch, useSelector}  from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message.js';
import { listUsers } from '../actions/userActions.js'
 

const UserListScreen = () => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);
  const {loading, error, users} = userList;  
  
  console.log(userList)
  console.log(users)

  const deleteHandler = (_id) => {
    console.log('delete')
  }

  useEffect(() => {
     dispatch(listUsers())
  }, [dispatch])

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
                        <td><a href={`mailto: ${user.email}`}>{user._email}</a></td>
                        <td>
                            {user.isAdmin ?( <i className='fas fa-check' style={{color: 'green'}}></i>)
                            :(
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}
                            </td>
                        <td>
                            <LinkContainer to={`/user/${user._id}/edit`}>
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