



class BoundaryGenerationService {

    constructor(rows, cols){
  
        this.rows = rows;
        this.cols = cols;
  
        this.mesh = Array(rows).fill().map((() => Array(cols).fill(0)));
        this.fixedIndices = Array(rows).fill().map(() => (Array(cols).fill(false)));

        
    }

    placeRectangleBoundary(rectangle){

        let cornerX, cornerY, width, height, potential, fill;

        ({cornerX, cornerY, width, height, potential, fill} = {...rectangle} )

        if (fill){
            for(let i = cornerX; i <= cornerX+width; ++i){
                for(let j = cornerY; j <= cornerY+height; ++j){

                    if(this.coordInRange(i,j)){
                        this.mesh[i][j] = potential;
                        this.fixedIndices[i][j] = true;
                    }
                }
            }
        } else {

            for(let i = cornerX; i <= cornerX + width; ++i){

                if(this.coordInRange(i, cornerY)){
                    this.mesh[i][cornerY] = potential;
                    this.fixedIndices[i][cornerY] = true;
                }

                if(this.coordInRange(i, cornerY+height)){
                    this.mesh[i][cornerY+height] = potential;
                    this.fixedIndices[i][cornerY+height] = true;
                }
            }

            for(let j = cornerY; j <= cornerY + height; ++j){
                
                if(this.coordInRange(cornerX, j)){
                    this.mesh[cornerX][j] = potential;
                    this.fixedIndices[cornerX][j] = true;
                }

                if(this.coordInRange(cornerX+width, j)){
                    this.mesh[cornerX+width][j] = potential;
                    this.fixedIndices[cornerX+width][j] = true;
                }

            }

        }


    }




  
    placeCirclePotentialBoundary(circle){

        let centreX, centreY, radius, 
        setExternal, setInternal, 
        internalPotential, externalPotential, boundaryPotential;

        ({centreX, centreY, radius, 
            setExternal, setInternal, 
            internalPotential, externalPotential, boundaryPotential
        } = {...circle} )


        var hasNotBeenFilled = Array(this.rows).fill().map(() => Array(this.cols).fill(true));

        var allPassed = true;


        var xPos = 0;
        var yPos = radius;
        var decisionParam = 3 - (2 * radius);

        allPassed &= this.completeOctants(centreX, centreY, xPos, yPos, boundaryPotential, hasNotBeenFilled);

        while( yPos >= xPos ) {

            ++xPos;

            if (decisionParam > 0){

                --yPos;
                decisionParam = decisionParam + 4 * (xPos - yPos) + 10;
    
            } else {
    
                decisionParam = decisionParam + 4 * xPos + 6;
    
            }

            allPassed &= this.completeOctants(centreX, centreY, xPos, yPos, boundaryPotential, hasNotBeenFilled);

        }


        
        if(setInternal)
            this.fillTool(centreX, centreY, internalPotential, hasNotBeenFilled);

        if(setExternal)
            this.fillExterior(externalPotential, hasNotBeenFilled);
    
        return allPassed;
    };
  


    completeOctants(centreX, centreY, x, y, potential, hasNotBeenFilled){
        
        var allPassed = true

        allPassed &= this.fillInMeshForCircle(centreX + x, centreY + y, potential, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX - x, centreY + y, potential, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX + x, centreY - y, potential, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX - x, centreY - y, potential, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX + y, centreY + x, potential, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX - y, centreY + x, potential, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX + y, centreY - x, potential, hasNotBeenFilled);
        allPassed &= this.fillInMeshForCircle(centreX - y, centreY - x, potential, hasNotBeenFilled);

        return allPassed;

    }


    fillInMeshForCircle(x, y, potential, hasNotBeenFilled){
        
        if(!this.coordInRange(x,y))
            return false;
        
        this.mesh[x][y] = potential;
        this.fixedIndices[x][y] = true;
        hasNotBeenFilled[x][y] = false;

        return true;

    }



    fillTool(x, y, potential, hasNotBeenFilled){
        
        if(this.coordInRange(x,y) && hasNotBeenFilled[x][y]){

            this.fillInMeshForCircle(x, y, potential, hasNotBeenFilled);

            if(this.coordInRange(x+1, y))
            this.fillTool(x+1, y, potential, hasNotBeenFilled);
            
            if(this.coordInRange(x-1, y))
            this.fillTool(x-1, y, potential, hasNotBeenFilled);
            
            if(this.coordInRange(x, y+1))
            this.fillTool(x, y+1, potential, hasNotBeenFilled);
            
            if(this.coordInRange(x, y-1))
            this.fillTool(x, y-1, potential, hasNotBeenFilled);


        }

    }



    fillExterior(exteriorPotential, hasNotBeenFilled){

        for(let i = 0; i !== this.rows; ++i){
            if (hasNotBeenFilled[i][0])
            {
                this.fillTool(i, 0, exteriorPotential, hasNotBeenFilled);
            }   
        }
    
        //check right sie
        for(let j = 1; j !== this.cols; ++j){
                    if (hasNotBeenFilled[this.rows-1][j])
            {
                this.fillTool(this.rows-1, j, exteriorPotential, hasNotBeenFilled);
            }   
        }
    
        //check bottom side
        for(let i = 0; i !== this.rows-1; ++i){
            if (hasNotBeenFilled[i][this.cols-1])
            {
                this.fillTool(i, this.cols-1, exteriorPotential, hasNotBeenFilled);
            }   
        }
    
    
        //Check the left side
        for(let j = 1; j !== this.cols-1; ++j){
                    if (hasNotBeenFilled[0][j])
            {
                this.fillTool(this.rows-1, j, exteriorPotential, hasNotBeenFilled);
            }   
        }    
    }


    coordInRange(x, y){
        return x < this.rows && y < this.cols && x >= 0 && y >= 0;
    }




  }




export default BoundaryGenerationService;