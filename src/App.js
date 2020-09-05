import React from 'react';
import BoundaryGenerationService from './BoundarySolver/BoundaryGenerationService';
import BoundaryProblemSolveService from './BoundarySolver/BoundaryProblemSolveService';
import Sidebar from "./Sidebar.js";
import Heatmap from './Heatmap.js';
import ParentSize from '@vx/responsive/lib/components/ParentSize';

import './App.css';


class App extends React.Component {


  constructor(props){
    super(props);


    this.state = {
      circleList: [],
      rectangleList: [],
      isRelaxed: false,
      relaxButtonText: "Relax",
      useLagrangeInterpol: true
    }


  }



  
  addCircle(circle) {
    
    this.setState({circleList: [...this.state.circleList, circle]});
    
  }


  removeCircle(index) {
    this.setState({circleList: this.state.circleList.splice(0,index).concat(this.state.circleList.splice(index+1))});
  }

  addRectangle(rectangle) {
    
    this.setState({rectangleList: [...this.state.rectangleList, rectangle]});
    
  }


  removeRectangle(index) {
    this.setState({rectangleList: this.state.rectangleList.splice(0,index).concat(this.state.rectangleList.splice(index+1))});
  }


  handleRelaxClick(){
    this.setState({isRelaxed: !this.state.isRelaxed});
    this.setState({relaxButtonText: this.state.relaxButtonText === "Relax" ? "Unrelax" : "Relax"})
  }


  convertToHeatmapJSON(mesh){

    let binList = [];

    for(let i = 0; i !== mesh.length; ++i){

        let outerBinsList = {
            bin: 0,
            bins: []
        };
        for(let j = 0; j !== mesh[0].length; ++j){
            
            let innerJSONDict = {
                bin: 0,
                count: mesh[i][j]
            }

            outerBinsList.bins.push(innerJSONDict);
        }

        binList.push(outerBinsList);
    }

    return binList;

}




  createMeshFromShapeList(){

    let BGService = new BoundaryGenerationService(50, 50);

    this.state.circleList.forEach((circle) => BGService.placeCirclePotentialBoundary(circle));
    this.state.rectangleList.forEach((rectangle) => BGService.placeRectangleBoundary(rectangle));

    if(this.state.isRelaxed){
      let BPSService = new BoundaryProblemSolveService(BGService.mesh, BGService.fixedIndices);

          BPSService.relaxPotentialSOR(0.00001, 150, this.state.useLagrangeInterpol);

          return BPSService.mesh;

    } else {
      return BGService.mesh;
    }

  }





  render() {



    let meshForDisplay = this.createMeshFromShapeList();
    let JSONforDisplay = this.convertToHeatmapJSON(meshForDisplay);
    


    return( 
      <div>
          <div className="testing" >
          <ParentSize className="graph-container" debounceTime={100}>
           {({ width: visWidth, height: visHeight }) => 
                <Heatmap width={visWidth} height={visWidth} binData={JSONforDisplay}/>
              }
            
          </ParentSize>
          </div>

          <Sidebar 
            className="Sidebar" 
            circleList={this.state.circleList} 
            addCircle={(circle) => this.addCircle(circle)} 
            removeCircle={(i) => this.removeCircle(i)}
            rectangleList={this.state.rectangleList}
            addRectangle={(rectangle) => this.addRectangle(rectangle)}
            removeRectangle={(i) => this.removeRectangle(i)}
            handleRelaxClick={() => this.handleRelaxClick()}
            relaxButtonText={this.state.relaxButtonText}
            handleLagrangeInterpol={() => this.setState({useLagrangeInterpol: !this.state.useLagrangeInterpol})}
            useLagrangeInterpol={this.state.useLagrangeInterpol}
          />

      </div>
    );
  }
}
export default App;
