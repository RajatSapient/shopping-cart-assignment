import React, { useState, useEffect } from "react"
import { getCategoryData ,getBanner} from "../services/services"
import CategoryList from "../components/category-list/category-list.component";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick";


const Home = () => {


    const [categories, setCategories] = useState([])
    const [data,setData] = useState([])

    const getBannerData = async() => {
        const response = await getBanner()
        setData(response)
    }
    
    useEffect(()=>{
        getBannerData()
    },[])

    const fetchCategoriesData = async () => {
        const response = await getCategoryData()
        setCategories(response)
    }

    useEffect(() => {

        fetchCategoriesData()
    }, [])

    const renderSlides = () =>
    data?.length === 0 ? (<h1>Loading Slides</h1>):
    data.map( ({bannerImageUrl,bannerImageAlt,id}) => {
     return( <div key={id}>
                <img src= {bannerImageUrl} alt={bannerImageAlt}/>
      </div>
     )
    });

    return (
   
        <>
            <div className="ecom-hero-banner">
                <Slider dots={true} >{renderSlides()}</Slider>
            </div>

            {categories?.length === 0 ? (
                <div className="ecom-homecategories-wraper">No Data in Categories</div>) : (
                <ul className="ecom-homecategories-wraper">
                    {categories.map((data) => {
                        return (
                            <CategoryList categoriesData={data} key={data.id} /> 
                        )
                    })}

                </ul>
            )}





            {/* <CategoryList categoriesData={categories} /> */}
           
        </>
    )
}

export default Home


