import {
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useState,useCallback,useEffect } from "react";
import LabForm from "../../../Objective/Lab/LabForm";
import Pagination from "../../../../../../Pagination/Pagination";
import LabTable from "../../../../../../Tables/LabTable";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../../../../../../assets/Assets";
import DateSelector from "../../../../../../DateRangePicker/DateSelector";
import LabOrderTable from "../../../../../../Tables/LabOrderTable";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import SignsSymptomsForm from "./SignsSymptomsForm";
import MedicationOrderTable from "../../../../../../Tables/MedicationOrderTable";
import SymtomsTable from "../../../../../../Tables/Subjective/SymtomsTable";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import useApi from "../../../../../../../ApiServices/useApi";
import DateRangePicker from "../../../../../../DateRangePicker/DateRangePicker";

const SignsSymptoms = ({ from }) => {
  const detailsData = [
    { id: 1, label: "" },
    { id: 2, label: "RX" },
    { id: 3, label: "FREQUENCY" },
    { id: 4, label: "DURATION" },
    { id: 5, label: "QTY/TAKEN" },
    { id: 6, label: "ACTIONS​" },
  ];

  const detailsValue = [
    {
      id: 1,
      name: "Prescribed",
      rx: "Medicine 1",
      frequency: ["1/2", 0, 0, 0],
      duration: "3 Days",
      qty: "1 tablet",
    },
    {
      id: 2,
      name: "Alternative",
      rx: "Medicine 2",
      frequency: ["1/2", 0, 0, 0],
      duration: "3 Days",
      qty: "1 tablet",
    },
  ];

  const columnData = [
    { id: 1, label: "NO." },
    { id: 2, label: "DATE" },
    { id: 3, label: "LOCATION" },
    { id: 5, label: "Symptoms" },
    { id: 4, label: "DURATION IN DAYS" },
    { id: 6, label: "Severity" },
    // { id: 10, label: "Notes" },
    { id: 6, label: "Actions" },
  ];


  // const rowData = [
  //   {
  //     id: 1,
  //     onset: "2024-07-15 03:15",
  //     location: "Knee",
  //     duration_days: "20",
  //     characteristics: "Fracture",
  //     aggravating: "Fracture",
  //     relieving: "Fracture",
  //     temporal: "Fracture",
  //     severity: "Normal",
  //     notes: "-",
  //   },
  //   {
  //     id: 2,
  //     onset: "2024-08-15 10:15",
  //     location: "Knee",
  //     duration_days: "150",
  //     characteristics: "Fracture",
  //     aggravating: "Fracture",
  //     relieving: "Fracture",
  //     temporal: "Fracture",
  //     severity: "Mild",
  //     notes: "-",
  //   },
  //   {
  //     id: 3,
  //     onset: "2024-07-18 20:15",
  //     location: "Knee",
  //     duration_days: "20",
  //     characteristics: "Fracture",
  //     aggravating: "Fracture",
  //     relieving: "Fracture",
  //     temporal: "Fracture",
  //     severity: "Normal",
  //     notes: "-",
  //   },
  //   {
  //     id: 4,
  //     onset: "2024-07-15 18:15",
  //     location: "Knee",
  //     duration_days: "120",
  //     characteristics: "Fracture",
  //     aggravating: "Fracture",
  //     relieving: "Fracture",
  //     temporal: "Fracture",
  //     severity: "Moderate",
  //     notes: "-",
  //   },
  //   {
  //     id: 5,
  //     onset: "2024-07-15 18:15",
  //     location: "Knee",
  //     duration_days: "20",
  //     characteristics: "Fracture",
  //     aggravating: "Fracture",
  //     relieving: "Fracture",
  //     temporal: "Fracture",
  //     severity: "Worst",
  //     notes: "-",
  //   },
  //   {
  //     id: 6,
  //     onset: "2024-07-15 18:15",
  //     location: "Knee",
  //     duration_days: "20",
  //     characteristics: "Fracture",
  //     aggravating: "Fracture",
  //     relieving: "Fracture",
  //     temporal: "Fracture",
  //     severity: "Severe",
  //     notes: "-",
  //   },
  //   {
  //     id: 7,
  //     onset: "2024-07-15 18:15",
  //     location: "Knee",
  //     duration_days: "20",
  //     characteristics: "Fracture",
  //     aggravating: "Fracture",
  //     relieving: "Fracture",
  //     temporal: "Fracture",
  //     severity: "Normal",
  //     notes: "-",
  //   },
  //   {
  //     id: 8,
  //     onset: "2024-07-15 18:15",
  //     location: "Knee",
  //     duration_days: "20",
  //     characteristics: "Fracture",
  //     aggravating: "Fracture",
  //     relieving: "Fracture",
  //     temporal: "Fracture",
  //     severity: "Normal",
  //     notes: "-",
  //   },
  //   {
  //     id: 9,
  //     onset: "2024-07-15 18:15",
  //     location: "Knee",
  //     duration_days: "20",
  //     characteristics: "Fracture",
  //     aggravating: "Fracture",
  //     relieving: "Fracture",
  //     temporal: "Fracture",
  //     severity: "Normal",
  //     notes: "-",
  //   },
  //   {
  //     id: 10,
  //     onset: "2024-07-15 18:15",
  //     location: "Knee",
  //     duration_days: "20",
  //     characteristics: "Fracture",
  //     aggravating: "Fracture",
  //     relieving: "Fracture",
  //     temporal: "Fracture",
  //     severity: "Normal",
  //     notes: "-",
  //   },
  // ];

  const { loading, error, get,del,clearCache } = useApi();

  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [id, setId] = useState(null);
  const [ startDate, setStartDate] = useState(null);
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

  const getselectedData = (data,id, type) => {
    setSelectedData(data);
    if (type === "edit") {
      addFormPage();
    }
    if (type === "delete") {
      setId(id)
      detailPage();
    }
  };

  
  const fetchSignsSymptoms = useCallback(async () => {
    try {
      const response = await get(
        `resource/patientHealth?slug=hpi&user_id=261&limit=${itemsPerPage}&page=${currentPage}&dir=2&from=${startDate ?? ""}&to=${endDate ?? ""}&searchkey=${searchValue ?? ""}`
      );
      if (response.code === 200) {
        console.log(response.data.patient_healths);
        setRowData(response.data.patient_healths);
        setPagination(response.data.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, currentPage,startDate,endDate,searchValue]);

  useEffect(() => {
    fetchSignsSymptoms();
  }, [fetchSignsSymptoms]);

  // Delte Signs Symptoms
  const deleteSignsSymptoms = async () => {
    try {
      const response = await del(`resource/patientHealth/${id}`);
  
      if (response.code === 200) {
        setDetailView(false);
        clearCache();
        fetchSignsSymptoms();

      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
          )}
          <div className="mb-2">
            <SymtomsTable
              rowData={rowData}
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
            <SignsSymptomsForm
              back={() => {
                setAddFormView(false);
                setSelectedData({});
              }}
              setAddFormView={setAddFormView}
              fetchSignsSymptoms={fetchSignsSymptoms}
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
                    <PrimaryButton onClick={() => deleteSignsSymptoms()}>
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

export default SignsSymptoms;
