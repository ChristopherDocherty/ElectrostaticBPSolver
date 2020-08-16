#define _USE_MATH_DEFINES
#include <vector>
#include <cmath>
#include <iostream>
#include <string>
#include <map>
#include <climits>
#include "BoundaryProblemSolveService.h"

using namespace std;



//////////////////////////////////////////
//             Constructors             //
//////////////////////////////////////////

BoundaryProblemSolveService::BoundaryProblemSolveService(vector<vector<double>> mesh, vector<vector<bool>> fixed_indices): mesh(mesh), fixed_indices(fixed_indices){

    rows = mesh.size();
    cols = mesh[0].size();

}



//////////////////////////////////////////
//          Relaxation Methods          //
//////////////////////////////////////////


double BoundaryProblemSolveService::relaxPotential_SOR(double del, int max_iter, bool interpolating){

     /*
        An implementation of the SOR method for relaxaing an ODE
        
        del - the required accuracy before stopping relaxation
        max_iter - a ceiling on the number of iterations that can occur to give reasonable runtime 
    */



    //Need to know how big a change each step of relaxation causes 
    //so we can determine when to stop i.e. when diminished returns
    double change = (double) INT_MAX;
    int iter_count =0;

    //Values needed for equations
    double hx = 1 / (double)rows, hy = 1 / (double)cols;
    double alpha = pow(hx/hy, 2);

    double omega = 2/ ( 1 + sin(M_PI*hx) );
    double one_minus_omega = 1 - omega; 





    while(change> del && iter_count < max_iter){

        //Initialise change as will keep a running total for each mesh point
        change = 0;

        //Loop over all points
        for(int i = 0; i != rows; ++i){ 
            for(int j = 0; j != cols; ++j){
            
                
                if(fixed_indices[i][j]){

                    continue;

                } else {

                    //save original value for change calculation
                    double original_potential = mesh[i][j];                

                    double x_before = 0;
                    double x_after = 0;
                    double y_before = 0;
                    double y_after = 0;

                    if(interpolating){
                        x_before = i == 0 ? lagInterpolate(0, i-1, j, 3) : mesh[i-1][j];
                        x_after = i == rows - 1 ? lagInterpolate(0, i-1, j, 3) : mesh[i+1][j];
                        y_before = j == 0 ? lagInterpolate(1, i, j-1, 3) : mesh[i][j-1];
                        y_after = j == cols - 1 ? lagInterpolate(1, i, j-1, 3) : mesh[i][j+1]; 
                    
                    } else {
                        //Basic handling of non-boundary edges
                        //For edges, just take the current value so the average is slightly weighted towards its current value

                        x_before = i == 0 ? mesh[i][j] : mesh[i-1][j];
                        x_after = i == rows - 1 ? mesh[i][j] : mesh[i+1][j];
                        y_before = j == 0 ? mesh[i][j] : mesh[i][j-1];
                        y_after = j == cols - 1 ? mesh[i][j] : mesh[i][j+1]; 

                    }


                    double average_potential = 1/(2 *(1 + alpha) ) 
                             * ( x_before + x_after + alpha*(y_before + y_after) );

                    mesh[i][j] = one_minus_omega * mesh[i][j] + omega * average_potential;

                    double difference = mesh[i][j] - original_potential;
                    change += difference * difference; // add difference squared
                }
            }
        }


        //get RMS of change
        change = sqrt( change / double((rows*cols)) );
        //keep track of number of iterations
        ++iter_count;
    }

    return change;

}

//////////////////////////////////////////
//             Interpolation            //
//////////////////////////////////////////


//Use three points
double BoundaryProblemSolveService::lagInterpolate(int axis, int x_coord, int y_coord, int num_points){

    double zp = 0;

    int coord = (axis == 0 ? x_coord : y_coord); 

    //Need to ensure interpolation is in the correct direction
    //Can be left or right and the sign of change determines this
    int change = coord < 0 ? -1 : 1;

    for(int i = coord - (change * num_points) ; i !=coord; i += change ){

        double p = 0;

        for( int j = coord - (change * num_points); j != coord; j += change){

            if( i != j ) p *= (coord - j) / (i - j);
            
        }

        int mesh_x = (axis == 0 ? i : x_coord);
        int mesh_y = (axis == 1 ? i : y_coord);

        zp += p * mesh[mesh_x][mesh_y];
    }

    return zp;

}


//Use three points
double BoundaryProblemSolveService::lagInterpolate2(int axis, int x_coord, int y_coord, int num_points){

    double zp = 0;

    int coord = (axis == 0 ? x_coord : y_coord); 

    //Need to ensure interpolation is in the correct direction
    //Can be left or right and the sign of change determines this
    int change = coord < 0 ? -1 : 1;

    for(int i = coord - (change * num_points) ; i !=coord; i += change ){

        double p = 3*2*1/2;

        int mesh_x = (axis == 0 ? i : x_coord);
        int mesh_y = (axis == 1 ? i : y_coord);

        zp += p * mesh[mesh_x][mesh_y];
    }

    return zp;

}







//////////////////////////////
//        Testing only      //
//////////////////////////////


void BoundaryProblemSolveService::save_to_csv(string fname){

    ofstream csv_file;

    csv_file.open(fname);

    for(int i = 0; i != rows; ++i){
        for(int j = 0; j != cols; ++j){
    
            csv_file << mesh[i][j];

            if(j != mesh.size()-1){
                csv_file << ";";
            }

        }
        csv_file << "\n";
    }

    csv_file.close();

}	



