import { useRef, useState } from "react"
import AdminApi, { urls } from "../../../WebServices/AdminApi";
import { useSelector } from "react-redux";

export default function AddCategory(){
    const selector = useSelector(state=>state.authInfo.value);
    const titlebox = useRef();
    console.log();
    const handleAddCategory = async(event) =>{
        event.preventDefault();
        const obj = {title:titlebox.current.value}
        const resp = await AdminApi.postApiCallToken(urls.CATEGORYSAVE,obj,selector.token);
        console.log(resp);
    }
return<>
<section className="contact-section">
            <div className="container">
                <div className="d-none d-sm-block mb-5 pb-4">
                <div className="row">
                    <div className="col-12">
                        <h2 className="contact-title">Save New Category</h2>
                    </div>
                    <div className="col-lg-8">
                        <form onClick={handleAddCategory} className="form-contact contact_form" novalidate="novalidate">
                            <div className="row">
                                <div className="col-12">
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control valid" ref={titlebox} type="text" placeholder="Enter title"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <button type="submit" className="button button-contactForm boxed-btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </section>
</>
}