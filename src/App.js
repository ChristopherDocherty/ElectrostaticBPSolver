import React from 'react';
import BoundaryGenerationService from './BoundarySolver/BoundaryGenerationService';
import BoundaryProblemSolveService from './BoundarySolver/BoundaryProblemSolverService';

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

class App extends React.Component {

  wrapper() {
    var test = new BoundaryGenerationService(50, 50);

    const params = {
      setInternal : true,
      setExternal : true,
      setBoundary : true,
  
      internalPotential : 3,
      externalPotential: -1,
      boundaryPotential: 1,
  
      internalFixed: false,
      externalFixed: false,
      boundaryFixed: true
    };

    var test_circle =  new Circle(25, 25, 10, params);

    test.placeCirclePotentialBoundary(test_circle);
    
    var second_test = new BoundaryProblemSolveService(test.mesh, test.fixedIndices);
    second_test.relaxPotentialSOR(0.0001, 100, false);
    console.log("stop");

  }


  render() {



    return (<div onClick={this.wrapper} style={{width:"300px", height:"150px", background:"aquablue"}}>press</div>);
  }
}
export default App;
