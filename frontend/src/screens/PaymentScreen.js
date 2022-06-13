import {useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, FormLabel} from 'react-bootstrap';
import   {useDispatch, useSelector}  from 'react-redux';
import FormContainer from '../components/FormContainer.js';
import CheckoutSteps from './CheckoutSteps.js';
import { savePaymentMethod } from '../actions/cartActions.js';

const PaymentScreen = () => {
    let navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { shippingAddress }= cart 

    if(!shippingAddress) {
        navigate(`/shipping`)
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
   
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit')
        //action SAVE_SHIPPING_ADDRESS to be dispatched here 
        dispatch(savePaymentMethod({
            paymentMethod
        }))
        navigate(`/placeorder`);
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler} >
            <Form.Group>
                <FormLabel className='mb-3' as='legend'>Select Method</FormLabel>
          
            <Col className='mb-4'>
              <Row  className='mb-2'>
              <Form.Check 
              
               type='radio'
               label='PayPal or Credit Card'
               id='PayPal' 
               name ='PaymentMethod'
               value='PayPal'
               checked
               onChenge={(e)=> setPaymentMethod(e.target.value) }>
                   
               </Form.Check>
              </Row>
              <Row  className='mb-2'>
               <Form.Check 
               type='radio'
               label='Stripe'
               id='Stripe' 
               name ='PaymentMethod'
               value='Stripe'
               onChenge={(e)=> setPaymentMethod(e.target.value) }>

               </Form.Check>
             </Row>
            </Col>
           
            <Button 
            type='submit' 
            variant='primary'>
                Continue</Button>
            </Form.Group>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen