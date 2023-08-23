
import './App.css';
import { Route , Routes } from 'react-router-dom';
import Home from './Compo/Home';
import Register from './Compo/Register';
import Login from './Compo/Login';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/Register' element={<Register/>}/>
      <Route exact path='/Login' element={<Login/>}/>
      </Routes>
      

      
    </div>
  );
}

export default App;
