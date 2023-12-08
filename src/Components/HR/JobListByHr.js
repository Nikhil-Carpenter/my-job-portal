import React, { useState } from 'react'
import { useEffect } from "react"
import AdminApi, { urls } from "../../WebServices/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusByHr, jobListReducer, updateJobByHr } from "../../redux/JobListSlice";
import { useNavigate } from 'react-router-dom';
import HrApi, { urls_hr } from '../../WebServices/HrApi';
import Pagination from '../Pagination';

export default function JobListByHr() {
    const selector = useSelector(state=>state.jobList.value);
    const user = useSelector((state) => state.authInfo.value);
    // const status = useSelector((state)=>state.jobList.status_of_job)

    // pagination code
    var [showPerPage,setSHowPerPage] = useState(5)

    var [pagination,setPagination] = useState({
      start:0,
      end:showPerPage,
  })

  const  handleSetPagination = (start,end)=>{
      setPagination({start:start,end:end})
  }
  // pagination code end

    const [msg,setMsg] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        jobList()
    },[]);
    
    const jobList = async() =>{
        const res = await AdminApi.getApiCall(urls.JOBLIST);
        if (res.status) {
          dispatch(jobListReducer(res.data.data))
        }
        // console.log(res);
    }

    function setupUpdate(job){
      console.log(job);
      dispatch(updateJobByHr(job))
      navigate('/updatejobbyhr')

    }

    
    async function statusActive(id){
      var obj = {
        data:null
      }
     try {

      const URL = urls_hr.ACTIVE_STATUS_BY_HR + id;
    
      const resp = await HrApi.putApiCallToken(URL,obj,user.token) 
      console.log(resp);
      if (resp.status) {

        var statusUpdateList  = selector.filter(ob=>ob.id !== resp.data.data?.id)
      
        dispatch(changeStatusByHr(statusUpdateList))
        setMsg(resp.data.message)
      }
      
     } catch (error) {
      setMsg('Server error')
     }
    }

    async function statusDeactive(id){
      var obj = {
        data:null
      }
      try {
        const URL = urls_hr.DEACTIVE_STATUS_BY_HR + id;

      const resp = await HrApi.putApiCallToken(URL,obj,user.token) 
      console.log(resp);
        if (resp.status) {
          var statusUpdateList  = selector.filter(ob=>ob.id !== resp.data.data?.id)
          dispatch(changeStatusByHr(statusUpdateList))
          setMsg(resp.data.message)
        }
      } catch (error) {
        setMsg("server Error")
      }
      
    }

   

  return (
    <section className="featured-job-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <h2>Job Details</h2>
              </div>
              {
              <b>{msg}</b>
            }
            </div>
          </div>
          <div className="row justify-content-center mb-5">
    
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
                            <th scope="col">Job Location</th>
                            <th scope="col">Post Date</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Description</th>
                            <th scope="col">status</th>
                            <th scope="col">Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {selector.slice(pagination.start,pagination.end).map((data,index)=>{
                            return <tr key={data?.id}>
                                <td >{pagination.start+index+1}</td>
                                <td >{data.categories?.title}</td>
                                <td >{data?.title}</td>
                                <td >{data?.companyName}</td>
                                <td >{data?.companyAddress}</td>
                                <td >{data?.salary}</td>
                                <td >{data?.qualification}</td>
                                <td >{data?.experience}</td>
                                <td >{data?.skills}</td>
                                <td >{data?.jobtype}</td>
                                <td >{data?.joblocation}</td>
                                <td >{data.postdate?.split('T')[0]}</td>
                                <td >{data.expirydate?.split('T')[0]}</td>
                                <td >{data?.email}</td>
                                <td >{data?.contact}</td>
                                <td >{data?.description}</td>
                                
                                {
                                    <td >{data.status?<>
                                        <button  className='btn'onClick={()=>{statusDeactive(data.id)}}>DeActive</button></>:<>
                                        <button  className='btn'onClick={()=>{statusActive(data.id)}}>Active</button></>}
                                    </td>
                                }        
                                
                                <td >
                                  <button className='btn'
                                onClick={()=>{setupUpdate(data)}}
                                  >Edit</button>
                                 
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

            </div>
            <Pagination showPerPage={showPerPage} handleSetPagination={handleSetPagination} total={selector.length}/>

          </div>
        </div>
      </section>
  )
}
