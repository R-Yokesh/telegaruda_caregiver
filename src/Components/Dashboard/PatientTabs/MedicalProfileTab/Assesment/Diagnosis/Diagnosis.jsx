import React, { useState, useEffect, useCallback } from "react";
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
import SearchBar from "../../../../../SearchBar/SearchBar";
import BlurBackground from "../../../../../BlurBackground/BlurBackground";
import DiagnosisTable from "../../../../../Tables/DiagnosisTable";
import DateSelector from "../../../../../DateRangePicker/DateSelector";
import DiagnosisForm from "./DiagnosisForm";
import DateSearch from "../../../../../DateRangePicker/DateSearch";
import { toast } from "react-toastify";
import useApi from "../../../../../../ApiServices/useApi";
import DateRangePicker from "../../../../../DateRangePicker/DateRangePicker";
import { useLocation } from "react-router-dom";



const Diagnosis = ({ onClose, from }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "DATE" },
    { id: 3, label: "ICD CODE" },
    { id: 4, label: "Description" },
    { id: 5, label: "ACTIONS" },
  ];

  // const rowData = [
  //   {
  //     id: 1,
  //     date: "06-07-2024",
  //     condition: "E11.9",
  //     treatment: "Type 2 diabetes mellitus without complications",
  //     remark: "Lorem Ipsum",
  //   },
  //   {
  //     id: 2,
  //     date: "02-04-2024",
  //     condition: "E11.8",
  //     treatment: "Type 2 diabetes mellitus without complications",
  //     remark: "Lorem Ipsum",
  //   },
  //   {
  //     id: 3,
  //     date: "07-06-2024",
  //     condition: "E12.1",
  //     treatment: "Type 2 diabetes mellitus without complications",
  //     remark: "Lorem Ipsum",
  //   },
  //   {
  //     id: 4,
  //     date: "08-07-2024",
  //     condition: "E12.0",
  //     treatment: "Type 4 diabetes mellitus without complications",
  //     remark: "Lorem Ipsum",
  //   },
  //   {
  //     id: 5,
  //     date: "06-07-2024",
  //     condition: "E11.9",
  //     treatment: "Type 2 diabetes mellitus without complications",
  //     remark: "Lorem Ipsum",
  //   },
  //   {
  //     id: 6,
  //     date: "06-07-2024",
  //     condition: "E11.9",
  //     treatment: "Type 2 diabetes mellitus without complications",
  //     remark: "Lorem Ipsum",
  //   },
  //   {
  //     id: 7,
  //     date: "06-07-2024",
  //     condition: "E11.9",
  //     treatment: "Type 2 diabetes mellitus without complications",
  //     remark: "Lorem Ipsum",
  //   },
  //   {
  //     id: 8,
  //     date: "06-07-2024",
  //     condition: "E11.9",
  //     treatment: "Type 2 diabetes mellitus without complications",
  //     remark: "Lorem Ipsum",
  //   },
  //   {
  //     id: 9,
  //     date: "06-09-2024",
  //     condition: "E11.9",
  //     treatment: "Type 2 diabetes mellitus without complications",
  //     remark: "Lorem Ipsum",
  //   },
  //   {
  //     id: 10,
  //     date: "06-07-2024",
  //     condition: "E11.9",
  //     treatment: "Type 2 diabetes mellitus without complications",
  //     remark: "Lorem Ipsum",
  //   },
  // ];

  const { loading, error, get, del, clearCache } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;

  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [id, setId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});

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


  const addFormPage = () => {
    setAddFormView(true);
  };

  const detailPage = () => {
    setDetailView(true);
  };

  const getselectedData = (data, id, type) => {
    setSelectedData(data);
    if (type === "edit") {
      addFormPage();
    }
    if (type === "delete") {
      setId(id)
      detailPage();
    }
  };


  const fetchDiagnosis = useCallback(async () => {
    try {
      // clearCache();
      const response = await get(
        `resource/docs?limit=${itemsPerPage}&page=${currentPage}&from=${startDate ?? ""}&to=${endDate ?? ""}&searchkey=${searchValue ?? ""}&order_by=created_at&dir=2&slug=icd&user_id=${data?.user_id}&scanOrdersOnly=&scanstatus=`
      );
      if (response.code === 200) {
        setRowData(response?.data?.docs);
        setPagination(response?.data?.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, currentPage, startDate, endDate, searchValue, addFormView]);

  useEffect(() => {
    fetchDiagnosis();
  }, [fetchDiagnosis, addFormView]);

  // Delte Allergies
  const deleteDiagnosis = async () => {
    try {
      const response = await del(`resource/docs/${id}`);

      if (response.code === 200) {
        setDetailView(false);
        clearCache();

        fetchDiagnosis();

      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };






  return (
    <>
      {from !== "Consult" && (
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
                Diagnosis (Including ICD)
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
                  {
                    label: "Diagnosis (Including ICD)",
                    to: "/patients/history",
                  },
                ]}
              />
            </div>
          </CCol>
        </CRow>
      )}
      {!addFormView && (
        <>
          {from !== "Consult" && (
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
            <CRow>
              <DiagnosisTable
                rowData={rowData}
                columns={columnData}
                getselectedData={getselectedData}
                from={from}
                currentPage={currentPage || 1}
                itemsPerPage={itemsPerPage || 5}
              />
            </CRow>
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
            <DiagnosisForm
              back={() => {
                setAddFormView(false);
                setSelectedData({});
              }}
              fetchDiagnosis={fetchDiagnosis}
              setAddFormView={setAddFormView}
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
                    <PrimaryButton onClick={() => deleteDiagnosis()}>
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

export default Diagnosis;
