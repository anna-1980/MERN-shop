import { Container }  from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from './components/screens/CartScreen.js';
import About from './components/screens/About';

const App = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className='py-3'>
        <Container>
          
          <Routes>
           <Route index element= {<HomeScreen />} /> 
            <Route path='/' element= {<HomeScreen />} />
            <Route path='/product/:id' element= {<ProductScreen />} />
          <Route path='/cart/*' element= {<CartScreen />} />
          <Route path='/about/*' element= {<About />} />
          <Route path='/login' element= {<About />} />
          
          </Routes>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
