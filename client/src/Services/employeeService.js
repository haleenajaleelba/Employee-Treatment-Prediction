import axios from 'axios';
import config from '../config/global';

let config_axios = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        // "Authorization":""
    }
}

class EmployeeService {
    getEmployees(access_token) {
        config_axios.headers['Authorization'] = "Bearer "+ access_token
        // console.log("employee service:", config_axios);
        return axios.get(config.apiAddress + '/getallemployee', config_axios)
            .then(function (response) {
                // console.log("employee service: ", response);
                return response
            })
            .catch(function (error) {
                // console.log("employee service:", error);
                // console.log(error.response)
                return error.response
            });
    }
    
    addEmployee(employee) {
        config_axios.headers["Content-Type"] = "application/json"
        return axios.post(config.apiAddress + '/registeremployee', employee, config_axios)
            .then(function (response) {
                console.log("employee service:", response);
                return response;
            })
            .catch( function(error){
                console.log("employee service error:", error.response)
                return error.response;
            }); 
    }

}

const employeeService = new EmployeeService();
export default employeeService;