
#include <iostream>
#include <string>
#include <exception>
#include <map>
#include "BoundaryGenerationService.h"

using namespace std;



BoundaryGenerationService::BoundaryGenerationService(vector<vector<double>> mesh, vector<vector<bool>> fixed_indices): mesh(mesh), fixed_indices(fixed_indices){

    rows = mesh.size();
    cols = mesh[0].size();

}


BoundaryGenerationService::BoundaryGenerationService(int rows, int cols): rows(rows), cols(cols){

    vector<vector<double>> blank_mesh(rows, vector<double>(cols, 0));
    vector<vector<bool>> blank_fixed_indices(rows, vector<bool>(cols, false));

    mesh = blank_mesh;
    fixed_indices = blank_fixed_indices;
}



bool BoundaryGenerationService::place_rectangle_potential_boundary(int x, int y, int width, int height, double potential){
    /*
      Draw a boundary rectangle with fixed values inside and on the edges,
      its edges parallel to the grid-lines

    */
   

    if( x + width > cols || y + height > rows ||
        x < 0 || y < 0){
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
    
    bool all_passed = true;

    if(params.set_boundary){
        //Implementation of Bresenham's Algorithm for boundary
        int x_pos = 0, y_pos = radius;
        int decision_param = 3 - (2 * radius);


        all_passed &= complete_octants(centre_x, centre_y, x_pos, y_pos, params.boundary_potential, params.boundary_fixed, has_not_been_filled);

        while( y_pos >= x_pos ) {

            ++x_pos;

            if (decision_param > 0){

                --y_pos;
                decision_param = decision_param + 4 * (x_pos - y_pos) + 10;

            } else {

                decision_param = decision_param + 4 * x_pos + 6;

            }

            all_passed &= complete_octants(centre_x, centre_y, x_pos, y_pos, params.boundary_potential, params.boundary_fixed, has_not_been_filled);

        }
    }

    //Fill the interior
    if(params.set_internal)
        fill_tool(centre_x, centre_y,params.internal_potential, params.internal_fixed, has_not_been_filled);

    //Fill the exterior
    if(params.set_external)
        fill_exterior(params.external_potential, params.external_fixed, has_not_been_filled);
    
    return all_passed;
}

bool BoundaryGenerationService::complete_octants(int centre_x, int centre_y, int x, int y, double potential, bool boundary_fixed, vector<vector<bool>> &has_not_been_filled){

        bool all_passed = true;

        all_passed &= fill_in_mesh_for_circle(centre_x + x, centre_y + y, potential, boundary_fixed, has_not_been_filled);
        all_passed &= fill_in_mesh_for_circle(centre_x - x, centre_y + y, potential, boundary_fixed, has_not_been_filled);
        all_passed &= fill_in_mesh_for_circle(centre_x + x, centre_y - y, potential, boundary_fixed, has_not_been_filled);
        all_passed &= fill_in_mesh_for_circle(centre_x - x, centre_y - y, potential, boundary_fixed, has_not_been_filled);
        all_passed &= fill_in_mesh_for_circle(centre_x + y, centre_y + x, potential, boundary_fixed, has_not_been_filled);
        all_passed &= fill_in_mesh_for_circle(centre_x - y, centre_y + x, potential, boundary_fixed, has_not_been_filled);
        all_passed &= fill_in_mesh_for_circle(centre_x + y, centre_y - x, potential, boundary_fixed, has_not_been_filled);
        all_passed &= fill_in_mesh_for_circle(centre_x - y, centre_y - x, potential, boundary_fixed, has_not_been_filled);

        return all_passed;
}


bool BoundaryGenerationService::fill_in_mesh_for_circle(int x, int y, double potential, bool fixed, vector<vector<bool>> &has_not_been_filled){
    
    if(!coord_in_range(x, y))
        return false;

    mesh[x][y] = potential;
    fixed_indices[x][y] = fixed;
    has_not_been_filled[x][y] = false;

    return true;

}




//Recursively fill the whatever part of the mesh that hasn't been set yet
//For circle, pass a point inside to fill its interior 
void BoundaryGenerationService::fill_tool(int x, int y, double potential, bool fixed, vector<vector<bool>> &has_not_been_filled){

    if(coord_in_range(x, y) && has_not_been_filled[x][y]){


        fill_in_mesh_for_circle(x, y, potential, fixed, has_not_been_filled);

        if(coord_in_range(x+1,y))
        fill_tool(x+1, y, potential, fixed, has_not_been_filled);
        
        if(coord_in_range(x-1,y))
        fill_tool(x-1, y, potential, fixed, has_not_been_filled);
        
        if(coord_in_range(x,y+1))
        fill_tool(x, y+1, potential, fixed, has_not_been_filled);
        
        if(coord_in_range(x,y-1))
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

bool BoundaryGenerationService::coord_in_range(int x, int y){
    return x < rows && y < cols && x >= 0 && y >= 0;
}



vector<vector<double>> BoundaryGenerationService::get_mesh(){
    return mesh;
}

vector<vector<bool>> BoundaryGenerationService::get_fixed_indices(){
    return fixed_indices;
}