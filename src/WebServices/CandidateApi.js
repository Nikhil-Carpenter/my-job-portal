import axios from "axios";

class CandidateApi {
  getApiCallToken(url, token) {
    return axios.get(url, { headers: { Authorization: "Bearer " + token } });
  }

  getApiCall(url) {
    return axios.get(url);
  }

  postApiCallToken(url, data, token) {
    return axios.post(url, data, {
      headers: { Authorization: "Bearer " + token,"content-type": "multipart/form-data" },
    });
  }
  postApiCall(url, data, token) {
    return axios.post(url, data);
  }
  putApiCallToken(url, data, token) {
    return axios.put(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    });
  }
  deleteApiCallToken(url, token) {
    return axios.delete(url, { headers: { Authorization: "Bearer " + token } });
  }
}

// const SERVER = 'http://apps.codebetter.in:8082/cbjobportal/api/';

export const urls_candidate = {
  RESUME_UPLOAD: "http://apps.codebetter.in:8082/cbjobportal/applyjob/apply",
  REGISTER_USER:'http://apps.codebetter.in:8082/cbjobportal/candidate/save',
  JOB_APPLIED_BY_CANDIDATE:"http://apps.codebetter.in:8082/cbjobportal/applyjob/applied-jobs",
  JOB_LIST_BY_CATEGORY_ID:' http://apps.codebetter.in:8082/cbjobportal/jobs/list/'
};

export default new CandidateApi();
