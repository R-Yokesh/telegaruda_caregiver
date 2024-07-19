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
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import ImagingOrderForm from "./ObstericHistoryForm";
import ImagingOrderTable from "../../../../../../Tables/ImagingOrderTable";
import MedicalTab from "../../../MedicalTab";
import ObstetricHistoryTable from "../../../../../../Tables/Subjective/ObstetricHistoryTable";
import GynaecHistoryTable from "../../../../../../Tables/Subjective/GynaecHistoryTable";

const OGHistory = () => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "LMP Date" },
    { id: 3, label: "ED Date" },
    { id: 4, label: "Trimster" },
    { id: 5, label: "Gravida" },
    { id: 6, label: "Para" },
    { id: 7, label: "Fertility Treament" },
    { id: 8, label: "Lacatating" },
    { id: 9, label: "ACTIONS" },
  ];
  const rowData = [
    {
      id: 1,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "Lorem ipsum",
      gravida: "Lorem ipsum",
      para: "Lorem ipsum",
      fert_treatment: "Yes",
      lacating: "Yes",
    },
    {
      id: 2,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "Lorem ipsum",
      gravida: "Lorem ipsum",
      para: "Lorem ipsum",
      fert_treatment: "Yes",
      lacating: "Yes",
    },
    {
      id: 3,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "Lorem ipsum",
      gravida: "Lorem ipsum",
      para: "Lorem ipsum",
      fert_treatment: "No",
      lacating: "Yes",
    },
    {
      id: 4,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "Lorem ipsum",
      gravida: "Lorem ipsum",
      para: "Lorem ipsum",
      fert_treatment: "Yes",
      lacating: "No",
    },
    {
      id: 5,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "Lorem ipsum",
      gravida: "Lorem ipsum",
      para: "Lorem ipsum",
      fert_treatment: "No",
      lacating: "No",
    },
    {
      id: 6,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "Lorem ipsum",
      gravida: "Lorem ipsum",
      para: "Lorem ipsum",
      fert_treatment: "Yes",
      lacating: "Yes",
    },
    {
      id: 7,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "Lorem ipsum",
      gravida: "Lorem ipsum",
      para: "Lorem ipsum",
      fert_treatment: "Yes",
      lacating: "Yes",
    },
    {
      id: 8,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "Lorem ipsum",
      gravida: "Lorem ipsum",
      para: "Lorem ipsum",
      fert_treatment: "Yes",
      lacating: "Yes",
    },
    {
      id: 9,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "Lorem ipsum",
      gravida: "Lorem ipsum",
      para: "Lorem ipsum",
      fert_treatment: "Yes",
      lacating: "Yes",
    },
    {
      id: 10,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "Lorem ipsum",
      gravida: "Lorem ipsum",
      para: "Lorem ipsum",
      fert_treatment: "Yes",
      lacating: "Yes",
    },
  ];

  const MensuralcolumnData = [
    { id: 1, label: "No." },
    { id: 2, label: "Menatche Age" },
    { id: 3, label: "Cycles per Year" },
    { id: 4, label: "Cycle Length in days" },
    { id: 5, label: "Flow Duration" },
    { id: 6, label: "Flow Type" },
    { id: 7, label: "InterMenstrual Bleeding" },
    { id: 8, label: "cycle irregularity" },
    { id: 9, label: "dysmenorrhea" },
    { id: 10, label: "LMP" },
    { id: 11, label: "ACTIONS" },
  ];
  const MenstrualrowData = [
    {
      id: 1,
      age: "Lorem ipsum",
      cycle_per_year: "Lorem ipsum",
      cycle_in_days: "Lorem ipsum",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 2,
      age: "Lorem ipsum",
      cycle_per_year: "Lorem ipsum",
      cycle_in_days: "Lorem ipsum",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 3,
      age: "Lorem ipsum",
      cycle_per_year: "Lorem ipsum",
      cycle_in_days: "Lorem ipsum",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 4,
      age: "Lorem ipsum",
      cycle_per_year: "Lorem ipsum",
      cycle_in_days: "Lorem ipsum",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 5,
      age: "Lorem ipsum",
      cycle_per_year: "Lorem ipsum",
      cycle_in_days: "Lorem ipsum",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 6,
      age: "Lorem ipsum",
      cycle_per_year: "Lorem ipsum",
      cycle_in_days: "Lorem ipsum",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 7,
      age: "Lorem ipsum",
      cycle_per_year: "Lorem ipsum",
      cycle_in_days: "Lorem ipsum",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 8,
      age: "Lorem ipsum",
      cycle_per_year: "Lorem ipsum",
      cycle_in_days: "Lorem ipsum",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 9,
      age: "Lorem ipsum",
      cycle_per_year: "Lorem ipsum",
      cycle_in_days: "Lorem ipsum",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 10,
      age: "Lorem ipsum",
      cycle_per_year: "Lorem ipsum",
      cycle_in_days: "Lorem ipsum",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
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

  const getCurrentMenstrualPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return MenstrualrowData?.slice(startIndex, endIndex);
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
  };

  const options = ["Yes", "No"];
  const tabs = [
    { id: 1, title: "Obstetric History" },
    { id: 2, title: "Gynaec History" },
  ];
  const [currentTab, setCurrentTab] = useState(1);
  const [currentHistoryTab, setCurrentHistoryTab] = useState(1);

  const GynaecTabs = [
    { id: 1, title: "Menstrual History" },
    { id: 2, title: "Screening and Diagnostic History" },
  ];

  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };

  const getHistoryCurrentTab = (data) => {
    setCurrentHistoryTab(data);
  };

  return (
    <>
      {!addFormView && (
        <>
          <CRow className="mb-2">
            <CCol lg={5} className="">
              <MedicalTab
                tabs={tabs}
                getCurrentTab={getCurrentTab}
                defaultTab={0}
              />
            </CCol>
            <CCol lg={7}>
              {currentTab === 1 && (
                <CRow>
                  <CCol lg={4}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Pregnant
                        </label>
                        <div
                          className="w-100"
                          style={{
                            boxShadow: "0px 4px 17px 0px #17171D14",
                          }}
                        >
                          <Dropdown
                            options={options}
                            defaultValue={options[0]}
                          />
                        </div>
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={4}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Previous Cesarean Sections
                        </label>
                        <div
                          className="w-100"
                          style={{
                            boxShadow: "0px 4px 17px 0px #17171D14",
                          }}
                        >
                          <Dropdown
                            options={options}
                            defaultValue={options[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={4}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Bad Obstetric History
                        </label>
                        <div
                          className="w-100"
                          style={{
                            boxShadow: "0px 4px 17px 0px #17171D14",
                          }}
                        >
                          <Dropdown
                            options={options}
                            defaultValue={options[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </CCol>
                </CRow>
              )}
              {currentTab === 2 && (
                <MedicalTab
                  tabs={GynaecTabs}
                  getCurrentTab={getHistoryCurrentTab}
                  defaultTab={0}
                />
              )}
            </CCol>
          </CRow>
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
            {currentTab === 1 && (
              <>
                <CRow>
                  <ObstetricHistoryTable
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
                  <GynaecHistoryTable
                    rowData={getCurrentMenstrualPageItems()}
                    columns={MensuralcolumnData}
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
                      style={{
                        border: "1px solid #17171D33",
                        borderRadius: "5px",
                      }}
                    >
                      <Dropdown options={options} />
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
    </>
  );
};

export default OGHistory;
