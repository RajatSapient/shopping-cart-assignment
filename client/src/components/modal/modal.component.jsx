import React from 'react'
import  ReactDom  from 'react-dom'
import "./modal.component.css"

export default function Modal({open,children,onClose}) {
  if(!open) return null
    return ReactDom.createPortal(
        <>
    <div className="modalOverlayStles">
    <div className="modalStyles">
        {children}
    </div>
    </div>
    </>, 
    document.getElementById('portal')

  )
}

