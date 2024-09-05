import {
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
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
import ScreeningHistory from "../../../../../../Tables/Subjective/ScreeningHistory";
import MensturalHistoryForm from "./MensturalHistoryForm";
import ScreeningHistoryForm from "./ScreeningHistoryForm";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import useApi from "../../../../../../../ApiServices/useApi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const OGHistory = ({ from, back }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "LMP Date" },
    { id: 3, label: "ED Date" },
    { id: 4, label: "Trimester" },
    { id: 5, label: "Gravida" },
    { id: 6, label: "Para" },
    { id: 7, label: "Bad Obstetric History" },
    { id: 8, label: "ACTIONS" },
  ];
  const rowData = [
    {
      id: 1,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "First",
      gravida: 3,
      para: 5,
      fert_treatment: "Yes",
      lacating: "Yes",
      pregnant: "Yes",
      cesarean: "Yes",
      boh: "Yes",
    },
    {
      id: 2,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "First",
      gravida: 1,
      para: 1,
      fert_treatment: "Yes",
      lacating: "Yes",
      cesarean: "Yes",
      boh: "No",
    },
    {
      id: 3,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "First",
      gravida: 1,
      para: 1,
      fert_treatment: "No",
      lacating: "Yes",
      boh: "No",
    },
    {
      id: 4,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "First",
      gravida: 1,
      para: 1,
      fert_treatment: "Yes",
      lacating: "No",
      boh: "No",
    },
    {
      id: 5,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "First",
      gravida: 1,
      para: 1,
      fert_treatment: "No",
      lacating: "No",
      boh: "Yes",
    },
    {
      id: 6,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "First",
      gravida: 1,
      para: 1,
      fert_treatment: "Yes",
      lacating: "Yes",
      boh: "Yes",
    },
    {
      id: 7,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "First",
      gravida: 1,
      para: 1,
      fert_treatment: "Yes",
      lacating: "Yes",
      boh: "Yes",
    },
    {
      id: 8,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "First",
      gravida: 1,
      para: 1,
      fert_treatment: "Yes",
      lacating: "Yes",
      boh: "Yes",
    },
    {
      id: 9,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "First",
      gravida: 1,
      para: 1,
      fert_treatment: "Yes",
      lacating: "Yes",
      boh: "Yes",
    },
    {
      id: 10,
      lmp_date: "01-01-2024",
      ed_date: "05-02-2024",
      trimster: "First",
      gravida: 1,
      para: 1,
      fert_treatment: "Yes",
      lacating: "Yes",
      boh: "Yes",
    },
  ];

  const MensuralcolumnData = [
    { id: 1, label: "No." },
    { id: 3, label: "Menarche Age" },
    // { id: 3, label: "Cycles per Year" },
    // { id: 4, label: "Cycle Length in days" },
    // { id: 5, label: "Flow Duration" },
    // { id: 6, label: "Flow Type" },
    // { id: 7, label: "InterMenstrual Bleeding" },
    { id: 3, label: "cycle irregularity" },
    { id: 4, label: "dysmenorrhea" },
    { id: 5, label: "LMP" },
    { id: 2, label: "Menopause" },
    { id: 6, label: "ACTIONS" },
  ];
  const MenstrualrowData = [
    {
      id: 1,
      age: "18",
      menopause: "Yes",
      cycle_per_year: "20",
      cycle_in_days: "30",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 2,
      age: "25",
      menopause: "No",
      cycle_per_year: "45",
      cycle_in_days: "37",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 3,
      age: "25",
      menopause: "No",
      cycle_per_year: "45",
      cycle_in_days: "37",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 4,
      age: "25",
      menopause: "Yes",
      cycle_per_year: "45",
      cycle_in_days: "37",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 5,
      age: "25",
      menopause: "Yes",
      cycle_per_year: "45",
      cycle_in_days: "37",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 6,
      age: "25",
      menopause: "Yes",
      cycle_per_year: "45",
      cycle_in_days: "37",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 7,
      age: "25",
      menopause: "Yes",
      cycle_per_year: "45",
      cycle_in_days: "37",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 8,
      age: "25",
      menopause: "Yes",
      cycle_per_year: "45",
      cycle_in_days: "37",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 9,
      age: "25",
      menopause: "Yes",
      cycle_per_year: "45",
      cycle_in_days: "37",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
    {
      id: 10,
      age: "25",
      menopause: "Yes",
      cycle_per_year: "45",
      cycle_in_days: "37",
      flow_duration: "Lorem ipsum",
      flow_type: "Lorem ipsum",
      bleeding: "Yes",
      irregularity: "Yes",
      dysmenorrhea: "Yes",
      lmp: "02-05-2024",
    },
  ];

  const ScreeningcolumnData = [
    { id: 1, label: "No." },
    { id: 2, label: "date of last pap smear" },
    { id: 3, label: "History of abnormal pap smear" },
    { id: 4, label: "date of last mamogram" },
    { id: 5, label: "History of mamogram" },
    { id: 6, label: "date of last Breast Exam" },
    { id: 7, label: "History of Breast Exam" },
    { id: 8, label: "ACTIONS" },
  ];
  const ScreeningrowData = [
    {
      id: 1,
      date_of_last_pap: "02-05-2024",
      history_of_abnormal: "Yes",
      date_of_last_mamogram: "07-05-2024",
      history_of_mamogram: "No",
      date_of_last_breast: "12-05-2024",
      history_of_breast: "Yes",
    },
    {
      id: 2,
      date_of_last_pap: "02-05-2024",
      history_of_abnormal: "Yes",
      date_of_last_mamogram: "07-05-2024",
      history_of_mamogram: "No",
      date_of_last_breast: "12-05-2024",
      history_of_breast: "Yes",
    },
    {
      id: 3,
      date_of_last_pap: "02-05-2024",
      history_of_abnormal: "Yes",
      date_of_last_mamogram: "08-06-2024",
      history_of_mamogram: "No",
      date_of_last_breast: "12-07-2024",
      history_of_breast: "Yes",
    },
    {
      id: 4,
      date_of_last_pap: "02-05-2024",
      history_of_abnormal: "Yes",
      date_of_last_mamogram: "07-05-2024",
      history_of_mamogram: "Yes",
      date_of_last_breast: "12-05-2024",
      history_of_breast: "Yes",
    },
    {
      id: 5,
      date_of_last_pap: "02-05-2024",
      history_of_abnormal: "Yes",
      date_of_last_mamogram: "07-05-2024",
      history_of_mamogram: "Yes",
      date_of_last_breast: "12-05-2024",
      history_of_breast: "No",
    },
    {
      id: 6,
      date_of_last_pap: "02-05-2024",
      history_of_abnormal: "No",
      date_of_last_mamogram: "07-05-2024",
      history_of_mamogram: "Yes",
      date_of_last_breast: "12-05-2024",
      history_of_breast: "No",
    },
    {
      id: 7,
      date_of_last_pap: "02-05-2024",
      history_of_abnormal: "No",
      date_of_last_mamogram: "07-05-2024",
      history_of_mamogram: "Yes",
      date_of_last_breast: "12-05-2024",
      history_of_breast: "No",
    },
    {
      id: 8,
      date_of_last_pap: "02-05-2024",
      history_of_abnormal: "No",
      date_of_last_mamogram: "07-05-2024",
      history_of_mamogram: "Yes",
      date_of_last_breast: "12-05-2024",
      history_of_breast: "No",
    },
    {
      id: 9,
      date_of_last_pap: "02-05-2024",
      history_of_abnormal: "No",
      date_of_last_mamogram: "07-05-2024",
      history_of_mamogram: "No",
      date_of_last_breast: "12-05-2024",
      history_of_breast: "No",
    },
    {
      id: 10,
      date_of_last_pap: "02-05-2024",
      history_of_abnormal: "No",
      date_of_last_mamogram: "07-05-2024",
      history_of_mamogram: "No",
      date_of_last_breast: "12-05-2024",
      history_of_breast: "Yes",
    },
  ];

  const { get, post, clearCache, patch, del } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [obsData, setObsData] = useState([]);
  const [obsPagi, setObsPagi] = useState({});
  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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

  const getCurrentScreeningItem = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ScreeningrowData?.slice(startIndex, endIndex);
  };

  const addFormPage = () => {
    setAddFormView(true);
    setSelectedData({});
  };

  const detailPage = () => {
    setDetailView(true);
  };

  const getselectedData = (data, type) => {
    setSelectedData(data);
    if (type === "edit") {
      setAddFormView(true);
    }
    if (type === "delete") {
      detailPage();
    }
  };

  const PatientSubMenu4 = localStorage.getItem("PatientSubMenu-4");
  const ParsedPatientSubMenu = PatientSubMenu4
    ? JSON.parse(PatientSubMenu4)
    : 1;
  const tabs = [
    { id: 1, title: "Obstetric History" },
    { id: 2, title: "Gynaec History" },
  ];
  const [currentTab, setCurrentTab] = useState(ParsedPatientSubMenu);

  const PatientSubMenu5 = localStorage.getItem("PatientSubMenu-5");
  const ParsedPatientSubMenu5 = PatientSubMenu5
    ? JSON.parse(PatientSubMenu5)
    : 1;
  const [currentHistoryTab, setCurrentHistoryTab] = useState(
    ParsedPatientSubMenu5
  );

  const GynaecTabs = [
    { id: 1, title: "Menstrual History" },
    { id: 2, title: "Screening and Diagnostic History" },
  ];

  const getCurrentTab = (data) => {
    setCurrentTab(data);
    setAddFormView(false);
  };

  const getHistoryCurrentTab = (data) => {
    setCurrentHistoryTab(data);
    setAddFormView(false);
  };

  const getObsLists = useCallback(async () => {
    try {
      const response = await get(
        `resource/patientHistories?limit=${itemsPerPage}&page=${currentPage}&slug=obstetric-history&searchkey=${
          searchValue ?? ""
        }&order_by=id&dir=2&user_id=${data?.user_id}&from=${
          startDate ?? ""
        }&to=${endDate ?? ""}` //${data?.user_id}
      );
      const listData = response?.data?.patient_histories; //
      setObsData(listData);
      setObsPagi(response?.data?.pagination);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, currentPage, searchValue, data?.user_id, startDate, endDate]);

  const obsAdd = async (answerDatas) => {
    try {
      const url = `resource/patientHistories`; // Replace with your API endpoint
      const body = {
        values: answerDatas,
        patient_id: data?.user_id,
        slug: "obstetric-history",
      };
      await post(url, body);
      clearCache();
      await getObsLists();
      toast.success("Added successfully");
      setAddFormView(false);
      setCurrentTab(1);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  const obsEdit = async (answerDatas, selectedId) => {
    try {
      const url = `resource/patientHistories/${selectedId}`; // Replace with your API endpoint
      const body = {
        values: answerDatas,
        patient_id: data?.user_id,
        slug: "obstetric-history",
      };
      await patch(url, body);
      clearCache();
      await getObsLists();
      toast.success("Added successfully");
      setAddFormView(false);
      setCurrentTab(1);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  const onDelete = async () => {
    try {
      const url = `resource/patientHistories/${selectedData?.id}`; // Replace with your API endpoint
      await del(url);
      clearCache();
      await getObsLists();
      toast.success("Deleted successfully");
      setDetailView(false);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  const getFilterValues = (startDate, endDate, searchValue) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSearchValue(searchValue);
  };
  useEffect(() => {
    getObsLists();
  }, [getObsLists]);

  return (
    <>
      {from === "Consult" && (
        <CRow>
          <ObstetricHistoryTable
            rowData={getCurrentPageItems()}
            columns={columnData}
            getselectedData={getselectedData}
            from={from}
          />
        </CRow>
      )}
      {from === "Consult-Gynaec" && (
        <CRow>
          <CCard className="p-2 cursor-default mb-5">
            <CCardBody className="mb-3">
              <MensturalHistoryForm
                back={back}
                defaultValues={selectedData}
                from={from}
              />
            </CCardBody>
          </CCard>
        </CRow>
      )}
      {from === "Consult-Screen" && (
        <CRow>
          <CCard className="p-2 cursor-default mb-5">
            <CCardBody className="mb-3">
              <ScreeningHistoryForm
                back={back}
                defaultValues={selectedData}
                from={from}
              />
            </CCardBody>
          </CCard>
        </CRow>
      )}
      {from === "" && (
        <>
          <CRow className="mb-2">
            <CCol lg={5} className="">
              <MedicalTab
                tabs={tabs}
                getCurrentTab={getCurrentTab}
                defaultTab={currentTab - 1}
              />
            </CCol>
            <CCol lg={7}>
              {currentTab === 1 && (
                // <CRow>
                //   <CCol lg={4}>
                //     <div style={{ width: "100%" }}>
                //       <div class="position-relative">
                //         <label for="validationTooltip01" class="form-label">
                //           Pregnant
                //         </label>
                //         <div
                //           className="w-100"
                //           style={{
                //             boxShadow: "0px 4px 17px 0px #17171D14",
                //           }}
                //         >
                //           <Dropdown
                //             options={options}
                //             defaultValue={options[0]}
                //             getSelectedValue={getSelectedValue}
                //           />
                //         </div>
                //       </div>
                //     </div>
                //   </CCol>
                //   <CCol lg={4}>
                //     <div style={{ width: "100%" }}>
                //       <div class="position-relative">
                //         <label for="validationTooltip01" class="form-label">
                //           Previous Cesarean Sections
                //         </label>
                //         <div
                //           className="w-100"
                //           style={{
                //             boxShadow: "0px 4px 17px 0px #17171D14",
                //           }}
                //         >
                //           <Dropdown
                //             options={options}
                //             defaultValue={options[1]}
                //             getSelectedValue={getSelectedValue1}
                //           />
                //         </div>
                //       </div>
                //     </div>
                //   </CCol>
                //   <CCol lg={4}>
                //     <div style={{ width: "100%" }}>
                //       <div class="position-relative">
                //         <label for="validationTooltip01" class="form-label">
                //           Bad Obstetric History
                //         </label>
                //         <div
                //           className="w-100"
                //           style={{
                //             boxShadow: "0px 4px 17px 0px #17171D14",
                //           }}
                //         >
                //           <Dropdown
                //             options={options}
                //             defaultValue={options[1]}
                //             getSelectedValue={getSelectedValue2}
                //           />
                //         </div>
                //       </div>
                //     </div>
                //   </CCol>
                // </CRow>
                <></>
              )}
              {currentTab === 2 && (
                <MedicalTab
                  tabs={GynaecTabs}
                  getCurrentTab={getHistoryCurrentTab}
                  defaultTab={currentHistoryTab - 1}
                />
              )}
            </CCol>
          </CRow>

          {!addFormView && currentTab === 1 && (
            <>
              <CRow className="mb-2">
                <CCol lg={8} className="">
                  <DateSearch getFilterValues={getFilterValues} />
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
                      <ObstetricHistoryTable
                        rowData={obsData}
                        columns={columnData}
                        getselectedData={getselectedData}
                        from={from}
                        currentPage={currentPage || 1}
                        itemsPerPage={itemsPerPage || 5}
                      />
                    </CRow>

                    <CRow className="mb-3">
                      <CCol lg={12} className="d-flex justify-content-center">
                        <Pagination
                          currentPage={currentPage}
                          onPageChange={onPageChange}
                          totalItems={obsPagi?.total}
                          itemsPerPage={itemsPerPage}
                        />
                      </CCol>
                    </CRow>
                  </>
                )}
                {/* {currentTab === 2 && currentHistoryTab === 1 && (
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
                {currentTab === 2 && currentHistoryTab === 2 && (
                  <>
                    <CRow>
                      <ScreeningHistory
                        rowData={getCurrentScreeningItem()}
                        columns={ScreeningcolumnData}
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
                )} */}
              </div>
            </>
          )}
        </>
      )}

      {from === "" && (
        <>
          {addFormView && (
            <CRow className="mb-2">
              <CCard className="p-2 cursor-default mb-5">
                <CCardBody className="mb-3">
                  {currentTab === 1 && (
                    <ImagingOrderForm
                      back={() => {
                        setAddFormView(false);
                        setSelectedData({});
                      }}
                      defaultValues={selectedData}
                      obsAdd={obsAdd}
                      obsEdit={obsEdit}
                    />
                  )}
                  {/* {currentTab === 2 && currentHistoryTab === 1 && (
                <MensturalHistoryForm
                  back={() => {
                    setAddFormView(false);
                    setSelectedData({});
                  }}
                  defaultValues={selectedData}
                />
              )}
              {currentTab === 2 && currentHistoryTab === 2 && (
                <ScreeningHistoryForm
                  back={() => {
                    setAddFormView(false);
                    setSelectedData({});
                  }}
                  defaultValues={selectedData}
                />
              )} */}
                </CCardBody>
              </CCard>
            </CRow>
          )}

          {currentTab !== 1 && (
            <CRow className="mb-2">
              <CCard className="p-2 cursor-default mb-5">
                <CCardBody className="mb-3">
                  {currentTab === 2 && currentHistoryTab === 1 && (
                    <MensturalHistoryForm
                      back={back}
                      defaultValues={selectedData}
                    />
                  )}
                  {currentTab === 2 && currentHistoryTab === 2 && (
                    <ScreeningHistoryForm
                      back={back}
                      defaultValues={selectedData}
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
                        <PrimaryButton onClick={() => onDelete()}>
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

export default OGHistory;
