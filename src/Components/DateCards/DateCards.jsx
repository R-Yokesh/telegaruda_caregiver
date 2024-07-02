import { CCard, CCardBody } from "@coreui/react";
import React from "react";
import { Assets } from "../../assets/Assets";

const DateCards = ({ data }) => {
  return (
    <>
      <CCard className="date-card cursor-default">
        <CCardBody>
          <div className="d-flex align-items-center justify-content-between">
            <span className="fs-20 fw-600">{data?.date}</span>
            <div>
              <img src={Assets.deleteorg} alt="Del" className="cursor"/>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default DateCards;
