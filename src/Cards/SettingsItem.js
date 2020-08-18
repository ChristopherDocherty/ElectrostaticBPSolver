import React, {useState} from 'react';
import './SettingsItem.css';
import { CSSTransition } from 'react-transition-group';




function HiddenCheckbox(props) {
    return(
    <input type="checkbox"
    checked={props.checked}
    onChange={() => {props.setChecked(!props.checked); console.log("Click registered")}}/>
    )    

}


function ShownCheckbox(props) {
    return (
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

    )

}



function SettingsItem(props) {




    const [checked, setChecked] = useState(false);
    const [textboxValue, setTextboxValue] = useState("");


    if(props.inputType === "checkbox"){
        return(


            <label className="SettingsItem">
                <div>{props.title}</div> 
                <ShownCheckbox checked={checked}/>
                <HiddenCheckbox checked={checked} setChecked = {setChecked}/>


            </label>


        );
    }

    if(props.inputType === "text"){
        return(
            <label className="SettingsItem">
                <div>{props.title}</div>         
                <input style={{background:"white"}} type="text" value={textboxValue} onChange= {e => setTextboxValue(e.target.value)} />        
            </label>


        );
    }

    return null;
}

export default SettingsItem;