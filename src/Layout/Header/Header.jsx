import React, { useState, useEffect } from "react";
import "./Header.css";
import { Assets } from "../../assets/Assets";
import { useLocation, useNavigate } from "react-router-dom";
import { CContainer, CModal, CModalBody } from "@coreui/react";
import CloseButton from "../../Components/Buttons/CloseButton/CloseButton";
import SecondaryButton from "../../Components/Buttons/SecondaryButton/SecondaryButton";
import { useAuth } from "../../contexts/AuthContext";
import useApi from "../../ApiServices/useApi";
import PrimaryButton from "../../Components/Buttons/PrimaryButton/PrimaryButton";
import { toast } from "react-toastify";

const Header = ({ toggleSidebar }) => {
  const [exit, setExit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patientDetail, setPatientDetail] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [noData, setNoData] = useState(false);
  const [view, setView] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { post, clearCache, patch, get } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const storedConsultData = localStorage.getItem("consultDetails");
  const parseConsultData =
    storedConsultData !== undefined ? JSON.parse(storedConsultData) : null;

  const storedCallStatusData = localStorage.getItem("callStatus");
  const parsedCallStatusData = storedCallStatusData
    ? JSON.parse(storedCallStatusData)
    : null;

  const [isConfirmtocallcut, setIsConfirmToCallCut] = useState(false);

  const logoutHandler = () => {
    sessionStorage.setItem("loggedIn", "false");
    navigate("/");
    logout();
  };

  // Fetch patients when the button is clicked
  const getPatients = async () => {
    if (!searchValue.trim()) {
      setPatientDetail([]); // Clear previous data if input is empty
      setNoData(false);
      return;
    }
    setLoading(true);
    setError(null);
    setNoData(false);
    try {
      const response = await get(
        `resource/patients?searchkey=${searchValue}&order_by=id&dir=2&type=all`
      );
      if (response.code === 200) {
        const patients = response?.data?.patients || [];
        setPatientDetail(patients);
        setNoData(patients.length === 0);
      } else {
        setPatientDetail([]);
        setNoData(true);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
      setPatientDetail([]);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };
  const [searchPatient, setSearchPatient] = useState();
  // Handle patient selection
  const handlePatientSelect = (patient) => {
    navigate("/patients/history", { state: { PatientDetail: patient } });
    setView(false);
    setSearchValue("");
    localStorage.removeItem("PatientConsultTab");
    localStorage.removeItem("patiendDetailTab");
    localStorage.removeItem("PatientMenu");
    localStorage.removeItem("PatientSubMenu-1");
    localStorage.removeItem("PatientSubMenu-2");
    localStorage.removeItem("PatientSubMenu-3");
    localStorage.removeItem("PatientSubMenu-4");
    localStorage.removeItem("PatientSubMenu-5");
  };

  // // Handle button click to fetch patients
  // const handleSearchClick = () => {
  //   getPatients();
  //   setView(true);
  // };

  // Debounce function to delay API call until user stops typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue) {
        getPatients();
        setView(true);
      } else {
        setView(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  // Logout and SignOut
  const EndConslt = async () => {
    try {
      const body = { consult_id: parseConsultData?.id, status: "ended" };

      // Use the provided `post` function to send the request
      const response = await patch(
        `resource/consults/${parseConsultData?.id}`,
        body
      );

      if (response.code === 200) {
        clearCache();
        consultUpdate(parseConsultData?.id);
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
        localStorage.removeItem("consultDetails");
        localStorage.removeItem("providerData");
        localStorage.removeItem("callStatus");
        logoutHandler();
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // End Consultwhile search
  const EndCallWhileSearch = async () => {
    try {
      const body = { consult_id: parseConsultData?.id, status: "ended" };

      // Use the provided `post` function to send the request
      const response = await patch(
        `resource/consults/${parseConsultData?.id}`,
        body
      );

      if (response.code === 200) {
        clearCache();
        consultUpdateWhileSearch(parseConsultData?.id);
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
  const consultUpdateWhileSearch = async (consultId) => {
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
        localStorage.removeItem("consultDetails");
        localStorage.removeItem("providerData");
        localStorage.removeItem("callStatus");
        toast.success("Session ended successfully.");
        setIsConfirmToCallCut(false);
        handlePatientSelect(searchPatient);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <header className="header">
        {/* Mobile Menu Icon */}
        <div className="mobile-menu-icon">
          <i className="fa fa-bars" onClick={toggleSidebar}></i>
        </div>
        <div className="logo">{/* <img src={""} alt="Apollo Logo" /> */}</div>
        <div className="sbn">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Patient"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (e.target.value.length === 0) {
                  setView(false);
                }
              }}
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') {
              //     handleSearchClick();  // Trigger the API call when "Enter" is pressed
              //   }
              // }}
              aria-label="Search Patient"
            />
            <button
              type="button"
              // onClick={handleSearchClick}
              aria-label="Search"
              disabled={loading}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="search-suggestions-sec">
            {searchValue && view && (
              <>
                {loading ? (
                  <div className="loading">Loading...</div>
                ) : error ? (
                  <div className="error">{error}</div>
                ) : patientDetail.length > 0 ? (
                  <ul className="search-suggestions">
                    {patientDetail.map((patient) => (
                      <li
                        key={patient?.id}
                        onClick={() => {
                          if (parsedCallStatusData) {
                            setSearchPatient(patient);
                            setIsConfirmToCallCut(true);
                          } else {
                            handlePatientSelect(patient);
                          }
                        }}
                        className="suggestion-item"
                      >
                        <div className="patient-card">
                          <div className="patient-info">
                            <span className="patient-pad">
                              <strong>
                                {patient?.user?.first_name}{" "}
                                {patient?.user?.last_name}
                              </strong>
                            </span>
                            <span>
                              {patient?.additional_info?.age
                                ? patient?.additional_info?.age
                                : "-"}
                            </span>{" "}
                            <span>
                              {patient?.user?.gender
                                ? patient?.user?.gender
                                : "-"}
                            </span>
                            <p>
                              MRN:{" "}
                              {patient?.additional_info?.mrn_number
                                ? patient?.additional_info?.mrn_number
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : !searchValue && noData ? (
                  <div className="no-data">No data</div>
                ) : patientDetail?.length === 0 && searchValue ? (
                  <div className="no-data">No data</div>
                ) : null}
              </>
            )}
          </div>

          <div className="profile-info">
            <img src={user?.profileImage || Assets.user} alt="Profile" />
            <div className="profile-text">
              <span className="profile-name">{user?.name || ""}</span>
              <span className="profile-location">
                Caregiver{" "}
                <button
                  className="signout-btn"
                  onClick={() => setExit(true)}
                  aria-label="Sign out"
                >
                  Signout
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* Sign out alert modal */}
        <CModal
          alignment="center"
          visible={exit}
          onClose={() => setExit(false)}
          aria-labelledby="signout-modal"
          size="lg"
          className="signout-modal"
        >
          <CModalBody>
            <CContainer className="p-2 d-flex flex-column align-items-center mb-2">
              <span className="signout-message mb-3">
                {parsedCallStatusData
                  ? "There is an active tele-consultation. Are you sure you to cancel and close this session?"
                  : "Are you sure want to signout?"}
              </span>
              <div className="w-100 d-flex justify-content-center gap-3 flex-wrap">
                <div style={{ width: "128px" }}>
                  <PrimaryButton
                    onClick={() => {
                      if (parsedCallStatusData) {
                        EndConslt();
                      } else {
                        logoutHandler();
                      }
                    }}
                  >
                    SIGNOUT
                  </PrimaryButton>
                </div>
                <div style={{ width: "128px" }}>
                  <SecondaryButton onClick={() => setExit(false)}>
                    CANCEL
                  </SecondaryButton>
                </div>
              </div>
            </CContainer>
          </CModalBody>
        </CModal>
        {/* Search in call tym alert modal */}
        <CModal
          alignment="center"
          visible={isConfirmtocallcut}
          onClose={() => setIsConfirmToCallCut(false)}
          aria-labelledby="signout-modal"
          size="lg"
          className="signout-modal"
        >
          <CModalBody>
            <CContainer className="p-2 d-flex flex-column align-items-center mb-2">
              <span className="fs-18 fw-500 mb-3">
                {parsedCallStatusData &&
                  "There is an active tele-consultation. Are you sure you to cancel and close this session?"}
              </span>
              <div className="w-100 d-flex justify-content-center gap-3 flex-wrap">
                <div style={{ width: "128px" }}>
                  <PrimaryButton
                    onClick={() => {
                      localStorage.setItem(
                        "searchwhencall",
                        JSON.stringify(true)
                      );
                      EndCallWhileSearch();
                    }}
                  >
                    Yes
                  </PrimaryButton>
                </div>
                <div style={{ width: "128px" }}>
                  <SecondaryButton onClick={() => setIsConfirmToCallCut(false)}>
                    No
                  </SecondaryButton>
                </div>
              </div>
            </CContainer>
          </CModalBody>
        </CModal>
      </header>
    </div>
  );
};

export default Header;
