import React from 'react'
import closeBtn from "../../assets/images/closeBtn.svg"
import { useSelector,useDispatch } from 'react-redux'
import { addToBasket,removeFromBasket } from '../../redux/actions/productActions'

const CartItems = ( {data} ) => {
    const {id,imageURL,name,price,quantity} = data
    const cartItems = useSelector(state => state)
    const dispatch = useDispatch()
  
    return (
        <li 
        key={name}
        >
            <div className="ecom-flex ecom-justify-content-between ecom-align-items-center ">
                <div className="ecom-cart-img-wrapper">
                    <img src= {imageURL} alt={name} />
                </div>
                <div className="ecom-flex ecom-mlr-10 ecom-flex-direction-column ecom-product-desc">
                    <div className="ecom-flex">
                        <h3 className="ecom-mb-10">{name}</h3>
                    </div>
                    <div className="ecom-flex ecom-align-items-center">
                        <button className="quantity cursor-pointer button" 
                        onClick={() => dispatch(removeFromBasket(id))}
                        >
                            -
                        </button>
                        <h3>{quantity}</h3>
                        <button 
                        className ="quantity cursor-pointer button" 
                        onClick={() => dispatch(addToBasket(data))}
                        >
                            +
                        </button>
                        <span>
                            <img src ={closeBtn} alt="closeBtn" className="ecom-mul-img"/>
                            {` RS ${price}`}
                        </span>
                    </div>
                </div>
                <div className="ecom-flex-shrink-0">
                    <h3>{`Rs. ${price*quantity}`}</h3> 
            </div>
            </div>
        </li>
  )
}

export default CartItems