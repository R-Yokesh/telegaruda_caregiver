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
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import FamilyHistoryTable from "../../../../../../Tables/Subjective/FamilyHistoryTable";

const FamilyHistory = ({ from }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "Disease" },
    { id: 3, label: "Grandparents" },
    { id: 4, label: "Father" },
    { id: 5, label: "Mother" },
    { id: 6, label: "Brother(s)" },
    { id: 7, label: "Sister(s)" },
    { id: 8, label: "Daughter(s)" },
    { id: 9, label: "Son(s)" },
  ];
  const rowData = [
    {
      id: 1,
      disease: "Migraine",
      grandparents: "yes",
      father: "yes",
      mother: "yes",
      Brother: "yes",
      Sister: "yes",
      Daughter: "yes",
      Son: "no",
    },
    {
      id: 2,
      disease: "Stroke",
      grandparents: "yes",
      father: "yes",
      mother: "no",
      Brother: "yes",
      Sister: "no",
      Daughter: "yes",
      Son: "yes",
    },
    {
      id: 3,
      disease: "Thyroid Disease",
      grandparents: "no",
      father: "no",
      mother: "yes",
      Brother: "yes",
      Sister: "no",
      Daughter: "yes",
      Son: "yes",
    },
    {
      id: 4,
      disease: "Sinus",
      grandparents: "yes",
      father: "yes",
      mother: "yes",
      Brother: "no",
      Sister: "no",
      Daughter: "yes",
      Son: "yes",
    },
    {
      id: 5,
      disease: "Tuberculosis",
      grandparents: "no",
      father: "no",
      mother: "yes",
      Brother: "yes",
      Sister: "no",
      Daughter: "yes",
      Son: "no",
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
      <>
        {from !== "Consult" && (
          <CRow className="mb-2">
            <CCol lg={8} className="">
              <DateSelector />
            </CCol>
            <CCol
              lg={4}
              className="d-flex justify-content-end align-items-center gap-2"
            >
              <div>
                {!addFormView ? (
                  <PrimaryButton onClick={() => addFormPage()}>
                    <div className="d-flex align-items-center gap-2">
                      <img src={Assets.EditPencil} alt="add" />
                      <span className="fs-16 fw-600">Edit</span>
                    </div>
                  </PrimaryButton>
                ) : (
                  <div style={{ width: "100px" }}>
                    <PrimaryButton onClick={() => setAddFormView(false)}>
                      <div className="d-flex justify-content-center gap-2 w-100">
                        <span className="fs-16 fw-600">Save</span>
                      </div>
                    </PrimaryButton>
                  </div>
                )}
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
        )}
        <div className="mb-2">
          <FamilyHistoryTable
            rowData={getCurrentPageItems()}
            columns={columnData}
            getselectedData={getselectedData}
            addFormView={addFormView}
          />
          {from !== "Consult" && (
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
          )}
        </div>
      </>

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

export default FamilyHistory;
