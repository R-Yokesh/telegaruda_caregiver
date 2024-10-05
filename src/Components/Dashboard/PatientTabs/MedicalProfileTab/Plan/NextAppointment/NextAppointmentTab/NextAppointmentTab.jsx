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
import DateSelector from "../../../../../../DateRangePicker/DateSelector";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Pagination from "../../../../../../Pagination/Pagination";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PatientEducationForm from "../../PatientEducation/PatientEducationTab/PatientEducationForm";
import NextAppointmentTable from "../../../../../../Tables/NextAppointmentTable";
import NextAppointmentForm from "./NextAppointmentForm";
import useApi from "../../../../../../../ApiServices/useApi";
import DateRangePicker from "../../../../../../DateRangePicker/DateRangePicker";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const NextAppointmentTab = ({ from }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "Date & Time" },
    { id: 3, label: "Provider Name" },
    { id: 3, label: "Reason" },
    { id: 7, label: "ACTIONS" },
  ];

  // const rowData = [
  //   {
  //     id: 1,
  //     date: "02-04-2024 12:13",
  //     provider_name: "Lorem ipsum ",
  //     reason: "Lorem ipsum",
  //   },
  //   {
  //     id: 2,
  //     date: "02-04-2024 12:13",
  //     provider_name: "Lorem ipsum ",
  //     reason: "Lorem ipsum",
  //   },
  //   {
  //     id: 3,
  //     date: "02-04-2024 12:13",
  //     provider_name: "Lorem ipsum ",
  //     reason: "Lorem ipsum",
  //   },
  //   {
  //     id: 4,
  //     date: "02-04-2024 12:13",
  //     provider_name: "Lorem ipsum ",
  //     reason: "Lorem ipsum",
  //   },
  //   {
  //     id: 5,
  //     date: "02-04-2024 12:13",
  //     provider_name: "Lorem ipsum ",
  //     reason: "Lorem ipsum",
  //   },
  // ];

  const { loading, error, get, post, patch, del, clearCache } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  console.log("daattttta", data);

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

  const fetchNextAppointment = useCallback(async () => {
    try {
      const response = await get(
        `resource/next-appointment?patient_id=${data?.user_id
        }&limit=${itemsPerPage}&page=${currentPage}&from=${startDate ?? ""
        }&to=${endDate ?? ""}&searchkey=${searchValue ?? ""
        }&order_by=date&dir=2`
      );
      if (response.code === 200) {
        setRowData(response.data.next_appointments);
        setPagination(response.data.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, currentPage, startDate, endDate, searchValue]);

  useEffect(() => {
    fetchNextAppointment();
  }, [fetchNextAppointment]);

  // Add NextAppointment
  const addNextAppointment = async (values) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const body = {
        patient_id: data?.user_id,
        provider_id: values?.provider_id,
        date: values?.date,
        reason: values?.reason,
        provider: values?.provider,
      };
      // Use the provided `post` function to send the request
      const response = await post(`resource/next-appointment`, body);
      if (response.code === 201) {
        clearCache();
        await fetchNextAppointment();
        setAddFormView(false);
        toast.success("Added successfully");
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

  // Edit NextAppointment
  const editNextAppointment = async (values, id) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const body = {
        patient_id: data?.user_id,
        provider_id: values?.provider_id,
        date: values?.date,
        reason: values?.reason,
        provider: values?.provider,
      };
      // Use the provided `post` function to send the request
      const response = await patch(`resource/next-appointment/${id}`, body);

      if (response.code === 200) {
        clearCache();
        await fetchNextAppointment();
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

  // Delte Patient Education
  const deleteNextAppointment = async () => {
    try {
      const response = await del(`resource/next-appointment/${id}`);

      if (response.code === 200) {
        setDetailView(false);
        clearCache();
        fetchNextAppointment();
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
          <NextAppointmentTable
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
                  {/* <DateRangePicker getFilterValues={getFilterValues} /> */}
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
                  <NextAppointmentTable
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
                <NextAppointmentForm
                  back={() => {
                    setAddFormView(false);
                    setSelectedData({});
                  }}
                  defaultValues={selectedData}
                  addNextAppointment={addNextAppointment}
                  editNextAppointment={editNextAppointment}
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
                        <PrimaryButton
                          onClick={() => deleteNextAppointment(false)}
                        >
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

export default NextAppointmentTab;
