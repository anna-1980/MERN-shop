import { useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Table, Row, Col, Image} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap'
import   {useDispatch, useSelector}  from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message.js';
import { listOrders } from '../actions/orderActions';

const ProductOrderListScreen = () => {
    let location = useLocation();
    let navigate = useNavigate();
  //------- caleed to pull STATE form Redux -------//
    const dispatch = useDispatch();
  
//------- getting data form Redux STATE: store.js combineReducers -------//
 const orderList = useSelector((state) => state.orderList);
 const {loading:loadingOrders, error:errorOrders, orders} = orderList;
//  console.log(orders)

 const userLogin = useSelector((state) => state.userLogin);
 const {userInfo} = userLogin;
    //-------dispatch actions in useEffect-------//
    useEffect(() => {
      
        if(!userInfo){
            navigate('/login')
         //  console.log('user logged in')
        }else{
           if(!userInfo.name || orders){
               dispatch(listOrders())
           } 
           }
         
        
    }, [dispatch, userInfo])
    
  
  
      return (
       <Row>
           <Col>
              <h2>Orders</h2>
              {loadingOrders ? <Loader />
              : errorOrders 
              ? <Message variant="danger">{errorOrders}</Message>
              : <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ORDER ID</th>
                      <th>USER</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} mb-0>
                        <td>{order._id}</td>
                        <td>{order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>$ {order.totalPrice}</td>
                        <td>{
                          order.isPaid ?  
                          <div style={{color: 'white', backgroundColor: '#79D670'}} >{ order.paidAt.substring(0, 10)}</div>  
                          : (
                          <Row className='m-auto mt-2'>
                            <i className="fas fa-times " style={{color: 'red' }}></i>
                          </Row>
                        )}</td>
                        <td > {order.isDelivered ? (
                          <div style={{color: 'white', backgroundColor: 'green',}} >{order.deliveredAt.substring(0, 10)} </div>  
                         
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

export default ProductOrderListScreen