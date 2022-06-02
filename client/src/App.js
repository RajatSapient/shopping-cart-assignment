import { useEffect,lazy,Suspense } from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component'
import { useStateValue } from "./contexts/StateProvider"
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import NotFound from './components/not-found/not-found.component';
import FullPageLoader from './components/full-page-loading-spinner/full-page-loading-spinner.component';

const Home= lazy(() => import('./Pages/Home'));
const Products = lazy(() => import('./Pages/Products'));
const Register = lazy(() => import('./Pages/Register'));
const Login = lazy(() => import('./Pages/Login'));
const Cart = lazy(() => import('./Pages/Cart'));



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
    <>
    <Suspense fallback = {<FullPageLoader />}>
    <BrowserRouter>
      <Header/>
      <ErrorBoundary>
      <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Products" element={<Products />}></Route>
          {/* <Route element={<ProtectedRoutes />}>  */}
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
          {/* </Route>  */}
            <Route exact path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />} />
      </Routes>
      </ErrorBoundary>
      <Footer/>
    </BrowserRouter>
    </Suspense>
 

   {toastMsg &&  <div className="toast-msg">{toastMsg}</div> }
</>
  );
}

export default App;
