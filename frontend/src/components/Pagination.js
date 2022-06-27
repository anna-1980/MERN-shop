import {useParams, Link} from 'react-router-dom';
import { Row, Col} from 'react-bootstrap';

//------My own Pagination implementation see below :) it looks quite decent-------//
const Pagination = ({pages, isAdmin=false}) => {
    let params = useParams() ;
    let keyword = params.keyword;
    let pageNumber = params.pageNumber || 1;
    let back =  `/search/${params.keyword}/page/${Number(pageNumber) - 1 }` ;
    let back2 =  `/page/${ Number(pageNumber) - 1 }` ;
    let forward =  `/search/${params.keyword}/page/${Number(pageNumber) + 1}` ;
    let forward2 =  `/page/${Number(pageNumber) + 1}` ;
    let forwardAdmin =  `/admin/productlist/${Number(pageNumber) + 1}`;
    let forwardAdminKeyword =  `/admin/productlist/${params.keyword}/page/${Number(pageNumber) + 1}`;
    let backAdmin = `/admin/productlist/${ Number(pageNumber) - 1 }`;
    let backAdminKeyword =  `/admin/productlist/${params.keyword}/page/${Number(pageNumber) - 1 }`;

    const paginationStyle={color: 'white',backgroundColor:'grey', textDecoration: 'none', borderRadius:'3px', padding: '3px'}
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
              ? (<Link to={ !isAdmin ? `${back}` :  `${backAdminKeyword}`} style={paginationStyle} >&lt;&#32;{ Number(pageNumber) - 1}&#32;&lt;</Link>)
             :(<Link to={!isAdmin ? `${back2}` : `${backAdmin}`} style={paginationStyle}>&lt;&#32;{ Number(pageNumber) - 1}&#32;&lt;</Link>) }
          </Col>
        )}
        {pages !== 1 && (
          <Col sx='auto' md={1}  className="text-center" >{pageNumber.toString()}</Col>
        )}
        {pageNumber < pages &&(
                  <Col sx='auto' md={1} >
                  {keyword 
                  ? (<Link to={!isAdmin ? `${forward }` : `${forwardAdminKeyword}`} style={paginationStyle}>&gt;&#32;{ Number(pageNumber) + 1}&#32;&gt;</Link>)
                 :(<Link to={!isAdmin ? `${forward2 }` : `${forwardAdmin}`} style={paginationStyle}>&gt;&#32;{ Number(pageNumber) + 1}&#32;&gt;</Link>) }
                  
              </Col>
        ) }
    </Row>
    {
      keyword
      && (
        <Row  className='justify-content-md-center text-center'>
        <Col sx='auto' md={4} style={{color: 'magenta'}}>searched for: {keyword }</Col>
    </Row>
      )
    }
    </>
  )
}

export default Pagination
