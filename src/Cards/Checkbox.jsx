import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Checkbox.css';



function Checkbox(props) {
    const nodeRef = useRef(null);
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
                nodeRef={nodeRef}
              >

                <div className="CheckboxTrickInside" ref={nodeRef}/>

            </CSSTransition>
        </div>
        </div>
    )

}

export default Checkbox;