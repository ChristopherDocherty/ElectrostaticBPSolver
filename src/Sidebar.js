import React, {useState, Component} from 'react';
import './Sidebar.css';
import { TransitionGroup } from 'react-transition-group';
import CircleCard from './Cards/CircleCard.js';
import Checkbox from './Cards/Checkbox';




class Circle{
    constructor(centreX, centreY, radius, params){
        this.centreX = centreX;
        this.centreY = centreY;
        this.radius = radius;

        this.setExternal         = params.setExternal; 
        this.setBoundary         = params.setBoundary; 
        this.internalPotential   = params.internalPotential;
        this.externalPotential   = params.externalPotential;
        this.boundaryPotential   = params.boundaryPotential;
        this.internalFixed       = params.internalFixed;
        this.externalFixed       = params.externalFixed;
        this.boundaryFixed       = params.boundaryFixed;

    }

}



class Sidebar extends Component {

    constructor(props){
        super(props);

        
        var params = {
                setInternal : false,
                setExternal : false,
                setBoundary : true,
            
                internalPotential : 0,
                externalPotential: 1,
                boundaryPotential: 1,
            
                internalFixed: false,
                externalFixed: true,
                boundaryFixed: true
            };



        this.state = {
            circleArr : [
                new Circle(25, 25, 5, params),
                new Circle(25, 25, 15, params),
            ],
            checked : false
        }
    }



    render() {



        return(
            <div className="Sidebar">

                <div className="AppTitle">
                    Electrostatic Boundary Problem Solver
                </div>

                <div className="ShapeListContainer">
                    <div className="ShapeTitle">Shapes</div>
                    <div className="PlusSign" >


                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                    </div>

                    <TransitionGroup className="ShapeList">
                        <div>
                        {
                            this.state.circleArr.map( (x,i) => <CircleCard  Circle={x} id={i} updateable={false}/>)
                        }
                        </div>
                    </TransitionGroup>





                </div>


                <div className="RelaxButton">
                    <div>Relax</div>
                </div>

                <label className="InterpolSetting">
                    <Checkbox checked={this.state.checked} setChecked = {e => {this.setState({checked: !this.state.checked})}} updateable={true}/>
                    <div style={{marginLeft:"1.5vh"}}>Use Lagrange Interpolation</div>
                </label>

            </div>
        )
    }

}


export default Sidebar;