import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Assets } from "../../../../assets/Assets";
import DoctorCards from "../../../../Components/DoctorCards/DoctorCards";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CButton,
  CModalFooter,
  CFormSelect,
  CRow,
  CCol,
} from "@coreui/react";
import "./Call.css";
import Filter from "./Filter/Filter";
import RegisteredDoctorCards from "../../../DoctorCards/RegisteredDoctorCards";
import useApi from "../../../../ApiServices/useApi";
import Pagination from "../../../Pagination/Pagination";

const CallTab = () => {
  const { get } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [visible, setVisible] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctorsPagi, setDoctorsPagi] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const itemsPerPage = 10;
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
      time: "12:15PM",
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
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEmailClick = () => {
    setShowEmailInput(!showEmailInput);
    setShowMobileInput(false);
  };

  const getDoctorLists = useCallback(async () => {
    try {
      const response = await get(
        `resource/providers?limit=${itemsPerPage}&page=${currentPage}&order_by=id&dir=1&searchkey=${searchValue}&gender=${
          filters?.gender ?? ""
        }&speciality=${filters?.speciality ?? ""}`
      );
      const listData = response?.data?.providers; //
      setDoctors(listData);
      setDoctorsPagi(response?.data?.pagination);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [currentPage, filters?.gender, filters?.speciality, get, searchValue]);
  useEffect(() => {
    getDoctorLists();
  }, [getDoctorLists]);

  const getFilterValues = (selectedGender, selectedSpeciality) => {
    console.log(selectedGender, selectedSpeciality);
    setFilters({ gender: selectedGender, speciality: selectedSpeciality });
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
            <input
              type="text"
              placeholder="Search Doctor"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="patient-adding">
            <button onClick={() => setVisible(!visible)}>
              <img
                src={Assets.filter}
                alt="filter-sec"
                className="filter-icon"
              />{" "}
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
                <i className="fas fa-envelope"></i> &nbsp; Email
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
                      "+91 India",
                      { label: " One", value: "1" },
                      { label: " Two", value: "2" },
                      { label: " Three", value: "3" },
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
                  <CButton color="primary" className="start-btn">
                    Start
                  </CButton>
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
                  <CButton color="primary" className="start-btn">
                    Start
                  </CButton>
                </div>
              </div>
            </CForm>
          </>
        )}
      </div>

      <div className="doctor-card-sec">
        <div className="row">
          <h4 className="doc-head">Registered Doctors</h4>
          {doctors.length <= 0 ? (
            <>
              <div className="w-100 d-flex justify-content-center mt-4">
                <h3 className="fs-24 fw-600">No data available</h3>
              </div>
            </>
          ) : (
            <>
              {doctors?.map((data, i) => (
                <div className="col-4" key={i}>
                  <Link className="card-link">
                    <RegisteredDoctorCards DoctorDetail={data} />
                  </Link>
                </div>
              ))}
              <CRow className="mb-3">
                <CCol lg={12} className="d-flex justify-content-center">
                  <Pagination
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalItems={doctorsPagi?.total || 0}
                    itemsPerPage={itemsPerPage}
                  />
                </CCol>
              </CRow>
            </>
          )}
        </div>
      </div>
      <div className="modal-sec">
        <Filter
          visible={visible}
          setVisible={setVisible}
          getFilterValues={getFilterValues}
        />
      </div>
    </section>
  );
};

export default CallTab;
