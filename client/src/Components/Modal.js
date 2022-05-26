import React from 'react'
import  ReactDom  from 'react-dom'
import "./Modal.css"

export default function Modal({open,children,onClose}) {
  if(!open) return null
    return ReactDom.createPortal(
        <>
    <div className="modalOverlayStles">
    <div className="modalStyles">
        {/* <button onClick={onClose}>Close Modal</button> */}
        {children}
    </div>
    </div>
    </>, 
    document.getElementById('portal')

  )
}

