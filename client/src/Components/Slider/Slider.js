import React,{useState,useEffect} from 'react'
import { getBanner } from '../../Services/Services'
import leftArrow from "../../assets/images/left-arrow.svg"
import rightArrow from "../../assets/images/right-arrow.svg"
import  "./Slider.css"

const Slider = () => {
    const [data,setData] = useState([])
    const [current,setCurrent] = useState(1)
    const length = data.length

    
    const getBannerData = async() => {
        const response = await getBanner()
        console.log(response)
        setData(response)
        console.log(data)
    }
    
    useEffect(()=>{
        getBannerData()
    },[])
    
    const nextSlide = () =>{
        console.log("Next Slide")
        setCurrent(current === length-1 ? 0 : current+1)

    }


    const prevSlide = () =>{
        console.log("Previous Slide")
        setCurrent(current === 0 ? length-1 : current-1)
    }

    const moveDot = (index) => {
        setCurrent(index+1)
    }

    
  return (<>
    <div className="container-slider ecom-flex">
        {data.map((slide,index)=>{
            console.log(index,current)
            return (
                <div key={slide.id} className={index === current ? "slide-active-anim ecom-flex ecom-justify-content-center ecom-align-items-center ecom-flex-grow-1":"slide"}>
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