import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Assets } from "../../../../assets/Assets";
import DoctorCards from "../../../../Components/DoctorCards/DoctorCards";
import { CModal, CModalBody, CModalHeader, CModalTitle, CForm, CFormInput, CButton, CModalFooter, CFormSelect, CRow, CCol } from '@coreui/react'
import './Call.css';
import Filter from "./Filter/Filter";
import RegisteredDoctorCards from "../../../DoctorCards/RegisteredDoctorCards";



const CallTab = () => {


  const [visible, setVisible] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const navigate = useNavigate();

  const DoctorDetail = [
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      type: "Oncology",
      date: "02-04-2024",
      time: "12:15PM",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      type: "Oncology",
      date: "02-04-2024",
      time: "12:15PM",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      type: "Oncology",
      date: "02-04-2024",
      time: "12:15PM",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      type: "Oncology",
      date: "02-04-2024",
      time: "12:15PM",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      type: "Oncology",
      date: "02-04-2024",
      time: "12:15PM",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      type: "Oncology",
      date: "02-04-2024",
      time: "12:15PM",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      type: "Oncology",
      date: "02-04-2024",
      time:"12:15PM",
      time: "12:15PM",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      type: "Oncology",
      date: "02-04-2024",
      time: "12:15PM",
      profile: Assets.Patient,
    },
  ];

  const DetailSec = () => {
    navigate("/patients/summary");
  };
  const handleMobileClick = () => {
    setShowMobileInput(!showMobileInput);
    setShowEmailInput(false);
  };

  const handleEmailClick = () => {
    setShowEmailInput(!showEmailInput);
    setShowMobileInput(false);
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
        <div className="invite-doc-sec-inside">
          <h3>Invite a Doctor</h3>
          <div className="mobi-mail-btn-sec">
            <div className={showMobileInput ? "cliked-icon" : "mobile-icon"}>
              <button type="button" onClick={handleMobileClick}>
                <i className="fas fa-mobile"></i> &nbsp; Mobile
              </button>
            </div>
            <div className={showEmailInput ? "cliked-icon" : "mobile-icon"}>
              <button type="button" onClick={handleEmailClick}>
                <i className="fas fa-envelope"></i> &nbsp;
                Email
              </button>
            </div>
          </div>
        </div>

        {showMobileInput && (
          <>

            <hr />
            <CForm>
              <div className="mobile-input-section">
                <div>
                  <CFormSelect
                    aria-label="Default select example"
                    label={"ISD Code"}
                    options={[
                      '+91 India',
                      { label: ' One', value: '1' },
                      { label: ' Two', value: '2' },
                      { label: ' Three', value: '3' }
                    ]}
                  />
                </div>
                <div>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    label="Mobile Number"
                    placeholder="Enter"
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </div>
                <div>
                  <CButton color="primary" className="start-btn">Start</CButton>
                </div>
              </div>
            </CForm>


          </>
        )}
        {showEmailInput && (
          <>
            <hr />
            <CForm>
              <div className="mobile-input-section">
                <div>
                  <CFormInput
                    type="email"
                    id="exampleFormControlInput1"
                    label="Email Address"
                    placeholder="Enter"
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </div>
                <div>
                  <CButton color="primary" className="start-btn">Start</CButton>
                </div>
              </div>
            </CForm>

          </>
        )}
      </div>

      <div className="doctor-card-sec">
        <div className="row">
         <h4 className="doc-head">Registered Doctors</h4>
          {DoctorDetail?.map((data, i) => (
            <div className="col-4" onClick={() => DetailSec()} >
              <Link className="card-link">
                <RegisteredDoctorCards DoctorDetail={data} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='modal-sec'>
        <Filter visible={visible} setVisible={setVisible} />
      </div>
    </section>
  )
}

export default CallTab