import axios from "axios";

class AuthApi{
    postApiCall(url,data){
       return axios.post(url,data);
    }
}

const SERVER = 'http://apps.codebetter.in:8082/cbjobportal/auth';

export const urls = {
    LOGIN:`${SERVER}/login`,
}

export default new AuthApi;