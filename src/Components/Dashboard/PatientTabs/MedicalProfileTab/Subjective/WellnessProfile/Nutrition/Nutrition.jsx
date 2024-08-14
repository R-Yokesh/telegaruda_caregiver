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
import MedicalTab from "../../../MedicalTab";
import ExerciseHabitTable from "../../../../../../Tables/Subjective/WellnessProfileTable/ExerciseHabitTable";
import ExcerciseHabitForm from "../ExerciseHabit/ExcerciseHabitForm";
import NutritionDietTable from "../../../../../../Tables/Subjective/WellnessProfileTable/NutritionDietTable";
import NutritionFluidTable from "../../../../../../Tables/Subjective/WellnessProfileTable/NutritionFluidTable";
import DietForm from "./DietForm";
import FluidIntakeForm from "./FluidIntakeForm";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";

const Nutrition = ({ from }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "Date" },
    { id: 3, label: "Type of Diet" },
    { id: 4, label: "Notes" },
    { id: 9, label: "ACTIONS" },
  ];
  const rowData = [
    {
      id: 1,
      date: "02-04-2024 12:13",
      type_of_diet: "Non-Veg",
      notes: "Lorem ipsum",
    },
    {
      id: 2,
      date: "02-04-2024 12:13",
      type_of_diet: "Non-Veg",
      notes: "Lorem ipsum",
    },
    {
      id: 3,
      date: "02-04-2024 12:13",
      type_of_diet: "Non-Veg",
      notes: "Lorem ipsum",
    },
  ];

  const FluidIntakecolumnData = [
    { id: 1, label: "No." },
    { id: 3, label: "Date" },
    { id: 3, label: "Type" },
    { id: 4, label: "INTAKE (ML)" },
    { id: 6, label: "ACTIONS" },
  ];
  const FluidIntakerowData = [
    {
      id: 1,
      date: "02-04-2024 12:13",
      type: "Water",
      intake: "1500",
    },
    {
      id: 2,
      date: "02-04-2024 12:13",
      type: "Water",
      intake: "1500",
    },
  ];

  const tabs = [
    { id: 1, title: "Diet" },
    { id: 2, title: "Fluid Intake" },
  ];

  const PatientSubMenu2 = localStorage.getItem("PatientSubMenu-4");
  const ParsedPatientSubMenu = PatientSubMenu2
    ? JSON.parse(PatientSubMenu2)
    : 1;
  const [currentTab, setCurrentTab] = useState(ParsedPatientSubMenu);
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };

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

  const getCurrentFluidPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return FluidIntakerowData?.slice(startIndex, endIndex);
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
    if (type === "edit") {
      setAddFormView(true);
    }
    if (type === "delete") {
      detailPage();
    }
  };

  return (
    <>
      {from === "Consult" && (
        <CRow>
          <NutritionDietTable
            rowData={getCurrentPageItems()}
            columns={columnData}
            getselectedData={getselectedData}
            from={from}
          />
        </CRow>
      )}
      {from === "Consult-Intake" && (
        <CRow>
          <NutritionFluidTable
            rowData={getCurrentFluidPageItems()}
            columns={FluidIntakecolumnData}
            getselectedData={getselectedData}
            from={from}
          />
        </CRow>
      )}
      {from !== "Consult" && from !== "Consult-Intake" && (
        <>
          <>
            <CRow className="mb-2">
              <CCol lg={12} className="">
                <MedicalTab
                  tabs={tabs}
                  getCurrentTab={getCurrentTab}
                  defaultTab={ParsedPatientSubMenu - 1}
                />
              </CCol>
            </CRow>
            {!addFormView && (
              <>
                <CRow className="mb-2">
                  <CCol lg={8} className="">
                    <DateSearch />
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
                  {currentTab === 1 && (
                    <>
                      <CRow>
                        <NutritionDietTable
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
                    </>
                  )}
                  {currentTab === 2 && (
                    <>
                      <CRow>
                        <NutritionFluidTable
                          rowData={getCurrentFluidPageItems()}
                          columns={FluidIntakecolumnData}
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
                    </>
                  )}
                </div>
              </>
            )}
          </>

          {addFormView && (
            <CRow className="mb-2">
              <CCard className="p-2 cursor-default mb-5">
                <CCardBody className="mb-3">
                  {currentTab === 1 && (
                    <DietForm
                      back={() => {
                        setAddFormView(false);
                        setSelectedData({});
                      }}
                      // defaultValues={selectedData}
                    />
                  )}
                  {currentTab === 2 && (
                    <FluidIntakeForm
                      back={() => {
                        setAddFormView(false);
                        setSelectedData({});
                      }}
                      // defaultValues={selectedData}
                    />
                  )}
                </CCardBody>
              </CCard>
            </CRow>
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
      )}
    </>
  );
};

export default Nutrition;
