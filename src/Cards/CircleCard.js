import React, {Component} from 'react';
import './CircleCard.css';
import {CSSTransition} from 'react-transition-group';
import SettingsItem from './SettingsItem.js';


class Circle{
    constructor(centreX, centreY, radius, params){
        this.centreX = centreX;
        this.centreY = centreY;
        this.radius = radius;

        this.setExternal         = params.setExternal; 
        this.setBoundary         = params.setBoundary; 
        this.setInternal         = params.setInternal;
        this.internalPotential   = params.internalPotential;
        this.externalPotential   = params.externalPotential;
        this.boundaryPotential   = params.boundaryPotential;
        this.internalFixed       = params.internalFixed;
        this.externalFixed       = params.externalFixed;
        this.boundaryFixed       = params.boundaryFixed;

    }

}

class CircleCard extends Component {

    constructor(props) {
        super(props);


        const params = {
            setInternal : false,
            setExternal : false,
            setBoundary : true,
        
            internalPotential : 0,
            externalPotential: 0,
            boundaryPotential: 0,
        
            internalFixed: false,
            externalFixed: false,
            boundaryFixed: false
        };

        this.state = {
            showCard: true,
            Circle: "Circle" in props ? props.Circle : new Circle(0, 2, 0, params)
        }
    }
    

    addNewCircle() {

        //COnstruct new circle here
        
        let newCircle = {
            ...this.state.Circle
        }
        this.props.insertNewCircle(newCircle);
    
    }




    render(){

        let confirmButton = null;

        if(this.props.inserting){
            confirmButton = 
                <div className="ConfirmButton" onClick={() => this.addNewCircle()}>
                    <div>Confirm</div>
                </div>
        }



        return(
                <CSSTransition
                    in={this.state.showCard}
                    timeout={300}
                    classNames= {this.props.inserting ? "CircleCardInsert" : "CircleCard"}
                    unmountOnExit
                  >

                    <div className={this.props.inserting ? "CircleCardInsert" : "CircleCard"}>


                        <div className="CardTitle">Circle 1</div>

                        <div className={"Dustbin"} style={this.props.inserting ? {display: "none"} : null} onClick={() => this.props.removeCircle(this.props.id)}>
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
                        </div>

                        <div className="SubTitle" style={{top: "12.4vh"}}>Boundary</div>
                        <div className="SubTitle" style={{top: "18.5vh"}}>Inside</div>
                        <div className="SubTitle" style={{top: "24.5vh"}}>Outside</div>

                        <div className="PotentialSettings" style={{top: "5.85vh"}}> 
            
                                <SettingsItem 
                                    title={"Centre X"} 
                                    inputType="text" 
                                    textboxValue={this.state.Circle.centreX}
                                    setTextboxValue={(newCentreX) => this.setState({Circle: {...this.state.Circle, centreX: parseFloat(newCentreX)}})}
                                    updateable={this.props.updateable}
                                />
                                <SettingsItem 
                                    title={"Centre Y"} 
                                    inputType="text" 
                                    textboxValue={this.state.Circle.centreY} 
                                    setTextboxValue={(newCentreY) => this.setState({Circle: {...this.state.Circle, centreY: parseFloat(newCentreY)}})}      
                                    updateable={this.props.updateable}
                                />
                            
                        </div>

                        <div className="PotentialSettings" style={{top: "8.6vh"}}> 

                            <SettingsItem 
                                title={"Radius"} 
                                inputType="text" 
                                textboxValue={this.state.Circle.radius} 
                                setTextboxValue={(newRadius) => this.setState({Circle: {...this.state.Circle, radius: parseFloat(newRadius)}})}
                                updateable={this.props.updateable}
                            />

                        </div>


                        <div className="PotentialSettings" style={{top: "15.1vh"}}> 
                            <SettingsItem 
                                title="Fix Values" 
                                inputType="checkbox" 
                                checked={this.state.Circle.boundaryFixed}
                                setChecked={(newBoundaryFixed) => this.setState({Circle: {...this.state.Circle, boundaryFixed: newBoundaryFixed}})}
                                updateable={this.props.updateable}
                            />
                            <SettingsItem 
                                title="Potential" 
                                inputType="text" 
                                textboxValue={this.state.Circle.boundaryPotential} 
                                setTextboxValue={(newBoundaryPotential) => this.setState({Circle: {...this.state.Circle, boundaryPotential: parseFloat(newBoundaryPotential)}})}
                                updateable={this.props.updateable}
                            
                            />
                        </div>

                        <div className="PotentialSettings" style={{top: "21.5vh"}}> 
                            <SettingsItem 
                                title="Fix Values" 
                                inputType="checkbox" 
                                checked={this.state.Circle.internalFixed}
                                setChecked={(newInternalFixed) => this.setState({Circle: {...this.state.Circle, internalFixed: newInternalFixed}})}
                                updateable={this.props.updateable}
                            />
                            <SettingsItem 
                            title="Potential" 
                            inputType="text" 
                            textboxValue={this.state.Circle.internalPotential} 
                            setTextboxValue={(newInternalPotential) => this.setState({Circle: {...this.state.Circle, internalPotential: parseFloat(newInternalPotential)}})}
                            updateable={this.props.updateable}
                        />
                        </div>

                        <div className="PotentialSettings" style={{top: "27.7vh"}}> 
                            <SettingsItem 
                                title="Fix Values" 
                                inputType="checkbox" 
                                checked={this.state.Circle.externalFixed}
                                setChecked={(newExternalFixed) => this.setState({Circle: {...this.state.Circle, externalFixed: newExternalFixed}})}
                                 
                                updateable={this.props.updateable}
                            />
                            <SettingsItem 
                                title="Potential" 
                                inputType="text" 
                                textboxValue={this.state.Circle.externalPotential} 
                                setTextboxValue={(newExternalPotential) => this.setState({Circle: {...this.state.Circle, externalPotential: parseFloat(newExternalPotential)}})}
                                updateable={this.props.updateable}
                            />
                        </div>


                        {confirmButton}
                      </div>

                </CSSTransition>
        )
    }


}
export default CircleCard;