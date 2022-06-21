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
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';

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
            <Route path='/login/shipping' element= {<ShippingScreen />} />
            <Route path='/placeorder' element= {<PlaceOrderScreen />} />
            <Route path='/order/:id' element= {<OrderScreen />} />
            <Route path='/payment' element= {<PaymentScreen />} />
            <Route path='/product/:id' element= {<ProductScreen />} />
            <Route path='/cart/*' element= {<CartScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen /> }/>
            <Route path='/admin/productlist' element={<ProductListScreen /> }/>
            <Route path='/admin/user/:id/edit' element={<UserEditScreen /> }/>
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
