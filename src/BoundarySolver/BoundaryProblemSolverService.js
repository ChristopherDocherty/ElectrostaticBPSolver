

class BoundaryProblemSolveService {

    constructor(mesh, fixedIndices){

        this.mesh = mesh;
        this.fixedIndices = fixedIndices;


        this.rows = this.mesh.length;
        this.cols = this.mesh[0].length;
    }


    relaxPotentialSOR(del, maxIter, interpolating){


         /*
            An implementation of the SOR method for relaxaing an ODE

            del - the required accuracy before stopping relaxation
            maxIter - a ceiling on the number of iterations that can occur to give reasonable runtime 
        */

        //Need to know how big a change each step of relaxation causes 
        //so we can determine when to stop i.e. when diminished returns
        var change = Number.MAX_SAFE_INTEGER;
        var iterCount =0;

        //Values needed for equations
        var hx = 1 / this.rows;
        var hy = 1 / this.cols;
        var alpha = Math.pow(hx/hy, 2);

        var omega = 2/ ( 1 + Math.sin(Math.Pi * hx) );
        var oneMinusOmega = 1 - omega; 


        while(change> del && iterCount < maxIter){

            //Initialise change as will keep a running total for each mesh point
            change = 0;
    
            //Loop over all points
            for(let i = 0; i !== this.rows; ++i){ 
                for(let j = 0; j !== this.cols; ++j){
                
                    
                    if(this.fixedIndices[i][j]){
    
                        continue;
    
                    } else {
    
                        //save original value for change calculation
                        var originalPotential = this.mesh[i][j];                
    
                        var xBefore = 0;
                        var xAfter = 0;
                        var yBefore = 0;
                        var yAfter = 0;
    
                        if(interpolating){
                            xBefore = i === 0 ? this.lagInterpolate(0, i-1, j, 3) : this.mesh[i-1][j];
                            xAfter = i === this.rows - 1 ? this.lagInterpolate(0, i-1, j, 3) : this.mesh[i+1][j];
                            yBefore = j === 0 ? this.lagInterpolate(1, i, j-1, 3) : this.mesh[i][j-1];
                            yAfter = j === this.cols - 1 ? this.lagInterpolate(1, i, j-1, 3) : this.mesh[i][j+1]; 
                        
                        } else {
                            //Basic handling of non-boundary edges
                            //For edges, just take the current value so the average is slightly weighted towards its current value
    
                            xBefore = i === 0 ? this.mesh[i][j] : this.mesh[i-1][j];
                            xAfter = i === this.rows - 1 ? this.mesh[i][j] : this.mesh[i+1][j];
                            yBefore = j === 0 ? this.mesh[i][j] : this.mesh[i][j-1];
                            yAfter = j === this.cols - 1 ? this.mesh[i][j] : this.mesh[i][j+1]; 
    
                        }
    
    
                        var average_potential = 1/(2 *(1 + alpha) ) 
                                 * ( xBefore + xAfter + alpha*(yBefore + yAfter) );
    
                        this.mesh[i][j] = oneMinusOmega * this.mesh[i][j] + omega * average_potential;
    
                        var difference = this.mesh[i][j] - originalPotential;
                        change += difference * difference; // add difference squared
                    }
                }
            }


        //get RMS of change
        change = Math.sqrt( change / (this.rows * this.cols) );
        //keep track of number of iterations
        ++iterCount;



        }

    }


    lagInterpolate(axis, xCoord, yCoord, numPoints){

        var zp = 0;

        var coord = (axis === 0 ? xCoord : yCoord); 

        //Need to ensure interpolation is in the correct direction
        //Can be left or right and the sign of change determines this
        var change = coord < 0 ? -1 : 1;
    
        for(let i = coord - (change * numPoints) ; i !== coord; i += change ){
    
            var p = 0;
    
            for( let j = coord - (change * numPoints); j !== coord; j += change){
    
                if( i !== j ) p *= (coord - j) / (i - j);
                
            }
    
            var meshX = (axis === 0 ? i : xCoord);
            var meshY = (axis === 1 ? i : yCoord);
    
            zp += p * this.mesh[meshX][meshY];
        }
    
        return zp;
    }

}

export default BoundaryProblemSolveService;