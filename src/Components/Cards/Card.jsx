import { CCard, CCardBody } from "@coreui/react";
import React from "react";
import "./Cards.css";

const Card = ({ data, getSelectedData, className }) => {
  return (
    <>
      <CCard
        className={`card ${
          className ? className : "minheight-188 max-height-100"
        }`}
        onClick={() => getSelectedData(data)}
      >
        <CCardBody
          key={data.id}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <img alt="images" src={data?.image} />
          <span className="mt-2 card-text-title text-align-center">
            {data?.name}
          </span>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Card;
