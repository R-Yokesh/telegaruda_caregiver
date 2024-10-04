import React, { useState } from "react";
import { CDBSidebarMenuItem } from "cdbreact";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CContainer, CModal, CModalBody } from "@coreui/react";
import SecondaryButton from "../../Components/Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../Components/Buttons/PrimaryButton/PrimaryButton";
import useApi from "../../ApiServices/useApi";
import { toast } from "react-toastify";

const AppSideNav = ({ menus }) => {
  // const storedCallStatusData = localStorage.getItem("callStatus");
  // const parsedCallStatusData = storedCallStatusData
  //   ? JSON.parse(storedCallStatusData)
  //   : null;
  // const isAuthorized = parsedCallStatusData === true;
  const { post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const navigate = useNavigate();

  const [isCallEnd, setIsCallEnd] = useState(false);
  const handleClick = (e, menu) => {
    const storedCallStatusData = localStorage.getItem("callStatus");
    const parsedCallStatusData = storedCallStatusData
      ? JSON.parse(storedCallStatusData)
      : null;
    const isAuthorized = parsedCallStatusData === true;
    if (isAuthorized) {
      e.preventDefault(); // Prevent navigation if not authorized
      setIsCallEnd(true);
    }
  };

  // End Consultwhile search
  const EndCallWhileSearch = async () => {
    const storedConsultData = localStorage.getItem("consultDetails");
    const parseConsultData =
      storedConsultData !== undefined ? JSON.parse(storedConsultData) : null;

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
        localStorage.removeItem("searchwhencall");
        toast.success("Session ended successfully.");
        setIsCallEnd(false);
        navigate("/patients");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      {menus.map((menu, index) => (
        <CDBSidebarMenuItem key={index}>
          {/* <div className={`${isAuthorized ? "disabled" : ""}`}> */}
          <Link to={menu.to} onClick={(e) => handleClick(e, menu)}>
            <div className="row flex-sec">
              <img src={menu.iconClass} alt="menu-icon" className="menu-icon" />
              <div className="side-section">
                <p>{menu.name}</p>
                {/* <p className='menu-small'><small>{menu.subName}</small></p> */}
              </div>
            </div>
          </Link>
          {/* </div> */}
        </CDBSidebarMenuItem>
      ))}
      {/* Search in call tym alert modal */}
      <CModal
        alignment="center"
        visible={isCallEnd}
        onClose={() => setIsCallEnd(false)}
        aria-labelledby="signout-modal"
        size="lg"
        className="signout-modal"
      >
        <CModalBody>
          <CContainer className="p-2 d-flex flex-column align-items-center mb-2">
            <span className="fs-18 fw-500 mb-3">
              {
                "There is an active tele-consultation. Are you sure you to cancel and close this session?"
              }
            </span>
            <div className="w-100 d-flex justify-content-center gap-3 flex-wrap">
              <div style={{ width: "100px" }}>
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
              <div style={{ width: "100px" }}>
                <SecondaryButton onClick={() => setIsCallEnd(false)}>
                  No
                </SecondaryButton>
              </div>
            </div>
          </CContainer>
        </CModalBody>
      </CModal>
    </>
  );
};

export default AppSideNav;
