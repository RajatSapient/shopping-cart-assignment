import React,{useState,useEffect} from "react"
import { getCategoryData } from "../Services/Services"
// import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Slider from "../Components/Slider/Slider";


const Home = () =>{

    const[category,setCategory] = useState([])
    const navigate = useNavigate();

    const fetchCategoryData = async() => {
        const response = await getCategoryData()
        console.log(response)
        setCategory(response)
    }

    useEffect(()=> {
        fetchCategoryData()
    },[])


    return(
        <>
    <div className = "ecom-hero-banner">
        <Slider />
    </div>


    {category?.length === 0 ? (
    <div className = "ecom-homecategories-wraper">I'm Not Loaded</div>): (
    
    
    <ul className = "ecom-homecategories-wraper">
      
   {category?.map(({id,name,key,description,imageUrl})=>{
       return(
           <>
        <li className = "ecom-home-categories" key={name}>
        <div className = "ecom-flex container ecom-align-items-center">
            <div className = "ecom-flex ecom-flex-50 ecom-home-categories-order">
                <div className = "ecom-home-categories-imgwrap">
                    <img src = {imageUrl} alt={key} />
                </div>
            </div>
            <div className="ecom-flex ecom-flex-50 ecom-flex-direction-column ecom-text-center">
                <h2 className = "ecom-category-heading">{name}</h2>
                <p className = "ecom-category-para">{description}</p>
                <div className = "ecom-category-btn-wrapper">
                    <button className ="button ecom-category-btn cursor-pointer" onClick={ (e) => navigate('/products', {state: id} ) }>{`Explore ${name}`}</button>
                </div>
            </div>
        </div>
    </li>
           </>
       )
   })
}

    </ul>)}
        </>
    )
}

export default Home