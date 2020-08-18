import React, {useState, Component} from 'react';
import './CircleCard.css';
import {CSSTransition} from 'react-transition-group';
import SettingsItem from './SettingsItem.js';


class CircleCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCard: true
        }
    }
    

    render(){

        return(
                <CSSTransition
                    in={this.state.showCard}
                    timeout={300}
                    classNames="CircleCard"
                    unmountOnExit
                  >

                    <div className="CircleCard">


                        <div className="CardTitle">Circle 1</div>

                        <div className="SubTitle" style={{top: "12.4vh"}}>Boundary</div>
                        <div className="SubTitle" style={{top: "18.5vh"}}>Inside</div>
                        <div className="SubTitle" style={{top: "24.5vh"}}>Outside</div>

                        <div className="PotentialSettings" style={{top: "5.85vh"}}> 
            
                                <SettingsItem title={"Centre X"} inputType="text" textboxValue={this.props.Circle.centreX} updateable={this.props.updateable}/>
                                <SettingsItem title={"Centre Y"} inputType="text" textboxValue={this.props.Circle.centreY} updateable={this.props.updateable}/>
                            
                        </div>

                        <div className="PotentialSettings" style={{top: "8.6vh"}}> 

                            <SettingsItem title={"Radius"} inputType="text" textboxValue={this.props.Circle.radius} updateable={this.props.updateable}/>

                        </div>


                        <div className="PotentialSettings" style={{top: "15.1vh"}}> 
                            <SettingsItem title="Fix Values" inputType="checkbox" checked={this.props.Circle.boundaryFixed} updateable={this.props.updateable}/>
                            <SettingsItem title="Potential" inputType="text" textboxValue={this.props.Circle.boundaryPotential} updateable={this.props.updateable}/>
                        </div>

                        <div className="PotentialSettings" style={{top: "21.5vh"}}> 
                            <SettingsItem title="Fix Values" inputType="checkbox" checked={this.props.Circle.internalFixed} updateable={this.props.updateable}/>
                            <SettingsItem title="Potential" inputType="text" textboxValue={this.props.Circle.internalPotential} updateable={this.props.updateable}/>
                        </div>

                        <div className="PotentialSettings" style={{top: "27.7vh"}}> 
                            <SettingsItem title="Fix Values" inputType="checkbox" checked={this.props.Circle.externalFixed} updateable={this.props.updateable}/>
                            <SettingsItem title="Potential" inputType="text" textboxValue={this.props.Circle.externalPotential} updateable={this.props.updateable}/>
                        </div>



                      </div>

                </CSSTransition>
        )
    }


}
export default CircleCard;