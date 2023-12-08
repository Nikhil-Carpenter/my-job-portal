import React, { useEffect, useState } from 'react'
import { jobListReducer } from '../../redux/JobListSlice';
import AdminApi, { urls } from '../../WebServices/AdminApi';
import { useDispatch, useSelector } from 'react-redux';
import HrApi, { urls_hr } from '../../WebServices/HrApi';
import { AppliedListReducer } from '../../redux/AppliedJobSlice';
import { Link } from 'react-router-dom';

export default function AppliedJob() {

   const appliedJobList = useSelector((state)=>state.AppliedJobInfo.value)
   console.log(appliedJobList);

  const dispatch = useDispatch();
  const [msg,setMsg] = useState('')

  const jobList = async() =>{

    try {
      const res = await HrApi.getApiCall(urls_hr.APPLIED_JOB);
      console.log(res);
      if (res.status) {
        dispatch(AppliedListReducer(res.data.data))
        setMsg(res.data.message)
      }
      
    } catch (error) {
      setMsg("Network error")
    }
    const res = await HrApi.getApiCallToken(urls_hr.APPLIED_JOB);
    console.log(res);
    if (res.status) {
      dispatch(AppliedListReducer(res.data.data))
    }
    // console.log(res);
}
useEffect(()=>{
  jobList()
},[]);
  return (
<section className="featured-job-area feature-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <h2>Applied Jobs</h2>
              </div>
              <b>{msg}</b>
            </div>
          </div>
          <div className="row justify-content-center mb-5">
            <div className="col-xl-10 table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Serial No.</th>
                            <th scope="col">Apply Date</th>
                            <th scope="col">Fullname</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Education</th>
                            <th scope="col">Passoutyear</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Job Type</th>
                            <th scope="col">Job Location</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Description</th>
                            <th scope="col">Post Date</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">Status</th>
                            {/* <th scope="col">Email</th>
                            <th scope="col">Contact</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {appliedJobList?.map((data,index)=>{
                            return <tr>
                                <th scope="row">{index+1}</th>
                                <th scope="row">{data?.applydate}</th>
                                <th scope="row">{data.candidateDetails.username?.fullname}</th>
                                <th scope="row">{data.candidateDetails.username?.phone}</th>
                                <th scope="row">{data.candidateDetails?.education}</th>
                                <th scope="row">{data.candidateDetails?.passoutyear}</th>
                                <th scope="row">{data.jobs?.title}</th>
                                <th scope="row">{data.jobs?.companyName}</th>
                                <th scope="row">{data.jobs?.jobtype}</th>
                                <th scope="row">{data.jobs?.joblocation}</th>
                                <th scope="row">{data.jobs?.salary}</th>
                                <th scope="row">{data.jobs?.description}</th>
                                <th scope="row">{data.jobs?.postdate}</th>
                                <th scope="row">{data.jobs?.expirydate}</th>
                                {/* <th scope="row">{data.experience}</th> */}

                                <td>
                                  {
                                    data.status?<><b>Active</b></>:<><b>DeActive</b></>
                                  }
                                </td>
                                <td>
                                  {
                                    <Link to={data?.resume}><button className='btn'>Resume</button></Link>
                                  }
                                </td>
                                {/* <th scope="row">{data.skills}</th>
                                <th scope="row">{data.jobtype}</th>
                                <th scope="row">{data.email}</th>
                                <th scope="row">{data.contact}</th> */}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </section>  )
}
