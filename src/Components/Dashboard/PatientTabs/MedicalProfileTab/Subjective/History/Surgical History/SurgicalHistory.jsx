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
import SurgicalForm from "./SurgicalForm";
import MedicationTable from "../../../../../../Tables/Subjective/MedicationTable";
import SurgicalTable from "../../../../../../Tables/Subjective/SurgicalTable";

const SurgicalHistory = () => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "Date" },
    { id: 3, label: "Surgery Name" },
    { id: 4, label: "Reason" },
    // { id: 5, label: "Notes" },
    { id: 5, label: "ACTIONS" },
  ];
  const rowData = [
    {
      id: 1,
      date: "06-07-2024",
      name: "Lorem Ipsum",
      reason: "Lorem Ipsum",
      notes: "Lorem ipsum",
    },
    {
      id: 2,
      date: "06-07-2024",
      name: "Lorem Ipsum",
      reason: "Lorem Ipsum",
      notes: "Lorem ipsum",
    },
    {
      id: 3,
      date: "06-07-2024",
      name: "Lorem Ipsum",
      reason: "Lorem Ipsum",
      notes: "Lorem ipsum",
    },
    {
      id: 4,
      date: "06-07-2024",
      name: "Lorem Ipsum",
      reason: "Lorem Ipsum",
      notes: "Lorem ipsum",
    },
    {
      id: 5,
      date: "06-07-2024",
      name: "Lorem Ipsum",
      reason: "Lorem Ipsum",
      notes: "Lorem ipsum",
    },
    {
      id: 6,
      date: "06-07-2024",
      name: "Lorem Ipsum",
      reason: "Lorem Ipsum",
      notes: "Lorem ipsum",
    },
    {
      id: 7,
      date: "06-07-2024",
      name: "Lorem Ipsum",
      reason: "Lorem Ipsum",
      notes: "Lorem ipsum",
    },
    {
      id: 8,
      date: "06-07-2024",
      name: "Lorem Ipsum",
      reason: "Lorem Ipsum",
      notes: "Lorem ipsum",
    },
    {
      id: 9,
      date: "06-07-2024",
      name: "Lorem Ipsum",
      reason: "Lorem Ipsum",
      notes: "Lorem ipsum",
    },
    {
      id: 10,
      date: "06-07-2024",
      name: "Lorem Ipsum",
      reason: "Lorem Ipsum",
      notes: "Lorem ipsum",
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

  const options = ["Morning", "Afternoon", "Evening", "Night"];

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
            <SurgicalTable
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
            <SurgicalForm
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

export default SurgicalHistory;
