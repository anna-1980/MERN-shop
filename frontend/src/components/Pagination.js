import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { Row, Col} from 'react-bootstrap';
import  { listProducts } from '../actions/ProductActions.js'; //you fire it off in useEffects


const Pagination = ({pages, isAdmin=false}) => {
    const dispatch = useDispatch();
    let params = useParams() ;
    let keyword = params.keyword;
    let pageNumber = params.pageNumber || 1;
    let back =  `/search/${params.keyword}/page/${Number(pageNumber) - 1 }` 
    let back2 =  `/page/${ Number(pageNumber) - 1 }` 
    let forward =  `/search/${params.keyword}/page/${Number(pageNumber) + 1}` 
    let forward2 =  `/page/${Number(pageNumber) + 1}` 

    // console.log(params) 
    // console.log(keyword ) 
    // console.log(pageNumber) 
    console.log(`from Pagination total Num of pages: ${pages}`) 
 
  return (
    <>
    <Row xs={3} className='justify-content-md-center text-center'  >
        {pageNumber > 1 && (
          <Col sx='auto' md={1}  >
          {keyword 
              ? (<Link to={`${back }`} style={{color: 'grey', textDecoration: 'none'}}>&lt;&lt;{ Number(pageNumber) - 1}&lt;&lt;</Link>)
             :(<Link to={`${back2}`} style={{color: 'red', textDecoration: 'none'}}>&lt;&lt;{ Number(pageNumber) - 1}&lt;&lt;</Link>) }
          </Col>
        )}
        <Col sx='auto' md={1}  className="text-center" >{pageNumber.toString()}</Col>
        {pageNumber < pages &&(
                  <Col sx='auto' md={1} >
                  {keyword 
                  ? (<Link to={`${forward }`} style={{color: 'grey', textDecoration: 'none'}}>&gt;&gt;{ Number(pageNumber) + 1}&gt;&gt;</Link>)
                 :(<Link to={`${forward2 }`} style={{color: 'red', textDecoration: 'none'}}>&gt;&gt;{ Number(pageNumber) + 1}&gt;&gt;</Link>) }
                  
              </Col>
        ) }
    </Row>
    <Row  className='justify-content-md-center text-center'>
        <Col sx='auto' md={4} >searched word: {keyword }</Col>
    </Row>
    </>
  )
}

export default Pagination


{/* <Link to={`/search/${keyword }/page/${ Number(pageNumber) - 1}`}  style={{color: 'grey', textDecoration: 'none'}}>&lt;&lt;{(pageNumber)-1}&lt;&lt;</Link>

<Link to={`${forward }`} style={{color: 'grey', textDecoration: 'none'}}>&gt;&gt;{ Number(pageNumber) + 1}&gt;&gt;</Link> */}