import {
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import LabForm from "../../../Objective/Lab/LabForm";
import Pagination from "../../../../../../Pagination/Pagination";
import LabTable from "../../../../../../Tables/LabTable";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../../../../../../assets/Assets";
import DateSelector from "../../../../../../DateRangePicker/DateSelector";
import LabOrderTable from "../../../../../../Tables/LabOrderTable";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import SignsSymptomsForm from "./SignsSymptomsForm";
import MedicationOrderTable from "../../../../../../Tables/MedicationOrderTable";
import SymtomsTable from "../../../../../../Tables/Subjective/SymtomsTable";

const SignsSymptoms = () => {
  const detailsData = [
    { id: 1, label: "" },
    { id: 2, label: "RX" },
    { id: 3, label: "FREQUENCY" },
    { id: 4, label: "DURATION" },
    { id: 5, label: "QTY/TAKEN" },
    { id: 6, label: "ACTIONS​" },
  ];

  const detailsValue = [
    {
      id: 1,
      name: "Prescribed",
      rx: "Medicine 1",
      frequency: ["1/2", 0, 0, 0],
      duration: "3 Days",
      qty: "1 tablet",
    },
    {
      id: 2,
      name: "Alternative",
      rx: "Medicine 2",
      frequency: ["1/2", 0, 0, 0],
      duration: "3 Days",
      qty: "1 tablet",
    },
  ];

  const columnData = [
    { id: 1, label: "NO." },
    { id: 2, label: "ONSET" },
    { id: 3, label: "LOCATION" },
    { id: 4, label: "DURATION IN DAYS" },
    { id: 5, label: "Characteristics (SL)" },
    { id: 6, label: "aggravating factors" },
    { id: 7, label: "Relieving factors" },
    { id: 8, label: "Temporal factors" },
    { id: 9, label: "Severity" },
    { id: 10, label: "Notes" },
    { id: 11, label: "Actions" },
  ];
  const rowData = [
    {
      id: 1,
      onset: "06-07-2024",
      location: "Knee",
      duration_days: "20",
      characteristics: "Fracture",
      aggravating: "Fracture",
      relieving: "Fracture",
      temporal: "Fracture",
      severity: "Normal",
      notes: "-",
    },
    {
      id: 2,
      onset: "06-07-2024",
      location: "Knee",
      duration_days: "20",
      characteristics: "Fracture",
      aggravating: "Fracture",
      relieving: "Fracture",
      temporal: "Fracture",
      severity: "Mild",
      notes: "-",
    },
    {
      id: 3,
      onset: "06-07-2024",
      location: "Knee",
      duration_days: "20",
      characteristics: "Fracture",
      aggravating: "Fracture",
      relieving: "Fracture",
      temporal: "Fracture",
      severity: "Normal",
      notes: "-",
    },
    {
      id: 4,
      onset: "06-07-2024",
      location: "Knee",
      duration_days: "20",
      characteristics: "Fracture",
      aggravating: "Fracture",
      relieving: "Fracture",
      temporal: "Fracture",
      severity: "Moderate",
      notes: "-",
    },
    {
      id: 5,
      onset: "06-07-2024",
      location: "Knee",
      duration_days: "20",
      characteristics: "Fracture",
      aggravating: "Fracture",
      relieving: "Fracture",
      temporal: "Fracture",
      severity: "Worst",
      notes: "-",
    },
    {
      id: 6,
      onset: "06-07-2024",
      location: "Knee",
      duration_days: "20",
      characteristics: "Fracture",
      aggravating: "Fracture",
      relieving: "Fracture",
      temporal: "Fracture",
      severity: "Severe",
      notes: "-",
    },
    {
      id: 7,
      onset: "06-07-2024",
      location: "Knee",
      duration_days: "20",
      characteristics: "Fracture",
      aggravating: "Fracture",
      relieving: "Fracture",
      temporal: "Fracture",
      severity: "Normal",
      notes: "-",
    },
    {
      id: 8,
      onset: "06-07-2024",
      location: "Knee",
      duration_days: "20",
      characteristics: "Fracture",
      aggravating: "Fracture",
      relieving: "Fracture",
      temporal: "Fracture",
      severity: "Normal",
      notes: "-",
    },
    {
      id: 9,
      onset: "06-07-2024",
      location: "Knee",
      duration_days: "20",
      characteristics: "Fracture",
      aggravating: "Fracture",
      relieving: "Fracture",
      temporal: "Fracture",
      severity: "Normal",
      notes: "-",
    },
    {
      id: 10,
      onset: "06-07-2024",
      location: "Knee",
      duration_days: "20",
      characteristics: "Fracture",
      aggravating: "Fracture",
      relieving: "Fracture",
      temporal: "Fracture",
      severity: "Normal",
      notes: "-",
    },
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
            </CCol>
          </CRow>
          <div className="mb-2">
            <CRow>
              <SymtomsTable
                rowData={getCurrentPageItems()}
                columns={columnData}
                getselectedData={getselectedData}
              />
            </CRow>
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
            <SignsSymptomsForm
              back={() => {
                setAddFormView(false);
                setSelectedData({});
              }}
              defaultValues={selectedData}
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
  );
};

export default SignsSymptoms;
