



class BoundaryGenerationService {

    constructor(rows, cols){
  
        this.rows = rows;
        this.cols = cols;
  
        this.mesh = Array(rows).fill().map((() => Array(cols).fill(0)));
        this.fixedIndices = Array(rows).fill().map(() => (Array(cols).fill(false)));

        
    }
  
    placeCirclePotentialBoundary(circle){

        let centreX, centreY, radius, 
        setExternal, setBoundary, setInternal, 
        internalPotential, externalPotential, boundaryPotential,
        internalFixed, externalFixed, boundaryFixed;

        ({centreX, centreY, radius, 
            setExternal, setBoundary, setInternal, 
            internalPotential, externalPotential, boundaryPotential,
            internalFixed, externalFixed, boundaryFixed
        } = {...circle} )


        var hasNotBeenFilled = Array(this.rows).fill().map(() => Array(this.cols).fill(true));

        var allPassed = true;

        if(setBoundary){

            var xPos = 0;
            var yPos = radius;
            var decisionParam = 3 - (2 * radius);

            allPassed &= this.completeOctants(centreX, centreY, xPos, yPos, boundaryPotential,boundaryFixed, hasNotBeenFilled);

            while( yPos >= xPos ) {

                ++xPos;

                if (decisionParam > 0){

                    --yPos;
                    decisionParam = decisionParam + 4 * (xPos - yPos) + 10;
    
                } else {
    
                    decisionParam = decisionParam + 4 * xPos + 6;
    
                }

                allPassed &= this.completeOctants(centreX, centreY, xPos, yPos, boundaryPotential,boundaryFixed, hasNotBeenFilled);

            }
        }

        
        if(setInternal)
            this.fillTool(centreX, centreY, internalPotential, internalFixed, hasNotBeenFilled);

        if(setExternal)
            this.fillExterior(externalPotential, externalFixed, hasNotBeenFilled);
    
        return allPassed;
    };
  


    completeOctants(centreX, centreY, x, y, potential, boundaryFixed, hasNotBeenFilled){
        
        var allPassed = true

        allPassed &= this.fillInMeshForCircle(centreX + x, centreY + y, potential, boundaryFixed, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX - x, centreY + y, potential, boundaryFixed, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX + x, centreY - y, potential, boundaryFixed, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX - x, centreY - y, potential, boundaryFixed, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX + y, centreY + x, potential, boundaryFixed, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX - y, centreY + x, potential, boundaryFixed, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX + y, centreY - x, potential, boundaryFixed, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX - y, centreY - x, potential, boundaryFixed, hasNotBeenFilled);

        return allPassed;

    }


    fillInMeshForCircle(x, y, potential, fixed, hasNotBeenFilled){
        
        if(!this.coordInRange(x,y))
            return false;
        
        this.mesh[x][y] = potential;
        this.fixedIndices[x][y] = fixed;
        hasNotBeenFilled[x][y] = false;

        return true;

    }



    fillTool(x, y, potential, fixed, hasNotBeenFilled){
        
        if(this.coordInRange(x,y) && hasNotBeenFilled[x][y]){

            this.fillInMeshForCircle(x, y, potential, fixed, hasNotBeenFilled);

            if(this.coordInRange(x+1, y))
            this.fillTool(x+1, y, potential, fixed, hasNotBeenFilled);
            
            if(this.coordInRange(x-1, y))
            this.fillTool(x-1, y, potential, fixed, hasNotBeenFilled);
            
            if(this.coordInRange(x, y+1))
            this.fillTool(x, y+1, potential, fixed, hasNotBeenFilled);
            
            if(this.coordInRange(x, y-1))
            this.fillTool(x, y-1, potential, fixed, hasNotBeenFilled);


        }

    }



    fillExterior(exteriorPotential, exteriorFixed, hasNotBeenFilled){

        for(let i = 0; i !== this.rows; ++i){
            if (hasNotBeenFilled[i][0])
            {
                this.fillTool(i, 0, exteriorPotential, exteriorFixed, hasNotBeenFilled);
            }   
        }
    
        //check right sie
        for(let j = 1; j !== this.cols; ++j){
                    if (hasNotBeenFilled[this.rows-1][j])
            {
                this.fillTool(this.rows-1, j, exteriorPotential, exteriorFixed, hasNotBeenFilled);
            }   
        }
    
        //check bottom side
        for(let i = 0; i !== this.rows-1; ++i){
            if (hasNotBeenFilled[i][this.cols-1])
            {
                this.fillTool(i, this.cols-1, exteriorPotential, exteriorFixed, hasNotBeenFilled);
            }   
        }
    
    
        //Check the left side
        for(let j = 1; j !== this.cols-1; ++j){
                    if (hasNotBeenFilled[0][j])
            {
                this.fillTool(this.rows-1, j, exteriorPotential, exteriorFixed, hasNotBeenFilled);
            }   
        }    
    }


    coordInRange(x, y){
        return x < this.rows && y < this.cols && x >= 0 && y >= 0;
    }




  }




export default BoundaryGenerationService;