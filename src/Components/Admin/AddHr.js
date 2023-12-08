import { useRef, useState } from "react"
import AuthApi from "../../WebServices/AuthApi";
import AdminApi, { urls } from "../../WebServices/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { hrReducer } from "../../redux/HrSlice";

export default function AddHr(){

    const [msg,setMsg] = useState();
    const dispatch = useDispatch()

    const namebox = useRef();
    const emailbox = useRef();
    const phonebox = useRef();
    const passbox = useRef();
    const selector = useSelector(state=>state.authInfo.value);

    const handleAddHr = async (event) => {
        event.preventDefault();
        const obj = {fullname:namebox.current.value,email:emailbox.current.value,phone:phonebox.current.value,password:passbox.current.value};
        const resp = await AdminApi.postApiCallToken(urls.ADDHR,obj,selector.token);
        if(resp.data.status){
            setMsg(resp.data.message)
            dispatch(hrReducer(resp.data.data))
        }
        console.log(resp);
    }

return<>
<section className="contact-section">
            <div className="container">
                <div className="d-none d-sm-block mb-5 pb-4">
                <div className="row">
                    <div className="col-12">
                        <h2 className="contact-title">Save HR</h2>
                    </div>
                    <div className="col-lg-8">
                        <form onClick={handleAddHr} className="form-contact contact_form" novalidate="novalidate">
                            <div className="row">
                                <div className="col-12">
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control valid" ref={namebox} type="text" placeholder="Enter hr's name"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control valid" ref={emailbox} type="email" placeholder="Enter your email"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control" type="number" ref={phonebox} placeholder="Enter your phone number"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control" type="password" ref={passbox} placeholder="Enter your password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <button type="submit" className="button button-contactForm boxed-btn">Save</button>
                            </div>
                        </form>
                        <b>{msg}</b>
                    </div>
                </div>
            </div>
            </div>
        </section>
</>
}