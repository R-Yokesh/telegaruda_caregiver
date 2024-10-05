import {
  CCard,
  CCardBody,
  CCol,
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
import ExcerciseHabitForm from "../ExerciseHabit/ExcerciseHabitForm";
import MoodTable from "../../../../../../Tables/Subjective/WellnessProfileTable/MoodTable";
import MoodForm from "./MoodForm";
import useApi from "../../../../../../../ApiServices/useApi";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import DateRangePicker from "../../../../../../DateRangePicker/DateRangePicker";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Mood = ({ from }) => {
  const columnData = [
    { label: "NO." },
    { label: "Date" },
    { label: "Type" },
    { label: "Actions" },
  ];
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);

  const [pagination, setPagination] = useState({});
  const [id, setId] = useState(null);
  const { post, patch, get, del, clearCache } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});
  const [moodData, setMoodData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemsPerPage = 5; // Number of items to display per page

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getFilterValues = (startDate, endDate, searchValue) => {
    console.log(startDate, endDate, searchValue, "ghghhghg");
    setStartDate(startDate);
    setEndDate(endDate);
    setSearchValue(searchValue);
  };

  const fetchMood = useCallback(async () => {
    try {
      const response = await get(
        `resource/activity_wellness?limit=${itemsPerPage}&page=${currentPage}&from=${startDate ?? ""
        }&to=${endDate ?? ""
        }&order_by=act_date&dir=2&act_catagory=mood&user_id=${data?.user_id}`
      );
      if (response.code === 200) {
        console.log(response?.data?.activity_wellnesses);
        setMoodData(response?.data?.activity_wellnesses);
        setPagination(response?.data?.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, currentPage, startDate, endDate, data?.user_id]);

  useEffect(() => {
    fetchMood();
  }, [fetchMood]);

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

  const deleteMood = async () => {
    try {
      if (id) {
        const response = await del(`resource/activity_wellness/${id}`);
        if (response.code === 200) {
          setDetailView(false);
          clearCache();
          fetchMood();
          toast.success("Deleted successfully");
        } else {
          console.error("Failed to delete data:", response.message);
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const addMood = async (body) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const response = await post(`resource/activity_wellness`, body);

      if (response.code === 201) {
        clearCache();
        await fetchMood();
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

  const editMood = async (body, id) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const response = await patch(`resource/activity_wellness/${id}`, body);

      if (response.code === 200) {
        clearCache();
        await fetchMood();
        setAddFormView(false);
        toast.success("Updated successfully");
      } else {
        console.error("Failed to update data:", response.message);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      // Reset the loading state to false after the API call is done
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {from === "Consult" && (
        <MoodTable
          // rowData={getCurrentPageItems()}
          moodData={moodData}
          columns={columnData}
          getselectedData={getselectedData}
          from={from}
          currentPage={currentPage || 1}
          itemsPerPage={itemsPerPage || 5}
        />
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
                    <PrimaryButton onClick={() => addFormPage()}>
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
                <MoodTable
                  moodData={moodData}
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
                      totalItems={pagination?.total || 0}
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
                <MoodForm
                  back={() => {
                    setAddFormView(false);
                    setSelectedData({});
                  }}
                  setAddFormView={setAddFormView}
                  fetchMood={fetchMood}
                  defaultValues={selectedData}
                  addMood={addMood}
                  editMood={editMood}
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
                        <PrimaryButton onClick={deleteMood}>Yes</PrimaryButton>
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

export default Mood;
