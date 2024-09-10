import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import Pagination from "../../../../../../Pagination/Pagination";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../../../../../../assets/Assets";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import SurgicalForm from "./SurgicalForm";
import SurgicalTable from "../../../../../../Tables/Subjective/SurgicalTable";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import { useLocation } from "react-router-dom";
import useApi from "../../../../../../../ApiServices/useApi";
import { toast } from "react-toastify";

const SurgicalHistory = ({ from }) => {
  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "Date" },
    { id: 3, label: "Surgery Name" },
    { id: 4, label: " ICD Code" },
    { id: 5, label: "Performed by" },
    { id: 5, label: "Hospital" },
    { id: 6, label: "ACTIONS" },
  ];
  const rowData = [
    {
      id: 1,
      date: "06-07-2024 12:10",
      name: "Lorem Ipsum",
      icd_code: "56788",
      Performed_by: "Lorem ipsum",
      hospital: "Lorem ipsum",
    },
    {
      id: 2,
      date: "06-07-2024 12:10",
      name: "Lorem Ipsum",
      icd_code: "56788",
      Performed_by: "Lorem ipsum",
      hospital: "Lorem ipsum",
    },
    {
      id: 3,
      date: "06-07-2024 12:10",
      name: "Lorem Ipsum",
      icd_code: "56788",
      Performed_by: "Lorem ipsum",
      hospital: "Lorem ipsum",
    },
    {
      id: 4,
      date: "06-07-2024 12:10",
      name: "Lorem Ipsum",
      icd_code: "56788",
      Performed_by: "Lorem ipsum",
      hospital: "Lorem ipsum",
    },
    {
      id: 5,
      date: "06-07-2024 12:10",
      name: "Lorem Ipsum",
      icd_code: "56788",
      Performed_by: "Lorem ipsum",
      hospital: "Lorem ipsum",
    },
    {
      id: 6,
      date: "06-07-2024 12:10",
      name: "Lorem Ipsum",
      icd_code: "56788",
      Performed_by: "Lorem ipsum",
      hospital: "Lorem ipsum",
    },
    {
      id: 7,
      date: "06-07-2024 12:10",
      name: "Lorem Ipsum",
      icd_code: "56788",
      Performed_by: "Lorem ipsum",
      hospital: "Lorem ipsum",
    },
    {
      id: 8,
      date: "06-07-2024 12:10",
      name: "Lorem Ipsum",
      icd_code: "56788",
      Performed_by: "Lorem ipsum",
      hospital: "Lorem ipsum",
    },
    {
      id: 9,
      date: "06-07-2024 12:10",
      name: "Lorem Ipsum",
      icd_code: "56788",
      Performed_by: "Lorem ipsum",
      hospital: "Lorem ipsum",
    },
    {
      id: 10,
      date: "06-07-2024 12:10",
      name: "Lorem Ipsum",
      icd_code: "56788",
      Performed_by: "Lorem ipsum",
      hospital: "Lorem ipsum",
    },
  ];
  const { get, post, clearCache, patch, del, loading } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;

  const [surgicalDatas, setSurgicalDatas] = useState([]);
  const [surgicalPagi, setSurgicalPagi] = useState({});

  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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

  const getselectedData = (data, type) => {
    console.log(type, "first", data);
    setSelectedData(data);
    if (type === "edit") {
      addFormPage();
    }
    if (type === "delete") {
      detailPage();
    }
  };

  const getHistoryLists = useCallback(async () => {
    try {
      const response = await get(
        `resource/patientHistories?limit=10&page=1&from=${startDate ?? ""}&to=${
          endDate ?? ""
        }&order_by=values-%3Esurgery_date&dir=2&user_id=${
          data?.user_id
        }&slug=surgical-history&searchkey=${searchValue ?? ""}`
      );
      const listData = response?.data?.patient_histories; //
      setSurgicalDatas(listData);
      setSurgicalPagi(response?.data?.pagination);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get]);
  const surgicalEdit = async (answerDatas, selectedId) => {
    try {
      const url = `resource/patientHistories/${selectedId}`; // Replace with your API endpoint
      const body = {
        values: answerDatas,
        patient_id: data?.user_id, //data?.user_id
        slug: "surgical-history",
      };
      await patch(url, body);
      clearCache();
      await getHistoryLists();
      setAddFormView(false);
      toast.success("Updated successfully");
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  const surgicalAdd = async (answerDatas) => {
    try {
      const url = `resource/patientHistories`; // Replace with your API endpoint
      const body = {
        values: answerDatas,
        patient_id: data?.user_id, //data?.user_id
        slug: "surgical-history",
      };
      await post(url, body);
      clearCache();
      await getHistoryLists();
      toast.success("Added successfully");
      setAddFormView(false);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  const deleteMedicalLists = async () => {
    try {
      const response = await del(
        `resource/patientHistories/${selectedData?.id}`
      );

      if (response.code === 200) {
        setDetailView(false);
        clearCache();
        await getHistoryLists();
        toast.success("Deleted successfully");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getHistoryLists();
  }, [getHistoryLists]);

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
            <SurgicalTable
              rowData={surgicalDatas}
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
                    totalItems={surgicalPagi?.total || 0}
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
            <SurgicalForm
              back={() => {
                setAddFormView(false);
                setSelectedData({});
              }}
              defaultValues={selectedData}
              surgicalAdd={surgicalAdd}
              surgicalEdit={surgicalEdit}
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

export default SurgicalHistory;
