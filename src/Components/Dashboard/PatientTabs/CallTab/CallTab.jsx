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
import { getCurrentDateTime } from "../../../../Utils/commonUtils";
import { format, parseISO } from "date-fns";

const formatDate = (dateString) => {
  const date = dateString ? parseISO(dateString) : null;
  return date ? format(date, "dd-MM-yyyy hh:mm a") : "";
};

const CallTab = () => {
  const { get, post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [visible, setVisible] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
  const storedProviderData = localStorage.getItem("providerData");
  const parseProviderData = JSON.parse(storedProviderData);
  const [providerData, setProviderData] = useState(
    parseProviderData ? parseProviderData : ""
  );
  const storedConsultData = localStorage.getItem("consultDetails");
  const parseConsultData = JSON.parse(storedConsultData);
  const [consultIdGet, setConsultIdGet] = useState(
    parseConsultData ? parseConsultData?.id : ""
  );
  const [consultDetGet, setConsultDetGet] = useState(
    parseConsultData ? parseConsultData : ""
  );
  const storedCallStatusData = localStorage.getItem("callStatus");

  const [callStart, setCallStart] = useState(
    storedCallStatusData ? storedCallStatusData : false
  );
  const [endCall, setEndCall] = useState(false);

  const getselectedProviderData = (data) => {
    localStorage.setItem("providerData", JSON.stringify(data));
    setProviderData(data);
    startConslt(data);
  };
  const currentDateTime = getCurrentDateTime();
  const startConslt = async (providerDetail) => {
    try {
      const body = {
        provider_id: providerDetail?.user_id,
        consult_date: currentDateTime?.consult_date,
        consult_time: currentDateTime?.consult_time,
        patient_id: data?.user_id,
        patient_name: data?.user?.first_name + " " + data?.user?.last_name,
        speciality: "unknown",
        reason_for_consult: "Garuda Consult Call",
        cart_camera: {
          camera_ip: "192.168.5.163",
          camera_name: "Internal IP Camera",
          camera_type: "minrray",
          camera_short_name: "M",
        },
        consult_date_time: currentDateTime?.consult_date_time,
        consult_end_time: currentDateTime?.consult_end_time,
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
      localStorage.setItem("consultDetails", JSON.stringify(listData));
      consultCreate(consultId, listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };
  const isOpeningRef = useRef(false);

  // For check tab is open or closed
  const [tab, setTab] = useState(null);
  const [isTabClosed, setIsTabClosed] = useState(true);

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
          localStorage.setItem("callStatus", JSON.stringify(true));
          await getConsulToken(consultId);

          isOpeningRef.current = true; // Set to true to prevent reopening
          const newWindow = window.open(
            `https://teleconsult.a2zhealth.in/consult/${token}`,
            "_blank"
          );
          setTab(newWindow);
          setIsTabClosed(false);
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
        // localStorage.setItem("callStatus", JSON.stringify(false));
        localStorage.removeItem("callStatus");
        localStorage.removeItem("consultDetails");
        localStorage.removeItem("providerData");
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
        // localStorage.setItem("callStatus", JSON.stringify(false));
        setCallStart(false);
        localStorage.removeItem("consultDetails");
        localStorage.removeItem("providerData");
        localStorage.removeItem("callStatus");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const checkTabClosed = () => {
      if (tab) {
        if (tab.closed) {
          setIsTabClosed(true);
          clearInterval(intervalId); // Clear the interval if the tab is closed
          clearCache();
          consultUpdate(consultDetGet?.id); // Call the API function
        }
      }
    };

    const intervalId = setInterval(checkTabClosed, 1000); // Check every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [consultDetGet?.id, tab]);

  //Call via mobile
  const [callError, setCallError] = useState("");
  const mobileCall = async () => {
    setCallError("");
    try {
      const body = {
        consult_date: currentDateTime?.consult_date,
        consult_time: currentDateTime?.consult_time,
        provider_id: 0,
        patient_id: data?.user_id,
        patient_name: "Test",
        speciality: "unknown",
        reason_for_consult: "Garuda Consult Call",
        consult_doctor: "UnKnown",
        cart_camera: {
          camera_ip: "192.168.5.163",
          camera_name: "Internal IP Camera",
          camera_type: "minrray",
          camera_short_name: "M",
        },
        doctor_mobile: `+${phone}`,
        teleType: "1",
        consult_date_time: currentDateTime?.consult_date_time,
        consult_end_time: currentDateTime?.consult_end_time,
      };

      // Use the provided `post` function to send the request
      const response = await post(`resource/consults`, body);

      if (response.code === 201) {
        clearCache();
        getConsulToken(response?.data?.consults?.id);
        setConsultIdGet(response?.data?.consults?.id);
        setProviderData("");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setCallError(
        "Please enter the right ISD Code of your mobile number or Try Again..."
      );
    }
  };

  //Call via mail
  const [mailError, setMailError] = useState("");
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const mailValidate = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      mailCall();
    } else {
      setMailError("Please enter a valid email address.");
    }
  };
  const mailCall = async () => {
    setMailError("");
    try {
      const body = {
        consult_date: currentDateTime?.consult_date,
        consult_time: currentDateTime?.consult_time,
        provider_id: 0,
        patient_id: data?.user_id,
        patient_name: "Test",
        speciality: "unknown",
        reason_for_consult: "Garuda Consult Call",
        consult_doctor: "UnKnown",
        cart_camera: {
          camera_ip: "192.168.5.163",
          camera_name: "Internal IP Camera",
          camera_type: "minrray",
          camera_short_name: "M",
        },
        doctor_email: email,
        teleType: "3",
        consult_date_time: currentDateTime?.consult_date_time,
        consult_end_time: currentDateTime?.consult_end_time,
      };

      // Use the provided `post` function to send the request
      const response = await post(`resource/consults`, body);

      if (response.code === 201) {
        clearCache();
        getConsulToken(response?.data?.consults?.id);
        setConsultIdGet(response?.data?.consults?.id);
        setProviderData("");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMailError(
        "Please enter the right ISD Code of your mobile number or Try Again..."
      );
    }
  };

  const render = localStorage.getItem("searchwhencall");
  const isRender = JSON.parse(render);
  //for buton auto hide if call cut
  const getConsul = useCallback(
    async (consultId) => {
      try {
        const response = await get(
          `resource/consults?limit=&page=1&searchkey=&order_by=&dir=2&from_date=&to_date=&participant_ref_number=${data?.user_id}&consult_status=&consult_id=${consultId}`
        );
        const listData = response?.data?.consults[0]; //
        setConsultDetGet();
        setCallStart(false);
        localStorage.removeItem("searchwhencall");
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    },
    [get, data?.user_id]
  );
  useEffect(() => {
    if (isRender) {
      getConsul();
    }
  }, [getConsul, isRender]);

  console.log("consultDetGet", consultDetGet);
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
                      <CButton
                        color="primary"
                        className="start-btn"
                        onClick={() => mobileCall()}
                      >
                        Start
                      </CButton>
                    </div>
                  </div>
                  {callError && (
                    <small className="mt-2" style={{ color: "red" }}>
                      {callError}
                    </small>
                  )}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <CButton
                        color="primary"
                        className="start-btn"
                        onClick={(e) => mailValidate(e)}
                      >
                        Start
                      </CButton>
                    </div>
                  </div>
                  {mailError && (
                    <small className="mt-2" style={{ color: "red" }}>
                      {mailError}
                    </small>
                  )}
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
            <div className="row d-flex justify-content-center align-items-center mb-3">
              {/* onClick={() => setEndCall(true)} */}
              <div className="col-lg-3 col-sm-6">
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
                      {!providerData?.user?.first_name ? (
                        <h5>
                          Dr.
                          {
                            consultDetGet?.participants[0]?.participant_info
                              ?.name
                          }
                        </h5>
                      ) : (
                        <h5>
                          Dr. {providerData?.user?.first_name}{" "}
                          {providerData?.user?.last_name}
                        </h5>
                      )}
                      <p className="gap-sec d-flex flex-wrap">
                        <small
                          className="fs-10 fw-500"
                          style={{ wordBreak: "break-all" }}
                        >
                          {providerData?.user?.email ||
                            consultDetGet?.participants[0]?.participant_info
                              ?.email}
                        </small>
                        {providerData?.user?.mobile && (
                          <small className="fs-10 fw-500">|</small>
                        )}
                        <small className="fs-10 fw-500">
                          {providerData?.user?.mobile ||
                            consultDetGet?.participants[0]?.participant_info
                              ?.phone}
                        </small>
                      </p>
                      <p className="flex-sec-wrap gap-sec">
                        {/* <small className="fs-10 fw-600">
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
                        </small> */}
                        <small className="fs-10 fw-600">
                          {formatDate(consultDetGet?.scheduled_at)}
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
