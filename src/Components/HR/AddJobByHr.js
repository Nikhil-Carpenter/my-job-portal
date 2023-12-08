import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HrApi, {  urls_hr } from "../../WebServices/HrApi";
import { categoryListReducer } from "../../redux/CategoryListSlice";
import { jobListReducer, saveJobByHr } from "../../redux/JobListSlice"; 

export default function AddJobByHr() {
    const selector = useSelector(state=>state.authInfo.value);
    const categoryList = useSelector(state=>state.categoryList.value)

    const [msg,setMsg] = useState('');

    var dispatch = useDispatch()

   async function getCategoryList(){
        const response = await HrApi.getApiCallToken(urls_hr.CATEGORY_LIST_FOR_HR,selector.token)
        console.log(response);
        dispatch(categoryListReducer(response.data.data))
    }

    useEffect(()=>{
        getCategoryList()
    },[])
  var cateBox = useRef();
  var titleBox = useRef();
  var descBox = useRef();
  var cnameBox = useRef();
  var addressBox = useRef();
  var emailBox = useRef();
  var contactBox = useRef();
  var qualiBox = useRef();
  var expBox = useRef();
  var skillBox = useRef();
  var salaryBox = useRef();
  var jobtypeBox = useRef();
  var locationBox = useRef();
  // var postBox = useRef();
  var expiryBox = useRef();

  async function addJob(event) {
    event.preventDefault();
    var obj = {
        category:cateBox.current.value,
      title: titleBox.current.value,
      description: descBox.current.value,
      companyName: cnameBox.current.value,
      companyAddress: addressBox.current.value,
      email: emailBox.current.value,
      contact: contactBox.current.value,
      qualification: qualiBox.current.value,  
      experience: expBox.current.value,
      skills: skillBox.current.value,
      salary: salaryBox.current.value,
      jobtype: jobtypeBox.current.value,
      joblocatiion: locationBox.current.value,
      postdate:  Date.now(),
      expirydate: expiryBox.current.value,
    };
    const res = await HrApi.postApiCallToken(urls_hr.SAVE_JOBS_BY_HR,obj,selector.token)
    console.log(res.data.data);
    if (res.status) {
      dispatch(saveJobByHr(res.data.data))
      setMsg(res.data.message)
    }
    // console.log(obj);
  }

  return (
    <section className="contact-section">
      <div className="container">
        <div className="d-none d-sm-block mb-5 pb-4">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Save Jobs</h2>
            </div>
            <b>{msg}</b>
            <div className="col-lg-8">
              <form onSubmit={addJob} className="form-contact contact_form">
                <div className="row">
                  <div className="col-12"></div>

                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Category</label>
                    <select className="form-control" ref={cateBox} name="" id="">
                        <option  value="">Select Category</option>
                        {
                            categoryList?.map((obj)=>{
                                return(
                                <option value={obj?.id}>{obj?.title}</option>
                                )
                            })
                        }
                    </select>
                    </div>
                  </div>


                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Job Title</label>
                      <input
                        className="form-control valid"
                        ref={titleBox}
                        type="text"
                        placeholder="Enter job title"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Job Description</label>
                      <input
                        className="form-control valid"
                        ref={descBox}
                        type="text"
                        placeholder="Enter job description "
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Company Name</label>
                      <input
                        className="form-control"
                        ref={cnameBox}
                        type="text"
                        placeholder="Enter company name"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Company Address</label>
                      <input
                        className="form-control"
                        ref={addressBox}
                        type="text"
                        placeholder="Enter company address"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Email</label>
                      <input
                        className="form-control"
                        ref={emailBox}
                        type="email"
                        placeholder="Enter company email"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Contact</label>
                      <input
                        className="form-control"
                        ref={contactBox}
                        type="number"
                        placeholder="Enter contact"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Qualification</label>
                      <input
                        className="form-control"
                        ref={qualiBox}
                        type="text"
                        placeholder="Enter qualification"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Experiecne</label>
                      <input
                        className="form-control"
                        ref={expBox}
                        type="text"
                        placeholder="Enter experience"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Skills</label>
                      <input
                        className="form-control"
                        ref={skillBox}
                        type="text"
                        placeholder="Enter skills"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Salary</label>
                      <input
                        className="form-control"
                        ref={salaryBox}
                        type="number"
                        placeholder="Enter salary"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Job Type</label>
                      <input
                        className="form-control"
                        ref={jobtypeBox}
                        type="text"
                        placeholder="Enter job type"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Job Location</label>
                      <select
                        className="form-control"
                        ref={locationBox}
                        type="text"
                        placeholder="Enter job location"
                      >
                        <option >select Type</option>
                        <option value="OnSite">OnSite</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        ref={postBox}
                        type="text"
                        placeholder="Enter post date"
                      />
                    </div>
                  </div> */}
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Expiry Date</label>
                      <input
                        className="form-control"
                        ref={expiryBox}
                        type="date"
                        placeholder="Enter expiry date"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="button button-contactForm boxed-btn"
                  >
                    Save Job
                  </button>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
