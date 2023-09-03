
import './App.css';
import { Route , Routes } from 'react-router-dom';
import Home from './Compo/Home';
import Register from './Compo/Register';
import Login from './Compo/Login';
import Navbar from './Compo/Common/Navbar';
import AddProduct from './Compo/Seller/AddProduct';
import YourProducts from './Compo/Seller/YourProducts';
import Profile from './Compo/Profile';
import SingleProduct from './Compo/Buyer/SingleProduct';
import Cart from './Compo/Buyer/Cart';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/Register' element={<Register/>}/>
      <Route exact path='/Login' element={<Login/>}/>
      <Route exact path='/add-product' element={<AddProduct/>}/>
      <Route exact path='/seller-your-products' element={<YourProducts/>}/>
      <Route exact path='/profile' element={<Profile/>}/>
      <Route exact path='/single-products/:id' element={<SingleProduct/>} />
      <Route exact path='/cart' element={<Cart/>} />
      
      </Routes>
      

      
    </div>
  );
}

export default App;
