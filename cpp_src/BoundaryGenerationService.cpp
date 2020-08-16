
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


bool BoundaryGenerationService::place_circle_potential_boundary(int centre_x, int centre_y, int radius, circle_boundary_params params){


    vector<vector<bool>> has_not_been_filled(rows, vector<bool>(cols, true));

    //Implementation of Bresenham's Algorithm for boundary
    try 
    {

        int x_pos = 0, y_pos = radius;
        int decision_param = 3 - (2 * radius);

        complete_octants(centre_x, centre_y, x_pos, y_pos, params.boundary_potential, params.boundary_fixed, has_not_been_filled);

        while( y_pos >= x_pos ) {

            ++x_pos;

            if (decision_param > 0){

                --y_pos;
                decision_param = decision_param + 4 * (x_pos - y_pos) + 10;

            } else {

                decision_param = decision_param + 4 * x_pos + 6;

            }
        
            complete_octants(centre_x, centre_y, x_pos, y_pos, params.boundary_potential, params.boundary_fixed, has_not_been_filled);

        }
    }
    catch(exception& e) 
    {
        return false;
    }

    //Fill the interior
    if(params.internal_potential != 0 && params.internal_fixed != false)
        fill_tool(centre_x, centre_y,params.internal_potential, params.internal_fixed, has_not_been_filled);

    //Fill the exterior
    fill_exterior(params.external_potential, params.external_potential, has_not_been_filled);
    
    return true;
}

void BoundaryGenerationService::complete_octants(int centre_x, int centre_y, int x, int y, double potential, bool boundary_fixed, vector<vector<bool>> &has_not_been_filled){

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

        fixed_indices[centre_x + x][ centre_y + y] = boundary_fixed;
        fixed_indices[centre_x - x][ centre_y + y] = boundary_fixed;
        fixed_indices[centre_x + x][ centre_y - y] = boundary_fixed;
        fixed_indices[centre_x - x][ centre_y - y] = boundary_fixed;
        fixed_indices[centre_x + y][ centre_y + x] = boundary_fixed;
        fixed_indices[centre_x - y][ centre_y + x] = boundary_fixed;
        fixed_indices[centre_x + y][ centre_y - x] = boundary_fixed;
        fixed_indices[centre_x - y][ centre_y - x] = boundary_fixed;

        has_not_been_filled[centre_x + x][ centre_y + y] = false;
        has_not_been_filled[centre_x - x][ centre_y + y] = false;
        has_not_been_filled[centre_x + x][ centre_y - y] = false;
        has_not_been_filled[centre_x - x][ centre_y - y] = false;
        has_not_been_filled[centre_x + y][ centre_y + x] = false;
        has_not_been_filled[centre_x - y][ centre_y + x] = false;
        has_not_been_filled[centre_x + y][ centre_y - x] = false;
        has_not_been_filled[centre_x - y][ centre_y - x] = false;

    }
    catch(exception& e)
    {
        throw e;

    }
}



//Recursively fill the whatever part of the mesh that hasn't been set yet
//For circle, pass a point inside to fill its interior 
void BoundaryGenerationService::fill_tool(int x, int y, double potential, bool fixed, vector<vector<bool>> &has_not_been_filled){

    if(has_not_been_filled[x][y]){

        mesh[x][y] = potential;
        fixed_indices[x][y] = fixed;
        has_not_been_filled[x][y] = false;

        fill_tool(x+1, y, potential, fixed, has_not_been_filled);
        fill_tool(x-1, y, potential, fixed, has_not_been_filled);
        fill_tool(x, y+1, potential, fixed, has_not_been_filled);
        fill_tool(x, y-1, potential, fixed, has_not_been_filled);

    }
    else {
        return;
    }


}



void BoundaryGenerationService::fill_exterior(double exterior_potential, bool exterior_fixed,  vector<vector<bool>> &has_not_been_filled){

    //Simple way is just to check all the boundary points

    //Check top edge
    for(int i = 0; i != 50; ++i){
        if (has_not_been_filled[i][0])
        {
            fill_tool(i, 0, exterior_potential, exterior_fixed, has_not_been_filled);
        }   
    }

    //check right sie
    for(int j = 1; j != 50; ++j){
                if (has_not_been_filled[rows-1][j])
        {
            fill_tool(rows-1, j, exterior_potential, exterior_fixed, has_not_been_filled);
        }   
    }

    //check bottom side
    for(int i = 0; i != 49; ++i){
        if (has_not_been_filled[i][cols-1])
        {
            fill_tool(i, cols-1, exterior_potential, exterior_fixed, has_not_been_filled);
        }   
    }


    //Check the left side
    for(int j = 1; j != 49; ++j){
                if (has_not_been_filled[0][j])
        {
            fill_tool(rows-1, j, exterior_potential, exterior_fixed, has_not_been_filled);
        }   
    }    


}