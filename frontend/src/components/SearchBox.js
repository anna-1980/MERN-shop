import { useState } from "react";
import { Form, Button, Col, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

//-------submitHandler-------//
const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
        navigate( `/search/${keyword}` );
        console.log('search')
    }else{
        navigate('/')
    }
}    

  return (
    <Form onSubmit={submitHandler} iniline>
        <Row className='align-items-center'>
            <Col>
            <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search products...'
            className="mr-sm-1 ml-sm-5">
            </Form.Control>
            </Col>
            <Col>
            <Button 
            type="submit"
            variant='outline-info'
            className="p-2 ">
                Search
            </Button>
            </Col>
        </Row>
    </Form>
  )
}

export default SearchBox