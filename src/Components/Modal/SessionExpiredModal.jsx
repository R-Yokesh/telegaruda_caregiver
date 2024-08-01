import React from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CContainer,
} from "@coreui/react";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";
import CloseButton from "../Buttons/CloseButton/CloseButton";

const SessionExpiredModal = ({ show, onClose, onLogout }) => {
  return (
    <CModal
      alignment="center"
      visible={show}
      onClose={onClose}
      aria-labelledby="VerticallyCenteredExample"
      size="md"
      className="signout-modal"
    >
      <CModalBody>
        <CContainer className="p-2 d-flex flex-column align-items-center mb-2 mt-3">
          <span className="fs-16 fw-600 mb-4">
            Your session has expired. Please log in again to continue.
          </span>
          <div className="w-100 d-flex justify-content-center gap-3 flex-wrap">
            <div style={{ width: "128px" }}>
              <CloseButton onClick={onClose}>OK</CloseButton>
            </div>
          </div>
        </CContainer>
      </CModalBody>
    </CModal>
  );
};

export default SessionExpiredModal;
