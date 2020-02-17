import axios from 'axios';
import config from '../config/global';


let config_axios = {
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
}

class AuthService {
    ValidateUser(user) {
        return axios.post(config.apiAddress + '/adminlogin',user, config_axios)
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                return error.response
            });
    }
    
    SignUpUser(user) {
       
        return axios.post(config.apiAddress + '/auth/signup',user)
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                return error
            });
    }

}

const authService = new AuthService();
export default authService;