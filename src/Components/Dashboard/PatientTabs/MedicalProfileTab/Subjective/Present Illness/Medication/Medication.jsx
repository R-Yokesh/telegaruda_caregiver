import {
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useState, useEffect, useCallback } from "react";
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
import MedicationForm from "./MedicationForm";
import MedicationTable from "../../../../../../Tables/Subjective/MedicationTable";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import useApi from "../../../../../../../ApiServices/useApi";
import DateRangePicker from "../../../../../../DateRangePicker/DateRangePicker";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Medication = ({ from }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "Medication Name" },
    // { id: 3, label: "Strength" },
    // { id: 4, label: " strength measurement" },
    // { id: 5, label: "dosage " },
    { id: 6, label: "M | A | E | N " },
    { id: 7, label: "BF/AF" },
    { id: 8, label: "Quantity" },
    { id: 9, label: " start date" },
    { id: 10, label: "Status" },
    { id: 11, label: "ACTIONS" },
  ];

  // const rowData = [
  //   {
  //     id: 1,
  //     start_date: "06-07-2024",
  //     end_date: "06-08-2024",
  //     name: "Paracetamol",
  //     strength: "650",
  //     strength_measurement: "mg",
  //     qty: "1456",
  //     dosage: "Tablet",
  //     time_taken: "5",
  //     status: "Not Taking",
  //     food_times: "bf",
  //     m: 0,
  //     a: 0.5,
  //     e: 1,
  //     n: 1,
  //   },
  //   {
  //     id: 2,
  //     start_date: "06-07-2024",
  //     end_date: "06-08-2024",
  //     name: "Paracetamol",
  //     strength: "650",
  //     strength_measurement: "mg",
  //     qty: "1456",
  //     dosage: "Tablet",
  //     time_taken: "5",
  //     status: "Not Taking",
  //     food_times: "af",
  //     m: 0,
  //     a: 1,
  //     e: 1,
  //     n: 1,
  //   },
  //   {
  //     id: 3,
  //     start_date: "06-07-2024",
  //     end_date: "06-08-2024",
  //     name: "Paracetamol",
  //     strength: "650",
  //     strength_measurement: "mg",
  //     qty: "1456",
  //     dosage: "Tablet",
  //     time_taken: "5",
  //     status: "Not Taking",
  //     food_times: "af",
  //     m: 0,
  //     a: 1,
  //     e: 1,
  //     n: 1,
  //   },
  //   {
  //     id: 4,
  //     start_date: "06-07-2024",
  //     end_date: "06-08-2024",
  //     name: "Paracetamol",
  //     strength: "650",
  //     strength_measurement: "mg",
  //     qty: "1456",
  //     dosage: "Tablet",
  //     time_taken: "5",
  //     status: "Not Taking",
  //     food_times: "af",
  //     m: 0,
  //     a: 1,
  //     e: 1,
  //     n: 1,
  //   },
  //   {
  //     id: 5,
  //     start_date: "06-07-2024",
  //     end_date: "06-08-2024",
  //     name: "Paracetamol",
  //     strength: "650",
  //     strength_measurement: "mg",
  //     qty: "1456",
  //     dosage: "Tablet",
  //     time_taken: "5",
  //     status: "Not Taking",
  //     food_times: "af",
  //     m: 0,
  //     a: 1,
  //     e: 1,
  //     n: 1,
  //   },
  //   {
  //     id: 6,
  //     start_date: "06-07-2024",
  //     end_date: "06-08-2024",
  //     name: "Paracetamol",
  //     strength: "650",
  //     strength_measurement: "mg",
  //     qty: "1456",
  //     dosage: "Tablet",
  //     time_taken: "5",
  //     status: "Not Taking",
  //     food_times: "af",
  //     m: 0,
  //     a: 1,
  //     e: 1,
  //     n: 1,
  //   },
  //   {
  //     id: 7,
  //     start_date: "06-07-2024",
  //     end_date: "06-08-2024",
  //     name: "Paracetamol",
  //     strength: "650",
  //     strength_measurement: "mg",
  //     qty: "1456",
  //     dosage: "Tablet",
  //     time_taken: "5",
  //     status: "Not Taking",
  //     food_times: "af",
  //     m: 0,
  //     a: 1,
  //     e: 1,
  //     n: 1,
  //   },
  //   {
  //     id: 8,
  //     start_date: "06-07-2024",
  //     end_date: "06-08-2024",
  //     name: "Paracetamol",
  //     strength: "650",
  //     strength_measurement: "mg",
  //     qty: "1456",
  //     dosage: "Tablet",
  //     time_taken: "5",
  //     status: "Not Taking",
  //     food_times: "af",
  //     m: 0,
  //     a: 1,
  //     e: 1,
  //     n: 1,
  //   },
  //   {
  //     id: 9,
  //     start_date: "06-07-2024",
  //     end_date: "06-08-2024",
  //     name: "Paracetamol",
  //     strength: "650",
  //     strength_measurement: "mg",
  //     qty: "1456",
  //     dosage: "Tablet",
  //     time_taken: "5",
  //     status: "Not Taking",
  //     food_times: "af",
  //     m: 0,
  //     a: 1,
  //     e: 1,
  //     n: 1,
  //   },
  //   {
  //     id: 10,
  //     start_date: "06-07-2024",
  //     end_date: "06-08-2024",
  //     name: "Paracetamol",
  //     strength: "650",
  //     strength_measurement: "mg",
  //     qty: "1456",
  //     dosage: "Tablet",
  //     time_taken: "5",
  //     status: "Not Taking",
  //     food_times: "af",
  //     m: 0,
  //     a: 1,
  //     e: 1,
  //     n: 1,
  //   },
  // ];

  const { loading, error, get, post, patch, del, clearCache } = useApi();
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
  const [view, setView] = useState(false);
  const getselectedData = (data, id, type) => {
    setSelectedData(data);
    if (type === "view") {
      addFormPage();
      setView(true);
    }
    if (type === "delete") {
      console.log("Delete Clicked");
      setId(id);
      detailPage();
    }
  };

  const fetchMedication = useCallback(async () => {
    try {
      const response = await get(
        `resource/patientHealth?limit=${itemsPerPage}&page=${currentPage}&from=${
          startDate ?? ""
        }&to=${endDate ?? ""}&searchkey=${
          searchValue ?? ""
        }&order_by=values-%3Estart_date&dir=2&user_id=${
          data?.user_id
        }&slug=medicine&slug_array=`
      );
      if (response.code === 200) {
        setRowData(response?.data?.patient_healths);
        setPagination(response?.data?.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, currentPage, startDate, endDate, searchValue, data?.user_id]);

  useEffect(() => {
    fetchMedication();
  }, [fetchMedication]);

  // Add Medication
  const addMedication = async (values) => {
    try {
      const body = {
        slug: "medicine",
        patient_id: data?.user_id,
        values: values,
      };

      // Use the provided `post` function to send the request
      const response = await post(`resource/patientHealth`, body);

      if (response.code === 201) {
        clearCache();
        await fetchMedication();
        setAddFormView(false);
        toast.success("Added successfully");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delte Signs Symptoms
  const deleteMedication = async () => {
    try {
      const response = await del(`resource/patientHealth/${id}`);

      if (response.code === 200) {
        setDetailView(false);
        clearCache();
        fetchMedication();
        toast.success("Deleted successfully");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = ["Morning", "Afternoon", "Evening", "Night"];

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
                  <PrimaryButton
                    onClick={() => {
                      addFormPage();
                      setView(false);
                    }}
                  >
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
            <MedicationTable
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
            <MedicationForm
              back={() => {
                setAddFormView(false);
                setSelectedData({});
              }}
              defaultValues={selectedData}
              addMedication={addMedication}
              view={view}
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
                    <PrimaryButton onClick={() => deleteMedication()}>
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

export default Medication;
