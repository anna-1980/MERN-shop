import { Container }  from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';

const App = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className='py-3'>
        <Container>
          
          <Routes>

          <Route path='/' element= {<HomeScreen />} />
          <Route path='/product/:id' element= {<ProductScreen />} />

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
