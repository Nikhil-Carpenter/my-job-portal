import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryListReducer } from "../../redux/CategoryListSlice";
import HrApi, { urls_hr } from "../../WebServices/HrApi";

export default function UpdateJobByHr() {
  const selector = useSelector((state) => state.authInfo.value);
  const categoryList = useSelector((state) => state.categoryList.value);
  const job_to_update = useSelector((state)=>state.jobList.job_to_update)

  var dispatch = useDispatch()
var [msg , setMsg]= useState('')

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
  var statusBox = useRef()

  async function getCategoryList() {
    const response = await HrApi.getApiCallToken(
      urls_hr.CATEGORY_LIST_FOR_HR,
      selector.token
    );
    console.log(response);
    dispatch(categoryListReducer(response.data.data));
  }
  console.log(categoryList);
  useEffect(() => {
    getCategoryList();
  }, []);

  async function updateJob(event) {
    event.preventDefault();
    // console.log("job to Update",job_to_update);
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
      postdate: Date.now(),
      expirydate: expiryBox.current.value,
      status:statusBox.current.value
    };
    const URL = urls_hr.UPDATE_JOB_BY_HR + job_to_update.id
    const response = await HrApi.putApiCallToken(URL,obj,selector.token)
    console.log(response);
    if (response.status) {
        setMsg(response.data.message)
    }else{
        setMsg(response.data.message)
    }

  }

  return (
    <section className="contact-section">
      <div className="container">
        <div className="d-none d-sm-block mb-5 pb-4">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Update Job</h2>
            </div>
            <div className="col-lg-8">
              <form onSubmit={updateJob} className="form-contact contact_form">
                <div className="row">
                  <div className="col-12"></div>

                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Category</label>
                      <select
                        className="form-control"
                        defaultValue={job_to_update.categories?.title}
                        ref={cateBox}
                        name=""
                        id=""
                      >
                        <option   defaultValue={job_to_update.categories.title}>{job_to_update.categories.title}</option>
                        {categoryList?.map((obj) => {
                          return <option value={obj?.id}>{obj?.title}</option>;
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Job Title</label>

                      <input
                        className="form-control valid"
                        defaultValue={job_to_update.title}
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
                        defaultValue={job_to_update.description}
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
                        defaultValue={job_to_update.companyName}
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
                        defaultValue={job_to_update.companyAddress}
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
                        defaultValue={job_to_update.email}
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
                        defaultValue={job_to_update.contact}
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
                        defaultValue={job_to_update.qualification}
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
                        defaultValue={job_to_update.experience}
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
                        defaultValue={job_to_update.skills}
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
                        defaultValue={job_to_update.salary}
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
                        defaultValue={job_to_update.jobtype}
                        ref={jobtypeBox}
                        type="text"
                        placeholder="Enter job type"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    {/* <select
                        className="form-control"
                        ref={locationBox}
                        name=""
                        id=""
                        defaultValue={job_to_update.joblocatiion}
                      >
                        <option >{job_to_update.joblocatiion}</option>
                        
                        <option value="OnSite">OnSite</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                      
                      </select> */}
                      <label>Job Location</label>

                      <input
                        className="form-control"
                        defaultValue={job_to_update.joblocation}
                        ref={locationBox}
                        type="text"
                        placeholder="Enter job location"
                      />
                    </div>
                  </div>
                  {/* <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        ref={postBox}
                        defaultValue={job_to_update.postdate?.split('T')[0]}
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
                        defaultValue={job_to_update.expirydate?.split('T')[0]}
                        ref={expiryBox}
                        type="text"
                        placeholder="Enter expiry date"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                            <div className="form-group">
                            <label>Status</label>

                                <select defaultValue={job_to_update.status} ref={statusBox} className="form-control valid">
                                    <option defaultValue={selector.status}></option>
                                    <option value={true}>Active</option>
                                    <option value={false}>Deactive</option>
                                </select>
                            </div>
                        </div>

                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="button button-contactForm boxed-btn"
                  >
                    update Job
                  </button>
                </div>
              </form>
              <b>{msg}</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
