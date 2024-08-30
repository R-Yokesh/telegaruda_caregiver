import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useState, useCallback, useEffect } from "react";
import Pagination from "../../../../../../Pagination/Pagination";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../../../../../../assets/Assets";
import DateSelector from "../../../../../../DateRangePicker/DateSelector";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import ExerciseHabitTable from "../../../../../../Tables/Subjective/WellnessProfileTable/ExerciseHabitTable";
import ExcerciseHabitForm from "./ExcerciseHabitForm";
// import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import useApi from "../../../../../../../ApiServices/useApi";

const ExerciseHabit = ({ from }) => {
  const columnData = [
    { label: "NO." },
    { label: "Date" },
    { label: "Type" },
    { label: "DURATION" },
    { label: "INTENSITY" },
    { label: "Actions" },
  ];

  const [pagination, setPagination] = useState({});
  const [rowData, setRowData] = useState([]);
  const [rowFluidata, setRowFluiData] = useState([]);
  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [id, setId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { loading, error, get, del, clearCache } = useApi();


  const itemsPerPage = 5; // Number of items to display per page

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

  const fetchDiet = useCallback(async () => {
    try {
      const response = await get(
        `resource/activity_wellness?limit=${itemsPerPage}&page=${currentPage}&order_by=act_date&dir=2&act_catagory=diet&user_id=10`
      );
      if (response.code === 200) {
        console.log(response?.data?.activity_wellnesses);
        setRowData(response?.data?.activity_wellnesses);
        setPagination(response?.data?.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, currentPage, startDate, endDate]);
  useEffect(() => {
    fetchDiet();
  }, [fetchDiet]);

  const getselectedData = (data, id, type) => {
    console.log(type, "first", data);
    setSelectedData(data);
    if (type === "edit") {
      setAddFormView(true);
    }
    if (type === "delete") {
      setId(id);
      detailPage();
    }
  };
  const addFormPage = () => {
    setAddFormView(true);
    setSelectedData({});
  };

  const detailPage = () => {
    setDetailView(true);
  };

  const deleteDiet = async () => {
    try {
      if (id) {
        const response = await del(`resource/activity_wellness/${id}`);
        if (response.code === 200) {
          setDetailView(false);
          clearCache();
          fetchDiet();
        } else {
          console.error("Failed to delete data:", response.message);
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  return (
    <>
      {from === "Consult" && (
        <ExerciseHabitTable
          rowData={rowData}
          columns={columnData}
          getselectedData={getselectedData}
          from={from}
        />
      )}
      {from !== "Consult" && (
        <>
          {!addFormView && (
            <>
              <CRow className="mb-2">
                <CCol lg={8} className="">
                  <DateSearch />
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
              <div className="mb-2">
                <ExerciseHabitTable
                  rowData={rowData}
                  columns={columnData}
                  getselectedData={getselectedData}
                  from={from}
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
                <ExcerciseHabitForm
                  back={() => {
                    setAddFormView(false);
                    setSelectedData({});
                  }}
                  setAddFormView={setAddFormView}
                  fetchDiet={fetchDiet}
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
                        <PrimaryButton onClick={deleteDiet}>Yes</PrimaryButton>
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

export default ExerciseHabit;
