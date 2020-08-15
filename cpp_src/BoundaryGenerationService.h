#ifndef GUARD_GENERATIONSERVICE
#define GUARD_GENERATIONSERVICE


#include <map>
#include <vector>
#include <string>





//Design this service to perform operations using pass by reference not by value
class BoundaryGenerationService{


    public:

        BoundaryGenerationService(int rows, int cols, std::vector<std::vector<double>> &mesh, std::vector<std::vector<bool>> &fixed_indices);
        BoundaryGenerationService() = default;


        bool place_rectangle_potential_boundary(int x, int y, int width, int height, double potential);
        bool place_circle_potential_boundary(int x, int y, int radius, double boundary_potential, std::map<std::string,bool> fix_dict); //refactor
        //For above ^^^ maybe use a struct to hold the option  data?
    
    private:
        void complete_octants(int centre_x, int centre_y, int x, int y, double potential);

        int rows, cols;
        
        std::vector<std::vector<double>> mesh;
        std::vector<std::vector<bool>> fixed_indices;

};

#endif
