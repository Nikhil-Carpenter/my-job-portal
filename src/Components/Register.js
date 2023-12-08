import { useRef, useState } from "react";
import CandidateApi, { urls_candidate } from "../WebServices/CandidateApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCandidateData } from "../redux/CandidateListSlice";

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    var [msg , setMsg]= useState('')


    const nameBox = useRef()
    const phoneBox = useRef()
    const emailBox = useRef()
    const passwordBox = useRef()
    const educationBox = useRef()
    const passoutyearBox = useRef()

   async function registerUser(event){
        event.preventDefault()
        var obj = {
            fullname:nameBox.current.value,
            phone:phoneBox.current.value,
            email:emailBox.current.value,
            password:passwordBox.current.value,
            education:educationBox.current.value,
            passoutyear:passoutyearBox.current.value
        }
        
        const resp =  await CandidateApi.postApiCall(urls_candidate.REGISTER_USER,obj)
        console.log(resp);
        if (resp.status) {
          dispatch(saveCandidateData(resp.data.data))
          navigate('/login')
          setMsg(resp.data.message)
        }else{
          setMsg(resp.data.message)
        }
        console.log(resp);
    }

return(
    <section className="contact-section">
    <div className="container">
      <div className="d-none d-sm-block mb-5 pb-4">
        <div className="row">
          <div className="col-12">
            <h2 className="contact-title">Register form</h2>
          </div>
          <div className="col-lg-12">
            <form
              className="form-contact contact_form"
              action="/"
              novalidate="novalidate"
              onSubmit={registerUser}
            >
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control valid"
                      name="name"
                      type="text"
                      ref={nameBox}
                      placeholder="Enter your Full Name"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control valid"
                      name="name"
                      type="text"
                      ref={phoneBox}
                      placeholder="Enter your Phone Number"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control valid"
                      name="name"
                      type="text"
                      ref={emailBox}
                      placeholder="Enter your Email"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control valid"
                      name="password"
                      type="password"
                      ref={passwordBox}
                      placeholder="Enter your Password"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control valid"
                      name="name"
                      type="text"
                      ref={educationBox}
                      placeholder="Enter your Education"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control valid"
                      name="name"
                      type="text"
                      ref={passoutyearBox}
                      placeholder="Enter your Passoutyear"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="button button-contactForm boxed-btn"
                >
                  Register
                </button>
              </div>
            </form>
            {/* <Link to={'/register'}>
              <b>Register</b>
            </Link> */}
            <b>{msg}</b>
          </div>
        </div>
      </div>
    </div>
  </section>)
}
export default Register;