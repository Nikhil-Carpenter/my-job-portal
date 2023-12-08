import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HrApi, { urls_hr } from "../WebServices/HrApi";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";

const Category = () => {
  const selector = useSelector((state) => state.authInfo.value);

  const [cate, setCate] = useState([]);
  const [msg, setMsg] = useState("");

  async function getCategoryList() {
    try {
      const response = await HrApi.getApi(urls_hr.CATEGORY);
      console.log(response);
      setCate(response.data.data);
    } catch (error) {
      setMsg("Server error");
    }

    // dispatch(categoryListReducer(response.data.data));
  }
  useEffect(() => {
    getCategoryList();
  }, []);

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
      <div className="our-services ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>FEATURED TOURS Packages</span>
                <h2>Browse Top Categories</h2>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-contnet-center">
            {cate?.slice(pagination.start,pagination.end).map((ob,idx) => {
              return (
                <div key={idx} className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                  <div className="single-services text-center mb-30">
                    <div className="services-ion">
                      <span className="flaticon-tour"></span>
                    </div>
                    <div className="services-cap">
                      <h5>
                        <Link to={`/joblistbycategory/${ob.id}`}>{ob?.title}</Link>
                      </h5>
                      {/* <span>(653)</span> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row mb-5">

          <div className="col-lg-4 "></div>
          <Pagination
          className="col-lg-4"
          showPerPage={showPerPage}
          handleSetPagination={handleSetPagination}
          total={cate.length}
          />
                <div className="col-lg-4"></div>
          </div>
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="browse-btn2 text-center mt-50">
                <Link to="job_listing.html" className="border-btn2">
                  Browse All Sectors
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Category;
