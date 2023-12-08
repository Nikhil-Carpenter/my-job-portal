import axios from "axios";

class AdminApi{

    getApiCallToken(url,token){
        return axios.get(url,{headers:{Authorization:'Bearer '+token}});
    }

    getApiCall(url){
        return axios.get(url);
    }

    postApiCallToken(url,data,token){
        return axios.post(url,data,{headers:{Authorization:'Bearer '+token}});
    }
    putApiCallToken(url,data,token){
        return axios.put(url,data,{headers:{Authorization:'Bearer '+token,"content-type":"application/json"}});
    }
    deleteApiCallToken(url,token){
        return axios.delete(url,{headers:{Authorization:'Bearer '+token}})
    }
}

const SERVER = 'http://apps.codebetter.in:8082/cbjobportal/api/';

export const urls = {
    ADDHR: `${SERVER}user/hrsave`,
    HRLIST:`${SERVER}user/lists`,
    CATEGORYSAVE:`${SERVER}category/save`,
    CATEGORYLIST:`${SERVER}category/list`,
    HRUPDATE:`${SERVER}user/update/`,
    HRDELETE:`${SERVER}user/delete/`,
    CATEGORYUPDATE:`${SERVER}category/update/`,
    JOBLIST:'http://apps.codebetter.in:8082/cbjobportal/jobs/list',
    CANDIDATE_LIST_ADMIN:'http://apps.codebetter.in:8082/cbjobportal/candidate/lists'
}

export default new AdminApi;