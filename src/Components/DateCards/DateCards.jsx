import { CCard, CCardBody } from "@coreui/react";
import React from "react";
import { Assets } from "../../assets/Assets";

const DateCards = ({ data, onClick }) => {
  return (
    <>
      <CCard className="date-card cursor-default">
        <CCardBody>
          <div className="d-flex align-items-center justify-content-between">
            <div onClick={() => onClick(data, "edit")} className="cursor">
              <span className="fs-20 fw-600">{data?.date}</span>
            </div>
            <div onClick={() => onClick(data, "delete")}>
              <img src={Assets.deleteorg} alt="Del" className="cursor" />
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default DateCards;
