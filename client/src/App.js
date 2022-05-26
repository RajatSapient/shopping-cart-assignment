import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Pages/Home';
import Products from './Pages/Products'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Cart from './Pages/Cart';
import { useStateValue } from "./context/StateProvider"
import { useEffect } from 'react';

function App() {
  const [{toastMsg},dispatch] = useStateValue()

  useEffect(()=>{
    if(toastMsg){
      setTimeout(()=>{
        dispatch({type:"RESET_TOAST"})
      },2000)
    }
  },[toastMsg])


  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Products" element={<Products />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
   {toastMsg &&  <div className="toast-msg">{toastMsg}</div> }
   
    </div>
  );
}

export default App;
