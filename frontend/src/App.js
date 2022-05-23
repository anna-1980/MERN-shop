import { Container }  from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen';
import About from './screens/About';

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
            <Route path='/login' element= {<LoginScreen />} />
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
