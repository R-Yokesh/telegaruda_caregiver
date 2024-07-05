import React, { useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import Pagination from "../../../../../Pagination/Pagination";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import BlurBackground from "../../../../../BlurBackground/BlurBackground";
import DateSelector from "../../../../../DateRangePicker/DateSelector";
import ImmunizationForm from "./ImmunizationForm";
import ImmunizationTable from "../../../../../Tables/ImmunizationTable";
import DatePicker from "react-datepicker";
import Dropdown from "../../../../../Dropdown/Dropdown";

const Immunization = ({ onClose }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "VACCINE" },
    { id: 3, label: "PERIOD" },
    { id: 4, label: "STATUS" },
    { id: 5, label: "DOSAGE DATE" },
    { id: 6, label: "TAKEN DATE" },
    { id: 7, label: "ACTIONS" },
  ];
  const rowData = [
    {
      id: 1,
      vaccine: "Lorem Ipsum",
      period: "Lorem Ipsum",
      status: "Lorem Ipsum",
      dosage_date: "06-07-2024",
      taken_date: "06-07-2024",
    },
    {
      id: 2,
      vaccine: "Lorem Ipsum",
      period: "Lorem Ipsum",
      status: "Lorem Ipsum",
      dosage_date: "06-07-2024",
      taken_date: "06-07-2024",
    },
    {
      id: 3,
      vaccine: "Lorem Ipsum",
      period: "Lorem Ipsum",
      status: "Lorem Ipsum",
      dosage_date: "06-07-2024",
      taken_date: "06-07-2024",
    },
    {
      id: 4,
      vaccine: "Lorem Ipsum",
      period: "Lorem Ipsum",
      status: "Lorem Ipsum",
      dosage_date: "06-07-2024",
      taken_date: "06-07-2024",
    },
    {
      id: 5,
      vaccine: "Lorem Ipsum",
      period: "Lorem Ipsum",
      status: "Lorem Ipsum",
      dosage_date: "06-07-2024",
      taken_date: "06-07-2024",
    },
    {
      id: 6,
      vaccine: "Lorem Ipsum",
      period: "Lorem Ipsum",
      status: "Lorem Ipsum",
      dosage_date: "06-07-2024",
      taken_date: "06-07-2024",
    },
    {
      id: 7,
      vaccine: "Lorem Ipsum",
      period: "Lorem Ipsum",
      status: "Lorem Ipsum",
      dosage_date: "06-07-2024",
      taken_date: "06-07-2024",
    },
    {
      id: 8,
      vaccine: "Lorem Ipsum",
      period: "Lorem Ipsum",
      status: "Lorem Ipsum",
      dosage_date: "06-07-2024",
      taken_date: "06-07-2024",
    },
    {
      id: 9,
      vaccine: "Lorem Ipsum",
      period: "Lorem Ipsum",
      status: "Lorem Ipsum",
      dosage_date: "06-07-2024",
      taken_date: "06-07-2024",
    },
    {
      id: 10,
      vaccine: "Lorem Ipsum",
      period: "Lorem Ipsum",
      status: "Lorem Ipsum",
      dosage_date: "06-07-2024",
      taken_date: "06-07-2024",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [addFormView, setAddFormView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Get today's date
  const today = new Date();

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
  const options = ["Severity", "Option 2", "Option 3"]; // Example options

  const getselectedData = (data, type) => {
    console.log(type, "first", data);
    setSelectedData(data);
    if (type === "edit") {
      addFormPage();
    }
    if (type === "delete") {
      setDeleteView(true);
    }
  };

  return (
    <>
      <CRow className="mb-0">
        <CCol md={4} className="mb-2">
          <div className="d-flex gap-2">
            <img
              alt="BackBtn"
              src={Assets.BackBtn}
              style={{ width: "35px" }}
              onClick={onClose}
              className="cursor"
            />
            <span className="Obj-name d-flex align-items-center">
              Immunization Status
            </span>
          </div>
        </CCol>
        <CCol md={8} className="mb-2 d-flex justify-content-end">
          <div className="d-flex mt-2">
            <Breadcrumb
              paths={[
                { label: "Home", to: "/patients" },
                { label: "Patient List", to: "/patients" },
                { label: "Medical Profile", to: "/patients/history" },
                { label: "Immunization Status", to: "/patients/history" },
              ]}
            />
          </div>
        </CCol>
      </CRow>
      {!addFormView && (
        <>
          <CRow className="mb-2">
            <CCol lg={8} className="">
              <>
                <CRow className="mb-2">
                  <CCol md={3} className="d-flex flex-column gap-1">
                    <span className="fs-18 fw-400">Start Date *</span>
                    <div style={{ width: "100%" }}>
                      <DatePicker
                        showIcon
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="date-range-selector"
                        maxDate={today}
                      />
                    </div>
                  </CCol>
                  <CCol md={3} className="d-flex flex-column gap-1">
                    <span className="fs-18 fw-400">End Date *</span>
                    <div style={{ width: "100%" }}>
                      <DatePicker
                        showIcon
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="date-range-selector"
                        maxDate={today}
                      />
                    </div>
                  </CCol>
                  <CCol
                    md={3}
                    className="d-flex flex-column gap-1 justify-content-end"
                  >
                    <div style={{ width: "100%" }}>
                      <Dropdown options={options} />
                    </div>
                  </CCol>
                  <CCol
                    md={3}
                    className="d-flex flex-column gap-1 justify-content-end"
                    style={{ width: "60px" }}
                  >
                    <PrimaryButton>
                      <div className="d-flex align-items-center gap-2">
                        <img src={Assets.search} alt="close" />
                      </div>
                    </PrimaryButton>
                  </CCol>
                </CRow>
              </>
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
            <CRow>
              <ImmunizationTable
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
            <ImmunizationForm
              back={() => {
                setAddFormView(false);
                setSelectedData({});
              }}
              defaultValues={selectedData}
            />
          </CCardBody>
        </CCard>
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

export default Immunization;
