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
import ActiveButton from "../../../../../Buttons/ActiveButton/ActiveButton";
import SingleDatePicker from "../../../../../DateRangePicker/SingleDatePicker";
import OptionItem from "../../../../../OptionItems/OptionItem";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import SearchBar from "../../../../../SearchBar/SearchBar";
import LabTable from "../../../../../Tables/LabTable";
import LabForm from "./LabForm";
import BlurBackground from "../../../../../BlurBackground/BlurBackground";

const Lab = ({ onClose }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "LAB TEST DATE" },
    { id: 3, label: "LAB TEST NAME" },
    { id: 4, label: "FILE" },
    { id: 5, label: "NOTES" },
    { id: 6, label: "LINK" },
    { id: 6, label: "ACTIONS" },
  ];
  const rowData = [
    {
      id: 1,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PDF",
      notes: "-",
      link: "-",
    },
    {
      id: 2,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PNG",
      notes: "-",
      link: "-",
    },
    {
      id: 3,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PDF",
      notes: "-",
      link: "-",
    },
    {
      id: 4,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PDF",
      notes: "-",
      link: "-",
    },
    {
      id: 5,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PDF",
      notes: "-",
      link: "-",
    },
    {
      id: 6,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PDF",
      notes: "-",
      link: "-",
    },
    {
      id: 7,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PDF",
      notes: "-",
      link: "-",
    },
    {
      id: 8,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PNG",
      notes: "-",
      link: "-",
    },
    {
      id: 9,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PDF",
      notes: "-",
      link: "-",
    },
    {
      id: 10,
      date: "06-07-2024",
      name: "Complete Blood Count",
      file: "PDF",
      notes: "-",
      link: "-",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [addFormView, setAddFormView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);

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
        <CCol md={6} className="mb-2">
          <div className="d-flex gap-2">
            <img
              alt="BackBtn"
              src={Assets.BackBtn}
              style={{ width: "35px" }}
              onClick={onClose}
              className="cursor"
            />
            <span className="Obj-name d-flex align-items-center">Lab</span>
          </div>
        </CCol>
        <CCol md={6} className="mb-2 d-flex justify-content-end">
          <div className="d-flex mt-2">
            <Breadcrumb
              paths={[
                { label: "Home", to: "/patients" },
                { label: "Patient List", to: "/patients" },
                { label: "Medical Profile", to: "/patients/history" },
                { label: "Lab", to: "/patients/history" },
              ]}
            />
          </div>
        </CCol>
      </CRow>
      {!addFormView && (
        <>
          <CRow className="mb-2">
            <CCol lg={8} className="">
              <SearchBar />
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
              <LabTable
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
            <LabForm
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

export default Lab;
