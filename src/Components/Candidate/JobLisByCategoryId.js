import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CandidateApi, { urls_candidate } from "../../WebServices/CandidateApi";
import { useDispatch, useSelector } from "react-redux";
import { jobListByCatId } from "../../redux/JobListSlice";
import { jobDetail } from "../../redux/AppliedJobSlice";
import Pagination from "../Pagination";

export default function JobLisByCategoryId() {
  const jobListByCate = useSelector((state) => state.jobList.value);
  const user = useSelector((state) => state.authInfo.value);
  const params = useParams();

  //  const [jobByCategory,setJobByCaategory] = useState([]);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryId = params.id;

  async function getJobListByCategoryId() {
    const URL = urls_candidate.JOB_LIST_BY_CATEGORY_ID + categoryId;
    const resp = await CandidateApi.getApiCall(URL);
    console.log(resp);
    if (resp.status) {
      // setJobByCaategory(resp.data.data)
      dispatch(jobListByCatId(resp.data.data));
      setMsg(resp.data.message);
    } else {
      setMsg(resp.data.message);
    }
  }
  useEffect(() => {
    getJobListByCategoryId();
  }, [categoryId]);

  function ApplyJob(ob) {
    if (user.isLogin == false) {
      navigate("/login");
    } else {
      dispatch(jobDetail(ob));
      navigate("/applyjob");
    }
  }

  // pagination code
  var [showPerPage, setSHowPerPage] = useState(5);
  var [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const handleSetPagination = (start, end) => {
    setPagination({ start: start, end: end });
  };
  // pagination code end

  return (
    <>
      <section className="featured-job-area ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>Recent Job</span>
                <h2>Featured {jobListByCate[0]?.categories.title} Jobs</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-10">
              {jobListByCate?.slice(pagination.start,pagination.end).map((ob) => {
                return (
                  <div className="single-job-items mb-30">
                    <div className="job-items">
                      <div className="company-img">
                        <Link to="job_details.html">
                          <img src="/assets/img/icon/job-list1.png" alt="" />
                        </Link>
                      </div>
                      <div className="job-tittle">
                        <Link to="job_details.html">
                          <h4>{ob?.title}</h4>
                        </Link>
                        <ul>
                          <li>{ob.companyName}</li>
                          <li>
                            <i className="fas fa-map-marker-alt"></i>
                            {ob.companyAddress}
                          </li>
                          <li>salary &#8377; {ob.salary}</li>
                          <li>min Exp {ob.experience}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="items-link f-right">
                      <button className="btn mb-1" onClick={() => ApplyJob(ob)}>
                        APPLY NOW
                      </button>

                      <span>{ob.jobtype}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination
          // className="col-lg-4"
          showPerPage={showPerPage}
          handleSetPagination={handleSetPagination}
          total={jobListByCate.length}
          />
          </div>
        </div>
      </section>
      <b>{msg}</b>
    </>
  );
}
