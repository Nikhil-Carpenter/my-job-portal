import { Link, useNavigate } from "react-router-dom";
import HrApi, { urls_hr } from "../WebServices/HrApi";
import { jobListReducer } from "../redux/JobListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { jobDetail } from "../redux/AppliedJobSlice";
import Pagination from "./Pagination";

const Job = () => {
  const user = useSelector((state) => state.authInfo.value);
  const jobList = useSelector((state) => state.jobList.value);

  const [searchData, setSearchData] = useState(undefined);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useRef();

  async function getJobList() {
    try {
      const response = await HrApi.getApi(urls_hr.JOB_list);
      console.log(response);
      dispatch(jobListReducer(response.data.data));
      // setCate(response.data.data);
    } catch (error) {
      // setMsg("Server error");
    }
  }
  useEffect(() => {
    getJobList();
  }, []);

  function ApplyJob(ob) {
    if (user.isLogin == false) {
      navigate("/login");
    } else {
      dispatch(jobDetail(ob));
      navigate("/applyjob");
    }
  }

  function handleSearch() {
    const value = search.current.value;
    console.log(value);

    if (value == "") {
      setSearchData(jobList);
    } else {
      const newList = jobList.filter((data) => {
        const tmatch = data.title.toLowerCase().includes(value.toLowerCase());
        const cmatch = data.companyName
          .toLowerCase()
          .includes(value.toLowerCase());
        const cAddmatch = data.companyAddress
          .toLowerCase()
          .includes(value.toLowerCase());
        const typeMatch = data.jobtype
          .toLowerCase()
          .includes(value.toLowerCase());
        const locationMatch = data.joblocation
          .toLowerCase()
          .includes(value.toLowerCase());

        return tmatch || cmatch || cAddmatch || typeMatch || locationMatch;
      });
      setSearchData(newList);
      console.log(newList);
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
      <section className="featured-job-area mb-5 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>Recent Job</span>
                <h2>Featured Jobs</h2>
              </div>
            </div>
          </div>
          <div className="row pb-5">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 text-center justify-content-center">
              <input
                type="search"
                ref={search}
                onChange={() => {
                  return handleSearch();
                }}
                className="form-control"
                placeholder="search job by company name /address/type"
              />
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-10">
              {searchData
                ? searchData.slice(pagination.start,pagination.end).map((ob) => {
                    return (
                      <div className="single-job-items mb-30">
                        <div className="job-items">
                          <div className="company-img">
                            <Link to="job_details.html">
                              <img src="assets/img/icon/job-list1.png" alt="" />
                            </Link>
                          </div>
                          <div className="job-tittle">
                            <Link to="job_details.html">
                              <h4>{ob?.title}</h4>
                            </Link>
                            <ul>
                              <li>{ob.companyName}</li>
                              <li>{ob.joblocation}</li>
                              <li>
                                <i className="fas fa-map-marker-alt"></i>
                                {ob.companyAddress}
                              </li>
                              <li>min salary &#8377; {ob.salary}</li>
                            </ul>
                          </div>
                        </div>
                        <div className="items-link f-right">
                          <button
                            className="btn mb-1"
                            onClick={() => ApplyJob(ob)}
                          >
                            APPLY NOW
                          </button>
                          <span>{ob.jobtype}</span>
                        </div>
                      </div>
                    );
                  })
                : jobList.slice(pagination.start,pagination.end).map((ob) => {
                    return (
                      <div className="single-job-items mb-30">
                        <div className="job-items">
                          <div className="company-img">
                            <Link to="job_details.html">
                              <img src="assets/img/icon/job-list1.png" alt="" />
                            </Link>
                          </div>
                          <div className="job-tittle">
                            <Link to="job_details.html">
                              <h4>{ob?.title}</h4>
                            </Link>
                            <ul>
                              <li>{ob.companyName}</li>
                              {/* <li>{ob.joblocation}</li> */}
                              <li>
                                <i className="fas fa-map-marker-alt"></i>
                                {ob.companyAddress}
                              </li>
                              <li>min salary &#8377; {ob.salary}</li>
                            </ul>
                          </div>
                        </div>
                        <div className="items-link f-right">
                          <button
                            className="btn mb-1"
                            onClick={() => ApplyJob(ob)}
                          >
                            APPLY NOW
                          </button>
                          <span>{ob.jobtype}</span>
                        </div>
                      </div>
                    );
                  })}
            </div>
            <Pagination
              showPerPage={showPerPage}
              handleSetPagination={handleSetPagination}
              total={jobList.length}
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Job;
