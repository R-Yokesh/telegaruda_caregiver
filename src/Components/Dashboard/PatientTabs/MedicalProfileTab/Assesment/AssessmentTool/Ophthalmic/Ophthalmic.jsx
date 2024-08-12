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

const Ophthalmic = () => {

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
      name: "Vision Symptoms",
      date: "26-07-2024 ",
      result: "6 Score Medium",
      questions: [
        {
          label: "1. As a teacher or parent are you concerned with this student’s vision?",
          options: ["Yes", "No"]
        },
        {
          label: "2. Tilts head, squints, closes or covers one eye when reading?",
          options: ["Yes", "No"]
        },
        {
          label: "3. Gaze issues, eyes turn in or out, crossed eyes, eyes wander",
          options: ["Yes", "No"]
        },
        {
          label: "4. Different size pupils or eyes",
          options: ["Yes", "No"]
        },
        {
          label: "5. Watery eyes, eyes appear hazy or clouded",
          options: ["Yes", "No"]
        },
        {
          label: "6. Words float, move, or jump around when reading",
          options: ["Yes", "No"]
        },
        {
          label: "7. Complains of headaches, dizziness, or nausea when reading",
          options: ["Yes", "No"]
        },
        {
          label: "8. Complains of itching, burning, or scratchy eyes",
          options: ["Yes", "No"]
        },
        {
          label: "9. Complains of blurred or double vision, unusual sensitivity to light, or difficulty seeing",
          options: ["Yes", "No"]
        },
        {
          label: "10. History of head injury with vision complaints",
          options: ["Yes", "No"]
        },
        {
          label: "11. Loses place when reading",
          options: ["Yes", "No"]
        },
        {
          label: "12. Skips over or leaves out small words when reading",
          options: ["Yes", "No"]
        },
        {
          label: "13. Writes uphill or downhill; difficulty writing in a straight line",
          options: ["Yes", "No"]
        },
        {
          label: "14. Has difficulty copying from the board",
          options: ["Yes", "No"]
        },
        {
          label: "15. Avoids near work, such as reading or writing",
          options: ["Yes", "No"]
        },
        {
          label: "16. Has difficulty lining up numbers when doing math",
          options: ["Yes", "No"]
        },
        {
          label: "17. Has difficulty finishing assignments on time",
          options: ["Yes", "No"]
        },
        {
          label: "18. Holds books too close; leans too close to a computer screen",
          options: ["Yes", "No"]
        },
        {
          label: "19. Clumsy; bumps into things; knocks things over",
          options: ["Yes", "No"]
        },
      ],
    },

  ];

  const formTitle = "Vision Symptoms";

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
  )
}

export default Ophthalmic