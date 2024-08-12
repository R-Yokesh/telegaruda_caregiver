import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import { Assets } from "../../../../../../../assets/Assets";
import DateSelector from "../../../../../../DateRangePicker/DateSelector";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Pagination from "../../../../../../Pagination/Pagination";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PatientEducationForm from "../../PatientEducation/PatientEducationTab/PatientEducationForm";
import NextAppointmentTable from "../../../../../../Tables/NextAppointmentTable";
import NextAppointmentForm from "./NextAppointmentForm";

const NextAppointmentTab = () => {

    const columnData = [
        { id: 1, label: "No" },
        { id: 2, label: "Date & Time" },
        { id: 3, label: "Provider Name" },
        { id: 3, label: "Reason" },
        { id: 7, label: "ACTIONS" },
      ];
      const rowData = [
        {
            id: 1,
            date: "02-04-2024 12:13",
            provider_name: "Lorem ipsum ",
            reason: "Lorem ipsum",
          },
        {
          id: 2,
          date: "02-04-2024 12:13",
          provider_name: "Lorem ipsum ",
          reason: "Lorem ipsum",
        },
        {
            id: 3,
            date: "02-04-2024 12:13",
            provider_name: "Lorem ipsum ",
            reason: "Lorem ipsum",
          },
          {
            id: 4,
            date: "02-04-2024 12:13",
            provider_name: "Lorem ipsum ",
            reason: "Lorem ipsum",
          },
          {
            id: 5,
            date: "02-04-2024 12:13",
            provider_name: "Lorem ipsum ",
            reason: "Lorem ipsum",
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
            <NextAppointmentTable
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
          <NextAppointmentForm
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
  )
}

export default NextAppointmentTab