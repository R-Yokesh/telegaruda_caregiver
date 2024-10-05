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
import useApi from "../../../../../../../ApiServices/useApi";
import DateRangePicker from "../../../../../../DateRangePicker/DateRangePicker";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Allergies = () => {

  const columnData = [
    { id:1, label: "No." },
    { id: 2, label: "Onset Date" },
    { id: 6, label: "Allergy" },
    { id: 7, label: "Reaction" },
    { id: 8, label: "Severity" },
    { id: 9, label: " Status" },
    { id: 11, label: "ACTIONS" },
  ];


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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemsPerPage = 5; // Number of items to display per page

  const getFilterValues = (startDate, endDate, searchValue) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSearchValue(searchValue);
    setCurrentPage(1)
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


  const fetchAllergies = useCallback(async () => {
    try {
      const response = await get(
        `resource/patientHealth?limit=${itemsPerPage}&page=${currentPage}&from=${startDate ?? ""}&to=${endDate ?? ""}&searchkey=${searchValue ?? ""}&dir=2&user_id=${data?.user_id}&slug=allergy&searchkey=&slug_array=`
      );
      if (response.code === 200) {
        setRowData(response.data.patient_healths);
        setPagination(response.data.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, currentPage, startDate, endDate, searchValue]);

  useEffect(() => {
    fetchAllergies();
  }, [fetchAllergies]);



  // Add Allergy
  const addAllergy = async (values) => {

    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const body = {
        patient_id: data?.user_id,
        slug: "allergy",
        values: values,
      };
      // Use the provided `post` function to send the request
      const response = await post(`resource/patientHealth`, body);

      if (response.code === 201) {
        clearCache();
        await fetchAllergies();
        setAddFormView(false);
        toast.success("Added successfully");
        setCurrentPage(1)

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

  // Edit Allery
  const editAllergy = async (values, id) => {
    // Set the loading state to true
    setIsSubmitting(true);
    try {
      const body = {
        patient_id: data?.user_id,
        slug: "allergy",
        values: values,
      };

      // Use the provided `post` function to send the request
      const response = await patch(`resource/patientHealth/${id}`, body);

      if (response.code === 200) {
        clearCache();
        await fetchAllergies();
        setAddFormView(false);
        toast.success("Updated successfully");

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


  // Delte Allergies
  const deleteAllergies = async () => {
    try {
      const response = await del(`resource/patientHealth/${id}`);

      if (response.code === 200) {
        setDetailView(false);
        clearCache();
        fetchAllergies();
        toast.success("Deleted successfully");

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
          <CRow className="mb-2">
            <CCol lg={8} className="">
              <DateSearch getFilterValues={getFilterValues} />
            </CCol>
            <CCol
              lg={4}
              className="d-flex justify-content-end align-items-center gap-2"
            >
              <div>
                <PrimaryButton onClick={() => { addFormPage(); setSelectedData({}) }}>
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
          <div className="mb-2">
            <AllergiesTable
              rowData={rowData}
              columns={columnData}
              getselectedData={getselectedData}
              currentPage={currentPage || 1}
              itemsPerPage={itemsPerPage || 5}
            />
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
              addAllergy={addAllergy}
              editAllergy={editAllergy}
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
                    <PrimaryButton onClick={() => deleteAllergies()}>
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