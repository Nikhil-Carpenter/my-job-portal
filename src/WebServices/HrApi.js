import axios from "axios";

class HrApi{

    getApiCallToken(url,token){
        return axios.get(url,{headers:{Authorization:'Bearer '+token}});
    }

    getApi(url){
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

// const SERVER = 'http://apps.codebetter.in:8082/cbjobportal/api/';

export const urls_hr = {
   CATEGORY_LIST_FOR_HR:'http://apps.codebetter.in:8082/cbjobportal/detail/category/list',
   SAVE_JOBS_BY_HR:"http://apps.codebetter.in:8082/cbjobportal/detail/job/save",
   UPDATE_JOB_BY_HR:"http://apps.codebetter.in:8082/cbjobportal/detail/job/update/",
   ACTIVE_STATUS_BY_HR:'http://apps.codebetter.in:8082/cbjobportal/detail/job/active/',
   DEACTIVE_STATUS_BY_HR:'http://apps.codebetter.in:8082/cbjobportal/detail/job/deactive/ ',
   CANDIDATE_LIST_FOR_HR:'api- http://apps.codebetter.in:8082/cbjobportal/candidate/lists',
   APPLIED_JOB:'http://apps.codebetter.in:8082/cbjobportal/jobs/applied/list',
   CATEGORY:'http://apps.codebetter.in:8082/cbjobportal/categories/list',
   JOB_list:' http://apps.codebetter.in:8082/cbjobportal/jobs/list'
}

export default new HrApi;