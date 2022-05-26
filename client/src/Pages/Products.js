import React,{useState,useEffect} from "react"
import { getProductList,getCategoryData } from "../Services/Services"
import { useStateValue } from "../context/StateProvider"

import { useLocation } from "react-router-dom"


const Products = () => {
    const { state } = useLocation();
    const statess = state ? state: `all`
    console.log(statess)
    const [products, setProducts] = useState([])
    const [filterProducts,setFilterProducts] = useState([])
    const[category,setCategory] = useState([])
    const [tabStatus, setTabStatus ] = useState(statess)
    const [{basket},dispatch] = useStateValue()
    const [windowInnerWidth,setWindowInnerWidth] = useState(window.innerWidth)


    useEffect(()=>{
        const handleResize = () => {
            setWindowInnerWidth(window.innerWidth)
        }
        window.addEventListener("resize",handleResize)
        return ()=>{
        window.removeEventListener("resize",handleResize)
        }
    },[])



    const fetchProductsData = async() => {
        const response = await getProductList()
        console.log(response)
        setProducts(response)
        setFilterProducts(response)
    }

    useEffect(()=> {
        fetchProductsData()
    },[])


    useEffect(()=>{
        console.log("Tab Status Changed")
        if(tabStatus === `all`) return
        setFilterProducts(products.filter((ele)=>{
            return ele.category === tabStatus
        }))
        console.log("Tab Status is done")
    },[tabStatus,products])

    const fetchCategoryData = async() => {
        const response = await getCategoryData()
        console.log(response)
        setCategory(response)
    }

    useEffect(()=> {
        fetchCategoryData()
    },[])


    const addToBasket = (id,imageURL,price,description,name) => {
        console.log("I'm Clicked")
        dispatch({
            type: 'ADD_TO_BASKET',
            payload: {
                id,
                imageURL,
                price,
                description,
                name}
        })
        console.log("I'm Clicked Hahaaha")
    }

    return (<>
        <section className  = "ecom-productlisting ecom-flex ">
        <div className  = "container ecom-flex ecom-mob-flex-wrap">
            <div className  = "ecom-product-category-sidebar" id="category-sidebar">
                <ul>
                    {category.map(({id,name}) =>{ 
                        return (
                            <li key={id} >
                                <a className = {tabStatus === id ? "active cursor-pointer": "cursor-pointer "} onClick={ () => setTabStatus(id) }>{name}</a>
                             </li>)
                    })
                    }
                </ul> 
            </div>
            <div className ="ecom-productl ecom-flex">
            {filterProducts?.length === 0 ?(
            <div className="ecom-align-items-center ecom-justify-content-center ecom-flex-grow-1 ecom-flex"><h1>No Products Are available under this Category</h1></div>):( 
            <div className  = "ecom-product-category-plisting" id= "ecom-productListing">
                <div className="ecom-flex ecom-flexwrap">
                    {filterProducts?.map((ele) => {
                        const {id,imageURL,price,description,name} = ele;
                        return(
                            <div key = {id} className ="ecom-productcard ecom-flex ecom-flex-direction-column ecom-text-center">
                            <h2 className ="ecom-productcart-title">{name}</h2>
                            <div className ="productimg-card">
                                <div className ="productimg-wrapper ecom-flex">
                                    <img className ="hddg" src = {`${imageURL}`} alt= {name} />
                                </div>

                                {windowInnerWidth > 767 ?(
                                <div className  = "product-desc">
                                    {description}
                                </div>
                                ): (
                                <div className="ecom-flex ecom-flex-direction-column">
                                    <div className  = "product-desc">
                                        {description}
                                    </div>   
                                    <button className ="ecom-category-btn cursor-pointer button" style={{marginTop:"15px"}} onClick={() => addToBasket(id,imageURL,price,description,name)}>
                                        {`Buy Now @ Rs ${price}` }
                                    </button>
                                </div>
                                )}
                            </div>
                            <div className  = "ecom-category-btn-wrapper ecom-justify-content-between ecom-flex ecom-align-items-center">
                                {windowInnerWidth > 1024 ? (<span>MRP Rs: {price}</span>) : (<></>) }
                                {windowInnerWidth < 768 ?( <></>) :(
                                <button className ="ecom-category-btn cursor-pointer button" onClick={() => addToBasket(id,imageURL,price,description,name)}>
                                  {windowInnerWidth > 1024 ?  "Buy Now" : `Buy Now @ Rs ${price}` }
                                </button>
                        )}

                            </div>
                        </div>
                        )
                    })
                }

                </div> 
            </div>  )}


            </div> 
        </div>
    </section>
    </>)
}

export default React.memo(Products)