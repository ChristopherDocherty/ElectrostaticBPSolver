
#include <iostream>
#include <string>
#include <exception>
#include <map>
#include "BoundaryGenerationService.h"

using namespace std;



BoundaryGenerationService::BoundaryGenerationService(int rows, int cols, vector<vector<double>> &mesh, vector<vector<bool>> &fixed_indices): rows(rows), cols(cols), mesh(mesh), fixed_indices(fixed_indices){}




bool BoundaryGenerationService::place_rectangle_potential_boundary(int x, int y, int width, int height, double potential){
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
bool BoundaryGenerationService::place_circle_potential_boundary(int centre_x, int centre_y, int radius, double boundary_potential, map<string,bool> fix_dict){


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

void BoundaryGenerationService::complete_octants(int centre_x, int centre_y, int x, int y, double potential){

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
