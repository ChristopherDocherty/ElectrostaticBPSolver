import React, {useState} from 'react';
import './SettingsItem.css';
import Checkbox from './Checkbox.js';


function SettingsItem(props) {




    const [checked, setChecked] = useState(false);
    const [textboxValue, setTextboxValue] = useState("");


    if(props.inputType === "checkbox"){
        return(


            <label className="SettingsItem">
                <div>{props.title}</div> 
                <Checkbox checked={checked} setChecked = {setChecked}/>
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