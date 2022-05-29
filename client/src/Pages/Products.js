import React,{useState,useEffect} from "react"
import { getProductList,getCategoryData } from "../services/services"
import { useStateValue } from "../context/StateProvider"
import { useLocation } from "react-router-dom"
import ProductList from "../components/product-list/product-list.component"
import CategorySidebar from "../components/category-sidebar/category-sidebar.component"


const Products = () => {
    const { state } = useLocation();
    const urlParam = state ? state: `all`
    const [products, setProducts] = useState([])
    const [filterProducts,setFilterProducts] = useState([])
    const[category,setCategory] = useState([])
    const [tabStatus, setTabStatus ] = useState(urlParam)
    const [{basket},dispatch] = useStateValue()
    const [windowInnerWidth,setWindowInnerWidth] = useState(window.innerWidth)
    const[show,setShow]=useState(false);


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
        setProducts(response)
        setFilterProducts(response)
    }

    useEffect(()=> {
        fetchProductsData()
    },[])


    useEffect(()=>{
        if(tabStatus === `all`) return
        setFilterProducts(products.filter((ele)=>{
            return ele.category === tabStatus
        }))
    },[tabStatus,products])

    const fetchCategoryData = async() => {
        const response = await getCategoryData()
        setCategory(response)
    }

    useEffect(()=> {
        fetchCategoryData()
    },[])


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

    return (<>
        <section className  = "ecom-productlisting ecom-flex ">
        <div className  = "container ecom-flex ecom-mob-flex-wrap">
            {/* {windowInnerWidth < 768 ? 
                    tabStatus === "all" ? 
                     <div className={`ecom-categoriesHeader-mob ecom-justify-content-between ecom-flex ecom-w-100 ecom-align-items-center ${show ? '': 'ecom-mb-30'}`}>
                        <h1>All Categories</h1> 
                        <div style={{width:"20px"}}>
                            <img src={downArrow} onClick={()=>setShow(!show)} alt="downArrow" style={{width:"100%" , height:"auto"}} className={show ? 'arwup': 'arwdown' }/>
                        </div>
                     </div>
                     :
                     <div className={`ecom-categoriesHeader-mob ecom-justify-content-between ecom-flex ecom-w-100 ecom-align-items-center ${show ? '': 'ecom-mb-30'}`}>
                    <h1>{ category.map(({name,id}) => {if(tabStatus === id) return name })}</h1> 
                    <div style={{width:"20px"}}>
                            <img src={downArrow} onClick={()=>setShow(!show)} alt="downArrow" style={{width:"100%" , height:"auto"}} className={show ? 'arwup': 'arwdown'}/>
                        </div>
                    </div>
            : 
            null
            }

            {windowInnerWidth < 768 ? 
                show ? <div className  = "ecom-product-category-sidebar" id="category-sidebar">
                <ul>
                    {category.map(({id,name} ) =>{ 
                        return (
                            <li key={id} onClick={()=>setShow(!show)}  className = {tabStatus === id ? "active active-mob cursor-pointer ": "cursor-pointer "}>
                                <a className = {tabStatus === id ? "active cursor-pointer": "cursor-pointer "} onClick={ () => setTabStatus(id) }>{name}</a>
                             </li>)
                    })
                    }
                </ul> 
            </div>
            : null
             :   

             <div className  = "ecom-product-category-sidebar" id="category-sidebars">
            <ul>
                {category.map(({id,name} ) =>{ 
                    return (
                        <li key={id} onClick={()=>setShow(!show)} className = {tabStatus === id ? "active cursor-pointer": "cursor-pointer "}>
                            <a className = {tabStatus === id ? "active cursor-pointer": "cursor-pointer "} onClick={ () => setTabStatus(id) }>{name}</a>
                         </li>)
                })
                }
            </ul> 
        </div>

            } */}
                <CategorySidebar 
                    categories={category} 
                    screenSize ={windowInnerWidth} 
                    show={show} 
                    setShow={setShow}
                    tabStatus = {tabStatus}
                    setTabStatus = {setTabStatus}
                />
       
                <ProductList 
                   productList = {filterProducts} 
                   screenSize ={windowInnerWidth} 
                   addToBasket={addToBasket}
                />

        </div>
    </section>
    </>)
}

export default React.memo(Products)