import React from 'react'
import closeBtn from "../../assets/images/closeBtn.svg"

const CartItems = ( {data,addToBasket,removeFromBasket } ) => {
    const {id,imageURL,name,price,quantity,description} = data
  
    return (
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
                        <button className="quantity cursor-pointer button" onClick={() => removeFromBasket(id)}>-</button>
                        <h3>{quantity}</h3>
                        <button 
                        className ="quantity cursor-pointer button" 
                        onClick={() => addToBasket(id,imageURL,price,description,name,quantity)}>
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