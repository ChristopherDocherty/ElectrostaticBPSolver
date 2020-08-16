#ifndef GUARD_GENERATIONSERVICE
#define GUARD_GENERATIONSERVICE


#include <map>
#include <vector>
#include <string>






struct circle_boundary_params{

    double internal_potential;
    double external_potential;
    double boundary_potential;

    bool internal_fixed;
    bool external_fixed;
    bool boundary_fixed;
};

class BoundaryGenerationService{


    public:

        BoundaryGenerationService(int rows, int cols, std::vector<std::vector<double>> &mesh, std::vector<std::vector<bool>> &fixed_indices);
        BoundaryGenerationService() = default;


        bool place_rectangle_potential_boundary(int x, int y, int width, int height, double potential);
        bool place_circle_potential_boundary(int x, int y, int radius, circle_boundary_params params); 
        //For above ^^^ maybe use a struct to hold the option  data?
    
    private:
    
        void complete_octants(int centre_x, int centre_y, int x, int y, double potential, bool boundary_fixed, std::vector<std::vector<bool>> &has_not_been_filled);
        void fill_tool(int x, int y, double potential, bool fixed, std::vector<std::vector<bool>> &has_not_been_filled);
        void fill_exterior(double exterior_potential, bool exterior_fixed, std::vector<std::vector<bool>> &has_not_been_filled);


        int rows, cols;
        
        std::vector<std::vector<double>> mesh;
        std::vector<std::vector<bool>> fixed_indices;

};





#endif
