import React,{useState} from "react"
import { useStateValue } from "../context/StateProvider"
import { getBasketTotal } from "../context/Reducers"
import { proceedToCheckout } from "../services/services"
import closeBtn from "../assets/images/closeBtn.svg"
import closeBtnWhite from "../assets/images/closeBtnWhite.png"
import lowestPrice from "../assets/images/lowest-price.png"

const Cart = ({onClose,setOpenModal}) => {
    const [loader,setLoader] = useState(false)
    const [{basket},dispatch] = useStateValue()
    
    
    
    const removeFromBasket = (id) => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id:id
        })
    }

const proceedToCheckOuts = async() =>{
    setLoader(true)
    const response = await proceedToCheckout()
    if(response.response === "Success"){
        setTimeout(()=>{
            dispatch({
                type: 'RESET_PRODUCTS',
            })
            setLoader(false)    
        },1000)
    }else{
        console.log("Issue is Encounterd")
    }
}

const addToBasket = (id,imageURL,price,description,name) => {
    dispatch({
        type: 'ADD_TO_BASKET',
        payload: {
            id,
            imageURL,
            price,
            description,
            name}
    })
}
   if(basket?.length === 0){
        // setOpenModal(false)
   }

    return (
        
        <div className="ecom-cart" id= "ecom-cart">
        <div className="cart-header ecom-flex ecom-justify-content-between ecom-align-items-center">
            <h2>My Cart ({`${basket?.reduce((acc,cv)=>(acc+=cv.quantity),0)} Item`})</h2>
            <span onClick={onClose} className="cursor-pointer"><img src ={closeBtnWhite} alt="closeBtn" style={{width: '100%',marginRight: '-20px',marginTop: '3px'}}/></span>
        </div>
        
            {basket?.length === 0 ? (  
                <div className="ecom-cartbody ecom-flex ecom-align-items-center ecom-justify-content-center ecom-flex-direction-column">
                <h3>No Items in your Cart</h3>
                <p>Your Favourite Items are just a click away</p> 
                </div>
            ):(
         <div className="ecom-cartbody">
            <ul>
                {
                    basket?.map(({id,imageURL,price,description,name,quantity}) => {
                        return(
                            <li key={id}>
                            <div className="ecom-flex ecom-justify-content-between ecom-align-items-center ">
                                <div className="ecom-cart-img-wrapper">
                                    <img src= {imageURL} alt={name} />
                                </div>
                                <div className="ecom-flex ecom-mlr-10 ecom-flex-direction-column ecom-product-desc">
                                    <div className="ecom-flex">
                                    <h3 className="ecom-mb-10">{name}</h3>
                                    </div>
                                    <div className="ecom-flex ecom-align-items-center">
                                    <button className="quantity cursor-pointer button" onClick={()=>removeFromBasket(id)}>-</button>
                                    <h3>{quantity}</h3>
                                    <button className ="quantity cursor-pointer button" onClick={()=>addToBasket(id,imageURL,price,description,name,quantity)}>+</button>
                                    <span><img src ={closeBtn} alt="closeBtn" className="ecom-mul-img"/>{` RS ${price}`}</span>
                                    </div>
                                </div>
                                <div className="ecom-flex-shrink-0">
                                    <h3>{`Rs. ${price*quantity}`}</h3> 
                              </div>
                            </div>
                        </li>
                        )
                    })
                 }
        
        </ul>
        </div>    )
            }
        
       
        
        <div className="ecom-cart-guarantee ecom-text-center ecom-flex ecom-align-items-center" style={{marginBottom:'10px'}}>
                <div className="ecom-flex"><img src ={lowestPrice} alt="lowestPrice" style={{marginRight:'10px'}} /></div>
                <div className="ecom-flex"><span>You won't find it cheaper anywhere</span></div>
            </div>

        <div className="ecom-cartfooter ecom-text-center">
            <p>Promo Code can be applied on Promo Page</p>
            <button className="button ecom-proceed-checkout ecom-flex ecom-justify-content-between ecom-align-items-center cursor-pointer" onClick={proceedToCheckOuts}>
                <span>Proceed To Checkout</span>
                {loader && <div>Spinner</div>}
                <span>{`Total: Rs ${getBasketTotal(basket)}`}</span>
            </button>
        </div>
    </div>    
    )
}

export default Cart