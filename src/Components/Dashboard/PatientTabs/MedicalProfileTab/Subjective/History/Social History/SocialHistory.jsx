import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import Pagination from "../../../../../../Pagination/Pagination";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../../../../../../assets/Assets";
import DateSelector from "../../../../../../DateRangePicker/DateSelector";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import MedHistoryForm from "./MedHistoryForm";
import MedicalHistoryTable from "../../../../../../Tables/Subjective/MedicalHistoryTable";
import SocialHistoryTable from "../../../../../../Tables/Subjective/SocialHistoryTable";

const SocialHistory = ({ from,back }) => {

  const Data = 
    {
      id: 1,
      smoking: "No",
      alcohol: "No",
      drugs: "No",
    }
  return (
    <>
    
        <CCard className="p-2 cursor-default mb-5">
          <CCardBody className="mb-3">
            <MedHistoryForm
              back={back}
              defaultValues={Data}
            />
          </CCardBody>
        </CCard>
    </>
  );
};

export default SocialHistory;
