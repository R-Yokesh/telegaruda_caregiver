import React from "react";
import "./Modal.css"; // Import your CSS file for styling modal (optional)
import { CModal, CModalBody } from "@coreui/react";
import { Assets } from "../../assets/Assets";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <CModal
      visible={isOpen}
      onClose={onClose}
      aria-labelledby="LiveDemoExampleLabel"
      alignment="center"
      size="xl"
    >
      <CModalBody className="p-0">
        <div onClick={onClose} className="position-absolute top-0 end-0 cursor">
          <img
            src={Assets.CloseBtn}
            alt="close-btn"
            style={{ width: "75%" }}
          />{" "}
        </div>
        <div>{children}</div>
      </CModalBody>
    </CModal>
  );
};

export default Modal;

{
  /* <div className="close-modal" onClick={onClose}>
          <img
            src={Assets.CloseBtn}
            alt="close-btn"
            style={{ width: "100%" }}
          />{" "}
        </div> */
}
