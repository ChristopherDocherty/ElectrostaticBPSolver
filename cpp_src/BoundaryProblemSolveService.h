#ifndef GUARD_SOLVERSERVICE
#define GUARD_SOLVERSERVICE

#include <vector>
#include <cmath>
#include <iostream>
#include <string>
#include <map>
#include <string>
#include <tuple>
#include <fstream>
#include "BoundaryGenerationService.h"

class BoundaryProblemSolveService{

    public:

        BoundaryProblemSolveService(int rows, int cols);


        //Relaxation method
        double relaxPotential_SOR(double, int, bool);

        //Interpolation
        double lagInterpolate(int, int, int, int);        
        double lagInterpolate2(int, int, int, int);

        double get_abs_error(int rows, int cols, std::vector<std::vector<double>> A, std::vector<std::vector<double>> B);

        //Boundary Generation Wrappers
        bool place_rectangle_potential_boundary(int x, int y, int width, int height, double potential);
        bool place_circle_potential_boundary(int x, int y, int radius, double boundary_potential, std::map<std::string,bool> fix_dict); //refactor



    private:

        int rows, cols;
        std::vector<std::vector<double>> mesh;
        std::vector<std::vector<bool>> fixed_indices;
        BoundaryGenerationService boundaryGenerationService;

};

#endif
