import React from 'react'
import classes from './Popupwindow.module.css'

const PopupWindow = (props) => {
  return (
    <div className={classes.content}>
    <button className={classes.close} onClick={props.setClose}>X</button>
    {props.children}
    </div>  
  )
}

export default PopupWindow