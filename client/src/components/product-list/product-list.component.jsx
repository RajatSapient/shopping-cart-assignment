import React from 'react'
import { ReadMore } from './read-more.component.jsx'
import "./product-list.component.css"
import { useDispatch } from 'react-redux'
// import { useStateValue } from '../../contexts/StateProvider.js'
import { addToBasket } from '../../redux/actions/productActions.js'


const ProductList = (props) => {
    
    const dispatch = useDispatch()

    console.log("Im Product List Component")

    const { productList, screenSize } = props
    return (
        <div className="ecom-productl ecom-flex">
            {productList?.length === 0 ? (
                <div className="ecom-align-items-center ecom-justify-content-center ecom-flex-grow-1 ecom-flex">
                    <h1>No Products Are available under this Category</h1></div>) : (
                <div className="ecom-product-category-plisting" id="ecom-productListing">
                    <div className="ecom-flex ecom-flexwrap">
                        {productList?.map((data) => {
                            const { id, imageURL, price, description, name } =  data
                            return (
                                <div key={id} className="ecom-productcard ecom-flex ecom-flex-direction-column ecom-text-center">
                                    <h2 className="ecom-productcart-title">{name}</h2>
                                    <div className="productimg-card">
                                        <div className="productimg-wrapper ecom-flex">
                                            <img className="hddg" src={`${imageURL}`} alt={name} />
                                        </div>

                                        {screenSize > 767 ? (
                                            <div className="product-desc">
                                                <ReadMore>{description}</ReadMore>
                                            </div>
                                        ) : (
                                            <div className="ecom-flex ecom-flex-direction-column">
                                                <div className="product-desc">
                                                     <ReadMore>{description}</ReadMore>
                                                </div>
                                                <button className="ecom-category-btn cursor-pointer button" style={{ marginTop: "15px" }} 
                                                 onClick={() =>  dispatch(addToBasket(data)) }
                                                >
                                                    {`Buy Now @ Rs ${price}`}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="ecom-category-btn-wrapper ecom-justify-content-between ecom-flex ecom-align-items-center">
                                        {screenSize > 1024 ? (<span>MRP Rs: {price}</span>) : (<></>)}
                                        {screenSize < 768 ? (<></>) : (
                                            <button className="ecom-category-btn cursor-pointer button" 
                                            onClick={() =>  dispatch(addToBasket(data)) }
                                            >
                                                {screenSize > 1024 ? "Buy Now" : `Buy Now @ Rs ${price}`}
                                            </button>
                                        )}

                                    </div>
                                </div>
                            )
                        })
                        }

                    </div>
                </div>)}


        </div>
    )
}

export default ProductList