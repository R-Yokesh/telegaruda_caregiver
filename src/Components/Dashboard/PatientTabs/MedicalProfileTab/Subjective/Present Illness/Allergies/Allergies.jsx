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
  import Pagination from "../../../../../../Pagination/Pagination";
  import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
  import { Assets } from "../../../../../../../assets/Assets";
  import DateSelector from "../../../../../../DateRangePicker/DateSelector";
  import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
  import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
  import MedicationForm from "../Medication/MedicationForm";
  import AllergiesTable from "../../../../../../Tables/Subjective/AllergiesTable";
import AllergiesForm from "./AllergiesForm";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";

const Allergies = () => {

    const columnData = [
        { id: 1, label: "No." },
        { id: 2, label: "Onset Date" },
        { id: 6, label: "Allergy" },
        { id: 7, label: "Reaction" },
        { id: 8, label: "Severity" },
        { id: 9, label: " Status" },
        { id: 11, label: "ACTIONS" },
      ];
      const rowData = [
        {
          id: 1,
          onset_date: "06-07-2024",
          allergy: "Knee (category 1)",
          reaction: "-",
          severity: "-",
          status: "-",
        },
        {
          id: 2,
          onset_date: "06-07-2024",
          allergy: "Knee (category 1)",
          reaction: "-",
          severity: "-",
          status: "-",
        
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
            <CCol lg={10} className="">
              <DateSearch />
            </CCol>
            <CCol
              lg={2}
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
            <AllergiesTable
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
            <AllergiesForm
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
  )
}

export default Allergies