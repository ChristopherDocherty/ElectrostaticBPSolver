#ifndef GUARD_GENERATIONSERVICE
#define GUARD_GENERATIONSERVICE


#include <map>
#include <vector>
#include <string>


struct circle_boundary_params{

    bool set_internal;
    bool set_external;
    bool set_boundary;

    double internal_potential;
    double external_potential;
    double boundary_potential;

    bool internal_fixed;
    bool external_fixed;
    bool boundary_fixed;
};

class BoundaryGenerationService{


    public:

        BoundaryGenerationService(int rows, int cols);
        BoundaryGenerationService(std::vector<std::vector<double>> mesh, std::vector<std::vector<bool>> fixed_indices);


        bool place_rectangle_potential_boundary(int x, int y, int width, int height, double potential);
        bool place_circle_potential_boundary(int x, int y, int radius, circle_boundary_params params); 

        std::vector<std::vector<double>> get_mesh();
        std::vector<std::vector<bool>> get_fixed_indices();


    private:

        bool complete_octants(int centre_x, int centre_y, int x, int y, double potential, bool boundary_fixed, std::vector<std::vector<bool>> &has_not_been_filled);
        bool fill_in_mesh_for_circle(int x, int y, double potential, bool boundary_fixed, std::vector<std::vector<bool>> &has_not_been_filled);

        void fill_tool(int x, int y, double potential, bool fixed, std::vector<std::vector<bool>> &has_not_been_filled);
        void fill_exterior(double exterior_potential, bool exterior_fixed, std::vector<std::vector<bool>> &has_not_been_filled);

        bool coord_in_range(int x, int y);

        int rows, cols;
        
        std::vector<std::vector<double>> mesh;
        std::vector<std::vector<bool>> fixed_indices;

};





#endif
