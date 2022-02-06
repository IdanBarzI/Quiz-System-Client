import './RadioBtn.css'
import {Line, Icon} from 'UIKit'

const RadioBtn = (props) => {
    const handleselect = (selected) => {
        console.log(selected.id)
        if(props.onChange){
            props.onChange(selected.id)
        }
    }

    const WhatIcon = (id) => {
        if(id === props.selected){
            return `dot-circle`;
        }
        return `circle`;
    }
    const renderList = () => {
        if(!props.list) {return null}

        return props.list.map(i=>{
            const isSelected = (i.id === props.selected);
                return (<li className={isSelected ? 'selected' : ''} key={i.Id} onClick={() => { handleselect(i) }}>
                    <Line jusify='between'>
                       <Icon i = {WhatIcon(i.id)}/>
                        <h3>{i.value}</h3>
                    </Line>
                </li>
            )
        })
    }

    return(
        <div className="RadioBtn">
            <h3>RadioBtn </h3>
            <ul>
            {renderList()}
            </ul>
        </div>
    )
}

export default RadioBtn;