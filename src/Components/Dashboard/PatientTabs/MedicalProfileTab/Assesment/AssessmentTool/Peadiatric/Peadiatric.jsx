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
import PsychiatricTable from "../../../../../../Tables/AssessmentTools/PsychiatricTable";
import PsychiatricForm from "../Psychiatric/PsychiatricForm";
import useApi from "../../../../../../../ApiServices/useApi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import PeadiatricForm from "./PeadiatricForm";

const Peadiatric = ({ from }) => {
  const columnData = [
    { label: "No." },
    { label: "Name" },
    { label: "Taken" },
    { label: "result" },
    { label: "Actions" },
  ];
  const rowData = [
    {
      id: 1,
      name: "APGAR Score",
      date: "26-07-2024 ",
      result: "12 Score Medium",
      questions: [
        {
          label: "1. Activity (muscle tone)",
          options: ["Absent", "Flex arms and legs", "Active"],
        },
        {
          label: "2. Pulse",
          options: ["Absent", "Below 100 bpm", "Over 100 bpm"],
        },
        {
          label: "3. Grimace (reflex irritability)",
          options: [
            "Floppy",
            "Minimal response to stimulation",
            "Prompt response to stimulation",
          ],
        },
        {
          label: "4. Appearance (skin color)",
          options: ["Blue, Pale", "Pink body, Blue Extremities", "Pink"],
        },
        {
          label: "5. Respiration",
          options: ["Absent", "Slow and irregular", "Vigorous cry"],
        },
      ],
    },
  ];

  const { get, post, clearCache } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [qName, setQName] = useState();
  const [qPagi, setQPagi] = useState();
  const [edit, setEdit] = useState(false);
  const [formTitle, setFormTitle] = useState("");

  // const formTitle = "APGAR Score";

  const [addFormView, setAddFormView] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});

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

  const viewFormPage = () => {
    setAddFormView(true);
  };

  const getselectedData = (data, type) => {
    setFormTitle(data?.name);
    setSelectedData(data);
    if (type === "add") {
      viewFormPage();
      setEdit(false);
    }
    if (type === "view") {
      setAddFormView(true);
      setEdit(true);
    }
  };

  const onAdd = async (answerDatas) => {
    console.log("first hello", selectedData);
    try {
      const url = `resource/form_submitted_answers`; // Replace with your API endpoint
      const body = {
        answers: answerDatas,
        patient_id: data?.user_id,
        form_id: selectedData?.id,
        form_name: selectedData?.name,
      };
      await post(url, body);
      clearCache();
      await getTableLists();
      toast.success("Added successfully");
      setAddFormView(false);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const getTableLists = useCallback(async () => {
    try {
      const response = await get(
        `resource/form?slug=apgar&searchkey=&order_by=id&dir=1&user_id=${data?.user_id}` //
      );
      const listData = response?.data?.forms; //pagination
      setQName(listData);
      setQPagi(response?.data?.pagination);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, addFormView, currentPage]);

  useEffect(() => {
    getTableLists();
  }, [getTableLists]);
  return (
    <>
      {!addFormView && (
        <>
          <div className="mb-2">
            <PsychiatricTable
              rowData={qName}
              columns={columnData}
              getselectedData={getselectedData}
              from={from}
              currentPage={currentPage || 1}
              itemsPerPage={itemsPerPage || 5}
            />
            {/* <CRow className="mb-3">
              <CCol lg={12} className="d-flex justify-content-center">
                <Pagination
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                  totalItems={qPagi?.total || 0}
                  itemsPerPage={itemsPerPage}
                />
              </CCol>
            </CRow> */}
          </div>
        </>
      )}
      {addFormView && (
        <CCard className="p-2 cursor-default mb-5">
          <CCardBody className="mb-3">
            <PeadiatricForm
              back={() => {
                setAddFormView(false);
                setSelectedData({});
              }}
              defaultValues={selectedData}
              questions={selectedData.questions || []}
              formTitle={formTitle}
              onAdd={onAdd}
              latest_form_submission={
                edit ? selectedData?.latest_form_submisson : null
              }
              isEditMode={edit}
            />
          </CCardBody>
        </CCard>
      )}
    </>
  );
};

export default Peadiatric;
