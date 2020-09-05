import React, {Component} from 'react';
import './Card.css';
import {CSSTransition} from 'react-transition-group';
import SettingsItem from './SettingsItem.js';


class Rectangle {

    constructor(cornerX, cornerY, width, height){
        this.cornerX = cornerX
        this.cornerY = cornerY
        this.width = width
        this.height = height
    }

}

class RectangleCard extends Component{


    constructor(props) {
        super(props);


        this.state = {
            showCard: true,
            Rectangle: "Rectangle" in props ? props.Rectangle : new Rectangle(20,20,10,10),
            insertingHeight: "16vh",
            normalHeight: "12vh"
        }
    }
    

    addNewRectangle() {

        let newRectangle = {
            ...this.state.Rectangle
        }
        this.props.insertNewRectangle(newRectangle);
    
    }

    render(){

        let confirmButton = null;

        if(this.props.inserting){
            confirmButton = 
                <div 
                    className="ConfirmButton" 
                    onClick={() => this.addNewRectangle()}
                    style={{top:"12vh", left: "24vh"}}  
                >
                    <div>Confirm</div>
                </div>
        }



        return(
            <CSSTransition
                in={this.state.showCard}
                timeout={300}
                classNames= {this.props.inserting ? "CardInsert RectangleCardInsert" : "Card RectangleCard"}
                style = {this.props.inserting ? {height:this.state.insertingHeight} : {height:this.state.normalHeight}}
                unmountOnExit
            >

                <div 
                className={this.props.inserting ? "CardInsert RectangleCardInsert" : "Card RectangleCard"}
                style = {this.props.inserting ? {height:this.state.insertingHeight} : {height:this.state.normalHeight}}
                >


                    <div className="CardTitle">{this.props.inserting ? "New Rectangle": "Rectangle " + (this.props.id + 1)}</div>

                    <div className={"Dustbin"} onClick={() => this.props.removeRectangle(this.props.id)}>
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
                    </div>


                    <div className="PotentialSettings" style={{top: "5.85vh"}}> 
        
                            <SettingsItem 
                                title={"Corner X"} 
                                inputType="text" 
                                textboxValue={this.state.Rectangle.cornerX}
                                setTextboxValue={(newCornerX) => this.setState({Rectangle: {...this.state.Rectangle, cornerX: parseFloat(newCornerX)}})}
                                updateable={this.props.updateable}
                            />
                            <SettingsItem 
                                title={"Corner Y"} 
                                inputType="text" 
                                textboxValue={this.state.Rectangle.cornerY} 
                                setTextboxValue={(newCornerY) => this.setState({Rectangle: {...this.state.Rectangle, cornerY: parseFloat(newCornerY)}})}      
                                updateable={this.props.updateable}
                            />
                        
                    </div>

                    <div className="PotentialSettings" style={{top: "8.6vh"}}> 

                        <SettingsItem 
                            title={"Width"} 
                            inputType="text" 
                            textboxValue={this.state.Rectangle.width} 
                            setTextboxValue={(newWidth) => this.setState({Rectangle: {...this.state.Rectangle, width: parseFloat(newWidth)}})}
                            updateable={this.props.updateable}
                        />

                        <SettingsItem 
                            title={"Height"} 
                            inputType="text" 
                            textboxValue={this.state.Rectangle.height} 
                            setTextboxValue={(newHeight) => this.setState({Rectangle: {...this.state.Rectangle, height: parseFloat(newHeight)}})}
                            updateable={this.props.updateable}
                        />

                    </div>


                    {confirmButton}
                    </div>

            </CSSTransition>
        )
        
    }

}


export default RectangleCard