import React,{useState,useEffect} from "react"
import { NavLink,Link, useNavigate } from "react-router-dom";
import Cart from "../../Pages/Cart";
import Modal from "../modal/modal.component";
import Basket from "../../assets/images/cart.svg"
import "./header.component.css"
import { useSelector } from "react-redux";


const Header = () =>{

    const [isOpen,setIsOpen] = useState(false)
    const [windowInnerWidth,setWindowInnerWidth] = useState(window.innerWidth)
    const navigate = useNavigate();
    const basketItems = useSelector((state) => state)
    const basketTotalItems = basketItems.allProducts.basket
    const [toastMsg,setToastMsg] = useState(false)
    
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
        if(basketTotalItems.length === 0){ 
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

    // const signOut = () => {
    //     dispatch({
    //         type: "SIGN_OUT",
    //     })
    // }

    return(
        <>
     <header>
        <div className = "container">
            <div className = " ecom-flex ecom-header ecom-align-items-center" >
            <div className = "header-logo">
            <Link to="/"><img src = "../static/images/logo.png" alt="sabka-bazaar-logo" /></Link>
        
            </div>
            <div className = "ecom-flex ecom-flex-direction-column ecom-flex-grow-1">
            <div className = "ecom-mx-auto">
                <div className = "ecom-flex header-auth ">
                {/* { userName ? <span className="cursor-pointer" onClick={signOut}>Sign Out</span> :  */}
                   <> <Link to="/login">SignIn</Link>
                    <Link to="/register">Register</Link> 
                    </>
                    {/* } */}
                </div>
            </div>
            <div className= "header-menu ecom-flex-direction-row ecom-flex ecom-align-items-center">
                <nav className="menubar">
                    <ul> 
                        <li className="crumb"><NavLink  to="/">Home</NavLink></li>
                        <li className="crumb"><NavLink  to="/products">Products</NavLink></li>
                    </ul>
                </nav>
                <div className = "header-cart-btn ecom-mx-auto">
                    <button className = "global-gray-btn cursor-pointer ecom-flex ecom-align-items-center " onClick={()=> handleCartModal()}>
                        <img src={Basket} alt ="basket" style={{width:"40px"}}/> 
                        <span>{`${basketTotalItems?.reduce((acc,cv) => (acc+=cv.quantity),0)} Items`}</span>
                    </button>
                    { windowInnerWidth > 1024 ? (
                    <Modal open={isOpen} onClose = {() => setIsOpen(false)}>
                        <Cart 
                        onClose = {() => setIsOpen(false)}
                        setOpenModal = {setIsOpen}
                        />
                    </Modal>
                    ):null
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