import React from 'react';
import BoundaryGenerationService from './BoundarySolver/BoundaryGenerationService';
import BoundaryProblemSolveService from './BoundarySolver/BoundaryProblemSolveService';
import Sidebar from "./Sidebar.js";
import Heatmap from './Heatmap.js';
import InfoModal from './InfoModal.js'
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
      useLagrangeInterpol: true,
      displayModal: true
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

        <InfoModal 
          displayModal={this.state.displayModal}
          toggleModalDisplay={() => this.setState({displayModal: !this.state.displayModal})}  
        />

          <div className="graph" >
          <ParentSize className="graph-container" debounceTime={100}>
           {({ width: visWidth, height: visHeight }) => 
                <Heatmap width={visWidth} height={visWidth} binData={JSONforDisplay}/>
              }
            
          </ParentSize>
          </div>

          <a 
            href="https://github.com/ChristopherDocherty/ElectrostaticBPSolver" 
            className="SourceLink" 
            style={{bottom:"0.7vh", right:"47vh"}}
            target="_blank"
          >
            <svg 
            aria-hidden="true" 
            focusable="false" 
            data-prefix="fab" 
            data-icon="github" 
            className="icon"
            id="github" 
            role="img" 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512">
                <path fill="#1976D2" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z">
                </path>
            </svg>
                
          </a> 
        



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
