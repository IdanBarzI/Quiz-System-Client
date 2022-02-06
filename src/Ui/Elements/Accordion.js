import { useState } from 'react';
import { Line, Icon } from 'UIKit';

import "./Accordion.css";

const Accordion = (props) => {
    const [list, setList] = useState(props.list);

    const handleSelected = (selectedId) => {
        const clonedList = list.map(i => {
            if (i.id === selectedId) {
                i.isOpen = !i.isOpen;
            } else if (!props.isMulti) {
                i.isOpen = false;
            }
            return i;
        });

        setList(clonedList)
    }

    const renderList = () => {
        return props.list.map(i => {
            const isSelected = i.isOpen;

            return (
                <li
                    className={isSelected ? 'selected' : ''}
                    key={i.id}
                    onClick={() => { handleSelected(i.id) }}
                >
                    <div className="header">
                        <Line>
                            <Icon i={isSelected ? 'caret-down' : 'caret-right'} />
                            <h3>{i.header}</h3>
                        </Line>
                    </div>
                    {isSelected &&
                        <div className="content">
                            {i.content}
                        </div>
                    }

                </li>
            )
        })
    }

    return (
        <div className="Accordion">
            <ul>
                {renderList()}
            </ul>
        </div>
    )
}

export default Accordion;