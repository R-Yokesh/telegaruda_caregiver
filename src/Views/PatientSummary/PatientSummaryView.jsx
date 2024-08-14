import React, { useState } from "react";
import PatientDetailCard from "../../Components/PatientDetailCard/PatientDetailCard";
import SummaryTable from "../../Components/SummaryTable/SummaryTable";
import TableRow from "../../Components/SummaryTable/TableRow";
import ExamCard from "../../Components/SummaryTable/ExamCard";
import TableColor from "../../Components/SummaryTable/TableColor";
import TableSec from "../../Components/SummaryTable/TableSec";
import DocumentTable from "../../Components/SummaryTable/DocumentTable";
import Prescription from "../../Components/SummaryTable/Prescription";
import { CTabs, CTab, CTabList, CTabContent, CTabPanel } from "@coreui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConsultTable from "../../Components/Consultant/ConsultTable";
import {
  ChiefComplaintsColumn,
  ChiefComplaintsItems,
  MedicationColumn,
  MedicationItems,
  SymptomsColumn,
  SymptomsItems,
} from "../../Components/Consultant/TableColumnsJson/SubjectiveJson";
import MedicalHistory from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/History/Medical History/MedicalHistory";
import ChiefComplaints from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/Chief Complaints/ChiefComplaints";
import SignsSymptoms from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/Present Illness/Signs And Symptoms/SignsSymptoms";
import Medication from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/Present Illness/Medication/Medication";
import SurgicalHistory from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/History/Surgical History/SurgicalHistory";
import FamilyHistory from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/History/Family History/FamilyHistory";
import SocialHistory from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/History/Social History/SocialHistory";
import OGHistory from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/History/OG History/OGHistory";
import Diagnosis from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Assesment/Diagnosis/Diagnosis";
import Immunization from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Assesment/Immunization/Immunization";
import MedicationOrder from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Plan/Orders/Medication Order/MedicationOrder";
import LabOrder from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Plan/Orders/Lab Order/LabOrder";
import ImagingOrder from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Plan/Orders/Imaging Order/ImagingOrder";
import Therapies from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Plan/Therapies/Therapies";
import Cpt from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Plan/Procedure CPT/Cpt";
import PatientEducation from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Plan/PatientEducation/PatientEducation";
import NextAppointment from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Plan/NextAppointment/NextAppointment";
import PsychiatricTable from "../../Components/Tables/AssessmentTools/PsychiatricTable";
import Psychiatric from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Assesment/AssessmentTool/Psychiatric/Psychiatric";
import Neurological from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Assesment/AssessmentTool/Neurological/Neurological";
import Ophthalmic from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Assesment/AssessmentTool/Ophthalmic/Ophthalmic";
import Peadiatric from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Assesment/AssessmentTool/Peadiatric/Peadiatric";
import ExerciseHabit from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/WellnessProfile/ExerciseHabit/ExerciseHabit";
import Sleep from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/WellnessProfile/Sleep/Sleep";
import Mood from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/WellnessProfile/Mood/Mood";
import SexualStatus from "../../Components/Dashboard/PatientTabs/MedicalProfileTab/Subjective/WellnessProfile/SexualStatus/SexualStatus";

function PatientSummaryView() {
  const getConsultTab = localStorage.getItem("ConsultTab");
  const parsedTab = getConsultTab ? JSON.parse(getConsultTab) : "Subjective";

  const [ActiveKey, setActiveKey] = useState(parsedTab);
  // BMI Data
  const VitalsColumns = [
    {
      key: "No",
      label: "No.",
    },
    {
      key: "Result",
      label: "Result",
    },
    {
      key: "BMI",
      label: "BMI",
    },
    {
      key: "Height",
      label: "Height",
    },
    {
      key: "Weight",
      label: "Weight",
    },
    {
      key: "Date",
      label: "Date",
    },
  ];

  const VitalsItems = [
    {
      No: 1,
      Result: "Normal Weight",
      BMI: "24.13",
      Height: "160 CM",
      Weight: "60 KG",
      Date: "02-04-2024",
    },
    {
      No: 2,
      Result: "Normal Weight",
      BMI: "24.13",
      Height: "160 CM",
      Weight: "60 KG",
      Date: "02-04-2024",
      _cellProps: { class: { scope: "hey" } },
    },
  ];

  // Temparature Data
  const TemColumns = [
    {
      key: "No",
      label: "No.",
    },
    {
      key: "Result",
      label: "Result",
    },
    {
      key: "Temperature",
      label: "Temperature",
    },
    {
      key: "Type",
      label: "Type",
    },
    {
      key: "Date",
      label: "Date",
    },
  ];

  const TemItems = [
    {
      No: 1,
      Result: "Normal",
      Temperature: "99.88 °F, 36.8 °C",
      Type: "Oral",
      Date: "02-04-2024   15:45",
    },
    {
      No: 2,
      Result: "Normal",
      Temperature: "99.88 °F, 36.8 °C",
      Type: "Oral",
      Date: "02-04-2024   15:45",
    },
  ];

  // Glassess Data
  const GlassColumns = [
    {
      key: "RX",
      label: "RX",
    },
    {
      key: "SPH",
      label: "SPH",
    },
    {
      key: "CYL",
      label: "CYL",
    },
    {
      key: "Axis",
      label: "Axis",
    },
  ];

  const GlassItems = [
    {
      RX: "D.V",
      SPH: "2",
      CYL: "2",
      Axis: "50 °",
    },
    {
      RX: "D.V",
      SPH: "2",
      CYL: "2",
      Axis: "50 °",
    },
  ];

  const PrescritionData = {
    id: "488",
    eyesight: "Right Eye (R.E)",
    date: "02-04-2024 15:45",
  };

  const PrescritionDataTwo = {
    id: "489",
    eyesight: "Left Eye (L.E)",
    date: "02-04-2024 15:45",
  };

  // Histories Data
  // Glassess Data
  const HistoryColumns = [
    {
      key: "No",
      label: "No.",
    },
    {
      key: "Condition",
      label: "Condition",
    },
    {
      key: "OnsetDate",
      label: "Onset Date",
    },
    {
      key: "RecoveredDate",
      label: "RecoveredDate",
    },
    {
      key: "TreatedBy",
      label: "Treated By",
    },
    {
      key: "Treatment",
      label: "Treatment",
    },
    {
      key: "Remark",
      label: "Remark",
    },
    {
      key: "Status",
      label: "Status",
    },
  ];

  const HistoryItems = [
    {
      No: "1",
      Condition: "Fever",
      OnsetDate: "02-04-2024",
      RecoveredDate: "02-04-2024",
      TreatedBy: "Prathi",
      Treatment: "Buddy Splint",
      Remark: "-",
      Status: "Inactive",
    },
    {
      No: "2",
      Condition: "Fever",
      OnsetDate: "02-04-2024",
      RecoveredDate: "02-04-2024",
      TreatedBy: "Prathi",
      Treatment: "Buddy Splint",
      Remark: "-",
      Status: "active",
    },
  ];

  // History Screens
  const Cheifcolumns = [
    {
      key: "No",
      label: "No.",
    },
    {
      key: "Complaints",
      label: "Complaints",
    },
    {
      key: "Notes",
      label: "Notes",
    },
  ];

  const Cheifitems = [
    {
      No: 1,
      Complaints:
        "abdominal pain, radiating to right shoulder and shoulder blades",
      Notes: "Taking dole",
    },
    {
      No: 2,
      Complaints:
        "abdominal pain, radiating to right shoulder and shoulder blades",
      Notes: "Taking dole",
    },
  ];

  // Medicine Data
  const Medicinecolumns = [
    {
      key: "No",
      label: "No.",
    },
    {
      key: "MEDICINE",
      label: "MEDICINE",
    },
    {
      key: "Type",
      label: "Type",
    },
    {
      key: "STRENGTH",
      label: "STRENGTH",
    },
    {
      key: "INTAKEDAYS",
      label: "INTAKE DAYS",
    },
    {
      key: "QUANTITY",
      label: "QUANTITY",
    },
    {
      key: "SIGINFO",
      label: "SIG INFO",
    },
    {
      key: "START",
      label: "START",
    },
    {
      key: "END",
      label: "END",
    },
    {
      key: "Reason",
      label: "Reason",
    },
    {
      key: "Status",
      label: "Status",
    },
  ];

  const Medicineitems = [
    {
      No: 1,
      MEDICINE: "Dolox",
      Type: "Brand",
      STRENGTH: "Milligram(mg)",
      INTAKEDAYS: "6",
      QUANTITY: "6",
      SIGINFO: "before breakfast",
      START: "22-01-2024",
      END: "22-01-2024",
      Reason: "-",
      Status: "Active",
    },
    {
      No: 2,
      MEDICINE: "Dolox",
      Type: "Brand",
      STRENGTH: "Milligram(mg)",
      INTAKEDAYS: "6",
      QUANTITY: "6",
      SIGINFO: "before breakfast",
      START: "22-01-2024",
      END: "22-01-2024",
      Reason: "-",
      Status: "Active",
    },
  ];

  // HPI Data
  const HPIcolumns = [
    {
      key: "No",
      label: "No.",
    },
    {
      key: "Onset",
      label: "Onset",
    },
    {
      key: "Location",
      label: "Location",
    },
    {
      key: "Duration",
      label: "Duration in Days",
    },
    {
      key: "Characteristics",
      label: "Characteristics (SL)",
    },
    {
      key: "aggravating",
      label: "aggravating factors",
    },
    {
      key: "Relieving",
      label: "Relieving factors",
    },
    {
      key: "Temporal",
      label: "Temporal factors",
    },
    {
      key: "Severity",
      label: "Severity",
    },
    {
      key: "Notes",
      label: "Notes",
    },
  ];

  const HPIitems = [
    {
      No: 1,
      Onset: "02-04-2024",
      Location: "Knee",
      Duration: "20",
      Characteristics: "Fracture",
      aggravating: "Fracture",
      Relieving: "Fracture",
      Temporal: "Fracture",
      Severity: "Normal",
      Notes: "-",
    },
    {
      No: 2,
      Onset: "02-04-2024",
      Location: "Knee",
      Duration: "20",
      Characteristics: "Fracture",
      aggravating: "Fracture",
      Relieving: "Fracture",
      Temporal: "Fracture",
      Severity: "Normal",
      Notes: "-",
    },
  ];

  // HPI Data
  const Surgicalcolumns = [
    {
      key: "No",
      label: "No.",
    },
    {
      key: "DATE",
      label: "DATE",
    },
    {
      key: "Procedure",
      label: "Procedure",
    },
    {
      key: "Notes",
      label: "Notes",
    },
  ];

  const Surgicalitems = [
    {
      No: 1,
      DATE: "02-04-2024",
      Procedure: "Demo",
      Notes: "Art",
    },
    {
      No: 2,
      DATE: "02-04-2024",
      Procedure: "Demo",
      Notes: "Art",
    },
  ];

  const ExaminationaData = [
    {
      type: "Nutritional",
      datas: [
        {
          valueOne: "Lorem Ipsum",
        },
        {
          valueOne: "Lorem Ipsum",
        },
      ],
    },
    {
      type: "Constitutional",
      datas: [
        {
          valueOne: "Lorem Ipsum",
        },
        {
          valueOne: "Lorem Ipsum",
        },
      ],
    },
    {
      type: "HEENT",
      datas: [
        {
          valueOne: "Lorem Ipsum",
        },
        {
          valueOne: "Lorem Ipsum",
        },
      ],
    },
  ];

  // HPI Data
  const Prescolumns = [
    {
      key: "RX",
      label: "RX",
    },
    {
      key: "Frequency",
      label: "Frequency",
    },
    {
      key: "Duration",
      label: "Duration",
    },
    // {
    //     key: 'M | A | E | N',
    //     label: 'M | A | E | N',
    // },
    {
      key: "Qty",
      label: "Qty / Taken",
    },
  ];

  const Presitems = [
    {
      RX: "Dolox Capsule / Tablet",
      Frequency: "1/2 | 0 | 0 | 0",
      Duration: "1 Day(s)",
      Qty: "1 Tablet",
      food: "Before food",
    },
    {
      RX: "Dolox Capsule / Tablet",
      Frequency: "1/2 | 0 | 0 | 0",
      Duration: "1 Day(s)",
      Qty: "1 Tablet",
    },
  ];

  // HPI Data
  const Documentcolumns = [
    {
      key: "No.",
      label: "No",
    },
    {
      key: "Date",
      label: "Date",
    },
    {
      key: "LabTest",
      label: "Lab Test",
    },
    // {
    //     key: 'M | A | E | N',
    //     label: 'M | A | E | N',
    // },
    {
      key: "Notes",
      label: "Notes",
    },
    {
      key: "Link",
      label: "Link",
    },
  ];

  const Documentitems = [
    {
      No: "1",
      Date: "02-04-2024",
      LabTest: "Complete blood count",
      Notes: "-",
      Link: "https://kartoffel.in/",
    },
    {
      No: "2",
      Date: "02-04-2024",
      LabTest: "Complete blood count",
      Notes: "-",
      Link: "https://kartoffel.in/",
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const locdata = location.state.PatientDetail;

  const goBack = () => {
    navigate("/patients/history", { state: { PatientDetail: locdata } });
  };
  const goTo = (
    PatientMenu,
    PatientSubMenu1,
    PatientSubMenu2,
    PatientSubMenu3,
    PatientSubMenu4,
    PatientSubMenu5
  ) => {
    // PatientMenu -> Medical Profile Tab
    // PatientSubMenu1 -> Subjective Tab
    // PatientSubMenu2 -> Chief Complaints Tab
    navigate("/patients/history", { state: { PatientDetail: locdata } });
    localStorage.removeItem("patiendDetailTab");
    localStorage.setItem("PatientConsultTab", JSON.stringify(true));
    localStorage.setItem("PatientMenu", JSON.stringify(PatientMenu));
    localStorage.setItem("PatientSubMenu-1", JSON.stringify(PatientSubMenu1));
    if (PatientSubMenu2) {
      localStorage.setItem("PatientSubMenu-2", JSON.stringify(PatientSubMenu2));
    }
    if (PatientSubMenu3) {
      localStorage.setItem("PatientSubMenu-3", JSON.stringify(PatientSubMenu3));
    }
    if (PatientSubMenu4) {
      localStorage.setItem("PatientSubMenu-4", JSON.stringify(PatientSubMenu4));
    }
    if (PatientSubMenu5) {
      localStorage.setItem("PatientSubMenu-5", JSON.stringify(PatientSubMenu5));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLinkClick = () => {
    localStorage.removeItem("patiendDetailTab");
    localStorage.removeItem("PatientConsultTab");
    localStorage.removeItem("PatientMenu");
    localStorage.removeItem("PatientSubMenu-1");
    localStorage.removeItem("PatientSubMenu-2");
    localStorage.removeItem("PatientSubMenu-3");

    // Navigate to the desired route with state
    navigate("/patients/history", { state: { PatientDetail: locdata } });
  };
  return (
    // <section className='patient-summary-sec'>
    //     <div className='detailing-card'>
    //         <PatientDetailCard />
    //     </div>
    //     <div className='tab-sec mt-4 mb-4'>
    //         <CTabs activeItemKey={"Vitals"} onChange={(k) => setActiveKey(k)}>
    //             <CTabList variant="pills">
    //                 <CTab aria-controls="home-tab-pane" itemKey={"Vitals"}>Vitals</CTab>
    //                 <CTab aria-controls="profile-tab-pane" itemKey={"Health"}>Health</CTab>
    //                 <CTab aria-controls="contact-tab-pane" itemKey={"Prescription"}>Prescription</CTab>
    //                 <CTab aria-controls="contact-tab-pane" itemKey={"Glasses"}>Glasses</CTab>
    //                 <CTab aria-controls="contact-tab-pane" itemKey={"Examination"}>Examination</CTab>
    //                 <CTab aria-controls="contact-tab-pane" itemKey={"Histories"}>Histories</CTab>
    //                 <CTab aria-controls="contact-tab-pane" itemKey={"Documents"}>Documents</CTab>
    //             </CTabList>
    //             <div className="bread-crumbs mt-4">
    //                 <p>
    //                     <Link to="/patients">Patients</Link> / <Link to="/patients/history"> Patient History </Link> / <Link to="/patients/summary" className="active"> {ActiveKey}</Link>
    //                 </p>
    //             </div>
    //             <CTabContent>
    //                 <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={"Vitals"}>
    //                     <TableColor columns={VitalsColumns} items={VitalsItems} head={"BMI"} green={"green"} />
    //                     <TableColor columns={TemColumns} items={TemItems} head={"Temperature"} green={"green"} />
    //                 </CTabPanel>
    //                 <CTabPanel className="p-3" aria-labelledby="profile-tab-pane" itemKey={"Health"}>
    //                     <SummaryTable columns={Cheifcolumns} items={Cheifitems} head={"Chief Complaints"} />
    //                     <SummaryTable columns={Medicinecolumns} items={Medicineitems} head={"Medicine"} />
    //                     <SummaryTable columns={HPIcolumns} items={HPIitems} head={"HPI"} />
    //                     <SummaryTable columns={Surgicalcolumns} items={Surgicalitems} head={"Surgical Procedures"} />
    //                 </CTabPanel>
    //                 <CTabPanel className="p-3" aria-labelledby="contact-tab-pane" itemKey={"Prescription"}>
    //                     <TableSec PrescritionData={PrescritionData} />
    //                     <Prescription columns={Prescolumns} items={Presitems} head={"Prescription"} />
    //                     <TableSec PrescritionData={PrescritionData} />
    //                     <Prescription columns={Prescolumns} items={Presitems} head={"Prescription"} />
    //                 </CTabPanel>
    //                 <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Glasses"}>
    //                     <TableRow PrescritionData={PrescritionData} />
    //                     <SummaryTable columns={GlassColumns} items={GlassItems} />
    //                     <TableRow PrescritionData={PrescritionDataTwo} />
    //                     <SummaryTable columns={GlassColumns} items={GlassItems} />
    //                 </CTabPanel>
    //                 <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Examination"}>
    //                     <ExamCard ExaminationaData={ExaminationaData} />
    //                 </CTabPanel>
    //                 <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Histories"}>
    //                     <SummaryTable columns={HistoryColumns} items={HistoryItems} head={"Medical History"} />
    //                 </CTabPanel>
    //                 <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Documents"}>
    //                     <DocumentTable columns={Documentcolumns} items={Documentitems} head={"LAB"} />
    //                     <DocumentTable columns={Documentcolumns} items={Documentitems} head={"IMAGING"} />
    //                 </CTabPanel>
    //             </CTabContent>
    //         </CTabs>
    //     </div>
    // </section>

    <section className="patient-summary-sec">
      <div className="detailing-card">
        <PatientDetailCard />
      </div>
      <div className="tab-sec mt-4 mb-4">
        <CTabs
          activeItemKey={parsedTab}
          onChange={(k) => {
            setActiveKey(k);
            localStorage.setItem("ConsultTab", JSON.stringify(k));
          }}
        >
          <CTabList variant="pills">
            <CTab aria-controls="home-tab-pane" itemKey={"Subjective"}>
              Subjective
            </CTab>
            <CTab aria-controls="profile-tab-pane" itemKey={"Objective"}>
              Objective
            </CTab>
            <CTab aria-controls="contact-tab-pane" itemKey={"Assessment"}>
              Assessment
            </CTab>
            <CTab aria-controls="contact-tab-pane" itemKey={"Plan"}>
              Plan
            </CTab>
          </CTabList>
          <div className="bread-crumbs mt-4">
            <p>
              <Link to="/patients">Patients</Link> /{" "}
              <Link
                to={"/patients/history"}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  handleLinkClick(); // Call the custom handler
                }}
              >
                {" "}
                Patient History{" "}
              </Link>{" "}
              /{" "}
              <Link to="/patients/summary" className="active">
                {" "}
                {ActiveKey}
              </Link>
            </p>
          </div>
          <CTabContent>
            <CTabPanel
              className="p-2"
              aria-labelledby="home-tab-pane"
              itemKey={"Subjective"}
            >
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 1);
                  }}
                >
                  <h4>Chief Complaints</h4>
                </div>
                <ChiefComplaints from={"Consult"} OnClose={handleGoBack} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 2, 1);
                  }}
                >
                  <h4>History of Present Illness (HPI) - SYMPTOMS</h4>
                </div>

                <SignsSymptoms from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 2, 2);
                  }}
                >
                  <h4>History of Present Illness (HPI) - Medication</h4>
                </div>

                <Medication from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 3, 1);
                  }}
                >
                  <h4>History - Medical History</h4>
                </div>
                <MedicalHistory from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 3, 3);
                  }}
                >
                  <h4>History - Surgical History</h4>
                </div>

                <SurgicalHistory from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 3, 4);
                  }}
                >
                  <h4>History - Family History</h4>
                </div>

                <FamilyHistory from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 3, 5);
                  }}
                >
                  <h4>History - Social History</h4>
                </div>

                <SocialHistory from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 3, 2, 1);
                  }}
                >
                  <h4>History - OG History - Obstetric History</h4>
                </div>

                <OGHistory from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 3, 2, 2, 1);
                  }}
                >
                  <h4>History - OG History - Gynaec History</h4>
                </div>

                <OGHistory from={"Consult-Gynaec"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 3, 2, 2, 2);
                  }}
                >
                  <h4>
                    History - OG History - Gynaec History- Screening and
                    Diagnostic History
                  </h4>
                </div>

                <OGHistory from={"Consult-Screen"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 4, 1);
                  }}
                >
                  <h4>Wellness - Exercise Habit</h4>
                </div>

                <ExerciseHabit from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 4, 3);
                  }}
                >
                  <h4>Wellness - Sleep</h4>
                </div>

                <Sleep from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 4, 4);
                  }}
                >
                  <h4>Wellness - Mood</h4>
                </div>

                <Mood from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 1, 4, 5);
                  }}
                >
                  <h4>Wellness - Sexual Status</h4>
                </div>

                <SexualStatus from={"Consult"} />
              </div>
            </CTabPanel>
            <CTabPanel
              className="p-2"
              aria-labelledby="home-tab-pane"
              itemKey={"Assessment"}
            >
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 3, 1);
                  }}
                >
                  <h4>Diagnosis (Including ICD)</h4>
                </div>
                <Diagnosis from={"Consult"} OnClose={handleGoBack} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 3, 2);
                  }}
                >
                  <h4>Immunization Status</h4>
                </div>
                <Immunization from={"Consult"} OnClose={handleGoBack} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 3, 3, 1);
                  }}
                >
                  <h4>Assessment Tools - Psychiatric</h4>
                </div>
                <Psychiatric from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 3, 3, 2);
                  }}
                >
                  <h4>Assessment Tools - Neurological</h4>
                </div>
                <Neurological from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 3, 3, 3);
                  }}
                >
                  <h4>Assessment Tools - Peadiatric</h4>
                </div>
                <Peadiatric from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 3, 3, 4);
                  }}
                >
                  <h4>Assessment Tools - Ophthalmic</h4>
                </div>
                <Ophthalmic from={"Consult"} />
              </div>
            </CTabPanel>
            <CTabPanel
              className="p-2"
              aria-labelledby="home-tab-pane"
              itemKey={"Plan"}
            >
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 4, 1, 1);
                  }}
                >
                  <h4>Orders - Medication Order </h4>
                </div>
                <MedicationOrder from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 4, 1, 2);
                  }}
                >
                  <h4>Orders - Lab Order </h4>
                </div>
                <LabOrder from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 4, 1, 3);
                  }}
                >
                  <h4>Orders - Imaging Order </h4>
                </div>
                <ImagingOrder from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 4, 2);
                  }}
                >
                  <h4>Therapies</h4>
                </div>
                <Therapies from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 4, 3);
                  }}
                >
                  <h4>Procedure (CPT Code)</h4>
                </div>
                <Cpt from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 4, 4);
                  }}
                >
                  <h4>Patient Education</h4>
                </div>
                <PatientEducation from={"Consult"} />
              </div>
              <div className="mb-2">
                <div
                  className="mb-3 cursor"
                  onClick={() => {
                    goTo(2, 4, 5);
                  }}
                >
                  <h4>Next Appointment</h4>
                </div>
                <NextAppointment from={"Consult"} />
              </div>
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </div>
    </section>
  );
}

export default PatientSummaryView;
