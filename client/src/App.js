import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Pages/Home';
import Products from './Pages/Products'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component'
import Cart from './Pages/Cart';
import { useStateValue } from "./contexts/StateProvider"
import { useEffect } from 'react';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import ProtectedRoutes from './components/protected-routes/protected-routes.component';
import NotFound from './components/not-found/not-found.component';

function App() {
  const [{toastMsg,isLogin},dispatch] = useStateValue()


  useEffect(()=>{
    if(toastMsg){
      setTimeout(()=>{
        dispatch({type:"RESET_TOAST"})
      },2000)
    }
  },[toastMsg])

  useEffect(()=>{
    if(Object.keys(isLogin).length === 0 && localStorage.getItem("UserData") !== ""){
      let data = JSON.parse(localStorage.getItem("UserData"))
      dispatch({
        type: 'LOGIN_DATA',
        payload: {...data }
    })
    }
  },[])
  return (
   
    <div className="App">
    
    <BrowserRouter>
      <Header/>
      <ErrorBoundary>
      <Routes>
       
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Products" element={<Products />}></Route>
          <Route element={<ProtectedRoutes />}> 
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
          </Route> 
            <Route exact path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />} />
      </Routes>
      </ErrorBoundary>
      <Footer/>
    </BrowserRouter>
 

   {toastMsg &&  <div className="toast-msg">{toastMsg}</div> }
   
    </div>
  );
}

export default App;
