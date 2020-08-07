#include <vector>
#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>
#include <string>
#include <map>
#include <string>
#include <tuple>
#include <fstream>
#include <climits>
#include "eBoundarySolver.h"

using namespace std;



//////////////////////////////////////////
//             Constructors             //
//////////////////////////////////////////

eBoundarySolver::eBoundarySolver(int rows_in, int cols_in){

    rows = rows_in; cols = cols_in;

    vector<vector<double>> blank_mesh(rows, vector<double>(cols, 0));
    vector<vector<bool>> blank_fixed_indices(rows, vector<bool>(cols, false));

    mesh = blank_mesh;
    fixed_indices = blank_fixed_indices;

}


//////////////////////////////////////////
//       Boundary Drawing Methods       //
//////////////////////////////////////////






bool eBoundarySolver::place_rectangle_potential_boundary(int x, int y, int width, int height, double potential){
    /*
      Draw a boundary rectangle with fixed values inside and on the edges,
      its edges parallel to the grid-lines

    */
   

    if( x + width > cols || y + height > rows ){
        return false;
    }

   
   for(int i = 0; i < width; i++){
        for(int j = 0; j < height ; j++){

    	    mesh[x + i][y + j] = potential;
	        fixed_indices[x + i][y + j] = true;

        }
    }

    return true;

}

//TODO: refactor so inside. on the boundary and outside potential is defined
bool eBoundarySolver::place_circle_potential_boundary(int centre_x, int centre_y, int radius, double boundary_potential, map<string,bool> fix_dict){


    //Implementation of Bresenham's Algorithm
    //OOB access's are caught using this try catch block
    try 
    {

        int x_pos = 0, y_pos = radius;
        int decision_param = 3 - (2 * radius);

        complete_octants(centre_x, centre_y, x_pos, y_pos, boundary_potential);

        while( y_pos >= x_pos ) {

            ++x_pos;

            if (decision_param > 0){

                --y_pos;
                decision_param = decision_param + 4 * (x_pos - y_pos) + 10;
            } else {
                decision_param = decision_param + 4 * x_pos + 6;
            }
        
            complete_octants(centre_x, centre_y, x_pos, y_pos, boundary_potential);

        }
    }
    catch(exception& e) //TODO: Decide how to deal with possible errors
    {
        cout << "Array index OOB" << endl;
        return false;
    }

}

void eBoundarySolver::complete_octants(int centre_x, int centre_y, int x, int y, double potential){

    try
    {
        mesh[centre_x + x][ centre_y + y] = potential;
        mesh[centre_x - x][ centre_y + y] = potential;
        mesh[centre_x + x][ centre_y - y] = potential;
        mesh[centre_x - x][ centre_y - y] = potential;
        mesh[centre_x + y][ centre_y + x] = potential;
        mesh[centre_x - y][ centre_y + x] = potential;
        mesh[centre_x + y][ centre_y - x] = potential;
        mesh[centre_x - y][ centre_y - x] = potential;
    }
    catch(exception& e)
    {
        throw e;

    }
}







//////////////////////////////////////////
//          Relaxation Methods          //
//////////////////////////////////////////

double eBoundarySolver::relaxPotential_J(double del, int max_iter, bool interpolating){

     /*
        An implementation of the Jacobi method for relaxaing an ODE

        del - the required accuracy before stopping relaxation
        max_iter - a ceiling on the number of iterations that can occur to give reasonable runtime 
    */



    //Need to know how big a change each step of relaxation causes 
    //so we can determine when to stop i.e. when diminished returns
    double change = (double) INT_MAX; 
    int iter_count = 0;

    //Values needed for equations
    double hx = 1 / (double)rows, hy = 1 / (double)cols;
    double alpha = pow(hx/hy, 2);


    std::vector<std::vector<double>> original_potential = mesh;
    


    while(iter_count < max_iter){

        //Initialise change as will keep a running total for each mesh point
        change = 0;

        vector<vector<double>> original_potential = mesh;





        //Loop over all points
        for(int i = 0; i != rows; ++i){ 
            for(int j = 0; j != cols; ++j){
            
                
                if(fixed_indices[i][j]){

                    continue;

                } else {



                    
                    double x_before = 0;
                    double x_after = 0;
                    double y_before = 0;
                    double y_after = 0;

                    if(interpolating){
                        x_before = i == 0 ? lagInterpolate(0, i-1, j, 3) : original_potential[i-1][j];
                        x_after = i == rows - 1 ? lagInterpolate(0, i-1, j, 3) : original_potential[i+1][j];
                        y_before = j == 0 ? lagInterpolate(1, i, j-1, 3) : original_potential[i][j-1];
                        y_after = j == cols - 1 ? lagInterpolate(1, i, j-1, 3) : original_potential[i][j+1];  
                    
                    } else {
                        //Basic handling of non-boundary edges
                        //For edges, just take the current value so the average is slightly weighted towards its current value
                        x_before = i == 0 ? original_potential[i][j] : original_potential[i-1][j];
                        x_after = i == rows - 1 ? original_potential[i][j] : original_potential[i+1][j];
                        y_before = j == 0 ? original_potential[i][j] : original_potential[i][j-1];
                        y_after = j == cols - 1 ? original_potential[i][j] : original_potential[i][j+1]; 


                    }

                    mesh[i][j] = 1/(2 *(1 + alpha) ) 
                             * ( x_before + x_after + alpha*(y_before + y_after) );

                    

                    double difference = mesh[i][j] - original_potential[i][j];
                    change += difference * difference; // add difference squared

                }
            }
        }


        //get RMS of change
        change = sqrt( change / (rows*cols) );
        //keep track of number of iterations
        ++iter_count;
        cout << "ignore";

        if(iter_count%500 == 0){
            

            cout << "At iteration: " << iter_count << " with accuracy: " << change << endl;
        }
    }

    return change;

}


double eBoundarySolver::relaxPotential_GS(double del, int max_iter, bool interpolating){

     /*
        An implementation of the Gauss-Seidel method for relaxaing an ODE
        
        del - the required accuracy before stopping relaxation
        max_iter - a ceiling on the number of iterations that can occur to give reasonable runtime 
    */



    //Need to know how big a change each step of relaxation causes 
    //so we can determine when to stop i.e. when diminished returns
    double change = (double) INT_MAX; 
    int iter_count = 0;

    //Values needed for equations
    double hx = 1 / (double)rows, hy = 1 / (double)cols;
    double alpha = pow(hx/hy, 2);




    while(change > del && iter_count < max_iter){

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


                    mesh[i][j] = 1/(2 *(1 + alpha) ) 
                             * ( x_before + x_after + alpha*(y_before + y_after) );

                    

                    double difference = mesh[i][j] - original_potential;
                    change += difference * difference; // add difference squared

                }
            }
        }


        //get RMS of change
        change = sqrt( change / (rows*cols) );
        cout << "ignore";

        //keep track of number of iterations
        ++iter_count;

        if(iter_count%500 == 0){
            cout << "At iteration: " << iter_count << " with accuracy: " << change << endl;
        }
    }

    return change;
}

double eBoundarySolver::relaxPotential_SOR(double del, int max_iter, bool interpolating){

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
        change *= 1e7;



        if(iter_count%50 == 1){
            cout << "At iteration: " << iter_count << endl;
            cout << "Change is: " << to_string(change) << endl;
        }
        change /= 1e7;
    }

    return change;

}

//////////////////////////////////////////
//             Interpolation            //
//////////////////////////////////////////


//Use three points
double eBoundarySolver::lagInterpolate(int axis, int x_coord, int y_coord, int num_points){

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
double eBoundarySolver::lagInterpolate2(int axis, int x_coord, int y_coord, int num_points){

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









double eBoundarySolver::get_abs_error(int rows, int cols, vector<vector<double>> A, vector<vector<double>> B){

  double err = 0;

  for(int i=0;i<rows;i++){
    for(int j=0;j<cols;j++){
      err += std::abs(A[i][j]-B[i][j]);
    }
  }

  return err;

}





//////////////////////////////////////////
//             File Methods             //
//////////////////////////////////////////

void eBoundarySolver::save_to_csv(string fname){

    ofstream csv_file;

    csv_file.open(fname + ".csv");

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


void eBoundarySolver::save_errors(int iters, double abs_error, double change){

    ofstream csv_file;

    string fname = "CSV_files//errors/Q1_err_ME"; 

    csv_file.open(fname + ".csv", std::ios_base::app);

    csv_file << iters << ";";
    csv_file << abs_error << ";";
    csv_file << change << "\n";


}
