import React from 'react'
import { useNavigate } from "react-router-dom";
import "./category-list.component.css"
import NoImg from "../../assets/images/noimg.png"

const CategoryList = ({categoriesData}) => {
    const navigate = useNavigate();
    const {id,name,key,description,imageUrl} = categoriesData


    return (
                <li className="ecom-home-categories" key={name}>
                    <div className="ecom-flex container ecom-align-items-center">
                        <div className="ecom-flex ecom-flex-50 ecom-home-categories-order">
                            <div className="ecom-home-categories-imgwrap">
                                { imageUrl ?<img src={imageUrl} alt={key} /> : <img src={NoImg} alt={key} /> }
                            </div>
                        </div>
                        <div className="ecom-flex ecom-flex-50 ecom-flex-direction-column ecom-text-center">
                            <h2 className="ecom-category-heading">{name}</h2>
                            <p className="ecom-category-para">{description}</p>
                            <div className="ecom-category-btn-wrapper">
                                <button 
                                    className="button ecom-category-btn cursor-pointer" 
                                    onClick={(e) => navigate('/products', { state: id })}>
                                    {`Explore ${name}`}
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
    )
}

export default CategoryList