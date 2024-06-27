import { CCard, CCardBody } from "@coreui/react";
import React from "react";
import "./Cards.css";

const Card = ({ data, getSelectedData }) => {
  return (
    <>
      <CCard className="card" onClick={() => getSelectedData(data)}>
        <CCardBody
          key={data.id}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <img alt="images" src={data?.image} />
          <span className="mt-2 card-text-title">{data?.name}</span>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Card;
