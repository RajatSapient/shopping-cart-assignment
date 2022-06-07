import React from "react"
import { proceedToCheckout } from "../services/services"
import closeBtnWhite from "../assets/images/closeBtnWhite.png"
import lowestPrice from "../assets/images/lowest-price.png"
import "../assets/css/cart.css"
import CartItems from "../components/cart-items/cart-items.component"
import { useSelector,useDispatch } from "react-redux"
import { resetBasket } from "../redux/actions/productActions"


const Cart = ({onClose,setOpenModal}) => {

    const basket = useSelector((state) => state)
    const dispatch = useDispatch()
    const basketItems = basket.allProducts.basket

    const proceedToCheckOuts = async() =>{
     await proceedToCheckout()
        setTimeout(()=>{
                dispatch(resetBasket())
        },1000)
 
    }
    

    return (
        
        <div className="ecom-cart" id= "ecom-cart">
        <div className="cart-header ecom-flex ecom-justify-content-between ecom-align-items-center">
            <h2>My Cart ({`${basketItems?.reduce((acc,cv)=>(acc+=cv.quantity),0)} Item`})</h2>
            <span onClick={onClose} className="cursor-pointer"><img src ={closeBtnWhite} alt="closeBtn" style={{width: '100%',marginRight: '-20px',marginTop: '3px'}}/></span>
        </div>
        
            { basketItems?.length === 0 ? (  
                <div className="ecom-cartbody ecom-flex ecom-align-items-center ecom-justify-content-center ecom-flex-direction-column">
                <h3>No Items in your Cart</h3>
                <p>Your Favourite Items are just a click away</p> 
                </div>
                ):( 
                <div className="ecom-cartbody">
                    <ul>
                        {
                            basketItems?.map((data) => {
                                return( 
                                    <CartItems 
                                    data={data} 
                                    key={data.id}
                                    />
                                )
                            })
                        }
                    </ul>
                </div>    
        )
            }
         
        <div className="ecom-cart-guarantee ecom-text-center ecom-flex ecom-align-items-center" style={{marginBottom:'10px'}}>
                <div className="ecom-flex"><img src ={lowestPrice} alt="lowestPrice" style={{marginRight:'10px'}} /></div>
                <div className="ecom-flex"><span>You won't find it cheaper anywhere</span></div>
        </div>

        <div className="ecom-cartfooter ecom-text-center">
            <p>Promo Code can be applied on Promo Page</p>
            {basketItems?.length === 0 ? 
            <button 
            className="button ecom-proceed-checkout ecom-flex ecom-justify-center ecom-align-items-center cursor-pointer" 
            onClick={onClose}>
                <p className ="ecom-font-bold ecom-w-100">Continue Shopping</p>
             </button>
            
             :  
            
            <button className="button ecom-proceed-checkout ecom-flex ecom-justify-content-between ecom-align-items-center cursor-pointer" 
            onClick={proceedToCheckOuts}
            >
                <span className ="ecom-font-bold ">Proceed To Checkout</span>
                <span className ="ecom-font-bold ">{`Total: Rs ${ basketItems?.reduce((amount,item) => item.price * item.quantity + amount,0)}`}</span>
            </button>
            }
        </div>
    </div>    
    )
}

export default Cart