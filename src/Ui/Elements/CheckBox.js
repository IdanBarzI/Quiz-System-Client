import './CheckBox.css'
import {useState, useEffect} from 'react';
import {Line, Icon} from 'UIKit'
//square
const CheckBox = (props) => {
    const renderCheckBox = () => {
        if(props.isChecked){
            return <Icon i = 'check-square'></Icon>
        }
        return <Icon i = 'square'></Icon>
    }

    return(
        <div className="CheckBox" onClick={props.onClick}>
            <Line justify="start">
                {renderCheckBox()}
                {props.children}
            </Line>
        </div>
    )
}

export default CheckBox;