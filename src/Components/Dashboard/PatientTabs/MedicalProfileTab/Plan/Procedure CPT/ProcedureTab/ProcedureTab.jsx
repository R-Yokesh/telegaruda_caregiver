import React, { useState, useEffect, useCallback } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import { Assets } from "../../../../../../../assets/Assets";
import ProcedureForm from "./ProcedureForm";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Pagination from "../../../../../../Pagination/Pagination";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import ProcedurerTable from "../../../../../../Tables/ProcedurerTable";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import useApi from "../../../../../../../ApiServices/useApi";
import DateRangePicker from "../../../../../../DateRangePicker/DateRangePicker";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProcedureTab = ({ onClose, from }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "DATE" },
    { id: 3, label: "CPT Code" },
    { id: 4, label: "DESCRIPTION" },
    { id: 5, label: "ACTIONS" },
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

  const fetchCpt = useCallback(async () => {
    try {
      const response = await get(
        `resource/patientHealth?limit=${itemsPerPage}&page=${currentPage}&from=${
          startDate ?? ""
        }&to=${endDate ?? ""}&searchkey=${
          searchValue ?? ""
        }&order_by=values-%3Edate&dir=2&user_id=${
          data?.user_id
        }&slug=procedure&slug_array=`
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
  }, [get, currentPage, startDate, endDate, searchValue, data?.user_id]);

  useEffect(() => {
    fetchCpt();
  }, [fetchCpt]);

  // Add Procedure
  const addCpt = async (values) => {
    try {
      const body = {
        patient_id: data?.user_id,
        slug: "procedure",
        values: values,
      };
      // Use the provided `post` function to send the request
      const response = await post(`resource/patientHealth`, body);

      if (response.code === 201) {
        clearCache();
        await fetchCpt();
        setAddFormView(false);
        toast.success("Added successfully");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Edit Procedure
  const editCpt = async (values) => {
    try {
      const body = {
        patient_id: data?.user_id,
        slug: "procedure",
        values: values,
      };
      // Use the provided `post` function to send the request
      const response = await patch(`resource/patientHealth/${id}`, body);
      if (response.code === 200) {
        clearCache();
        await fetchCpt();
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
  const deleteCpt = async () => {
    try {
      const response = await del(`resource/patientHealth/${id}`);

      if (response.code === 200) {
        setDetailView(false);
        clearCache();
        fetchCpt();
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
          <ProcedurerTable
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
                <CRow lg={12}>
                  <ProcedurerTable
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
                <ProcedureForm
                  back={() => {
                    setAddFormView(false);
                    setSelectedData({});
                  }}
                  defaultValues={selectedData}
                  addCpt={addCpt}
                  editCpt={editCpt}
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
                        <PrimaryButton onClick={() => deleteCpt(false)}>
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

export default ProcedureTab;
