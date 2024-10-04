import React, { useState } from "react";
import "./CallButton.css";
import useApi from "../../../../../ApiServices/useApi";
import { useLocation } from "react-router-dom";
import SecondaryButton from "../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../Buttons/PrimaryButton/PrimaryButton";
import { CModal, CModalBody } from "@coreui/react";
import BlurBackground from "../../../../BlurBackground/BlurBackground";
import { toast } from "react-toastify";

const CommonCallButton = () => {
  const { post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const storedConsultData = localStorage.getItem("consultDetails");
  const parseConsultData = JSON.parse(storedConsultData);
  const [endCall, setEndCall] = useState(false);
  const storedCallStatusData = localStorage.getItem("callStatus");

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
        setEndCall(false);
        localStorage.removeItem("consultDetails");
        localStorage.removeItem("providerData");
        localStorage.removeItem("callStatus");
        toast.success('Session ended successfully')
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {storedCallStatusData === "true" && (
        <button
          type="button"
          className={`call-button `}
          onClick={() => setEndCall(true)}
        >
          <span className="button__text">Call in progress... </span>
          <span className="button__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="white"
              fill="none"
            >
              <line x1="4" y1="4" x2="20" y2="20" strokeWidth={4}></line>
              <line x1="20" y1="4" x2="4" y2="20" strokeWidth={4}></line>
            </svg>
          </span>
        </button>
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
    </>
  );
};

export default CommonCallButton;
