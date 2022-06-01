import React from 'react'
import HourGlass from "../../assets/images/Hourglass.gif"
import "./full-page-loading-spinner.css"

const FullPageLoader = () => {
  return (
    <div className="fp-container ecom-flex ecom-align-items-center ecom-justify-content-center">
        <img className = "fp-loader" src={HourGlass} alt="loader"/>
    </div>
  )
}

export default FullPageLoader

