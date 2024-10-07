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

const Ophthalmic = ({ from }) => {
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
      name: "Vision Symptoms",
      date: "26-07-2024 ",
      result: "6 Score Medium",
      questions: [
        {
          label:
            "1. As a teacher or parent are you concerned with this student’s vision?",
          options: ["Yes", "No"],
        },
        {
          label:
            "2. Tilts head, squints, closes or covers one eye when reading?",
          options: ["Yes", "No"],
        },
        {
          label:
            "3. Gaze issues, eyes turn in or out, crossed eyes, eyes wander",
          options: ["Yes", "No"],
        },
        {
          label: "4. Different size pupils or eyes",
          options: ["Yes", "No"],
        },
        {
          label: "5. Watery eyes, eyes appear hazy or clouded",
          options: ["Yes", "No"],
        },
        {
          label: "6. Words float, move, or jump around when reading",
          options: ["Yes", "No"],
        },
        {
          label: "7. Complains of headaches, dizziness, or nausea when reading",
          options: ["Yes", "No"],
        },
        {
          label: "8. Complains of itching, burning, or scratchy eyes",
          options: ["Yes", "No"],
        },
        {
          label:
            "9. Complains of blurred or double vision, unusual sensitivity to light, or difficulty seeing",
          options: ["Yes", "No"],
        },
        {
          label: "10. History of head injury with vision complaints",
          options: ["Yes", "No"],
        },
        {
          label: "11. Loses place when reading",
          options: ["Yes", "No"],
        },
        {
          label: "12. Skips over or leaves out small words when reading",
          options: ["Yes", "No"],
        },
        {
          label:
            "13. Writes uphill or downhill; difficulty writing in a straight line",
          options: ["Yes", "No"],
        },
        {
          label: "14. Has difficulty copying from the board",
          options: ["Yes", "No"],
        },
        {
          label: "15. Avoids near work, such as reading or writing",
          options: ["Yes", "No"],
        },
        {
          label: "16. Has difficulty lining up numbers when doing math",
          options: ["Yes", "No"],
        },
        {
          label: "17. Has difficulty finishing assignments on time",
          options: ["Yes", "No"],
        },
        {
          label:
            "18. Holds books too close; leans too close to a computer screen",
          options: ["Yes", "No"],
        },
        {
          label: "19. Clumsy; bumps into things; knocks things over",
          options: ["Yes", "No"],
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

  // const formTitle = "Vision Symptoms";

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
        `resource/form?slug=vision&searchkey=&order_by=id&dir=1&user_id=${data?.user_id}` //
      );
      const listData = response?.data?.forms; //pagination
      setQName(listData);
      setQPagi(response?.data?.pagination);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, addFormView, data?.user_id]);

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
            <PsychiatricForm
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

export default Ophthalmic;
