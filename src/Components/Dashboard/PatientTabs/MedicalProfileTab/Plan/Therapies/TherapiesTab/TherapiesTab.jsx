import React, { useState, useEffect, useCallback } from "react";
import Breadcrumb from "../../../../../../Breadcrumb/Breadcrumb";
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
import TherapiesTable from "../../../../../../Tables/TherapiesTable";
import TherapiesForm from "./TherapiesForm";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import useApi from "../../../../../../../ApiServices/useApi";
import DateRangePicker from "../../../../../../DateRangePicker/DateRangePicker";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const TherapiesTab = ({ from }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "Date" },
    { id: 3, label: "Type" },
    { id: 4, label: "Therapy Name" },
    { id: 5, label: "Therapist Name" },
    { id: 6, label: "Duration (in days)" },
    { id: 7, label: "ACTIONS" },
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
      setId(id);
      detailPage();
    }
  };

  const fetchTherapies = useCallback(async () => {
    try {
      const response = await get(
        `resource/therapy?patient_id=${
          data?.user_id
        }&limit=${itemsPerPage}&page=${currentPage}&from=${
          startDate ?? ""
        }&to=${endDate ?? ""}&order_by=date&dir=2`
      );
      if (response.code === 200) {
        setRowData(response.data.therapies);
        setPagination(response.data.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, data?.user_id, currentPage, startDate, endDate]);

  useEffect(() => {
    fetchTherapies();
  }, [fetchTherapies]);

  // Add Therapies
  const addTherapies = async (values) => {
    try {
      const body = {
        patient_id: data?.user_id,
        date: values?.date,
        type: values?.type,
        therapy_name: values?.therapy_name,
        therapist_name: values?.therapist_name,
        duration: values?.duration,
        notes: values?.notes,
      };
      // Use the provided `post` function to send the request
      const response = await post(`resource/therapy`, body);

      if (response.code === 201) {
        clearCache();
        await fetchTherapies();
        setAddFormView(false);
        toast.success("Added successfully");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Edit Therapies
  const editTherapies = async (values, id) => {
    try {
      const body = {
        patient_id: data?.user_id,
        date: values?.date,
        type: values?.type,
        therapy_name: values?.therapy_name,
        therapist_name: values?.therapist_name,
        duration: values?.duration,
        notes: values?.notes,
      };
      // Use the provided `post` function to send the request
      const response = await patch(`resource/therapy/${id}`, body);
      if (response.code === 200) {
        clearCache();
        await fetchTherapies();
        setAddFormView(false);
        toast.success("Updated successfully");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delte Allergies
  const deleteTherapies = async () => {
    try {
      const response = await del(`resource/therapy/${id}`);
      if (response.code === 200) {
        setDetailView(false);
        clearCache();
        fetchTherapies();
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
      {from === "Consult" && (
        <CRow>
          <TherapiesTable
            rowData={rowData}
            columns={columnData}
            getselectedData={getselectedData}
            from={from}
            currentPage={currentPage || 1}
            itemsPerPage={itemsPerPage || 5}
          />
        </CRow>
      )}
      {from !== "Consult" && (
        <>
          {!addFormView && (
            <>
              <CRow className="mb-2">
                <CCol lg={8} className="">
                  <DateRangePicker getFilterValues={getFilterValues} />
                </CCol>
                <CCol
                  lg={4}
                  className="d-flex justify-content-end align-items-center gap-2"
                >
                  <div>
                    <PrimaryButton
                      onClick={() => {
                        addFormPage();
                        setSelectedData({});
                      }}
                    >
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
                  <TherapiesTable
                    rowData={rowData}
                    columns={columnData}
                    getselectedData={getselectedData}
                    currentPage={currentPage || 1}
                    itemsPerPage={itemsPerPage || 5}
                  />
                </CRow>
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
                <TherapiesForm
                  back={() => {
                    setAddFormView(false);
                    setSelectedData({});
                  }}
                  defaultValues={selectedData}
                  addTherapies={addTherapies}
                  editTherapies={editTherapies}
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
                        <PrimaryButton onClick={() => deleteTherapies()}>
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

export default TherapiesTab;
