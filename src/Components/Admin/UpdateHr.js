import { useSelector } from "react-redux";
import AdminApi, { urls } from "../../WebServices/AdminApi";
import { useRef } from "react";

export default function UpdateHr(){
    const hrupdate = useSelector(state=>state.hrUpdate.value);
    const selector = useSelector(state=>state.authInfo.value);
    const name = useRef();
    const phone = useRef();
    const statusbox = useRef();
    const update = async(event) => {
        event.preventDefault();
        const obj = {
            fullname:name.current.value,
            phone:phone.current.value,
            status:statusbox.current.value,
        }
        const Url = urls.HRUPDATE + hrupdate.id;
        const resp = await AdminApi.putApiCallToken(Url,obj,selector.token);
        console.log(resp);
    }
    return <section className="contact-section">
    <div className="container">
        <div className="d-none d-sm-block mb-5 pb-4">
        <div className="row">
            <div className="col-12">
                <h2 className="contact-title">Update HR</h2>
            </div>
            <div className="col-lg-8">
                <form onSubmit={update} className="form-contact contact_form" novalidate="novalidate">
                    <div className="row">
                        <div className="col-12">
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input className="form-control valid" defaultValue={hrupdate.fullname} ref={name} type="text" placeholder="Enter Full Name"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input className="form-control valid" defaultValue={hrupdate.phone} ref={phone} type="number" placeholder="Enter Phone"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <select defaultValue={hrupdate.status} ref={statusbox} className="form-control valid">
                                    <option defaultValue={hrupdate.status}></option>
                                    <option value={true}>Active</option>
                                    <option value={false}>Deactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" className="button button-contactForm boxed-btn">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
</section>
}