import React from 'react'
import { useNavigate } from "react-router-dom";
import "./category-list.component.css"

const CategoryList = (props) => {
    const { categoriesData } = props
    const navigate = useNavigate();


    return (
        <>
            {categoriesData?.length === 0 ? (
                <div className="ecom-homecategories-wraper">No Data in Categories</div>) : (
                <div className="ecom-homecategories-wraper">

                    {categoriesData?.map(({ id, name,key, description, imageUrl }) => {
                        return (
                            <>
                                <div className="ecom-home-categories" key={id}>
                                    <div className="ecom-flex container ecom-align-items-center">
                                        <div className="ecom-flex ecom-flex-50 ecom-home-categories-order">
                                            <div className="ecom-home-categories-imgwrap">
                                                <img src={imageUrl} alt={key} />
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
                                </div>
                            </>
                        )
                    })}

                </div>
            )}
        </>
    )
}

export default CategoryList