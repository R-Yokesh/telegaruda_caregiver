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
import MedicalTab from "../../../MedicalTab";
import ExerciseHabitTable from "../../../../../../Tables/Subjective/WellnessProfileTable/ExerciseHabitTable";
import ExcerciseHabitForm from "../ExerciseHabit/ExcerciseHabitForm";
import NutritionDietTable from "../../../../../../Tables/Subjective/WellnessProfileTable/NutritionDietTable";
import NutritionFluidTable from "../../../../../../Tables/Subjective/WellnessProfileTable/NutritionFluidTable";
import DietForm from "./DietForm";
import FluidIntakeForm from "./FluidIntakeForm";
import DateSearch from "../../../../../../DateRangePicker/DateSearch";
import useApi from "../../../../../../../ApiServices/useApi";
import DateRangePicker from "../../../../../../DateRangePicker/DateRangePicker";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Nutrition = ({ from }) => {
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [pagination, setPagination] = useState({});
  const [paginationFluid, setPaginationFluid] = useState({});

  const [rowData, setRowData] = useState([]);
  const [rowFluidata, setRowFluiData] = useState([]);
  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [id, setId] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFluid, setCurrentPageFluid] = useState(1);

  const [selectedData, setSelectedData] = useState({});
  const { post, patch, get, del, clearCache } = useApi();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columnData = [
    { id: 1, label: "No." },
    { id: 2, label: "Date" },
    { id: 3, label: "Type of Diet" },
    { id: 4, label: "Notes" },
    { id: 9, label: "ACTIONS" },
  ];
  // const rowData = [
  //   {
  //     id: 1,
  //     date: "02-04-2024 12:13",
  //     type_of_diet: "Non-Veg",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 2,
  //     date: "02-04-2024 12:13",
  //     type_of_diet: "Non-Veg",
  //     notes: "Lorem ipsum",
  //   },
  //   {
  //     id: 3,
  //     date: "02-04-2024 12:13",
  //     type_of_diet: "Non-Veg",
  //     notes: "Lorem ipsum",
  //   },
  // ];
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const onPageChangeFluid = (pageNumber) => {
    setCurrentPageFluid(pageNumber);
  };
  const getFilterValues = (startDate, endDate, searchValue) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSearchValue(searchValue);
    setCurrentPage(1);
    setCurrentPageFluid(1)
  };

  const fetchDiet = useCallback(async () => {
    try {
      const response = await get(
        `resource/activity_wellness?act_catagory=diet&user_id=${data?.user_id
        }&limit=${itemsPerPage}&page=${currentPage ?? ""}&from=${startDate ?? ""
        }&to=${endDate ?? ""}&order_by=act_date&dir=2`
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
  }, [get, data?.user_id, currentPage, startDate, endDate, addFormView]);

  useEffect(() => {
    fetchDiet();
  }, [fetchDiet]);

  const fetchFluid = useCallback(async () => {
    try {
      const response = await get(
        `resource/activity_wellness?&limit=${itemsPerPage}&page=${currentPageFluid}&order_by=act_date&dir=2&act_catagory=fluid&user_id=${data?.user_id
        }&from=${startDate ?? ""}&to=${endDate ?? ""}`
      );
      // &from=${startDate}&to=${endDate}&
      if (response.code === 200) {
        setRowFluiData(response?.data?.activity_wellnesses);
        setPaginationFluid(response?.data?.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, currentPageFluid, data?.user_id, startDate, endDate]);

  useEffect(() => {
    fetchFluid();
  }, [fetchFluid]);

  const FluidIntakecolumnData = [
    { id: 1, label: "No." },
    { id: 3, label: "Date" },
    { id: 3, label: "Type" },
    { id: 4, label: "INTAKE (ML)" },
    { id: 6, label: "ACTIONS" },
  ];
  // const FluidIntakerowData = [
  //   {
  //     id: 1,
  //     date: "02-04-2024 12:13",
  //     type: "Water",
  //     intake: "1500",
  //   },
  //   {
  //     id: 2,
  //     date: "02-04-2024 12:13",
  //     type: "Water",
  //     intake: "1500",
  //   },
  // ];

  const tabs = [
    { id: 1, title: "Diet" },
    { id: 2, title: "Fluid Intake" },
  ];

  const PatientSubMenu2 = localStorage.getItem("PatientSubMenu-4");
  const ParsedPatientSubMenu = PatientSubMenu2
    ? JSON.parse(PatientSubMenu2)
    : 1;
  const [currentTab, setCurrentTab] = useState(ParsedPatientSubMenu);
  const getCurrentTab = (data) => {
    setCurrentTab(data);
    setAddFormView(false);
  };

  const itemsPerPage = 5; // Number of items to display per page

  // Function to get items for the current page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rowData?.slice(startIndex, endIndex);
  };

  // const getCurrentFluidPageItems = () => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return FluidIntakerowData?.slice(startIndex, endIndex);
  // };
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
          await fetchDiet();
          await fetchFluid();
          toast.success("Delete successfully");
        } else {
          console.error("Failed to delete data:", response.message);
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const addDiet = async (body) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      // Use the provided `post` function to send the request
      const response = await post(`resource/activity_wellness`, body);

      if (response.code === 201) {
        clearCache();
        await fetchDiet(); // Refresh the list data here
        setAddFormView(false); // Close the form view
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

  const editDiet = async (body, defaultId) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const response = await patch(
        `resource/activity_wellness/${defaultId}`,
        body
      );

      if (response.code === 200) {
        clearCache();
        await fetchDiet(); // Refresh the list data here
        setAddFormView(false); // Close the form view
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
  const addFluid = async (body) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const response = await post(`resource/activity_wellness`, body);

      if (response.code === 201) {
        clearCache();
        await fetchFluid(); // Refresh the list data here
        setCurrentTab(2);
        setAddFormView(false); // Close the form view
        toast.success("Added successfully");
        setCurrentPageFluid(1)
      } 
      else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Reset the loading state to false after the API call is done
      setIsSubmitting(false);
    }
  };

  const editFluid = async (body, defaultValuesId) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const response = await patch(
        `resource/activity_wellness/${defaultValuesId}`, // Use the ID from default values
        body
      );

      if (response.code === 200) {
        clearCache();
        await fetchFluid(); // Refresh the list data here
        setCurrentTab(2);
        setAddFormView(false); // Close the form view
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
        <CRow>
          <NutritionDietTable
            rowData={rowData}
            columns={columnData}
            getselectedData={getselectedData}
            from={from}
            currentPage={currentPage || 1}
            itemsPerPage={itemsPerPage || 5}
          />
        </CRow>
      )}
      {from === "Consult-Intake" && (
        <CRow>
          <NutritionFluidTable
            rowData={rowFluidata}
            columns={FluidIntakecolumnData}
            getselectedData={getselectedData}
            from={from}
            currentPage={currentPage || 1}
            itemsPerPage={itemsPerPage || 5}
          />
        </CRow>
      )}
      {from !== "Consult" && from !== "Consult-Intake" && (
        <>
          <>
            <CRow className="mb-3">
              <CCol lg={12} className="">
                <MedicalTab
                  tabs={tabs}
                  getCurrentTab={getCurrentTab}
                  defaultTab={ParsedPatientSubMenu - 1}
                />
              </CCol>
            </CRow>
            {!addFormView && (
              <>
                <CRow className="mb-2">
                  <CCol lg={8} className="">
                    <DateSearch getFilterValues={getFilterValues} />
                  </CCol>
                  <CCol
                    lg={4}
                    className="d-flex justify-content-end align-items-center gap-2 mt-4"
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
                  {currentTab === 1 && (
                    <>
                      <CRow>
                        <NutritionDietTable
                          rowData={rowData}
                          columns={columnData}
                          getselectedData={getselectedData}
                          from={from}
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
                    </>
                  )}
                  {currentTab === 2 && (
                    <>
                      <CRow>
                        <NutritionFluidTable
                          rowData={rowFluidata}
                          columns={FluidIntakecolumnData}
                          getselectedData={getselectedData}
                          from={from}
                          currentPage={currentPage || 1}
                          itemsPerPage={itemsPerPage || 5}
                        />
                      </CRow>
                      <CRow className="mb-3">
                        <CCol lg={12} className="d-flex justify-content-center">
                          <Pagination
                            currentPage={currentPageFluid}
                            onPageChange={onPageChangeFluid}
                            totalItems={paginationFluid?.total}
                            itemsPerPage={itemsPerPage}
                          />
                        </CCol>
                      </CRow>
                    </>
                  )}
                </div>
              </>
            )}
          </>

          {addFormView && (
            <CRow className="mb-2">
              <CCard className="p-2 cursor-default mb-5">
                <CCardBody className="mb-3">
                  {currentTab === 1 && (
                    <DietForm
                      back={() => {
                        setAddFormView(false);
                        setSelectedData({});
                      }}
                      setAddFormView={setAddFormView}
                      fetchDiet={fetchDiet}
                      defaultValues={selectedData}
                      addDiet={addDiet}
                      editDiet={editDiet}
                      isSubmitting={isSubmitting}
                    />
                  )}
                  {currentTab === 2 && (
                    <FluidIntakeForm
                      back={() => {
                        setAddFormView(false);
                        setSelectedData({});
                      }}
                      setAddFormView={setAddFormView}
                      fetchFluid={fetchFluid}
                      defaultValues={selectedData}
                      addFluid={addFluid}
                      editFluid={editFluid}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </CCardBody>
              </CCard>
            </CRow>
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

export default Nutrition;
