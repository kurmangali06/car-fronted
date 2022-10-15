
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Car } from './pages/Car';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer position='bottom-center' limit={1} />
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/car/:carId' element={<Car/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
