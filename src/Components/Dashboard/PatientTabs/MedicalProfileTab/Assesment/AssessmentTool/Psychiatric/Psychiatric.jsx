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
import PsychiatricForm from "./PsychiatricForm";
import useApi from "../../../../../../../ApiServices/useApi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Psychiatric = ({ from }) => {
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
      name: "Physical Symptoms",
      date: "26-07-2024 ",
      result: "12 Score Medium",
      questions: [
        {
          label: "1. Stomach pain",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "2. Back pain",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "3. Pain in your arms, legs, or joints (knees, hips, etc.)",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label:
            "4. Menstrual cramps or other problems with your periods WOMEN ONLY",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "5. Headaches",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "6. Chest pain",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "7. Dizziness",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "8. Fainting spells",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "9. Feeling your heart pound or race",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "10. Shortness of breath",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "11. Pain or problems during sexual intercourse",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "12. Constipation, loose bowels, or diarrhea",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "13. Nausea, gas, or indigestion",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "14. Feeling tired or having low energy",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
        {
          label: "15. Trouble sleeping",
          options: [
            "Not bothered at all",
            "Bothered a little",
            "Bothered a lot",
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Anger",
      questions: [
        {
          label: "1. I was irritated more than people knew",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "2. I felt angry",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "3. I felt like I was ready to explode",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "4. I was grouchy",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "5. I felt annoyed",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
      ],
    },
    {
      id: 3,
      name: "Anxiety",
      questions: [
        {
          label: "1. I felt fearful",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "2. I felt anxious",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "3. I felt worried",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label:
            "4. I found it hard to focus on anything other than my anxiety",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "5. I felt nervous",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "6. I felt uneasy",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "7. I felt tense",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
      ],
    },
    {
      id: 4,
      name: "Depression",
      questions: [
        {
          label: "1. I felt worthless",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "2. I felt that I had nothing to look forward to",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "3. I felt helpless",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "4. I felt sad",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "5. I felt like a failure",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "6. I felt depressed",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "7. I felt unhappy",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
        {
          label: "8. I felt hopeless",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        },
      ],
    },
    {
      id: 5,
      name: "Mania",
      questions: [
        {
          label: "Question 1",
          options: [
            "I do not feel happier or more cheerful than usual",
            "I occasionally feel happier or more cheerful than usual",
            "I often feel happier or more cheerful than usual",
            "I feel happier or more cheerful than usual most of the time",
            "I feel happier of more cheerful than usual all of the time",
          ],
        },
        {
          label: "Question 2",
          options: [
            "I do not feel more self-confident than usual",
            "I occasionally feel more self-confident than usual",
            "I often feel more self-confident than usual",
            "I frequently feel more self-confident than usual",
            "I feel extremely self-confident all of the time",
          ],
        },
        {
          label: "Question 3",
          options: [
            "I do not need less sleep than usual",
            "I occasionally need less sleep than usual",
            "I often need less sleep than usual",
            "I frequently need less sleep than usual",
            "I can go all day and all night without any sleep and still not feel tired",
          ],
        },
        {
          label: "Question 4",
          options: [
            "I do not talk more than usual",
            "I occasionally talk more than usual",
            "I often talk more than usual",
            "I frequently talk more than usual",
            "I talk constantly and cannot be interrupted",
          ],
        },
        {
          label: "Question 5",
          options: [
            "I have not been more active (either socially, sexually, at work, home, or school) than usual",
            "I have occasionally been more active than usual",
            "I have often been more active than usual",
            "I have frequently been more active than usual",
            "I am constantly more active or on the go all the time",
          ],
        },
      ],
    },
    {
      id: 6,
      name: "Autism Spectrum Disorder",
      questions: [
        {
          label:
            "1. Rate the level or severity of the Autism Spectrum Disorder problems that are present for this individual",
          options: [
            "None",
            "Mild Requiring support (i.e., Rituals and repetitive behaviors [RRBs] cause significant interference with functioning in one or more contexts. Resists attempts by others to interrupt RRBs or to be redirected from fixated interest.)",
            "Moderate Requiring SUBSTANTIAL support (i.e., RRBs and/or preoccupations and/or fixated interests appear frequently enough to be obvious to the casual observer and interfere with functioning in a variety of contexts. Distress or frustration is apparent when RRBs are interrupted; difficult to redirect from fixated interest.)",
            "Severe Requiring VERY SUBSTANTIAL support (i.e., Preoccupations, fixed rituals and/or repetitive behaviors markedly interfere with functioning in all spheres. Marked distress when rituals or routines are interrupted; very difficult to redirect from fixated interest or returns to it quickly.)",
          ],
        },
      ],
    },
    {
      id: 7,
      name: "Social Communication Disorder",
      questions: [
        {
          label:
            "1. Rate the level or severity of the Social Communication Disorder problems that are present for this individual",
          options: [
            "None",
            "Mild Requiring support (i.e., Without supports in place, deficits in social communication cause noticeable impairments. Has difficulty initiating social interactions and demonstrates clear examples of atypical or unsuccessful responses to social overtures of others. May appear to have decreased interest in social interactions.)",
            "Moderate Requiring SUBSTANTIAL support (i.e., Marked deficits in verbal and nonverbal social communication skills; social impairments apparent even with supports in place; limited initiation of social interactions and reduced or abnormal response to social overtures from others.)",
            "Severe Requiring VERY SUBSTANTIAL support (i.e., Severe deficits in verbal and nonverbal social communication skills cause severe impairments in functioning; very limited initiation of social interactions and minimal response to social overtures from others.)",
          ],
        },
      ],
    },
    {
      id: 8,
      name: "Dimensions Of Psychosis Symptom Severity",
      questions: [
        {
          label: "1. Hallucinations",
          options: [
            "Not present",
            "Equivocal (severity or duration not sufficient to be considered psychosis)",
            "Present, but mild (little pressure to act upon voices, not very bothered by voices)",
            "Present and moderate (some pressure to respond to voices, or is somewhat bothered by voices)",
            "Present and severe (severe pressure to respond to voices, or is very bothered by voices)",
          ],
        },
        {
          label: "2. Delusions",
          options: [
            "Not present",
            "Equivocal (severity or duration not sufficient to be considered psychosis)",
            "Present, but mild (little pressure to act upon delusional beliefs, not very bothered by beliefs)",
            "Present and moderate (some pressure to act upon beliefs, or is somewhat bothered by beliefs)",
            "Present and severe (severe pressure to act upon beliefs, or is very bothered by beliefs)",
          ],
        },
        {
          label: "3. Disorganized speech",
          options: [
            "Not present",
            "Equivocal (severity or duration not sufficient to be considered disorganization)",
            "Present, but mild (some difficulty following speech)",
            "Present and moderate (speech often difficult to follow)",
            "Present and severe (speech almost impossible to follow)",
          ],
        },
        {
          label: "4. Abnormal psychomotor behavior",
          options: [
            "Not present",
            "Equivocal (severity or duration not sufficient to be considered abnormal psychomotor behavior)",
            "Present, but mild (occasional abnormal or bizarre motor behavior or catatonia)",
            "Present and moderate (frequent abnormal or bizarre motor behavior or catatonia)",
            "Present and severe (abnormal or bizarre motor behavior or catatonia almost constant)",
          ],
        },
        {
          label:
            "5. Negative symptoms (restricted emotional expression or avolition)",
          options: [
            "Not present",
            "Equivocal decrease in facial expressivity, prosody, gestures, or self-initiated behavior",
            "Present, but mild decrease in facial expressivity, prosody, gestures, or self-initiated behavior",
            "Present and moderate decrease in facial expressivity, prosody, gestures, or self-initiated behavior",
            "Present and severe decrease in facial expressivity, prosody, gestures, or self-initiated behavior",
          ],
        },
        {
          label: "6. Impaired cognition",
          options: [
            "Not present",
            "Equivocal (cognitive function not clearly outside the range expected for age or SES; i.e., within 0.5 SD of mean)",
            "Present, but mild (some reduction in cognitive function; below expected for age and SES, 0.5–1 SD from mean)",
            "Present and moderate (clear reduction in cognitive function; below expected for age and SES, 1–2 SD from mean)",
            "Present and severe (severe reduction in cognitive function; below expected for age and SES, > 2 SD from mean)",
          ],
        },
        {
          label: "7. Depression",
          options: [
            "Not present",
            "Equivocal (occasionally feels sad, down, depressed, or hopeless; concerned about having failed someone or at something but not preoccupied)",
            "Present, but mild (frequent periods of feeling very sad, down, moderately depressed, or hopeless; concerned about having failed someone or at something, with some preoccupation)",
            "Present and moderate (frequent periods of deep depression or hopelessness; preoccupation with guilt, having done wrong)",
            "Present and severe (deeply depressed or hopeless daily; delusional guilt or unreasonable self-reproach grossly out of proportion to circumstances)",
          ],
        },
        {
          label: "8. Mania",
          options: [
            "Not present",
            "Equivocal (occasional elevated, expansive, or irritable mood or some restlessness)",
            "Present, but mild (frequent periods of somewhat elevated, expansive, or irritable mood or restlessness)",
            "Present and moderate (frequent periods of extensively elevated, expansive, or irritable mood or restlessness)",
            "Present and severe (daily and extensively elevated, expansive, or irritable mood or restlessness)",
          ],
        },
      ],
    },
    {
      id: 9,
      name: "Conduct Disorder",
      questions: [
        {
          label:
            "1. Rate the level or severity of the conduct problems that are present for this individual",
          options: [
            "None (No conduct problems)",
            "Mild (Few if any conduct problems in excess of those required to make the diagnosis are present, and conduct problems cause relatively minor harm to others [e.g., lying, truancy, staying out after dark without permission, or other rule breaking])",
            "Moderate (The number of conduct problems and the effect on others are intermediate between “mild” and “severe” [e.g., stealing without confronting a victim, vandalism])",
            "Severe (Many conduct problems in excess of those required to make the diagnosis are present, or conduct problems cause considerable harm to others [e.g., forced sex, physical cruelty, use of a weapon, stealing while confronting a victim, breaking and entering])",
          ],
        },
      ],
    },
    {
      id: 10,
      name: "Nonsuicidal Self-Injury",
      questions: [
        {
          label:
            "1. Rate the level or severity of the Nonsuicidal Self-injury problems that are present for this individual",
          options: [
            "None (No NSSI acts or NSSI acts on fewer than 3 days AND no urge to self- injure again.)",
            "Subthreshold (NSSI acts on 2-4 days OR has self- injured in the past on 5 or more days and has reported urges to self-injure again.)",
            "Mild (NSSI acts on 5–7 days using a single method and not requiring surgical treatment [other than cosmetic].)",
            "Moderate (NSSI acts on 8–11 days using a single method and not requiring surgical treatment [other than cosmetic] OR NSSI acts on 5–7 days using more than one method.)",
            "Severe (At least 1 NSSI act that required surgical treatment [other than cosmetic] OR NSSI acts on 12 or more days using a single method OR NSSI acts on 8 or more days using more than one method.)",
          ],
        },
      ],
    },
    {
      id: 11,
      name: "Oppositional Defiant Disorder",
      questions: [
        {
          label:
            "1. Rate the level or severity of the Oppositional Defiant problems that are present for this individual",
          options: [
            "None (No oppositional defiant symptoms)",
            "Mild (Symptoms are confined to only one setting [e.g., at home, at school, at work, with peers])",
            "Moderate (Some symptoms are present in at least two settings)",
            "Severe (Some symptoms are present in three or more settings)",
          ],
        },
      ],
    },
    {
      id: 12,
      name: "Somatic Symptom Disorder",
      questions: [
        {
          label:
            "1. Does the individual have or show disproportionate and persistent concerns about the medical seriousness of his/her symptoms?",
          options: [
            "Not at all",
            "A little bit",
            "Somewhat",
            "Quite a bit",
            "Very much",
          ],
        },
        {
          label:
            "2. Does the individual have or show a high level of health-related anxiety?",
          options: [
            "Not at all",
            "A little bit",
            "Somewhat",
            "Quite a bit",
            "Very much",
          ],
        },
        {
          label:
            "3. Does the individual spend excessive time and energy devoted to these symptoms or health concerns?",
          options: [
            "Not at all",
            "A little bit",
            "Somewhat",
            "Quite a bit",
            "Very much",
          ],
        },
      ],
    },
  ];
  const { get, post, clearCache, del } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [qName, setQName] = useState();
  const [qPagi, setQPagi] = useState();
  const [addFormView, setAddFormView] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});
  const [formTitle, setFormTitle] = useState(""); // State for form title
  const [edit, setEdit] = useState(false);
  const itemsPerPage = 6; // Number of items to display per page

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const viewFormPage = () => {
    setAddFormView(true);
  };

  const getselectedData = (data, type) => {
    console.log(type, "first", data);
    setSelectedData(data);
    setFormTitle(data?.name); // Set form title based on selected data
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
        `resource/form?slug=psychiatric-exam&searchkey=&order_by=id&dir=1&user_id=${data?.user_id}` //
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

export default Psychiatric;
