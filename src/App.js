import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Job from './Components/Job';
import About from './Components/About';
import Contact from './Components/Contact';
import ApplyProcess from './Components/ApplyProcess';
import Category from './Components/Category';
import Login from './Components/Login';
import Register from './Components/Register';
import AddHr from './Components/Admin/AddHr';
import HrList from './Components/Admin/HrList';
import WrongUrl from './Components/WrongUrl';
import AddCategory from './Components/Admin/Category/AddCategory';
import CategoryList from './Components/Admin/Category/CategoryList';
import UpdateHr from './Components/Admin/UpdateHr';
import CategoryUpdate from './Components/Admin/Category/CategoryUpdate';
import JobList from './Components/Admin/JobList';
import CandidateList from './Components/Admin/Candidate/CandidateList';
import AddJobByHr from './Components/HR/AddJobByHr';
import JobListByHr from './Components/HR/JobListByHr';
import CategoryListByHr from './Components/HR/Category/CategoryListByHr';
import UpdateJobByHr from './Components/HR/UpdateJobByHr';
import AppliedJob from './Components/HR/AppliedJob';
import ApplyJob from './Components/Candidate/ApplyJob';
import JobAppliedCandidate from './Components/Candidate/JobAppliedCandidate';
import JobLisByCategoryId from './Components/Candidate/JobLisByCategoryId';
import Profile from './Components/Candidate/Profile';

function App() {
  return (<div>
  <Nav/>  
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/job' element={<Job/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/contact' element={<Contact/>}></Route>
    <Route path='/applyprocess' element={<ApplyProcess/>}></Route>
    <Route path='/category' element={<Category/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/addhr' element={<AddHr/>}></Route>
    <Route path='/hrlist' element={<HrList/>}></Route>
    <Route path='/addcategory' element={<AddCategory/>}></Route>
    <Route path='/categorylist' element={<CategoryList/>}></Route>
    <Route path='/updatehr' element={<UpdateHr/>}></Route>
    <Route path='/categoryupdate' element={<CategoryUpdate/>}></Route>
    <Route path='/joblist' element={<JobList/>}></Route>
    <Route path='/candidate_list' element={<CandidateList/>}></Route>
    <Route path='/addjobbyhr' element={<AddJobByHr/>}></Route>
    <Route path='/joblistbyhr' element={<JobListByHr/>}></Route>
    <Route path='/categorylistbyhr' element={<CategoryListByHr/>}></Route>
    <Route path='/updatejobbyhr' element={<UpdateJobByHr/>}></Route>
    <Route path='/appliedjob' element={<AppliedJob/>}></Route>
    <Route path='/applyjob' element={<ApplyJob/>}></Route>
    <Route path='/joblistbycategory/:id' element={<JobLisByCategoryId/>}></Route>
    <Route path='/job_applied_by_candidate' element={<JobAppliedCandidate/>}></Route>
    <Route path='/userprofile' element={<Profile/>}></Route>
    <Route path='/*' element={<WrongUrl/>}></Route>
  </Routes>
  <Footer/>
  </div>
  );
}

export default App;
