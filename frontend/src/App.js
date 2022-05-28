import { Container }  from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';

const App = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className='py-3'>
        <Container>
          
          <Routes>
           {/* <Route index element= {<HomeScreen />} />  */}
            <Route path='/' element= {<HomeScreen />} />
            <Route path='/register' element= {<RegisterScreen />} />
            <Route path='/login' element= {<LoginScreen />} />
            <Route path='/profile' element= {<ProfileScreen />} />
            <Route path='login/shipping' element= {<ShippingScreen />} />
            <Route path='/product/:id' element= {<ProductScreen />} />
            <Route path='/cart/*' element= {<CartScreen />} />
            
        
          
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
