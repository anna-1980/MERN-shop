import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { Row, Col} from 'react-bootstrap';
import  { listProducts } from '../actions/ProductActions.js'; //you fire it off in useEffects


const Pagination = () => {
    const dispatch = useDispatch();
    let params = useParams() ;
    let keyword = params.keyword;
    let pageNumber = params.pageNumber || 1;
    let back =  `/search/${params.keyword}/page/${Number(pageNumber) - 1 }` 
    let back2 =  `/page/${ Number(pageNumber) - 1 }` 
    let forward =  `/search/${params.keyword}/page/${Number(pageNumber) + 1}` 
    let forward2 =  `/page/${Number(pageNumber) + 1}` 

    console.log(params) 
    console.log(keyword ) 
    console.log(pageNumber) 
 
  return (
    <>
    <Row className='justify-content-md-center'  >
        <Col md={1}>
        {keyword 
            ? (<Link to={`${back }`} style={{color: 'grey', textDecoration: 'none'}}>&lt;&lt;{ Number(pageNumber) - 1}&lt;&lt;</Link>)
           :(<Link to={`${back2}`} style={{color: 'red', textDecoration: 'none'}}>&lt;&lt;{ Number(pageNumber) - 1}&lt;&lt;</Link>) }
        </Col>
        <Col md="auto" >{pageNumber.toString()}</Col>
        <Col md={1}>
            {keyword 
            ? (<Link to={`${forward }`} style={{color: 'grey', textDecoration: 'none'}}>&gt;&gt;{ Number(pageNumber) + 1}&gt;&gt;</Link>)
           :(<Link to={`${forward2 }`} style={{color: 'red', textDecoration: 'none'}}>&gt;&gt;{ Number(pageNumber) + 1}&gt;&gt;</Link>) }
            
        </Col>
        <Col md={1}>{keyword }</Col>
    </Row>
    </>
  )
}

export default Pagination


{/* <Link to={`/search/${keyword }/page/${ Number(pageNumber) - 1}`}  style={{color: 'grey', textDecoration: 'none'}}>&lt;&lt;{(pageNumber)-1}&lt;&lt;</Link>

<Link to={`${forward }`} style={{color: 'grey', textDecoration: 'none'}}>&gt;&gt;{ Number(pageNumber) + 1}&gt;&gt;</Link> */}