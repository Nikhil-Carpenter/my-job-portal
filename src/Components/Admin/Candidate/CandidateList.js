import React, { useEffect ,useState} from "react";
import AdminApi, { urls } from "../../../WebServices/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { saveCandidateList } from "../../../redux/CandidateListSlice";
import Pagination from "../../Pagination";

export default function CandidateList() {
  const candidates = useSelector((state) => state.candidateList.value);

  const user = useSelector((state) => state.authInfo.value);
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false);
  const [msg,setMsg] = useState("")
  // console.log(user);

  async function getCandidateList() {
    try {
      // setIsLoading(true)
      const response = await AdminApi.getApiCallToken(
        urls.CANDIDATE_LIST_ADMIN,
        user.token
      );
      console.log(response);
      if (response.status) {
        // setIsLoading(false)
        dispatch(saveCandidateList(response.data.data));
        setMsg(response.data.message)
      }else{
        setMsg(response.data.message)
        // setIsLoading(false)
      }
    } catch (error) {
      // setIsLoading(false)
    }
   
    // console.log(candidates);
  }

  useEffect(() => {
    getCandidateList();
  }, []);

  // pagination code
  var [showPerPage, setSHowPerPage] = useState(8);
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
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <h3>All Candidate List</h3>
              </div>
            </div>
          </div>
        
          <div className="row justify-content-center mb-5">
            {
              isLoading ?  
              
              <div id="preloader-active">
              <div className="preloader d-flex align-items-center justify-content-center">
                <div className="preloader-inner position-relative">
                  <div className="preloader-circle"></div>
                  <div className="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt="" />
                  </div>
                 
                </div>
              </div>
            </div>
            
            :<>
            <div className="col-xl-10 table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">S.no.</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Education</th>
                    <th scope="col">PassoutYear</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.slice(pagination.start,pagination.end).map((obj, idx) => {
                    return (
                      <tr key={obj.id}>
                        <td scope="col">{pagination.start + idx + 1}</td>
                        <td scope="col">{obj["username.fullname"]}</td>
                        <td scope="col">{obj["username.phone"]}</td>
                        <td scope="col">{obj["username.email"]}</td>
                        <td scope="col">{obj.education}</td>
                        <td scope="col">{obj.passoutyear}</td>
                        {obj?.status ? (
                          <td scope="col">Active</td>
                        ) : (
                          <td scope="col">DeActive</td>
                        )}
                      </tr>
                    );
                  })}

                  {/* <th scope="row">{list.status?<>
                        <button className="btn">Active</button>
                        </>:<><button className="btn">Deactive</button></>}</th>
                        <th scope="row"><button onClick={()=>handleEdit(list)} className="btn">Edit</button></th> */}
                </tbody>
              </table>
            </div>
            <Pagination
              showPerPage={showPerPage}
              handleSetPagination={handleSetPagination}
              total={candidates.length}
            />
            
            </>
            }
            
          </div>
        </div>
      </section>
    </>
  );
}
