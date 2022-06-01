import React from 'react'
import PageNotFound from "../../assets/images/404.gif"

const NotFound = () => {
  return (
    <div className = "ecom-flex ecom-align-items-center ecom-justify-content-center" style={{marginTop:`160px` , marginBottom: `50px`}}>
        <img src = {PageNotFound} alt="Page Not Found"/>
    </div>
  )
}

export default NotFound