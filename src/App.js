import React from 'react';
import BoundaryGenerationService from './BoundarySolver/BoundaryGenerationService';
import BoundaryProblemSolveService from './BoundarySolver/BoundaryProblemSolverService';



class App extends React.Component {
  render() {

    var test = new BoundaryGenerationService(50, 50);

    var second_test = new BoundaryProblemSolveService(test.mesh, test.fixedIndices);


    return (<div></div>);
  }
}
export default App;
