#ifndef GUARD_EBOUNDARY
#define GUARD_EBOUNDARY

#include <vector>
#include <cmath>
#include <iostream>
#include <string>
#include <map>
#include <string>
#include <tuple>
#include <fstream>

class eBoundarySolver{

    public:

        //constructor
        eBoundarySolver(int rows, int cols);

        //Boundary condition drawing methods
        bool place_rectangle_potential_boundary(int x, int y, int width, int height, double potential);

        bool place_circle_potential_boundary(int x, int y, int radius, double boundary_potential, std::map<std::string,bool>); //refactor
        void complete_octants(int centre_x, int centre_y, int x, int y, double potential);




        //Relaxation methods
        double relaxPotential_J(double, int, bool);
        double relaxPotential_GS(double, int, bool);
        double relaxPotential_SOR(double, int, bool);

        //Interpolation
        double lagInterpolate(int, int, int, int);        
        double lagInterpolate2(int, int, int, int);

        //Saving methods
        void save_to_csv(std::string);
        void save_errors(int, double, double);

        double get_abs_error(int rows, int cols, std::vector<std::vector<double>> A, std::vector<std::vector<double>> B);

        std::vector<std::vector<double>> mesh;

    private:

        int rows, cols;
        std::vector<std::vector<bool>> fixed_indices;

};

#endif
