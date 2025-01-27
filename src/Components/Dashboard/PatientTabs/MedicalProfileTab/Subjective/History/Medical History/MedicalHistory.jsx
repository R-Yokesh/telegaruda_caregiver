import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useState, useCallback, useEffect } from "react";
import Pagination from "../../../../../../Pagination/Pagination";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../../../../../../assets/Assets";
import DateSelector from "../../../../../../DateRangePicker/DateSelector";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import MedHistoryForm from "./MedHistoryForm";
import MedicalHistoryTable from "../../../../../../Tables/Subjective/MedicalHistoryTable";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import useApi from "../../../../../../../ApiServices/useApi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const MedicalHistory = ({ from, consultSummaryData }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "ONSET DATE" },
    { id: 3, label: "CONDITIONS" },
    { id: 4, label: "ICD" },
    { id: 5, label: "Chronic" },
    { id: 6, label: "Previous Illness" },
    { id: 7, label: "Actions" },
  ];
  // const rowData = [
  //   {
  //     id: 1,
  //     onset: "02-04-2024",
  //     conditions: "Lorem ipsum",
  //     icd10: "E11.6 - Type 2 diabetes mellitus without complications",
  //     chronic: "Yes",
  //     prev_illness: "Yes",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 2,
  //     onset: "02-04-2024",
  //     conditions: "Lorem ipsum",
  //     icd10: "E11.6 - Type 2 diabetes mellitus without complications",
  //     chronic: "Yes",
  //     prev_illness: "Yes",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 3,
  //     onset: "02-04-2024",
  //     conditions: "Lorem ipsum",
  //     icd10: "E11.6 - Type 2 diabetes mellitus without complications",
  //     chronic: "No",
  //     prev_illness: "Yes",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 4,
  //     onset: "01-04-2024",
  //     conditions: "Lorem ipsum",
  //     icd10: "E11.6 - Type 2 diabetes mellitus without complications",
  //     chronic: "No",
  //     prev_illness: "No",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 5,
  //     onset: "01-04-2024",
  //     conditions: "Lorem ipsum",
  //     icd10: "E11.6 - Type 2 diabetes mellitus without complications",
  //     chronic: "Yes",
  //     prev_illness: "No",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 6,
  //     onset: "02-04-2024",
  //     conditions: "Lorem ipsum",
  //     icd10: "E11.6 - Type 2 diabetes mellitus without complications",
  //     chronic: "No",
  //     prev_illness: "No",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 7,
  //     onset: "02-04-2024",
  //     conditions: "Lorem ipsum",
  //     icd10: "E11.6 - Type 2 diabetes mellitus without complications",
  //     chronic: "Yes",
  //     prev_illness: "Yes",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 8,
  //     onset: "02-04-2024",
  //     conditions: "Lorem ipsum",
  //     icd10: "E11.6 - Type 2 diabetes mellitus without complications",
  //     chronic: "Yes",
  //     prev_illness: "Yes",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 9,
  //     onset: "12-03-2024",
  //     conditions: "Lorem ipsum",
  //     icd10: "E11.6 - Type 2 diabetes mellitus without complications",
  //     chronic: "Yes",
  //     prev_illness: "Yes",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 10,
  //     onset: "02-03-2024",
  //     conditions: "Lorem ipsum",
  //     icd10: "E11.6 - Type 2 diabetes mellitus without complications",
  //     chronic: "Yes",
  //     prev_illness: "Yes",
  //     notes: "Lorem ipsum",
  //   },
  // ];
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const { loading, patch, get, del, clearCache, post } = useApi();
  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemsPerPage = 5; // Number of items to display per page
  const getFilterValues = (startDate, endDate, searchValue) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSearchValue(searchValue);
  };

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

  const getselectedData = (data, id, type) => {
    console.log(type, "first", data);
    setSelectedData(data);
    if (type === "edit") {
      addFormPage();
    }
    if (type === "delete") {
      setId(id);
      detailPage();
    }
  };

  // api integration of list,filter and search of medical history
  const getMedicalLists = useCallback(async () => {
    
    try {
      const response = await get(
        `resource/patientHistories?user_id=${
          data?.user_id
        }&slug=medical-history&limit=${itemsPerPage}&page=${currentPage}&order_by=values-%3Eonset_date&dir=2&from=${
          startDate ?? ""
        }&to=${endDate ?? ""}&searchkey=${searchValue ?? ""}`
      );
      if (response.code === 200) {
        // console.log("data", response.data.patient_histories);
        setRowData(response.data.patient_histories);
        setPagination(response.data.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
        setRowData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setRowData([]);
    }
  }, [get, data?.user_id, currentPage, startDate, endDate, searchValue]);

  useEffect(() => {
    getMedicalLists();
  }, [getMedicalLists]);

  // api integration of delete list from the table
  const deleteMedicalLists = async () => {
    try {
      const response = await del(`resource/patientHistories/${id}`);

      if (response.code === 200) {
        setDetailView(false);
        clearCache();
        getMedicalLists();
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // api integration of medical history form submit
  const medicalHistoryForm = async (body) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const response = await post(`resource/patientHistories`, body);

      if (response.code === 201) {
        clearCache();
        await getMedicalLists();
        setAddFormView(false);
        toast.success("Added successfully");
        setCurrentPage(1);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Reset the loading state to false after the API call is done
      setIsSubmitting(false);
    }
  };
  // api integration of edit form
  const editMedicalHistory = async (body, defaultId) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const response = await patch(
        `resource/patientHistories/${defaultId}`,
        body
      );

      if (response.code === 200) {
        clearCache();
        await getMedicalLists();
        setAddFormView(false);
      } else {
        console.error("Failed to edit data:", response.message);
      }
    } catch (error) {
      console.error("Error editing data:", error);
    } finally {
      // Reset the loading state to false after the API call is done
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {!addFormView && (
        <>
          {from !== "Consult" && (
            <CRow className="mb-2">
              <CCol lg={8} className="">
                <DateSearch getFilterValues={getFilterValues} />
              </CCol>
              <CCol
                lg={4}
                className="d-flex justify-content-end align-items-center gap-2 mt-4"
              >
                <div>
                  <PrimaryButton onClick={() => addFormPage()}>
                    <div className="d-flex align-items-center gap-2">
                      <img src={Assets.Add} alt="add" />
                      <span className="fs-16 fw-600">Add</span>
                    </div>
                  </PrimaryButton>
                </div>
                {/* <div>
                  <PrimaryButton onClick={() => addFormPage()}>
                    <div className="d-flex align-items-center gap-2">
                      <img src={Assets.OptionsIcon} alt="add" />
                    </div>
                  </PrimaryButton>
                </div> */}
              </CCol>
            </CRow>
          )}
          <div className="mb-2">
            <MedicalHistoryTable
              rowData={consultSummaryData ? consultSummaryData : rowData}
              columns={columnData}
              getselectedData={getselectedData}
              from={from}
              currentPage={currentPage || 1}
              itemsPerPage={itemsPerPage || 5}
            />
            {from !== "Consult" && (
              <CRow className="mb-3">
                <CCol lg={12} className="d-flex justify-content-center">
                  <Pagination
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalItems={pagination?.total}
                    itemsPerPage={itemsPerPage}
                  />
                </CCol>
              </CRow>
            )}
          </div>
        </>
      )}
      {addFormView && (
        <CCard className="p-2 cursor-default mb-5">
          <CCardBody className="mb-3">
            <MedHistoryForm
              back={() => {
                setAddFormView(false);
                setSelectedData({});
              }}
              setAddFormView={setAddFormView}
              getMedicalLists={getMedicalLists}
              defaultValues={selectedData}
              medicalHistoryForm={medicalHistoryForm}
              editMedicalHistory={editMedicalHistory}
              isSubmitting={isSubmitting}
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
                    <PrimaryButton onClick={() => deleteMedicalLists()}>
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

export default MedicalHistory;
