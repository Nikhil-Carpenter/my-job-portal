import { useRef } from "react"
import { useSelector } from "react-redux";
import AdminApi, { urls } from "../../../WebServices/AdminApi";

export default function CategoryUpdate(){
    const selector = useSelector(state=>state.hrUpdate.value);
    const user = useSelector(state=>state.authInfo.value);
    const title = useRef();
    const status = useRef();
    const update = async(event) =>{
        event.preventDefault();
        const ob = {title:title.current.value,status:status.current.value};
        const url = urls.CATEGORYUPDATE + selector.id;
        const res = await AdminApi.putApiCallToken(url,ob,user.token)
        console.log(res);
    }
    return <section className="contact-section">
    <div className="container">
        <div className="d-none d-sm-block mb-5 pb-4">
        <div className="row">
            <div className="col-12">
                <h2 className="contact-title">Update Category</h2>
            </div>
            <div className="col-lg-8">
                <form onClick={update} className="form-contact contact_form" novalidate="novalidate">
                    <div className="row">
                        <div className="col-12">
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input className="form-control valid" defaultValue={selector.title} ref={title} type="text" placeholder="Enter Title"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <select defaultValue={selector.status} ref={status} className="form-control valid">
                                    <option defaultValue={selector.status}></option>
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