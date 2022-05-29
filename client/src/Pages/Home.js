import React, { useState, useEffect } from "react"
import { getCategoryData } from "../services/services"
import { useNavigate } from "react-router-dom";
import Slider from "../components/slider/slider.component";
import CategoryList from "../components/category-list/category-list.component";


const Home = () => {

    const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    const fetchCategoriesData = async () => {
        const response = await getCategoryData()
        setCategories(response)
    }

    useEffect(() => {
        fetchCategoriesData()
    }, [])



    return (
        <>
            <div className="ecom-hero-banner">
                <Slider />
            </div>

            <CategoryList categoriesData={categories} />

        </>
    )
}

export default Home