import { Container }  from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/screens/HomeScreen';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className='py-3'>
        <Container>
          
          <Routes>

              <Route
              path='/'
              element={<HomeScreen />}
              >
    
          </Route>

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
