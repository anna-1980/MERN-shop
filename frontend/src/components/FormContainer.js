import React from 'react'
import { Container, Row, Cal, Col} from 'react-bootstrap';
// import { useParams  } from 'react-router-dom';

const FormContainer = ({children} ) => {
    // let params = useParams();
    // console.log(children)
  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>

    </Container>
  )
}

export default FormContainer