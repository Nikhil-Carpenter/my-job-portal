import { useEffect } from "react";
import HrApi, {  urls_hr } from "../../../WebServices/HrApi"
import { useDispatch, useSelector } from "react-redux";
import { categoryListReducer } from "../../../redux/CategoryListSlice";



export default function CategoryListByHr() {
    const selector = useSelector(state=>state.authInfo.value);
    const categoryList = useSelector(state=>state.categoryList.value)
    var dispatch = useDispatch()

   async function getCategoryList(){
        const response = await HrApi.getApiCallToken(urls_hr.CATEGORY_LIST_FOR_HR,selector.token)
        console.log(response);
        dispatch(categoryListReducer(response.data.data))
    }
    console.log(categoryList);
   useEffect(()=>{
    getCategoryList()
   },[])
  return (
    <div className="row justify-content-center mt-5 mb-5">
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
                {categoryList?.map((list,index)=>
               {return <tr>
                <th scope="row">{index+1}</th>
                <th scope="row">{list?.title}</th>
                <th scope="row">{list?.status?<>
                <button className="btn">Active</button>
                </>:<><button className="btn">Deactive</button></>}</th>
                <th scope="row"><button  className="btn">Edit</button></th>
            </tr>
})}
            </tbody>
        </table>
    </div>
  </div>
  )
}
