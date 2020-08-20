import React, {Component} from 'react';
import './Sidebar.css';
import { TransitionGroup } from 'react-transition-group';
import CircleCard from './Cards/CircleCard.js';
import Checkbox from './Cards/Checkbox';








class Sidebar extends Component {

    constructor(props){
        super(props);

        




        this.state = {
            checked : false,
            currentlyAdding : false
        }
    }


    addCircle(circle) {

        this.setState({currentlyAdding: false})        
        this.props.addCircle(circle);
        

    }


    render() {


        const currentlyAdding = this.state.currentlyAdding;



        let addingDropdown = currentlyAdding ? 
            <CircleCard 
                inserting={true} 
                updateable={true}
                insertNewCircle={(circle) => {this.addCircle(circle)}}
            /> 
            : 
            null;


        return(
            <div className={this.props.className}>

                <div className="AppTitle">
                    Electrostatic Boundary Problem Solver
                </div>

                <div className="ShapeListContainer">
                    <div className="ShapeTitle" onClick={ () => this.addCircle()}>Shapes</div>
                    <div className="PlusSign" onClick={ () => this.setState({currentlyAdding: true})}>


                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                    </div>

                    {addingDropdown}

                    <TransitionGroup className="ShapeList">
                        <div>
                        {
                            this.props.circleList.map( (x,i) => 
                            <CircleCard  
                                Circle={x} 
                                id={i}
                                inserting={false} 
                                updateable={false}
                                
                            />)
                        }
                        </div>
                    </TransitionGroup>





                </div>


                <div className="RelaxButton" onClick={this.props.handleRelaxClick}>
                    <div>{this.props.relaxButtonText}</div>
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


