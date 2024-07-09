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
import MedicationOrderForm from "./MedicationOrderForm";
import MedicationOrderTable from "../../../../../../Tables/MedicationOrderTable";
import DetailsTable from "./DetailsTable";

const MedicationOrder = () => {
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
    { id: 1, label: "No." },
    { id: 2, label: "MEDICATION DATE" },
    { id: 3, label: "MEDICATION NAME" },
    { id: 4, label: "LAB STATUS" },
    { id: 5, label: "ACTIONS" },
  ];
  const rowData = [
    {
      id: 1,
      date: "06-07-2024",
      name: "Complete Blood Count",
      lab_status: "Received",
      lab_name: "Raj Pharmacy 1",
    },
    {
      id: 2,
      date: "06-07-2024",
      name: "Complete Blood Count",
      lab_status: "Delivered",
      lab_name: "Raj Pharmacy 1",
    },
    {
      id: 3,
      date: "06-07-2024",
      name: "Complete Blood Count",
      lab_status: "Waiting For Approval",
      lab_name: "Raj Pharmacy 1",
    },
    {
      id: 4,
      date: "06-07-2024",
      name: "Complete Blood Count",
      lab_status: "Delivered",
      lab_name: "Raj Pharmacy 1",
    },
    {
      id: 5,
      date: "06-07-2024",
      name: "Complete Blood Count",
      lab_status: "Delivered",
      lab_name: "Raj Pharmacy 1",
    },
    {
      id: 6,
      date: "06-07-2024",
      name: "Complete Blood Count",
      lab_status: "Delivered",
      lab_name: "Raj Pharmacy 1",
    },
    {
      id: 7,
      date: "06-07-2024",
      name: "Complete Blood Count",
      lab_status: "Delivered",
      lab_name: "Raj Pharmacy 1",
    },
    {
      id: 8,
      date: "06-07-2024",
      name: "Complete Blood Count",
      lab_status: "Delivered",
      lab_name: "Raj Pharmacy 1",
    },
    {
      id: 9,
      date: "06-07-2024",
      name: "Complete Blood Count",
      lab_status: "Delivered",
      lab_name: "Raj Pharmacy 1",
    },
    {
      id: 10,
      date: "06-07-2024",
      name: "Complete Blood Count",
      lab_status: "Delivered",
      lab_name: "Raj Pharmacy 1",
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
    if (type === "details") {
      detailPage();
    }
  };

  const options = ["Morning", "Afternoon", "Evening", "Night"];

  return (
    <>
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
            <MedicationOrderTable
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
      {addFormView && (
        <BlurBackground>
          <CModal
            alignment="center"
            visible={addFormView}
            onClose={() => setAddFormView(false)}
            aria-labelledby="VerticallyCenteredExample"
            size="xl"
          >
            <CModalBody className="p-0">
              <div
                className="close-modal"
                onClick={() => {setAddFormView(false)}}
              >
                <img
                  src={Assets.CloseBtn}
                  alt="close-btn"
                  style={{ width: "100%" }}
                />{" "}
              </div>
              <MedicationOrderForm
                back={() => {
                  setAddFormView(false);
                  setSelectedData({});
                }}
                defaultValues={selectedData}
              />
            </CModalBody>
          </CModal>
        </BlurBackground>
      )}

      {detailView && (
        <BlurBackground>
          <CModal
            alignment="center"
            visible={detailView}
            onClose={() => setDetailView(false)}
            aria-labelledby="VerticallyCenteredExample"
            size="lg"
          >
            <CModalBody className="p-0">
              <div className="close-modal" onClick={() => setDetailView(false)}>
                <img
                  src={Assets.CloseBtn}
                  alt="close-btn"
                  style={{ width: "100%" }}
                />{" "}
              </div>
              <DetailsTable
                rowData={detailsValue}
                columns={detailsData}
                getselectedData={getselectedData}
              />
            </CModalBody>
          </CModal>
        </BlurBackground>
      )}
    </>
  );
};

export default MedicationOrder;
