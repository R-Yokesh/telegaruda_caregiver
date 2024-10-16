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
import BlurBackground from "../../../../../BlurBackground/BlurBackground";
import DatePicker from "react-datepicker";
import ImmunizationForm from "./ImmunizationForm";
import ImmunizationTable from "../../../../../Tables/ImmunizationTable";
import { toast } from "react-toastify";
import { format } from "date-fns";
import useApi from "../../../../../../ApiServices/useApi";
import { useLocation } from "react-router-dom";

const Immunization = ({ onClose, from }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "VACCINE" },
    { id: 3, label: "PERIOD" },
    { id: 4, label: "STATUS" },
    { id: 5, label: "DOSAGE DATE" },
    { id: 6, label: "TAKEN DATE" },
  ];

  const { loading, error, get, post, del, clearCache } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;

  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [addFormView, setAddFormView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [id, setId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});
  const [tkDate, setTkDate] = useState(new Date());
  const [slug, setSlug] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for handling error message

  const today = new Date();
  const itemsPerPage = 5;

  const getFilterValues = (startDate, endDate, searchValue) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSearchValue(searchValue);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rowData?.slice(startIndex, endIndex);
  };

  const addFormPage = () => {
    setAddFormView(true);
  };

  const getselectedData = (data, slug, type) => {
    setSelectedData(data);
    setSlug(slug);
    if (type === "edit") {
      addFormPage();
    }
    if (type === "delete") {
      setDeleteView(true);
    }
  };

  const fetchImmunization = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters/all?slug=immunisation&order_by=id&dir=1&patient_id=${data?.user_id}`
      );
      if (response.code === 200) {
        setRowData(response?.data?.masters);
        setPagination(response?.data?.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, data?.user_id]);

  useEffect(() => {
    fetchImmunization();
  }, [fetchImmunization]);

  const addImmunization = async () => {
    try {
      const body = {
        slug: slug,
        details: selectedData.periods,
        patient_id: data?.user_id,
        status: selectedData.status,
        taken_at: format(tkDate, "yyyy-MM-dd"),
      };

      const response = await post(`resource/immunisation`, body);

      if (response.code === 201) {
        clearCache();
        await fetchImmunization();
        setDeleteView(false);
        setErrorMessage(""); // Clear any previous error message
      } else {
        setErrorMessage("Failed to add immunization. Please try again."); // Set error message
      }
    } catch (error) {
      setErrorMessage("Taken Date is required"); 
    }
  };

  return (
    <>
      {from === "Consult" && (
        <CRow>
          <ImmunizationTable
            rowData={getCurrentPageItems()}
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
                  Immunization Status
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
                    { label: "Immunization Status", to: "/patients/history" },
                  ]}
                />
              </div>
            </CCol>
          </CRow>
          {!addFormView && (
            <>
              <CRow className="mb-2">
                <CCol lg={8} />
                <CCol lg={4} className="d-flex justify-content-end gap-2">
                  {/* Additional Buttons can be added here */}
                </CCol>
              </CRow>
              <div className="mb-2">
                <CRow>
                  <ImmunizationTable
                    rowData={rowData}
                    columns={columnData}
                    getselectedData={getselectedData}
                    currentPage={currentPage || 1}
                    itemsPerPage={itemsPerPage || 5}
                  />
                </CRow>
              </div>
            </>
          )}
          {addFormView && (
            <CCard className="p-2 cursor-default mb-5">
              <CCardBody className="mb-3">
                <ImmunizationForm
                  back={() => {
                    setAddFormView(false);
                    setSelectedData({});
                  }}
                  defaultValues={selectedData}
                />
              </CCardBody>
            </CCard>
          )}

          {deleteView && (
            <BlurBackground>
              <CModal
                alignment="center"
                visible={deleteView}
                onClose={() => setDeleteView(false)}
                aria-labelledby="VerticallyCenteredExample"
              >
                <CModalBody className="p-3">
                  <div className="w-100 mt-2 d-flex justify-content-center flex-column align-items-center">
                    <h5>Are you sure taken this Vaccine ?</h5>

                    <div style={{ width: "100%" }} className="mb-3">
                      <div class="position-relative">
                        <label htmlFor="validationTooltip01" class="form-label">
                          Taken Date *
                        </label>
                        <div className="date-size">
                          <DatePicker
                            showIcon
                            selected={tkDate}
                            onChange={(date) => setTkDate(date)}
                            maxDate={today}
                            dateFormat="dd-MM-yyyy"
                          />
                        </div>
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="error-message text-danger mb-3">
                        {errorMessage}
                      </div>
                    )}

                    <div className="d-flex gap-2 mt-2">
                      <div style={{ width: "80px" }}>
                        <PrimaryButton onClick={() => addImmunization()}>
                          Yes
                        </PrimaryButton>
                      </div>
                      <div style={{ width: "80px" }}>
                        <SecondaryButton onClick={() => setDeleteView(false)}>
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

export default Immunization;
