import numpy as np
import json


relaxed_arr = np.loadtxt("Q3.csv", delimiter=";")



test_arr = np.array([[0,1,2,3],[4,5,6,7]])

for x_coord in range(0,test_arr.shape[1]):
    for y_coord in range(0,test_arr.shape[0]):
        print( str(test_arr[y_coord,x_coord]) + " -> " + str(x_coord) + "," + str(y_coord))



data_lst =[]

for j in range(0,relaxed_arr.shape[1]):
    outer_bins_lst = {
        "bin": 0,
        "bins": [],
    }
    for i in range(0,relaxed_arr.shape[0]):


        inner_json_dict = {
            "bin": 0,
            "count": relaxed_arr[i,j], 
            }

        outer_bins_lst["bins"].append(inner_json_dict)

    data_lst.append(outer_bins_lst)
        
data_json = {
    "data_lst": data_lst
}


f = open("test_arr_3.json", "w")
f.write(json.dumps(data_json))
f.close()




