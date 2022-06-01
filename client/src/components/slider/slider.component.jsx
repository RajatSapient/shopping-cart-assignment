import React,{useState,useEffect} from 'react'
import { getBanner } from '../../services/services'
import leftArrow from "../../assets/images/left-arrow.svg"
import rightArrow from "../../assets/images/right-arrow.svg"
import  "./slider.component.css"

const Slider = () => {
    const [data,setData] = useState([])
    const [current,setCurrent] = useState(1)
    const length = data.length
    
    const getBannerData = async() => {
        const response = await getBanner()
        setData(response)
    }
    
    useEffect(()=>{
        getBannerData()
    },[])

    
    const nextSlide = () =>{
        setCurrent(current === length-1 ? 0 : current+1)

    }


    const prevSlide = () =>{
        setCurrent(current === 0 ? length-1 : current-1)
    }

    const moveDot = (index) => {
        setCurrent(index+1)
    }


  return (<>
    <div className="container-slider ecom-flex" id="container-slider"  >
        {data.map((slide,index)=>{
            return (
                <div 
                key={slide.id} 
                className={index === current ? "slide-active-anim ecom-flex ecom-justify-content-center ecom-align-items-center ecom-flex-grow-1":"slide"}
                id="slide-active"
                >
            {index === current &&  ( <img src= {slide.bannerImageUrl} alt={slide.bannerImageAlt}/>)}
                
                </div>
            )
        })}
       
    </div>
     <button className="btn-slide-next" onClick={nextSlide}><img src ={leftArrow} /></button>
     <button className="btn-slide-prev" onClick={prevSlide} ><img src ={rightArrow} /></button>
     <div className='container-dots'>
         {Array.from({length:5}).map((cv,index)=>{
             return(
                 <div
                  className={current === index+1 ? "dot active cursor-pointer" :"dot" }
                  onClick = {()=> moveDot(index+1)}                 
                  >
                  </div>
             )
         })}
     </div>
     </>
  )
}

export default Slider