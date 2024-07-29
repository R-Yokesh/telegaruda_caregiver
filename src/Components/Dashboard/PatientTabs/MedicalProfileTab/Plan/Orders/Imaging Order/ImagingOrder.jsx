import {
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CFormSelect,
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
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import ImagingOrderForm from "./ImagingOrderForm";
import ImagingOrderTable from "../../../../../../Tables/ImagingOrderTable";

const ImagingOrder = () => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "DATE" },
    { id: 3, label: "NAME" },
    { id: 4, label: "FILES" },
    // { id: 5, label: "NOTES" },
    { id: 6, label: "LINK" },
    { id: 7, label: "ICD CODE" },
    { id: 8, label: "SCAN CENTER & STATUS" },
    { id: 9, label: "ACTIONS" },
  ];
  const rowData = [
    {
      id: 1,
      date: "01-01-2024",
      name: "Complete Blood Count",
      file: "-",
      notes: "-",
      link: "-",
      icd_code: "D64.9",
      scan_status: "Accepted",
      scan_name: "Raj Scan 1",
    },
    {
      id: 2,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "-",
      notes: "-",
      link: "-",
      icd_code: "D64.9",
      scan_status: "Prescribed",
      scan_name: "Raj Lab 1",
    },
    {
      id: 3,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PDF",
      notes: "-",
      link: "-",
      icd_code: "D64.9",
      scan_status: "Uploaded",
      scan_name: "Raj Lab 1",
    },
    {
      id: 4,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "-",
      notes: "-",
      link: "-",
      icd_code: "D64.9",
      scan_status: "Not Uploaded",
      scan_name: "Raj Lab 1",
    },
    {
      id: 5,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "-",
      notes: "-",
      link: "-",
      icd_code: "D64.9",
      scan_status: "Not Uploaded",
      scan_name: "Raj Lab 1",
    },
    {
      id: 6,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "-",
      notes: "-",
      link: "-",
      icd_code: "D64.9",
      scan_status: "Not Uploaded",
      scan_name: "Raj Lab 1",
    },
    {
      id: 7,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "-",
      notes: "-",
      link: "-",
      icd_code: "D64.9",
      scan_status: "Not Uploaded",
      scan_name: "Raj Lab 1",
    },
    {
      id: 8,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "-",
      notes: "-",
      link: "-",
      icd_code: "D64.9",
      scan_status: "Not Uploaded",
      scan_name: "Raj Lab 1",
    },
    {
      id: 9,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "-",
      notes: "-",
      link: "-",
      icd_code: "D64.9",
      scan_status: "Not Uploaded",
      scan_name: "Raj Lab 1",
    },
    {
      id: 10,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "-",
      notes: "-",
      link: "-",
      icd_code: "D64.9",
      scan_status: "Not Uploaded",
      scan_name: "Raj Lab 1",
    },
  ];
  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);

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
    setSelectedData({});
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
    if (type === "edit") {
      setAddFormView(true);
    }
    if (type === "delete") {
      setDeleteView(true);
    }
  };

  const options = ["Morning", "Afternoon", "Evening", "Night"];

  const getSelectedValue = (data) => {
    console.log(data);
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
              <ImagingOrderTable
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
            <ImagingOrderForm
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
            size="lg"
          >
            <CModalBody className="p-5">
              <CRow className="mb-3">
                <CCol lg={12}>
                  <span className="fs-20 fw-600">Slot Confirmation​</span>
                </CCol>
              </CRow>
              <CRow>
                <CCol lg={3} className="mb-3">
                  <div className="d-flex flex-column gap-2">
                    <span className="fs-14 fw-400 light-label">Date​</span>
                    <span className="fs-18 fw-400 dark-label">
                      {selectedData?.date}
                    </span>
                  </div>
                </CCol>
                <CCol lg={3} className="mb-3">
                  <div className="d-flex flex-column gap-2">
                    <span className="fs-14 fw-400 light-label">Scan Name</span>
                    <span className="fs-18 fw-400 dark-label">
                      {selectedData?.name}
                    </span>
                  </div>
                </CCol>
                <CCol lg={3} className="mb-3">
                  <div className="d-flex flex-column gap-2">
                    <span className="fs-14 fw-400 light-label">ICD Code</span>
                    <span className="fs-18 fw-400 dark-label">D64.9</span>
                  </div>
                </CCol>
                <CCol lg={3} className="mb-3">
                  <div className="d-flex flex-column gap-2">
                    <span className="fs-14 fw-400 light-label">Notes</span>
                    <span className="fs-18 fw-400 dark-label">-</span>
                  </div>
                </CCol>
                <CCol lg={4} className="mb-3">
                  <div className="d-flex flex-column gap-2">
                    <span className="fs-14 fw-400 light-label">
                      Scan Center
                    </span>
                    <span className="fs-18 fw-400 dark-label">
                      {selectedData?.scan_name}
                    </span>
                  </div>
                </CCol>
                <CCol lg={4} className="mb-3">
                  <div className="d-flex flex-column gap-2">
                    <span className="fs-14 fw-400 light-label">Slot</span>
                    <div
                      className="w-100"
                      // style={{
                      //   border: "1px solid #17171D33",
                      //   borderRadius: "5px",
                      // }}
                    >
                      {/* <Dropdown
                        options={options}
                        getSelectedValue={getSelectedValue}
                      /> */}
                      <CFormSelect
                        aria-label="Default select example"
                        disabled={
                          selectedData.scan_status === "Uploaded" ||
                          selectedData.scan_status === "Not Uploaded" && true
                        }
                      >
                        <option>Select</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                        <option value="Night">Night</option>
                      </CFormSelect>
                    </div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <div style={{ width: "128px" }}>
                  <PrimaryButton>SAVE</PrimaryButton>
                </div>
                <div style={{ width: "128px" }}>
                  <SecondaryButton onClick={() => setDetailView(false)}>
                    CANCEL
                  </SecondaryButton>
                </div>
              </CRow>
            </CModalBody>
          </CModal>
        </BlurBackground>
      )}

      {deleteView && (
        <BlurBackground>
          <CModal
            alignment="center"
            visible={deleteView}
            onClose={() => setDeleteView(false)}
            aria-labelledby="VerticallyCenteredExample"
          >
            <CModalBody className="p-3">
              <div className="w-100 mt-2 d-flex justify-content-center flex-column align-items-center">
                <h5>Are you sure want to delete ?</h5>
                <div className="d-flex gap-2 mt-2">
                  <div style={{ width: "80px" }}>
                    <PrimaryButton onClick={() => setDeleteView(false)}>
                      Yes
                    </PrimaryButton>
                  </div>
                  <div style={{ width: "80px" }}>
                    <SecondaryButton onClick={() => setDeleteView(false)}>
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

export default ImagingOrder;
