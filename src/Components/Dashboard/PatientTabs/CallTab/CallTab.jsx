import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Assets } from "../../../../assets/Assets";
import DoctorCards from "../../../../Components/DoctorCards/DoctorCards";
import './Call.css';



const CallTab = () => {


  const [visible, setVisible] = useState(false)
  const navigate = useNavigate();
  
  const DoctorDetail = [
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
  ];
  
  const DetailSec = () => {
    navigate("/patients/summary");
  };



  return (
    <section className="call-tab-sec mt-3">
      <div className="flex-sec top-sec">
        <div className="bread-crumbs">
          <p className="mb-0">
            <Link to="/patients">Patient</Link> /{" "}
            <Link to="/patients" className="active">
            Registered Doctor 
            </Link>
          </p>
        </div>

        <div className="search-filter-sec">
        <div className="search-bar">
          <input type="text" placeholder="Search Doctor" />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="patient-adding">
          <button onClick={() => setVisible(!visible)}>
            <img src={Assets.filter} alt="filter-sec" className="filter-icon" />{" "}
            Filter
          </button>
        </div>
        </div>
      </div>
      <div className="invite-doc-sec">  
        
        <h3>Invite a Doctor</h3>
           
       <div className="mobi-mail-btn-sec">
        <div className="mobile-icon">
        <button type="submit" >
       <i className="fas fa-mobile "></i> Mobile
          </button>
        </div>
        <div className="email-icon">
          <button type="submit">
          <i className="fas fa-envelope"></i> 
          Email
          </button>
          </div>
        </div> 
      
      </div>
      <div className="doctor-card-sec">
        <div className="row">
          {DoctorDetail?.map((data, i) => (
            <div className="col-4" onClick={() => DetailSec()} >
              <Link className="card-link">
                <DoctorCards DoctorDetail={data} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <div className='modal-sec'>
        <FilterModal visible={visible} setVisible={setVisible} />
      </div> */}
    </section>
  )
}

export default CallTab