import React,{useState,useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import Cart from "../../Pages/Cart";
import Modal from "../modal/modal.component";
import Basket from "../../assets/images/cart.svg"


const Header = () =>{

    const [{basket}] = useStateValue()
    const[isOpen,setIsOpen] = useState(false)
    const [toastMsg,setToastMsg] = useState(false)
    const [windowInnerWidth,setWindowInnerWidth] = useState(window.innerWidth)
    const navigate = useNavigate();


    useEffect(()=>{
        const handleResize = () => {
            setWindowInnerWidth(window.innerWidth)
        }
        window.addEventListener("resize",handleResize)
        return ()=>{
        window.removeEventListener("resize",handleResize)
        }
    },[])

    const handleCartModal = () =>{
        if(basket.length === 0){ 
            setToastMsg(true)
            setTimeout(()=>{
                setToastMsg(false)
            },2000)
            return
        }
        if(windowInnerWidth > 1024){
            setIsOpen(true)
        }else{
            navigate('/cart')
        }
    }

    return(
        <>
     <header>
        <div className = "container">
            <div className = " ecom-flex ecom-header ecom-align-items-center" >
            <div className = "header-logo">
            <Link to="/"><img src = "../static/images/logo.png" alt="logo" /></Link>
        
            </div>
            <div className = "ecom-flex ecom-flex-direction-column ecom-flex-grow-1">
            <div className = "ecom-mx-auto">
                <div className = "ecom-flex header-auth ">
                    <Link to="/login">SignIn</Link>
                    <Link to="/register">Register</Link>
                </div>
            </div>
            <div className= "header-menu ecom-flex-direction-row ecom-flex ecom-align-items-center">
                <nav className="menubar">
                    <ul> 
                        <li className="crumb"><Link to="/">Home</Link></li>
                        <li className="crumb"><Link to="/products">Products</Link></li>
                    </ul>
                </nav>
                <div className = "header-cart-btn ecom-mx-auto">
                    <button className = "global-gray-btn cursor-pointer ecom-flex ecom-align-items-center " onClick={()=> handleCartModal()}>
                        <img src={Basket} alt ="basket" style={{width:"40px"}}/> 
                        <span>{`${basket?.reduce((acc,cv) => (acc+=cv.quantity),0)} Items`}</span>
                    </button>
                    { windowInnerWidth > 1024 ? (
                    <Modal open={isOpen} onClose = {() => setIsOpen(false)}>
                        <Cart 
                        onClose = {() => setIsOpen(false)}
                        setOpenModal = {setIsOpen}
                        />
                    </Modal>
                    ):(
                        <></>
                        // <Cart />  
                    ) 
                    }
                </div>
            </div>
            </div>
            </div>
        </div>
    </header>
    {toastMsg &&  <div className="toast-msg">Cart is Empty,Please Add some Products</div> }
        </>
    )
}
export default Header