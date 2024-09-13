import React, { useState,useEffect,useCallback } from "react";
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
import DateSelector from "../../../../../DateRangePicker/DateSelector";
import ImmunizationForm from "./ImmunizationForm";
import ImmunizationTable from "../../../../../Tables/ImmunizationTable";
import DatePicker from "react-datepicker";
import Dropdown from "../../../../../Dropdown/Dropdown";
import SingleDatePicker from "../../../../../DateRangePicker/SingleDatePicker";
import { toast } from "react-toastify";
import { format, isValid, parse } from "date-fns";
import useApi from "../../../../../../ApiServices/useApi";
import DateRangePicker from "../../../../../DateRangePicker/DateRangePicker";
import { useLocation } from "react-router-dom";

const Immunization = ({ onClose, from }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "VACCINE" },
    { id: 3, label: "PERIOD" },
    { id: 4, label: "STATUS" },
    { id: 5, label: "DOSAGE DATE" },
    { id: 6, label: "TAKEN DATE" },
    // { id: 7, label: "ACTIONS" },
  ];

  // const rowData = [
  //   {
  //     id: 1,
  //     vaccine: "Lorem Ipsum",
  //     period: "Lorem Ipsum",
  //     status: "Lorem Ipsum",
  //     dosage_date: "06-07-2024",
  //     taken_date: "06-07-2024",
  //   },
  //   {
  //     id: 2,
  //     vaccine: "Lorem Ipsum",
  //     period: "Lorem Ipsum",
  //     status: "Lorem Ipsum",
  //     dosage_date: "06-07-2024",
  //     taken_date: "06-07-2024",
  //   },
  //   {
  //     id: 3,
  //     vaccine: "Lorem Ipsum",
  //     period: "Lorem Ipsum",
  //     status: "Lorem Ipsum",
  //     dosage_date: "06-07-2024",
  //     taken_date: "",
  //   },
  //   {
  //     id: 4,
  //     vaccine: "Lorem Ipsum",
  //     period: "Lorem Ipsum",
  //     status: "Lorem Ipsum",
  //     dosage_date: "06-07-2024",
  //     taken_date: "",
  //   },
  //   {
  //     id: 5,
  //     vaccine: "Lorem Ipsum",
  //     period: "Lorem Ipsum",
  //     status: "Lorem Ipsum",
  //     dosage_date: "06-07-2024",
  //     taken_date: "06-07-2024",
  //   },
  //   {
  //     id: 6,
  //     vaccine: "Lorem Ipsum",
  //     period: "Lorem Ipsum",
  //     status: "Lorem Ipsum",
  //     dosage_date: "06-07-2024",
  //     taken_date: "06-07-2024",
  //   },
  //   {
  //     id: 7,
  //     vaccine: "Lorem Ipsum",
  //     period: "Lorem Ipsum",
  //     status: "Lorem Ipsum",
  //     dosage_date: "06-07-2024",
  //     taken_date: "06-07-2024",
  //   },
  //   {
  //     id: 8,
  //     vaccine: "Lorem Ipsum",
  //     period: "Lorem Ipsum",
  //     status: "Lorem Ipsum",
  //     dosage_date: "06-07-2024",
  //     taken_date: "06-07-2024",
  //   },
  //   {
  //     id: 9,
  //     vaccine: "Lorem Ipsum",
  //     period: "Lorem Ipsum",
  //     status: "Lorem Ipsum",
  //     dosage_date: "06-07-2024",
  //     taken_date: "",
  //   },
  //   {
  //     id: 10,
  //     vaccine: "Lorem Ipsum",
  //     period: "Lorem Ipsum",
  //     status: "Lorem Ipsum",
  //     dosage_date: "06-07-2024",
  //     taken_date: "06-07-2024",
  //   },
  // ];
    
  const { loading, error, get,post,del,clearCache } = useApi();

  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [addFormView, setAddFormView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [id, setId] = useState(null);
  const [ startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});
  const [tkDate, setTkDate] = useState(new Date());
  const [slug, setSlug] = useState("");
  
  const location = useLocation();
  const data = location.state?.PatientDetail;



  // Get today's date
  const today = new Date();


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


  const getselectedData = (data,slug, type) => {
    setSelectedData(data);
    setSlug(slug)
    if (type === "edit") {
      addFormPage();
    }
    if (type === "delete") {
      setDeleteView(true);
    }
  };
  console.log("selectedData111",selectedData,slug)
    
  const fetchImmunization = useCallback(async () => {
    try {
      // clearCache();
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
  }, [get]);

  useEffect(() => {
    fetchImmunization();
  }, [fetchImmunization]);


   // Add API 
   const addImmunization = async () => {

    try {
      const body = {
        slug: slug,
        details: selectedData.periods,
        patient_id: data?.user_id,
        status: selectedData.status,
        taken_at: format(tkDate, "yyyy-MM-dd"),
      };

      // Use the provided `post` function to send the request
      const response = await post(`resource/immunisation`, body);

      if (response.code === 201) {
        clearCache();
        await fetchImmunization();
        setDeleteView(false)

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
                <CCol lg={8} className="">
                {/* <DateRangePicker getFilterValues={getFilterValues} /> */}
                </CCol>
                <CCol
                  lg={4}
                  className="d-flex justify-content-end align-items-center gap-2"
                >
                  {/* <div>
                <PrimaryButton onClick={() => addFormPage()}>
                  <div className="d-flex align-items-center gap-2">
                    <img src={Assets.Add} alt="add" />
                    <span className="fs-16 fw-600">Add</span>
                  </div>
                </PrimaryButton>
              </div> */}
                  {/* <div>
                    onClick={() => addFormPage()}
                    <PrimaryButton>
                      <div className="d-flex align-items-center gap-2">
                        <img src={Assets.OptionsIcon} alt="add" />
                      </div>
                    </PrimaryButton>
                  </div> */}
                </CCol>
              </CRow>
              <div className="mb-2">
                <CRow>
                  <ImmunizationTable
                    rowData={getCurrentPageItems()}
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
                      totalItems={rowData?.length}
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
                        <label for="validationTooltip01" class="form-label">
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
