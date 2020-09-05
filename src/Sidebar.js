import React, {Component} from 'react';
import './Sidebar.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CircleCard from './Cards/CircleCard.js';
import Checkbox from './Cards/Checkbox';
import RectangleCard from './Cards/RectangleCard.js';








class Sidebar extends Component {

    constructor(props){
        super(props);

        this.state = {
            showAddShape: false,
            currentlyAdding: false,
            shapeBeingAdded: "rectangle"
        }
    }


    addCircle(circle) {

        this.setState({currentlyAdding: false})        
        this.props.addCircle(circle);
        

    }

    addRectangle(rectangle) {
        this.setState({currentlyAdding: false})
        this.props.addRectangle(rectangle)
    }


    render() {

        console.log(this.state.shapeBeingAdded);
        let addingShape = null

        if(this.state.currentlyAdding){
            if(this.state.shapeBeingAdded == "circle")
                addingShape =  <CircleCard 
                                    inserting={true} 
                                    updateable={true}
                                    insertNewCircle={(circle) => {this.addCircle(circle)}}
                                    removeCircle={() => this.setState({currentlyAdding: !this.state.currentlyAdding})}
                                /> 
            else if (this.state.shapeBeingAdded == "rectangle")
                addingShape = <RectangleCard 
                                inserting={true} 
                                updateable={true}
                                insertNewRectangle={(rectangle) => {this.addRectangle(rectangle)}}
                                removeRectangle={() => this.setState({currentlyAdding: !this.state.currentlyAdding})}
                                /> 

        }



        return(
            <div className={this.props.className}>

                <div className="AppTitle">
                    Electrostatic Boundary Problem Solver
                </div>

                <div className="ShapeListContainer">
                    <div className="ShapeTitle">Shapes</div>

                    <div className="HideForAnimation"></div>

                    <CSSTransition in={this.state.showAddShape} timeout={300} classNames="NewShapesContainer">
                        <div className="NewShapesContainer">

                            <div className="NewCircleIcon" onClick={ () => this.setState({currentlyAdding: true, showAddShape: false, shapeBeingAdded:"circle"})}></div>
                            <div className="NewRectangleIcon" onClick={ () => this.setState({currentlyAdding: true, showAddShape: false, shapeBeingAdded:"rectangle"})}></div>
                        </div>                    
                    </CSSTransition>

                    <CSSTransition in={this.state.showAddShape} timeout={300} classNames="PlusSign">
                        <div className="PlusSign" onClick={ () => this.setState({showAddShape: !this.state.showAddShape})}>
                    


                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                        </div>
                    </CSSTransition>


                    <TransitionGroup className="ShapeList">
                        <div>

                        {addingShape}


                        {
                            this.props.rectangleList.map( (x,i) => 
                            <RectangleCard  
                                Rectangle={x} 
                                id={i}
                                inserting={false} 
                                updateable={false}
                                removeRectangle={this.props.removeRectangle}
                                
                            />)
                        }

                        {
                            this.props.circleList.map( (x,i) => 
                            <CircleCard  
                                Circle={x} 
                                id={i}
                                inserting={false} 
                                updateable={false}
                                removeCircle={this.props.removeCircle}
                                
                            />)
                        }
                        </div>
                    </TransitionGroup>





                </div>


                <div className="RelaxButton" onClick={this.props.handleRelaxClick}>
                    <div>{this.props.relaxButtonText}</div>
                </div>

                <label className="InterpolSetting">
                    <Checkbox checked={this.props.useLagrangeInterpol} setChecked = {this.props.handleLagrangeInterpol} updateable={true}/>
                    <div style={{marginLeft:"1.5vh"}}>Use Lagrange Interpolation</div>
                </label>

            </div>
        )
    }

}


export default Sidebar;


