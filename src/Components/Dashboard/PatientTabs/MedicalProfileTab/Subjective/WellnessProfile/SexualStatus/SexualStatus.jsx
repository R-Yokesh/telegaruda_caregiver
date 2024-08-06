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

const SexualStatus = () => {
  const columnData = [
    {  label: "NO." },
    {  label: "Sexual Activity" },
    {  label: "History of STI" },
    {label: "Last STI Screening Date"},
    {label: "Current STI Status"},
    {  label: "Actions" },
  ];
  const rowData = [
    {
      id: 1,
      sexual_activity:"Active",
      history: "Yes ",
      screening_date: "06-06-2024 ",
      current_status: "Active ",
    },
    {
      id: 2,
      sexual_activity:"Active",
      history: "Yes ",
      screening_date: "06-06-2024",
      current_status: "Active ",
    },
    {
      id: 3,
      sexual_activity:"Active",
      history: "Yes ",
      screening_date: "06-06-2024",
      current_status: "Active ",
    },
    { 
      id: 4,
      sexual_activity:"Active",
      history: "Yes ",
      screening_date: "06-06-2024",
      current_status: "Active ",
    },
    {
      id: 5,
      sexual_activity:"Active",
      history: "Yes ",
      screening_date: "06-06-2024",
      current_status: "Active ",
    },
    {
      id: 6,
      sexual_activity:"Active",
      history: "Yes ",
      screening_date: "06-06-2024",
      current_status: "Active ",
    }

  ];
  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});

  const itemsPerPage = 5; // Number of items to display per page

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to get items for the current page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rowData?.slice(startIndex, endIndex);
  };

  const addFormPage = () => {
    setAddFormView(true);
  };

  const detailPage = () => {
    setDetailView(true);
  };

  const getselectedData = (data, type) => {
    console.log(type, "first", data);
    setSelectedData(data);
    if (type === "edit") {
      addFormPage();
    }
    if (type === "delete") {
      detailPage();
    }
  };

  return (
    <>
    {!addFormView && (
      <>
        <CRow className="mb-2">
          <CCol lg={8} className="">
            <DateSelector />
          </CCol>
          <CCol
            lg={4}
            className="d-flex justify-content-end align-items-center gap-2"
          >
            <div>
              <PrimaryButton onClick={() => addFormPage()}>
                <div className="d-flex align-items-center gap-2">
                  <img src={Assets.Add} alt="add" />
                  <span className="fs-16 fw-600">Add</span>
                </div>
              </PrimaryButton>
            </div>
            <div>
              <PrimaryButton onClick={() => addFormPage()}>
                <div className="d-flex align-items-center gap-2">
                  <img src={Assets.OptionsIcon} alt="add" />
                </div>
              </PrimaryButton>
            </div>
          </CCol>
        </CRow>
        <div className="mb-2">
          <SexualStatusTable
            rowData={getCurrentPageItems()}
            columns={columnData}
            getselectedData={getselectedData}
          />

          <CRow className="mb-3">
            <CCol lg={12} className="d-flex justify-content-center">
              <Pagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalItems={rowData?.length}
                itemsPerPage={itemsPerPage}
              />
            </CCol>
          </CRow>
        </div>
      </>
    )}
    {addFormView && (
      <CCard className="p-2 cursor-default mb-5">
        <CCardBody className="mb-3">
          <SexualStatusForm
            back={() => {
              setAddFormView(false);
              setSelectedData({});
            }}
            // defaultValues={selectedData}
          />
        </CCardBody>
      </CCard>
    )}

    {detailView && (
      <BlurBackground>
        <CModal
          alignment="center"
          visible={detailView}
          onClose={() => setDetailView(false)}
          aria-labelledby="VerticallyCenteredExample"
        >
          <CModalBody className="p-3">
            <div className="w-100 mt-2 d-flex justify-content-center flex-column align-items-center">
              <h5>Are you sure want to delete ?</h5>
              <div className="d-flex gap-2 mt-2">
                <div style={{ width: "80px" }}>
                  <PrimaryButton onClick={() => setDetailView(false)}>
                    Yes
                  </PrimaryButton>
                </div>
                <div style={{ width: "80px" }}>
                  <SecondaryButton onClick={() => setDetailView(false)}>
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
  )
}

export default SexualStatus