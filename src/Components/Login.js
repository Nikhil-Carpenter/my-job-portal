import { useRef, useState } from "react";
import AuthApi, { urls } from "../WebServices/AuthApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authReducer } from "../redux/AuthSlice";

const Login = () => {
  const userNameBox = useRef();
  const passwordBox = useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authInfo.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = userNameBox.current.value;
    const password = passwordBox.current.value;

    const obj = {
      email: username,
      password: password,
    };

    const res = await AuthApi.postApiCall(urls.LOGIN, obj);
    console.log(res);
    if (res.data.status) {
      console.log(
        dispatch(
          authReducer({
            isLogin: true,
            token: res.data.data.token,
            username: res.data.data.name,
            type: res.data.data.type,
          })
        )
      );
      navigate("/");
      setMsg(res.data.message);
    } else {
      setMsg(res.data.message);
    }
  };

  return (
    <>
      <section className="contact-section">
        <div className="container">
          <div className="d-none d-sm-block mb-5 pb-4">
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Login</h2>
              </div>
              <div className="col-lg-12">
                <form
                  className="form-contact contact_form"
                  action="/"
                  novalidate="novalidate"
                  onSubmit={handleLogin}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <input
                          className="form-control valid"
                          name="name"
                          type="text"
                          ref={userNameBox}
                          placeholder="Enter your User Name"
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
                  </div>
                  <div className="form-group mt-3">
                    <button
                      type="submit"
                      className="button button-contactForm boxed-btn"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <p>
                  Click to &nbsp;
                <Link to={'/register'}>
                   <b>Register</b>
                </Link>
                </p>
               
                <b>{msg}</b>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
