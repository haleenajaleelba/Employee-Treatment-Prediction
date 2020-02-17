import axios from 'axios';
import config from '../config/global';

let config_axios = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }
}


class EmailService {
    sendEmail(email_body, access_token){
        config_axios.headers['Authorization'] = 'Bearer ' + access_token;
        console.log("emailService:", email_body);

        return axios.post(config.apiAddress + '/sendmail', email_body, config_axios)
        .then(function(response) {
            console.log(response);
            return response;
        }).catch(function(error)  {
            console.log(error.response);
            return error.response;
        });
    }
}

const emailService = new EmailService();
export default emailService;