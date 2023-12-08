import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authReducer } from "../redux/AuthSlice";
import { useState } from "react";

const Nav = () => {
  const user = useSelector((state) => state.authInfo.value);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(
      authReducer({
        isLogin: false,
        token: undefined,
        username: undefined,
        type: undefined,
      })
    );
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  function showMenufunc() {
    setShowMenu(!showMenu);
  }
  return (
    <>
      <header>
        <div className="header-area header-transparrent">
          <div className="headder-top header-sticky">
            <div className="container">
              <div className="row my-menu align-items-center">
                <div className="logo-wrapper">
                  <div className="logo">
                    <Link to="/">
                      <img src="assets/img/logo/logo.png" alt="" />
                    </Link>
                  </div>
                  <div className="mob-btn">
                    <button onClick={showMenufunc} className="btn">
                      menu
                    </button>
                  </div>
                </div>
                <div
                  className={
                    showMenu ? "menu-wrapper1 mob-view" : "menu-wrapper1"
                  }
                >
                  <div className="menu-wrapper">
                    <div className="main-menu">
                      <nav className=" pr-3 d-lg-block">
                        <ul id="navigation">
                          {user.isLogin ? (
                            <>
                              {user.type === "Admin" ? (
                                <>
                                  <li>
                                    <Link to="/">HR</Link>
                                    <ul className="submenu">
                                      <li>
                                        <Link to="/addhr">Add HR</Link>
                                      </li>
                                      <li>
                                        <Link to="/hrlist">HR List</Link>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <Link to="/">Category</Link>
                                    <ul className="submenu">
                                      <li>
                                        <Link to="/addcategory">
                                          Add Category
                                        </Link>
                                      </li>
                                      <li>
                                        <Link to="/categorylist">
                                          Category List
                                        </Link>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <Link to="/joblist">Jobs</Link>
                                  </li>
                                  <li>
                                    <Link to="/candidate_list">Candidate</Link>
                                  </li>
                                  <li>
                                    <Link to=""><b>Welcome! </b>{user.username}</Link>
                                    </li>
                                </>
                              ) : (
                                <></>
                              )}
                              {user.type === "Hr" ? (
                                <>
                                  <li>
                                    <Link to="/">Jobs</Link>
                                    <ul className="submenu">
                                      <li>
                                        <Link to="/addjobbyhr">Add Jobs</Link>
                                      </li>
                                      <li>
                                        <Link to="/joblistbyhr">Job List</Link>
                                      </li>
                                    </ul>
                                  </li>
                                  {/* <li>
                                    <Link to="/">Category</Link>
                                    <ul className="submenu">
                                      <li>
                                        <Link to="/addcategory">
                                          Add Category
                                        </Link>
                                      </li>
                                      <li>
                                        <Link to="/categorylistbyhr">
                                          Category List
                                        </Link>
                                      </li>
                                    </ul>
                                  </li> */}

                                  <li>
                                    <Link to="">Candidate</Link>

                                    <ul className="submenu">
                                      <li>
                                        <Link to="/appliedjob">
                                          Applied Job
                                        </Link>
                                      </li>
                                     
                                    </ul>
                                  </li>
                                  <li>
                                    <Link to=""><b>Welcome! </b>{user.username}</Link>
                                    </li>
                                </>
                              ) : (
                                <></>
                              )}
                              {user.type === "Candidate" ? <>
                              <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                                <Link to="/job">Find a Jobs </Link>
                              </li>
                              <li>
                                <Link to="/about">About</Link>
                              </li>
                              <li>
                                <Link to="/contact">Contact</Link>
                              </li>
                              <li>
                                    <Link to=""><b>Welcome! </b>{user.username}</Link>

                                    <ul className="submenu">
                                      <li>
                                        <Link to="/job_applied_by_candidate">
                                          Applied Job
                                        </Link>
                                      </li>
                                      <li>
                                        <Link to="/userprofile">
                                          profile
                                        </Link>
                                      </li>
                                     
                                    </ul>
                                  </li>
                    
                              
                              </> : <></>}
                            </>
                          ) : (
                            <>
                              {/* <li>
                            <Link to="/">Home</Link>
                          </li> */}
                              <li>
                                <Link to="/job">Find a Jobs </Link>
                              </li>
                              {/* <li>
                            <Link to="/category">Category</Link>
                          </li> */}
                              {/* <li>
                            <Link to="/applyprocess">Apply</Link>
                          </li> */}
                              <li>
                                <Link to="/about">About</Link>
                              </li>
                              <li>
                                <Link to="/contact">Contact</Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </nav>
                    </div>
                    {user.isLogin ? (
                      <>
                        <div className="header-btn  f-right d-lg-block">
                          <b onClick={logout} className="btn head-btn1">
                            Logout
                          </b>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="header-btn btns f-right d-lg-block">
                          <Link to="/register" className="btn head-btn1">
                            Register
                          </Link>
                          <Link to="/login" className="btn head-btn2">
                            Login
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Nav;
