import React, {useState} from 'react';
import './SettingsItem.css';
import Checkbox from './Checkbox.js';


function SettingsItem(props) {




    const [checked, setChecked] = useState(props.checked);
    const [textboxValue, setTextboxValue] = useState(props.textboxValue);


    if(props.inputType === "checkbox"){
        return(


            <label className="SettingsItem">
                <div>{props.title}</div> 
                <Checkbox checked={checked} setChecked = {setChecked} updateable={props.updateable}/>
            </label>


        );
    }

    if(props.inputType === "text"){
        return(
            <label className="SettingsItem">
                <div>{props.title}</div>         
                <input style={{background:"white"}} type="text" value={textboxValue} onChange= {e => setTextboxValue(e.target.value)} disabled={!props.updateable} />        
            </label>


        );
    }

    return null;
}

export default SettingsItem;