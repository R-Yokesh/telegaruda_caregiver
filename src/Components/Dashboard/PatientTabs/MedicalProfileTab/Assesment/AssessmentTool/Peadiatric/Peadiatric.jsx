import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import Pagination from "../../../../../../Pagination/Pagination";
import PsychiatricTable from "../../../../../../Tables/AssessmentTools/PsychiatricTable";
import PsychiatricForm from "../Psychiatric/PsychiatricForm";

const Peadiatric = ({ from }) => {
  const columnData = [
    { label: "NO" },
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

  const formTitle = "APGAR Score";

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
    console.log(type, "first", data);
    setSelectedData(data);
    if (type === "view") {
      viewFormPage();
    }
  };

  return (
    <>
      {!addFormView && (
        <>
          <div className="mb-2">
            <PsychiatricTable
              rowData={getCurrentPageItems()}
              columns={columnData}
              getselectedData={getselectedData}
              from={from}
            />
          </div>
        </>
      )}
      {addFormView && (
        <CCard className="p-2 cursor-default mb-5">
          <CCardBody className="mb-3">
            <PsychiatricForm
              back={() => {
                setAddFormView(false);
                setSelectedData({});
              }}
              defaultValues={selectedData}
              questions={selectedData.questions || []}
              formTitle={formTitle}
            />
          </CCardBody>
        </CCard>
      )}
    </>
  );
};

export default Peadiatric;
