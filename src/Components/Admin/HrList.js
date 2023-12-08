import { Link, useNavigate } from "react-router-dom";
import AdminApi, { urls } from "../../WebServices/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { hrDeleteReducer, hrReducer } from "../../redux/HrSlice";
import { hrUpdateReducer } from "../../redux/UpdateHrSlice";
import Pagination from "../Pagination";

export default function HrList() {
  const selector = useSelector((state) => state.authInfo.value);
  const hrlist = useSelector((state) => state.hrList.value);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    handleHrList();
  }, []);

  const handleHrList = async () => {
    try {
      setIsLoading(true);
      const resp = await AdminApi.getApiCallToken(urls.HRLIST, selector.token);
      console.log(resp);
      if (resp) {
        setIsLoading(false);
      }
      if (resp.status) {
        dispatch(hrReducer(resp.data.data));
        setMsg(resp.data.message);
      } else {
        setMsg(resp.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("network error");
      setIsLoading(false);
    }
  };

  const updateHr = (ob) => {
    dispatch(hrUpdateReducer(ob));
    navigate("/updatehr");
  };

  const deleteHr = async (id) => {
    var idname = id;
    const confirm = window.confirm("Are you sure you want to delete.");
    if (confirm) {
      const Url = urls.HRDELETE + id;
      const res = await AdminApi.deleteApiCallToken(Url, selector.token);
      console.log(res);
      const newlist = hrlist.filter((data) => data.id !== idname);
      dispatch(hrDeleteReducer(newlist));
      console.log(newlist);
    } else {
      return;
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
              <h3>HR List With Details</h3>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          {isLoading ? (
          <h3>Loading..............</h3>
          ) : (
            <>
              <div className="col-xl-10 table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Email</th>
                      <th scope="col">Password</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hrlist
                      ?.slice(pagination.start, pagination.end)
                      ?.map((list, index) => {
                        return (
                          <tr key={index+list.id}>
                            <td >{pagination.start + index + 1}</td>
                            <td >{list?.fullname}</td>
                            <td >{list?.phone}</td>
                            <td >{list?.email}</td>
                            <td >{list?.password}</td>
                            <td >
                              {list?.status ? (
                                <>
                                  <b style={{color:'yellowgreen'}}>Active</b>
                                </>
                              ) : (
                                <>
                                  <b style={{color:'red'}}>Deactive</b>
                                </>
                              )}
                            </td>
                            <td scope="row">
                              <button
                                onClick={() => updateHr(list)}
                                className="btn btnedit"
                              >
                                Edit
                              </button>
                              &nbsp;
                              <button
                                onClick={() => {
                                  deleteHr(list.id);
                                }}
                                className="btn"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <Pagination
                showPerPage={showPerPage}
                handleSetPagination={handleSetPagination}
                total={hrlist.length}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
