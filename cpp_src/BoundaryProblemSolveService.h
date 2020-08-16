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

class BoundaryProblemSolveService{

    public:

        BoundaryProblemSolveService(std::vector<std::vector<double>> mesh, std::vector<std::vector<bool>> fixed_indices);


        //Relaxation method
        double relaxPotential_SOR(double del, int max_iter, bool interpolating);

        //Interpolation
        double lagInterpolate(int axis, int x_coord, int y_coord, int num_pointst);        
        double lagInterpolate2(int axis, int x_coord, int y_coord, int num_points);



        //Temp
        void save_to_csv(std::string fname);


    private:

        int rows, cols;
        std::vector<std::vector<double>> mesh;
        std::vector<std::vector<bool>> fixed_indices;

};

#endif
