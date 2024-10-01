import { useCallback, useEffect, useRef, useState } from "react";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import BlurBackground from "../../../BlurBackground/BlurBackground";
import PrimaryButton from "../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../Buttons/SecondaryButton/SecondaryButton";
import CallButton from "./CallButton/CallButton";

const CallTab = () => {
  const { get, post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [visible, setVisible] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [phone, setPhone] = useState("");
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
  const [providerData, setProviderData] = useState();
  const [consultIdGet, setConsultIdGet] = useState();
  const [consultDetGet, setConsultDetGet] = useState();
  const [callStart, setCallStart] = useState(false);
  const [endCall, setEndCall] = useState(false);

  const getselectedProviderData = (data) => {
    setProviderData(data);
    startConslt(data);
  };

  const startConslt = async (providerDetail) => {
    try {
      const body = {
        provider_id: providerDetail?.user_id,
        consult_date: "2024-09-29",
        consult_time: "11:18",
        patient_id: data?.user_id,
        patient_name: "test",
        speciality: "unknown",
        reason_for_consult: "Garuda Consult Call",
        cart_camera: {
          camera_ip: "192.168.5.163",
          camera_name: "Internal IP Camera",
          camera_type: "minrray",
          camera_short_name: "M",
        },
        consult_date_time: "2024-09-29 11:18:00",
        consult_end_time: "2024-09-29 23:59:00",
      };

      // Use the provided `post` function to send the request
      const response = await post(`resource/consults`, body);

      if (response.code === 201) {
        clearCache();
        getConsulToken(response?.data?.consults?.id);
        setConsultIdGet(response?.data?.consults?.id);
        console.log("first", response?.data?.consults?.id);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getConsulToken = async (consultId) => {
    try {
      const response = await get(
        `resource/consults?limit=&page=1&searchkey=&order_by=&dir=2&from_date=&to_date=&participant_ref_number=${data?.user_id}&consult_status=&consult_id=${consultId}`
      );
      const listData = response?.data?.consults[0]; //
      setConsultDetGet(listData);
      consultCreate(consultId, listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };
  const isOpeningRef = useRef(false);
  const consultCreate = async (consultId, consulDetail) => {
    try {
      const body = {
        consult_id: consultId,
        user_id: data?.user_id,
        cache_type: "create",
      };

      // Use the provided `post` function to send the request
      const response = await post(`patient/ConsultCache`, body);

      if (response.code === 200) {
        if (!isOpeningRef.current) {
          toast?.success("Consult created successfully");
          const participantToken = () => {
            const item = consulDetail?.participants?.find(
              (obj) => obj.role === "subscriber"
            );
            return item ? item.token : null;
          };
          const token = participantToken();
          setCallStart(true);
          await getConsulToken(consultId);

          isOpeningRef.current = true; // Set to true to prevent reopening
          const newWindow = window.open(
            `https://teleconsult.a2zhealth.in/consult/${token}`,
            "_blank"
          );

          // Optional: Reset isOpeningRef after some time or when window is closed
          const interval = setInterval(() => {
            if (newWindow.closed) {
              clearInterval(interval);
              isOpeningRef.current = false; // Reset when the window is closed
            }
          }, 1000);
        }
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const EndConslt = async () => {
    try {
      const body = { consult_id: consultIdGet, status: "ended" };

      // Use the provided `post` function to send the request
      const response = await patch(`resource/consults/${consultIdGet}`, body);

      if (response.code === 200) {
        clearCache();
        consultUpdate(consultIdGet);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const consultUpdate = async (consultId) => {
    try {
      const body = {
        consult_id: consultId,
        user_id: data?.user_id,
        cache_type: "delete",
      };

      // Use the provided `post` function to send the request
      const response = await post(`patient/ConsultCache`, body);

      if (response.code === 200) {
        clearCache();
        setEndCall(false);
        setCallStart(false);
        console.log("first", response?.data?.consults?.id);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(consultDetGet);
  return (
    <section className="call-tab-sec mt-3">
      {!callStart ? (
        <>
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
                <div
                  className={showMobileInput ? "cliked-icon" : "mobile-icon"}
                >
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
                    {/* <div>
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
                </div> */}
                    <div>
                      <p className="form-label">Mobile Number</p>
                      <PhoneInput
                        country={"in"}
                        placeholder="Enter" // Set placeholder here
                        onChange={(value) => setPhone(value)}
                      />
                    </div>
                    {/* <div>
                  <CFormInput
                     type="text"
                     id="exampleFormControlInput1"
                     label="Mobile Number"
                     placeholder="Enter"
                     aria-describedby="exampleFormControlInputHelpInline"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                  />
                </div> */}
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
                    <div className="col-4 d-flex" key={i}>
                      {/* <Link className="card-link"> */}
                      <RegisteredDoctorCards
                        DoctorDetail={data}
                        getselectedProviderData={getselectedProviderData}
                      />
                      {/* </Link> */}
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
        </>
      ) : (
        consultDetGet?.consult_status?.slug === "new" && (
          <>
            <div>
              {/* onClick={() => setEndCall(true)} */}
              <div className="col-12 d-flex justify-content-center align-items-center mb-3">
                <CallButton
                  onClick={() => setEndCall(true)}
                  callStatus={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="card-sec">
                  <div className="row align-items-center">
                    <div className="profile col-4">
                      <img
                        src={providerData?.profile || Assets.NoImg}
                        alt="Patient-image"
                      />
                    </div>
                    <div className="patient-details col-8 p-2">
                      <h5>
                        Dr. {providerData?.user?.first_name}{" "}
                        {providerData?.user?.last_name}
                      </h5>
                      <p className="gap-sec d-flex flex-wrap">
                        <small
                          className="fs-10 fw-500"
                          style={{ wordBreak: "break-all" }}
                        >
                          {providerData?.user?.email}
                        </small>
                        <small className="fs-10 fw-500">|</small>
                        <small className="fs-10 fw-500">
                          {providerData?.user?.mobile}
                        </small>
                      </p>
                      <p className="flex-sec-wrap gap-sec">
                        <small className="fs-10 fw-600">
                          {providerData?.provider_speciality
                            ?.map((item, i) => item?.speciality)
                            .filter(Boolean)
                            .join(", ")}
                        </small>
                        <small className="fs-10 fw-600">|</small>
                        <small className="fs-10 fw-600">
                          {providerData?.date}
                        </small>
                        <small className="fs-10 fw-600">
                          {providerData?.time}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
      {endCall && (
        <BlurBackground>
          <CModal
            alignment="center"
            visible={endCall}
            onClose={() => setEndCall(false)}
            aria-labelledby="VerticallyCenteredExample"
          >
            <CModalBody className="p-3">
              <div className="w-100 mt-2 d-flex justify-content-center flex-column align-items-center">
                <h5>Are you sure want to end the teleconsult ?</h5>
                <div className="d-flex gap-2 mt-2">
                  <div style={{ width: "80px" }}>
                    <PrimaryButton onClick={() => EndConslt()}>
                      Yes
                    </PrimaryButton>
                  </div>
                  <div style={{ width: "80px" }}>
                    <SecondaryButton onClick={() => setEndCall(false)}>
                      No
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </CModalBody>
          </CModal>
        </BlurBackground>
      )}
    </section>
  );
};

export default CallTab;
