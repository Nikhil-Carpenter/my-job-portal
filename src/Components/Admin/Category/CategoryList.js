import { useDispatch, useSelector } from "react-redux";
import AdminApi, { urls } from "../../../WebServices/AdminApi";
import { useEffect, useState } from "react";
import { categoryListReducer } from "../../../redux/CategoryListSlice";
import { hrDeleteReducer } from "../../../redux/HrSlice";
import { useNavigate } from "react-router-dom";
import { categoryUpdateReducer } from "../../../redux/UpdateHrSlice";
import Pagination from "../../Pagination";

export default function CategoryList() {
  const selector = useSelector((state) => state.authInfo.value);
  const categoryList = useSelector((state) => state.categoryList.value);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    handleCategoryList();
  }, []);

  const handleCategoryList = async () => {
    setIsLoading(true);
    const resp = await AdminApi.getApiCallToken(
      urls.CATEGORYLIST,
      selector.token
    );
    if (resp) {
      console.log(resp);
      setIsLoading(false);
    }
    if (resp.status) {
      setIsLoading(false);
      dispatch(categoryListReducer(resp.data?.data));
    } else {
      setIsLoading(false);
    }
  };

  const handleEdit = (list) => {
    dispatch(categoryUpdateReducer(list));
    navigate("/categoryupdate");
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
    <>
      <section className="featured-job-area ">
        <div className="container">
          <div className="row justify-content-center mt-5 mb-5">
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
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryList?.slice(pagination.start,pagination.end).map((list, index) => {
                        return (
                          <tr key={index + list?.title}>
                            <td>{index + 1}</td>
                            <td>{list?.title}</td>
                            <td>
                              {list.status ? (
                                <>
                                  <b style={{ color: "yellowgreen" }}>Active</b>
                                </>
                              ) : (
                                <>
                                  <b style={{ color: "red" }}>Deactive</b>
                                </>
                              )}
                            </td>
                            <td scope="row">
                              <button
                                onClick={() => handleEdit(list)}
                                className="btn"
                              >
                                Edit
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
                  total={categoryList.length}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
