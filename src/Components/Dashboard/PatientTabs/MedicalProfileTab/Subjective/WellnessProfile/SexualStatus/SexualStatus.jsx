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
import ExcerciseHabitForm from "../ExerciseHabit/ExcerciseHabitForm";
import MoodTable from "../../../../../../Tables/Subjective/WellnessProfileTable/MoodTable";
import SexualStatusTable from "../../../../../../Tables/Subjective/WellnessProfileTable/SexualStatusTable";
import SexualStatusForm from "./SexualStatusForm";

const SexualStatus = ({ back, from }) => {
  const Data = {
    id: 1,
    sexual_activity: "Active",
    history: "Yes ",
    screening_date: "06-06-2024 ",
    current_status: "Active ",
    sti_current_notes: "lorem",
  };

  return (
    <>
      <CCard className="p-2 cursor-default mb-5">
        <CCardBody className="mb-3">
          <SexualStatusForm back={back} defaultValues={Data} from={from} />
        </CCardBody>
      </CCard>
    </>
  );
};

export default SexualStatus;
