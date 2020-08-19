import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Checkbox.css';



function Checkbox(props) {
    return (
        <div>
        <input type="checkbox"
        disabled={!props.updateable}
        checked={props.checked}
        onChange={() => {props.setChecked(!props.checked); console.log("Click registered")}}/>
        <div className="CheckboxTrick">
            <CSSTransition
                in={props.checked}
                timeout={2000}
                classNames="CheckboxTrickInside"
                unmountOnExit
              >

                <div className="CheckboxTrickInside"/>

            </CSSTransition>
        </div>
        </div>
    )

}

export default Checkbox;