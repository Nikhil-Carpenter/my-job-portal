import { Link } from "react-router-dom";
import ApplyProcess from "./ApplyProcess";
import Category from "./Category";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state)=>state.authInfo.value)
  // console.log(JSON.stringify([user]));
  return (
    <>
      <div className="slider-area ">
        <div className="slider-active">
          <div
            className="single-slider slider-height d-flex align-items-center imgbg-div"
          >
            <img className="hero-img" src="assets/img/hero/h1_hero.jpg" alt="" />
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-9 col-md-10">
                  <div className="hero__caption">
                    <h1>Find the most exciting startup jobs</h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-8">
                  <form action="#" className="search-box">
                    <div className="input-form">
                      <input type="text" placeholder="Job Tittle or keyword" />
                    </div>
                    <div className="select-form">
                      <div className="select-itms form-group">
                        <select className="form-control" name="select" id="select1">
                          <option value="">Location BD</option>
                          <option value="">Location PK</option>
                          <option value="">Location US</option>
                          <option value="">Location UK</option>
                        </select>
                      </div>
                    </div>
                    <div className="search-form ">
                      <Link to="">Find job</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApplyProcess/>
      {
        user.type === 'Candidate'|| user.type === undefined ? <Category/>:null
      }
     
    </>
  );
};
export default Home;
