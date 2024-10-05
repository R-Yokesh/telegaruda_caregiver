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
import PsychiatricForm from "../../AssessmentTool/Psychiatric/PsychiatricForm";
import useApi from "../../../../../../../ApiServices/useApi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import NeurologicalForm from "./NeurologicalForm";

const Neurological = ({ from }) => {
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
      name: "NIH Stroke Scale/Score (NIHSS)",
      date: "26-07-2024 ",
      result: "12 Score Medium",
      questions: [
        {
          label: "1. Level of consciousness",
          options: [
            "Alert, keenly responsive",
            "Arouses to minor stimulation",
            "Requires repeated stimulation to arouse",
            "Movements to pain",
            "Postures or unresponsive",
          ],
        },
        {
          label: "2. Ask month and age",
          options: [
            "Both questions right",
            "1 question right",
            "0 questions right",
            "Dysarthric/intubated/trauma/language barrier",
            "Aphasic",
          ],
        },
        {
          label: "3. Blink eyes & squeeze hands",
          options: [
            "Performs both tasks",
            "Performs 1 task",
            "Performs 0 tasks",
          ],
        },
        {
          label: "4. Horizontal extraocular movements",
          options: [
            "Normal",
            "Partial gaze palsy: can be overcome",
            "Partial gaze palsy: corrects with oculocephalic reflex",
            "Forced gaze palsy: cannot be overcome",
          ],
        },
        {
          label: "5. Visual fields",
          options: [
            "No visual loss",
            "Partial hemianopia",
            "Complete hemianopia",
            "Patient is bilaterally blind",
            "Bilateral hemianopia",
          ],
        },
        {
          label: "6. Facial palsy",
          options: [
            "Normal symmetry",
            "Minor paralysis (flat nasolabial fold, smile asymmetry)",
            "Partial paralysis (lower face)",
            "Unilateral complete paralysis (upper/lower face)",
            "Bilateral complete paralysis (upper/lower face)",
          ],
        },
        {
          label: "7. Left arm motor drift",
          options: [
            "No drift for 10 seconds",
            "Drift, but doesn't hit bed",
            "Drift, hits bed",
            "Some effort against gravity",
            "No effort against gravity",
            "No movement",
            "Amputation/joint fusion",
          ],
        },
        {
          label: "8. Right arm motor drift",
          options: [
            "No drift for 10 seconds",
            "Drift, but doesn't hit bed",
            "Drift, hits bed",
            "Some effort against gravity",
            "No effort against gravity",
            "No movement",
            "Amputation/joint fusion",
          ],
        },
        {
          label: "9. Left leg motor drift",
          options: [
            "No drift for 10 seconds",
            "Drift, but doesn't hit bed",
            "Drift, hits bed",
            "Some effort against gravity",
            "Some effort against gravity",
            "No movement",
            "Amputation/joint fusion",
          ],
        },
        {
          label: "10. Right leg motor drift",
          options: [
            "No drift for 10 seconds",
            "Drift, but doesn't hit bed",
            "Drift, hits bed",
            "Some effort against gravity",
            "No effort against gravity",
            "No movement",
            "Amputation/joint fusion",
          ],
        },
        {
          label: "11. Limb Ataxia",
          options: [
            "No ataxia",
            "Ataxia in 1 Limb",
            "Ataxia in 2 Limbs",
            "Does not understand",
            "Paralyzed",
            "Amputation/joint fusion",
          ],
        },
        {
          label: "12. Sensation",
          options: [
            "Normal: no sensory loss",
            "Mild-moderate loss: less sharp/more dull",
            "Mild-moderate loss: can sense being touched",
            "Complete loss: cannot sense being touched at all",
            "No response and quadriplegic",
            "Coma/unresponsive",
          ],
        },
        {
          label: "13. Language/aphasia",
          options: [
            "Normal: no aphasia",
            "Mild-moderate aphasia: some obvious changes, without significant limitation",
            "Severe aphasia: fragmentary expression, inference needed, cannot identify materials",
            "Mute/global aphasia: no usable speech/auditory comprehension",
            "Coma/unresponsive",
          ],
        },
        {
          label: "14. Dysarthria",
          options: [
            "Normal",
            "Mild-moderate dysarthria: slurring but can be understood",
            "Severe dysarthria: unintelligible slurring or out of proportion to dysphasia",
            "Mute/anarthric",
            "Intubated/unable to test",
          ],
        },
        {
          label: "15. Extinction/inattention",
          options: [
            "No abnormality",
            "Visual/tactile/auditory/spatial/personal inattention",
            "Extinction to bilateral simultaneous stimulation",
            "Profound hemi-inattention (ex: does not recognize own hand)",
            "Extinction to >1 modality",
          ],
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
  // const formTitle = "NIH Stroke Scale/Score (NIHSS)";

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
        `resource/form?slug=stroke-scale&searchkey=&order_by=id&dir=1&user_id=${data?.user_id}` //
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
            <NeurologicalForm
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

export default Neurological;
