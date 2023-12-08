import React, { useEffect, useState } from "react";
import CandidateApi, { urls_candidate } from "../../WebServices/CandidateApi";
import { useDispatch, useSelector } from "react-redux";
import { jobAppliedByCandidate } from "../../redux/AppliedJobSlice";

export default function JobAppliedCandidate() {
  const user = useSelector((state) => state.authInfo.value);
  const applied_job_list_of_candidate = useSelector((state)=>state.AppliedJobInfo.value)
  var [msg , setMsg]= useState('')
  const [lsitJobCandidate,setListJobCandidate] = useState([])


  const dispatch = useDispatch()
  async function getAppliedJoblistByCandidate() {
    const resp = await CandidateApi.getApiCallToken(
      urls_candidate.JOB_APPLIED_BY_CANDIDATE,
      user.token
    );
    console.log(resp);
    if (resp.status) {
        setListJobCandidate(resp.data.data)
        // dispatch(jobAppliedByCandidate(resp.data.data))
        setMsg(resp.data.message)
    }else{
        setMsg(resp.data.message)
    }
  }
  useEffect(() => {
    getAppliedJoblistByCandidate();
  }, []);
  return (
    <section className="featured-job-area ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle text-center">
              <h2>Job Details applied by Candidate</h2>
            </div>
            {<b>{msg}</b>}
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="col-xl-10 table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Apply Date</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Description</th>
                  {/* <th scope="col">Address</th> */}
                  <th scope="col">Job Location</th>
                  <th scope="col">Job Type</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Post Date</th>
                  <th scope="col">Expiry Date</th>
                  {/* <th scope="col">Qualification</th>
                  <th scope="col">Experience</th>
                  <th scope="col">Skills</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact</th>
                  <th scope="col">status</th>
                  <th scope="col">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {lsitJobCandidate?.map((data, index) => {
                  return (
                    <tr key={data?.id}>
                      <td>{data?.id}</td>
                      <td>{data?.applydate.split('T')[0]}</td>
                      <td>{data.jobs?.companyName}</td>
                      <td>{data?.jobs.title}</td>
                      <td>{data.jobs?.description}</td>
                      <td>{data.jobs?.joblocation}</td>
                      <td>{data.jobs?.jobtype}</td>
                      <td>{data.jobs?.salary}</td>
                      <td>{data.jobs?.postdate.split("T")[0]}</td>
                      <td>{data.jobs?.expirydate.split("T")[0]}</td>
                      {/* <td>{data?.companyAddress}</td>
                      <td>{data?.qualification}</td>
                      <td>{data?.experience}</td>
                      <td>{data?.skills}</td>
                      <td>{data?.email}</td>
                      <td>{data?.contact}</td> */}

                      {/* {
                        <td>
                          {data.status ? (
                            <>
                              <button
                                className="btn"
                                onClick={() => {
                                  statusDeactive(data.id);
                                }}
                              >
                                DeActive
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn"
                                onClick={() => {
                                  statusActive(data.id);
                                }}
                              >
                                Active
                              </button>
                            </>
                          )}
                        </td>
                      } */}

                      {/* <td>
                        <button
                          className="btn"
                          onClick={() => {
                            setupUpdate(data);
                          }}
                        >
                          Edit
                        </button>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
