import React, { useRef, useState } from "react";
import CandidateApi, { urls_candidate } from "../../WebServices/CandidateApi";
import { useSelector } from "react-redux";

export default function ApplyJob() {
    const user = useSelector((state) => state.authInfo.value);
    const job = useSelector((state) => state.AppliedJobInfo.value);

    const [msg ,setMsg] = useState('')

    const resumeBox = useRef()

    async function save(event){
        event.preventDefault()
        // var resume = resumeBox.current.value;
        var jobId = job.id
        const formData = new FormData()

        // console.log(resume);

        formData.append('resume',resumeBox.current.files[0])
        formData.append('jobId',jobId)
        try {
            const resp = await CandidateApi.postApiCallToken(urls_candidate.RESUME_UPLOAD,formData,user.token)
            console.log("response ",resp);
            if (resp.status) {
                setMsg(resp.data.message)
            }else{
                setMsg(resp.data.message)
            }
        } catch (error) {
            setMsg("Network Error....")
        }
       
    }

  return (
    <section className="contact-section">
      <div className="container">
        <div className="d-none d-sm-block mb-5 pb-4">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Upload your Resume</h2>
            </div>
            <div className="col-lg-8">
              <form
                onSubmit={save}
                className="form-contact contact_form"
                novalidate="novalidate"
              >
                <div className="row">
                  <div className="col-12"></div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control valid"
                        ref={resumeBox}
                        type="file"
                        placeholder="Enter title"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="button button-contactForm boxed-btn"
                  >
                    Save
                  </button><br /><br />
                  <b>{msg}</b>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
