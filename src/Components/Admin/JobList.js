import { useEffect, useState } from "react";
import AdminApi, { urls } from "../../WebServices/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { jobListReducer } from "../../redux/JobListSlice";
import Pagination from "../Pagination";

export default function JobList() {
  const selector = useSelector((state) => state.jobList.value);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    jobList();
  }, []);

  const jobList = async () => {
    setIsLoading(true);
    const res = await AdminApi.getApiCall(urls.JOBLIST);
    console.log(res);
    if (res.status) {
      setIsLoading(false);
      dispatch(jobListReducer(res.data.data));
      setMsg(res.data.message);
    } else {
      setIsLoading(false);
      setMsg(res.data.message);
    }
  };

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
    <section className="featured-job-area ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle text-center">
              <h3>All Job List With Details</h3>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          {isLoading ? (
            <h3>Loading.............</h3>
          ) : (
            <>
              <div className="col-xl-10 table-responsive mb-4">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Serial No.</th>
                      <th scope="col">Category</th>
                      <th scope="col">Job Title</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Qualification</th>
                      <th scope="col">Experience</th>
                      <th scope="col">Skills</th>
                      <th scope="col">Job Type</th>
                      <th scope="col">Post Date</th>
                      <th scope="col">Expiry Date</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selector
                      .slice(pagination.start, pagination.end)
                      .map((data, index) => {
                        return (
                          <tr key={index + data.id}>
                            <td scope="row">{pagination.start + index + 1}</td>
                            <td scope="row">{data.categories.title}</td>
                            <td scope="row">{data.title}</td>
                            <td scope="row">{data.companyName}</td>
                            <td scope="row">{data.companyAddress}</td>
                            <td scope="row">{data.salary}</td>
                            <td scope="row">{data.qualification}</td>
                            <td scope="row">{data.experience}</td>
                            <td scope="row">{data.skills}</td>
                            <td scope="row">{data.jobtype}</td>
                            <td scope="row">{data.postdate}</td>
                            <td scope="row">{data.expirydate}</td>
                            <td scope="row">{data.email}</td>
                            <td scope="row">{data.contact}</td>
                            <td scope="row">{data.description}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <Pagination
                showPerPage={showPerPage}
                handleSetPagination={handleSetPagination}
                total={selector.length}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
