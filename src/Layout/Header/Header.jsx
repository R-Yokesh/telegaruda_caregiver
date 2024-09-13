import React, { useState } from "react";
import "./Header.css";
import { Assets } from "../../assets/Assets";
import { useNavigate } from "react-router-dom";
import { CContainer, CModal, CModalBody } from "@coreui/react";
import CloseButton from "../../Components/Buttons/CloseButton/CloseButton";
import SecondaryButton from "../../Components/Buttons/SecondaryButton/SecondaryButton";
import { useAuth } from "../../contexts/AuthContext";
import useApi from "../../ApiServices/useApi";

const Header = () => {
  const [exit, setExit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patientDetail, setPatientDetail] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [noData, setNoData] = useState(false);
  const [view, setView] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { get } = useApi();

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
  console.log("Viewwww", view);
  // Handle patient selection
  const handlePatientSelect = (patient) => {
    navigate("/patients/history", { state: { PatientDetail: patient } });
    setView(false);
  };

  // Handle button click to fetch patients
  const handleSearchClick = () => {
    getPatients();
    setView(true);
  };

  return (
    <div>
      <header className="header">
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
              aria-label="Search Patient"
            />
            <button
              type="button"
              onClick={handleSearchClick}
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
                        onClick={() => handlePatientSelect(patient)}
                        className="suggestion-item"
                      >
                        {patient?.user?.first_name} {patient?.user?.last_name}
                      </li>
                    ))}
                  </ul>
                ) : !searchValue && noData ? (
                  <div className="no-data">1No data</div>
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
                Are you sure you want to close this session?
              </span>
              <div className="w-100 d-flex justify-content-center gap-3 flex-wrap">
                <div style={{ width: "128px" }}>
                  <CloseButton onClick={logoutHandler}>CLOSE</CloseButton>
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
      </header>
    </div>
  );
};

export default Header;
