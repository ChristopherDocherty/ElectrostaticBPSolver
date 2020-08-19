import React, {Component} from 'react';
import './SettingsItem.css';
import Checkbox from './Checkbox.js';


class SettingsItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked : props.checked,
            textboxValue : props.textboxValue /*will eb shallow copy as primitive types*/
        }

    }


    setChecked = (newCheckedVal) => {
        this.setState({checked: newCheckedVal});

        /*Apply change to inherited state state */
        if("setChecked" in this.props)
            this.props.setChecked(newCheckedVal);

    };


    setTextboxValue = (e) => {
        this.setState({textboxValue: e.target.value});

        if("setTextboxValue" in this.props)
            this.props.setTextboxValue(e.target.value);

    }


    render(){

        if(this.props.inputType === "checkbox"){
            return(


                <label className="SettingsItem">
                    <div>{this.props.title}</div> 
                    <Checkbox checked={this.state.checked} setChecked = {this.setChecked} updateable={this.props.updateable}/>
                </label>


            );
        }

        if(this.props.inputType === "text"){
            return(
                <label className="SettingsItem">
                    <div>{this.props.title}</div>         
                    <input style={{background:"white"}} type="text" value={this.state.textboxValue} onChange= {(e) => this.setTextboxValue(e)} disabled={!this.props.updateable} />        
                </label>


            );
        }

        return null;
    }
}

export default SettingsItem;