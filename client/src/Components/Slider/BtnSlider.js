import React from 'react'

export const BtnSlider = ({direction,moveSlide}) => {
  console.log(direction,moveSlide)
    return (
    <div>
        <button
            onClick={moveSlide}
            className= { direction === "next" ? 'btn-slide-next' :'btn-slide-prev'}
        >Prev</button>
    </div>
  )
}
