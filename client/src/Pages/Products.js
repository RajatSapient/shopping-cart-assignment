import React,{useState,useEffect} from "react"
import { getProductList,getCategoryData } from "../services/services"
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

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
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
    },[tabStatus])


    useEffect(()=> {    
        const fetchCategoryData = async() => {
            const response = await getCategoryData()
            setCategory(response)
        }
        fetchCategoryData()
    },[])

console.log("I'm Render Product Page")

    
    return (
    <>
        <section className  = "ecom-productlisting ecom-flex ">
            <div className  = "container ecom-flex ecom-mob-flex-wrap">

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
                 />

            </div>
        </section>
    </>)
}

export default Products