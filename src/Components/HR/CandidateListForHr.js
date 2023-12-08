import React, { useEffect, useState } from "react";
import AdminApi, { urls } from "../../../WebServices/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { saveCandidateList } from "../../../redux/CandidateListSlice";
import Pagination from "../Pagination";

export default function CandidateListForHr() {
  const candidates = useSelector((state) => state.candidateList.value);

  const user = useSelector((state) => state.authInfo.value);
  const dispatch = useDispatch();
  // console.log(user);

  async function getCandidateList() {
    const response = await AdminApi.getApiCallToken(
      urls.CANDIDATE_LIST_ADMIN,
      user.token
    );
    console.log(response.data.data);
    dispatch(saveCandidateList(response.data.data));
    console.log(candidates);
  }

  useEffect(() => {
    getCandidateList();
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
      <section className="featured-job-area ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <h2>Candidate Details</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-5 mb-5">

            <div className="col-xl-10 table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((obj, idx) => {
                    return (
                      <tr key={obj.id}>
                        <td scope="col">{idx + 1}</td>
                        <td scope="col">{obj?.fullname}</td>
                        <td scope="col">{obj?.phone}</td>
                        <td scope="col">{obj?.email}</td>
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

            <Pagination showPerPage={showPerPage} handleSetPagination={handleSetPagination} total={candidates.length}/>


          </div>
        </div>
      </section>
    </>
  );
}
