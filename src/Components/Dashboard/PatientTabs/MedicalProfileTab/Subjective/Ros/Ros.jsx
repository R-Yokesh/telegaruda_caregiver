import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import DateSelector from "../../../../../DateRangePicker/DateSelector";
import DateCards from "../../../../../DateCards/DateCards";
import Pagination from "../../../../../Pagination/Pagination";
import ActiveButton from "../../../../../Buttons/ActiveButton/ActiveButton";
import SingleDatePicker from "../../../../../DateRangePicker/SingleDatePicker";
import OptionItem from "../../../../../OptionItems/OptionItem";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import BlurBackground from "../../../../../BlurBackground/BlurBackground";

const Ros = ({ onClose }) => {
  const dateCards = [
    {
      id: 1,
      date: "06/07/2024",
      ga: {
        status: "Yes",
        notes: "Lorem ipsum",
        select: ["Fever", "Sweating"],
      },
      skin: {
        status: "No",
        notes: "Lorem ipsum",
        select: ["Hay fever"],
      },
    },
    {
      id: 2,
      date: "06/07/2024",
      ga: {
        status: "Yes",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "No",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 3,
      date: "06/07/2024",
      ga: {
        status: "Yes",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "No",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 4,
      date: "06/07/2024",
      ga: {
        status: "Yes",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "No",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 5,
      date: "06/07/2024",
      ga: {
        status: "Yes",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "No",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 6,
      date: "06/07/2024",
      ga: {
        status: "Yes",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "No",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 7,
      date: "06/07/2024",
      ga: {
        status: "Yes",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "No",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 8,
      date: "06/07/2024",
      ga: {
        status: "Yes",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "No",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    { id: 9, date: "06/07/2024" },
    { id: 10, date: "06/07/2024" },
    { id: 11, date: "06/07/2024" },
    { id: 12, date: "06/07/2024" },
    { id: 13, date: "06/07/2024" },
    { id: 14, date: "06/07/2024" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [addFormView, setAddFormView] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [skinselectedOptions, setSkinSelectedOptions] = useState([]);
  const [skinselectedOptions1, setSkinSelectedOptions1] = useState([]);
  const [headselectedOptions, setHeadSelectedOptions] = useState([]);

  const [labelName1, setLabelname1] = useState("");
  const [deleteView, setDeleteView] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [labelName, setLabelname] = useState(selectedData?.ga?.status || "");
  const [labelNameSkin, setLabelNameSkin] = useState(
    selectedData?.ga?.status || ""
  );
  const [labelNameHead, setLabelNameHead] = useState(
    selectedData?.ga?.status || ""
  );
  const [generalOpen, setGeneralOpen] = useState(false);
  const [heentOpen, setHeentOpen] = useState(false);
  const [skinOpen, setSkinOpen] = useState(false);
  const [headOpen, setHeadOpen] = useState(false);

  const [editView, setEditView] = useState(false);

  const options = [
    "Weight Loss",
    "Fever",
    "Fatigue",
    "Sweating",
    "Appetite Changes",
    "Night Sweats",
    "Weakness",
    "Chills",
  ];

  const allergyoptions = [
    "Hives",
    "Swelling of lips or tongue",
    "Hay fever",
    "Asthma",
    "Eczema/Sensitive",
    "AutoImmune Disorder",
    "Sensitivity to drugs,food,pollens,or dander",
  ];

  const skinyoptions = [
    "Rashes",
    "Itching",
    "Change in hair or nails",
    "Skin Lesions",
  ];

  const headoptions = ["Headaches", "Head injury"];

  const itemsPerPage = 9; // Number of items to display per page

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to get items for the current page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dateCards?.slice(startIndex, endIndex);
  };

  const addFormPage = () => {
    setAddFormView(true);
  };

  const handleSelect = (option, isSelected) => {
    if (isSelected) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    }
  };

  const handleSelectSkin = (option, isSelected) => {
    if (isSelected) {
      setSkinSelectedOptions([...skinselectedOptions, option]);
    } else {
      setSkinSelectedOptions(
        skinselectedOptions.filter((item) => item !== option)
      );
    }
  };

  const handleSelectSkin1 = (option, isSelected) => {
    if (isSelected) {
      setSkinSelectedOptions1([...skinselectedOptions1, option]);
    } else {
      setSkinSelectedOptions1(
        skinselectedOptions1.filter((item) => item !== option)
      );
    }
  };

  const handleSelectHead = (option, isSelected) => {
    if (isSelected) {
      setHeadSelectedOptions([...headselectedOptions, option]);
    } else {
      setHeadSelectedOptions(
        headselectedOptions.filter((item) => item !== option)
      );
    }
  };

  const getselected = (data, method) => {
    setSelectedData(data);
    if (method === "delete") {
      setDeleteView(true);
    }
    if (method === "edit") {
      addFormPage();
      setEditView(true);
    }
  };

  const toggleSelected1 = (label) => {
    setLabelname1(label);
  };

  const toggleSelectedSkin = (label) => {
    setLabelNameSkin(label);
  };

  const HeadtoggleSelectedSkin = (label) => {
    setLabelNameHead(label);
  };

  const toggleSelected = (label) => {
    setIsSelected(!isSelected);
    setLabelname(label);
  };

  useEffect(() => {
    if (editView) {
      setLabelname(selectedData?.ga?.status);
      setLabelname1(selectedData?.skin?.status);
      setSelectedOptions(selectedData?.ga?.select);
      setSkinSelectedOptions(selectedData?.skin?.select);
      if (selectedData?.ga?.status === "Yes") {
        setGeneralOpen(true);
      }
      if (selectedData?.skin?.status === "Yes") {
        setHeentOpen(true);
      }
    } else {
      setLabelname("");
      setLabelname1("");
      setGeneralOpen(false);
      setHeentOpen(false);
      setSelectedOptions([]);
    }
  }, [editView]);

  const [eyesOpen, setEyesOpen] = useState(false);
  const [eyesLabel, setEyesLabel] = useState(selectedData?.ga?.status || "");
  const [eyeselection, setEyeselection] = useState([]);
  const eyeOptions = [
    "Glasses or contacts",
    "Change in vision",
    "Eye pain",
    "Double vision",
    "Flashing lights",
    "Glaucoma/Cataracts",
  ];
  const toggleEyes = (label) => {
    setEyesLabel(label);
  };
  const handleSelectEyes = (option, isSelected) => {
    if (isSelected) {
      setEyeselection([...eyeselection, option]);
    } else {
      setEyeselection(eyeselection.filter((item) => item !== option));
    }
  };

  const Ears = [
    "Change in hearing",
    "Ear pain",
    "Ear discharge",
    "Ringing",
    "Dizziness",
  ];
  const [earsOpen, setEarsOpen] = useState(false);
  const [earsLabel, setEarsLabel] = useState(selectedData?.ga?.status || "");
  const [earSelection, setEarSelection] = useState([]);
  const toggleEars = (label) => {
    setEarsLabel(label);
  };
  const handleSelectEars = (option, isSelected) => {
    if (isSelected) {
      setEarSelection([...earSelection, option]);
    } else {
      setEarSelection(earSelection.filter((item) => item !== option));
    }
  };

  const Nose = ["Nose bleeds", "Nasal stuffiness", "Frequent colds"];
  const [noseOpen, setNoseOpen] = useState(false);
  const [noseLabel, setNoseLabel] = useState("");
  const [noseSelection, setNoseSelection] = useState([]);
  const toggleNose = (label) => {
    setNoseLabel(label);
  };
  const handleSelectNose = (option, isSelected) => {
    if (isSelected) {
      setNoseSelection([...noseSelection, option]);
    } else {
      setNoseSelection(noseSelection.filter((item) => item !== option));
    }
  };

  const MouthThroat = [
    "Bleeding gums",
    "Sore tongue",
    "Sore throat",
    "Hoarseness",
  ];

  const [mouthThroatOpen, setMouthThroatOpen] = useState(false);
  const [mouthThroatLabel, setMouthThroatLabel] = useState("");
  const [mouthThroatSelection, setMouthThroatSelection] = useState([]);
  const toggleMouth = (label) => {
    setMouthThroatLabel(label);
  };
  const handleSelectMouth = (option, isSelected) => {
    if (isSelected) {
      setMouthThroatSelection([...mouthThroatSelection, option]);
    } else {
      setMouthThroatSelection(
        mouthThroatSelection.filter((item) => item !== option)
      );
    }
  };
  const Neck = ["Lumps", "Goiter", "Swollen glands", "Stiffness"];
  const [neckOpen, setNeckOpen] = useState(false);
  const [neckLabel, setNeckLabel] = useState("");
  const [neckSelection, setNeckSelection] = useState([]);
  const toggleNeck = (label) => {
    setNeckLabel(label);
  };
  const handleSelectNeck = (option, isSelected) => {
    if (isSelected) {
      setNeckSelection([...neckSelection, option]);
    } else {
      setNeckSelection(neckSelection.filter((item) => item !== option));
    }
  };

  const Breast = [
    "Lumps",
    "Nipple discharge",
    "Pain",
    "BSE (Breast Self-Examination)",
  ];
  const [breastOpen, setBreastOpen] = useState(false);
  const [breastLabel, setBreastLabel] = useState("");
  const [breastSelection, setBreastSelection] = useState([]);
  const toggleBreast = (label) => {
    setBreastLabel(label);
  };
  const handleSelectBreast = (option, isSelected) => {
    if (isSelected) {
      setBreastSelection([...breastSelection, option]);
    } else {
      setBreastSelection(breastSelection.filter((item) => item !== option));
    }
  };

  const Respiratory = [
    "Shortness of breath",
    "Cough",
    "Production of phlegm, color",
    "Wheezing",
    "Dyspnea (Difficulty Breathing)",
    "Coughing up blood",
    "Chest pain",
  ];
  const [respiratoryOpen, setRespiratoryOpen] = useState(false);
  const [respiratoryLabel, setRespiratoryLabel] = useState("");
  const [respiratorySelection, setRespiratorySelection] = useState([]);
  const toggleRespi = (label) => {
    setRespiratoryLabel(label);
  };
  const handleSelectRespi = (option, isSelected) => {
    if (isSelected) {
      setRespiratorySelection([...respiratorySelection, option]);
    } else {
      setRespiratorySelection(
        respiratorySelection.filter((item) => item !== option)
      );
    }
  };

  const Cardiovascular = [
    "Chest Pain",
    "Palpitations",
    "Heart murmur",
    "Blue fingers/toes",
    "Swelling in hands/feet",
    "HX of heart medication",
    "High blood pressure",
    "Skipping heart beats",
  ];
  const [cardiovascularOpen, setCardiovascularOpen] = useState(false);
  const [cardiovascularLabel, setCardiovascularLabel] = useState("");
  const [cardiovascularSelection, setCardiovascularSelection] = useState([]);
  const toggleCardio = (label) => {
    setCardiovascularLabel(label);
  };
  const handleSelectCardio = (option, isSelected) => {
    if (isSelected) {
      setCardiovascularSelection([...cardiovascularSelection, option]);
    } else {
      setCardiovascularSelection(
        cardiovascularSelection.filter((item) => item !== option)
      );
    }
  };

  const Gastrointestinal = [
    "Difficulty in urination",
    "Frequent urination at night",
    "Pain or burning on urination",
    "Urgent need to urinate",
    "Dribbling",
    "Incontinence of urine",
    "Decreased urine stream",
    "Blood in urine",
    "UTI/stones/prostate",
    "Infection",
  ];
  const [gastrointestinalOpen, setGastrointestinalOpen] = useState(false);
  const [gastrointestinalLabel, setGastrointestinalLabel] = useState("");
  const [gastrointestinalSelection, setGastrointestinalSelection] = useState(
    []
  );
  const toggleGastro = (label) => {
    setGastrointestinalLabel(label);
  };
  const handleSelectGastro = (option, isSelected) => {
    if (isSelected) {
      setGastrointestinalSelection([...gastrointestinalSelection, option]);
    } else {
      setGastrointestinalSelection(
        gastrointestinalSelection.filter((item) => item !== option)
      );
    }
  };

  const PeripheralVascularDisease = [
    "Leg cramps",
    "Varicose veins",
    "Clots in veins",
  ];
  const [peripheralVascularDiseaseOpen, setPeripheralVascularDiseaseOpen] =
    useState(false);
  const [peripheralVascularDiseaseLabel, setPeripheralVascularDiseaseLabel] =
    useState("");
  const [
    peripheralVascularDiseaseSelection,
    setPeripheralVascularDiseaseSelection,
  ] = useState([]);
  const togglePeripheral = (label) => {
    setPeripheralVascularDiseaseLabel(label);
  };
  const handleSelectPeripheral = (option, isSelected) => {
    if (isSelected) {
      setPeripheralVascularDiseaseSelection([
        ...peripheralVascularDiseaseSelection,
        option,
      ]);
    } else {
      setPeripheralVascularDiseaseSelection(
        peripheralVascularDiseaseSelection.filter((item) => item !== option)
      );
    }
  };
  const Musculoskeletal = [
    "Pain",
    "Swelling",
    "Stiffness",
    "Decreased joint motion",
    "Broken bone",
    "Serious sprains",
    "Arthritis",
    "Gout",
  ];
  const [musculoskeletalOpen, setMusculoskeletalOpen] = useState(false);
  const [musculoskeletalLabel, setMusculoskeletalLabel] = useState("");
  const [musculoskeletalSelection, setMusculoskeletalSelection] = useState([]);
  const toggleMusculo = (label) => {
    setMusculoskeletalLabel(label);
  };
  const handleSelectMusculo = (option, isSelected) => {
    if (isSelected) {
      setMusculoskeletalSelection([...musculoskeletalSelection, option]);
    } else {
      setMusculoskeletalSelection(
        musculoskeletalSelection.filter((item) => item !== option)
      );
    }
  };

  const Neurological = [
    "Headaches",
    "Seizures",
    "Syncope (Fainting)",
    "Paralysis",
    "Loss of muscle size",
    "Muscle spasm",
    "Weakness",
    "Tremor",
    "Incoordination",
    "Numbness",
    "Feeling of “pins and needles/tingles”",
    "Involuntary movement",
  ];
  const [neurologicalOpen, setNeurologicalOpen] = useState(false);
  const [neurologicalLabel, setNeurologicalLabel] = useState("");
  const [neurologicalSelection, setNeurologicalSelection] = useState([]);
  const toggleNeuro = (label) => {
    setNeurologicalLabel(label);
  };
  const handleSelectNeuro = (option, isSelected) => {
    if (isSelected) {
      setNeurologicalSelection([...neurologicalSelection, option]);
    } else {
      setNeurologicalSelection(
        neurologicalSelection.filter((item) => item !== option)
      );
    }
  };

  const Hematology = ["Anemia", "Easy bruising/bleeding", "Past Transfusions"];
  const [hematologyOpen, setHematologyOpen] = useState(false);
  const [hematologyLabel, setHematologyLabel] = useState("");
  const [hematologySelection, setHematologySelection] = useState([]);
  const toggleHemato = (label) => {
    setHematologyLabel(label);
  };
  const handleSelectHemato = (option, isSelected) => {
    if (isSelected) {
      setHematologySelection([...hematologySelection, option]);
    } else {
      setHematologySelection(
        hematologySelection.filter((item) => item !== option)
      );
    }
  };

  const Endocrine = [
    "Abnormal growth",
    "Increased appetite",
    "Increased thirst",
    "Thyroid trouble",
    "Diabetes",
    "Heat/cold intolerance",
  ];
  const [endocrineOpen, setEndocrineOpen] = useState(false);
  const [endocrineLabel, setEndocrineLabel] = useState("");
  const [endocrineSelection, setEndocrineSelection] = useState([]);
  const toggleEndo = (label) => {
    setEndocrineLabel(label);
  };
  const handleSelectEndo = (option, isSelected) => {
    if (isSelected) {
      setEndocrineSelection([...endocrineSelection, option]);
    } else {
      setEndocrineSelection(
        endocrineSelection.filter((item) => item !== option)
      );
    }
  };
  const Psychiatric = [
    "Tension/Anxiety",
    "Depression/suicide ideation",
    "Memory problems",
    "Unusual problems",
    "Excessive sweating",
  ];
  const [psychiatricOpen, setPsychiatricOpen] = useState(false);
  const [psychiatricLabel, setPsychiatricLabel] = useState("");
  const [psychiatricSelection, setPsychiatricSelection] = useState([]);
  const togglePsych = (label) => {
    setPsychiatricLabel(label);
  };
  const handleSelectPsych = (option, isSelected) => {
    if (isSelected) {
      setPsychiatricSelection([...psychiatricSelection, option]);
    } else {
      setPsychiatricSelection(
        psychiatricSelection.filter((item) => item !== option)
      );
    }
  };
  return (
    <>
      <CRow className="mb-0">
        <CCol md={5} className="mb-2">
          <div className="d-flex gap-2">
            <img
              alt="BackBtn"
              src={Assets.BackBtn}
              style={{ width: "35px" }}
              onClick={onClose}
              className="cursor"
            />
            <span className="Obj-name d-flex align-items-center">
              Review of Systems (ROS)
            </span>
          </div>
        </CCol>
        <CCol md={7} className="mb-2 d-flex justify-content-end">
          <div className="d-flex mt-2">
            <Breadcrumb
              paths={[
                { label: "Home", to: "/patients" },
                { label: "Patient List", to: "/patients" },
                { label: "Medical Profile", to: "/patients/history" },
                { label: "Review of Systems (ROS)", to: "/patients/history" },
              ]}
            />
          </div>
        </CCol>
      </CRow>
      {!addFormView && (
        <>
          <CRow className="mb-2">
            <CCol lg={8} className="">
              <DateSelector />
            </CCol>
            <CCol
              lg={4}
              className="d-flex justify-content-end align-items-center"
            >
              <div>
                <PrimaryButton
                  onClick={() => {
                    addFormPage();
                    setSelectedData({});
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <img src={Assets.Add} alt="add" />
                    <span className="fs-16 fw-600">Add</span>
                  </div>
                </PrimaryButton>
              </div>
            </CCol>
          </CRow>
          <div className="mb-2">
            <CRow>
              {getCurrentPageItems()?.map((item, i) => (
                <CCol lg={4} className="mb-3" key={i}>
                  <DateCards data={item} onClick={getselected} />
                </CCol>
              ))}
            </CRow>
            <CRow className="mb-3">
              <CCol lg={12} className="d-flex justify-content-center">
                <Pagination
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                  totalItems={dateCards?.length}
                  itemsPerPage={itemsPerPage}
                />
              </CCol>
            </CRow>
          </div>
        </>
      )}
      {deleteView && (
        <BlurBackground>
          <CModal
            alignment="center"
            visible={deleteView}
            onClose={() => setDeleteView(false)}
            aria-labelledby="VerticallyCenteredExample"
          >
            <CModalBody className="p-3">
              <div className="w-100 mt-2 d-flex justify-content-center flex-column align-items-center">
                <h5>Are you sure want to delete ?</h5>
                <div className="d-flex gap-2 mt-2">
                  <div style={{ width: "80px" }}>
                    <PrimaryButton onClick={() => setDeleteView(false)}>
                      Yes
                    </PrimaryButton>
                  </div>
                  <div style={{ width: "80px" }}>
                    <SecondaryButton onClick={() => setDeleteView(false)}>
                      No
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </CModalBody>
          </CModal>
        </BlurBackground>
      )}
      {addFormView && (
        <CCard className="p-2 cursor-default mb-5">
          <CCardBody className="mb-3">
            <CRow className="mb-2">
              <CCol className="d-flex align-items-center gap-2">
                <span>Date</span>
                <SingleDatePicker defaultDate={selectedData?.date} />
              </CCol>
              <CCol className="d-flex justify-content-end">
                <div style={{ width: "120px" }}>
                  <ActiveButton
                    onClick={() => {
                      setAddFormView(false);
                      setEditView(false);
                      setSelectedData({});
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <img src={Assets?.listview} alt="close" />
                      <span>List View</span>
                    </div>
                  </ActiveButton>
                </div>
              </CCol>
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!generalOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {generalOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">General</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      labelName === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleSelected("Yes");
                      setGeneralOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      labelName === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleSelected("No");
                      setGeneralOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {generalOpen && (
                <>
                  {labelName === "Yes" && (
                    <CRow className="mt-2">
                      {options?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelect}
                            selected={selectedOptions.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mt-2 mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!heentOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={heentTabOpen}
                    className="cursor"
                  />
                )}
                {heentOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={heentTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Allergy</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      labelName1 === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleSelected1("Yes");
                      setHeentOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      labelName1 === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleSelected1("No");
                      setHeentOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {heentOpen && (
                <>
                  {labelName1 === "Yes" && (
                    <>
                      <CRow>
                        {allergyoptions?.map((option, index) => (
                          <CCol lg={"auto"}>
                            <OptionItem
                              key={index}
                              label={option}
                              onSelect={handleSelectSkin}
                              selected={skinselectedOptions?.includes(option)}
                              disabled={editView}
                            />
                          </CCol>
                        ))}
                      </CRow>
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            disabled={editView}
                            defaultValue={selectedData?.skin?.notes}
                          />
                        </div>
                      </CCol>
                    </>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!skinOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {skinOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Skin</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      labelNameSkin === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleSelectedSkin("Yes");
                      setSkinOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      labelNameSkin === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleSelectedSkin("No");
                      setSkinOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {skinOpen && (
                <>
                  {labelNameSkin === "Yes" && (
                    <CRow className="mt-2">
                      {skinyoptions?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectSkin1}
                            selected={skinselectedOptions1.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!headOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {headOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Head</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      labelNameHead === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      HeadtoggleSelectedSkin("Yes");
                      setHeadOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      labelNameHead === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      HeadtoggleSelectedSkin("No");
                      setHeadOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {headOpen && (
                <>
                  {labelNameHead === "Yes" && (
                    <CRow className="mt-2">
                      {headoptions?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectHead}
                            selected={headselectedOptions.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!eyesOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {eyesOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Eyes</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      eyesLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleEyes("Yes");
                      setEyesOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      eyesLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleEyes("No");
                      setEyesOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {eyesOpen && (
                <>
                  {eyesLabel === "Yes" && (
                    <CRow className="mt-2">
                      {eyeOptions?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectEyes}
                            selected={eyeselection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!earsOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {earsOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Ears</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      earsLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleEars("Yes");
                      setEarsOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      earsLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleEars("No");
                      setEarsOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {earsOpen && (
                <>
                  {earsLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Ears?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectEars}
                            selected={earSelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!noseOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {noseOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Nose</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      noseLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleNose("Yes");
                      setNoseOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      noseLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleNose("No");
                      setNoseOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {noseOpen && (
                <>
                  {noseLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Nose?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectNose}
                            selected={noseSelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!mouthThroatOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {mouthThroatOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Mouth/Throat</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      mouthThroatLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleMouth("Yes");
                      setMouthThroatOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      mouthThroatLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleMouth("No");
                      setMouthThroatOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {mouthThroatOpen && (
                <>
                  {mouthThroatLabel === "Yes" && (
                    <CRow className="mt-2">
                      {MouthThroat?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectMouth}
                            selected={mouthThroatSelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!neckOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {neckOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Neck</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      neckLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleNeck("Yes");
                      setNeckOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      neckLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleNeck("No");
                      setNeckOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {neckOpen && (
                <>
                  {neckLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Neck?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectNeck}
                            selected={neckSelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!breastOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {breastOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Breast</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      breastLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleBreast("Yes");
                      setBreastOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      breastLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleBreast("No");
                      setBreastOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {breastOpen && (
                <>
                  {breastLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Breast?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectBreast}
                            selected={breastSelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!respiratoryOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {respiratoryOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Respiratory</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      respiratoryLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleRespi("Yes");
                      setRespiratoryOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      respiratoryLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleRespi("No");
                      setRespiratoryOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {respiratoryOpen && (
                <>
                  {respiratoryLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Respiratory?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectRespi}
                            selected={respiratorySelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!cardiovascularOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {cardiovascularOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Cardiovascular</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      cardiovascularLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleCardio("Yes");
                      setCardiovascularOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      cardiovascularLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleCardio("No");
                      setCardiovascularOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {cardiovascularOpen && (
                <>
                  {cardiovascularLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Cardiovascular?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectCardio}
                            selected={cardiovascularSelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!gastrointestinalOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {gastrointestinalOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Gastrointestinal</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      gastrointestinalLabel === "Yes"
                        ? "selected primary-bg"
                        : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleGastro("Yes");
                      setGastrointestinalOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      gastrointestinalLabel === "No"
                        ? "selected primary-bg"
                        : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleGastro("No");
                      setGastrointestinalOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {gastrointestinalOpen && (
                <>
                  {gastrointestinalLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Gastrointestinal?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectGastro}
                            selected={gastrointestinalSelection.includes(
                              option
                            )}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!peripheralVascularDiseaseOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {peripheralVascularDiseaseOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">
                  Peripheral Vascular Disease
                </span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      peripheralVascularDiseaseLabel === "Yes"
                        ? "selected primary-bg"
                        : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      togglePeripheral("Yes");
                      setPeripheralVascularDiseaseOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      peripheralVascularDiseaseLabel === "No"
                        ? "selected primary-bg"
                        : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      togglePeripheral("No");
                      setPeripheralVascularDiseaseOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {peripheralVascularDiseaseOpen && (
                <>
                  {peripheralVascularDiseaseLabel === "Yes" && (
                    <CRow className="mt-2">
                      {PeripheralVascularDisease?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectPeripheral}
                            selected={peripheralVascularDiseaseSelection.includes(
                              option
                            )}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!musculoskeletalOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {musculoskeletalOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Musculoskeletal</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      musculoskeletalLabel === "Yes"
                        ? "selected primary-bg"
                        : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleMusculo("Yes");
                      setMusculoskeletalOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      musculoskeletalLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleMusculo("No");
                      setMusculoskeletalOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {musculoskeletalOpen && (
                <>
                  {musculoskeletalLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Musculoskeletal?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectMusculo}
                            selected={musculoskeletalSelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!neurologicalOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {neurologicalOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Neurological</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      neurologicalLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleNeuro("Yes");
                      setNeurologicalOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      neurologicalLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleNeuro("No");
                      setNeurologicalOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {neurologicalOpen && (
                <>
                  {neurologicalLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Neurological?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectNeuro}
                            selected={neurologicalSelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!hematologyOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {hematologyOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Hematology</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      hematologyLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleHemato("Yes");
                      setHematologyOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      hematologyLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleHemato("No");
                      setHematologyOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {hematologyOpen && (
                <>
                  {hematologyLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Hematology?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectHemato}
                            selected={hematologySelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!endocrineOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {endocrineOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Endocrine</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      endocrineLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleEndo("Yes");
                      setEndocrineOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      endocrineLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      toggleEndo("No");
                      setEndocrineOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {endocrineOpen && (
                <>
                  {endocrineLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Endocrine?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectEndo}
                            selected={endocrineSelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            <div className="vertical-line mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={4} className="d-flex align-items-center gap-2 mb-1">
                {!psychiatricOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    // onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {psychiatricOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    // onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Psychiatric</span>
              </CCol>
              <CCol lg={8}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <label class="form-label" style={{ marginBottom: 0 }}>
                    Status
                  </label>
                  <div
                    className={`option-item ${
                      psychiatricLabel === "Yes" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      togglePsych("Yes");
                      setPsychiatricOpen(true);
                    }}
                  >
                    {"Yes"}
                  </div>
                  <div
                    className={`option-item ${
                      psychiatricLabel === "No" ? "selected primary-bg" : ""
                    } ${editView ? "disabled" : ""}`}
                    onClick={() => {
                      togglePsych("No");
                      setPsychiatricOpen(false);
                    }}
                  >
                    {"No"}
                  </div>
                </div>
              </CCol>
              {psychiatricOpen && (
                <>
                  {psychiatricLabel === "Yes" && (
                    <CRow className="mt-2">
                      {Psychiatric?.map((option, index) => (
                        <CCol lg={"auto"}>
                          <OptionItem
                            key={index}
                            label={option}
                            onSelect={handleSelectPsych}
                            selected={psychiatricSelection.includes(option)}
                            disabled={editView}
                          />
                        </CCol>
                      ))}
                      <CCol lg={12} className="mb-2">
                        <div class="position-relative">
                          <label for="validationTooltip01" class="form-label">
                            Notes
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="validationTooltip01"
                            placeholder="Enter"
                            defaultValue={selectedData?.ga?.notes}
                            disabled={editView}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  )}
                </>
              )}
            </CRow>
            {!editView && (
              <>
                <div className="vertical-line mt-2 mb-3"></div>
                <CRow className="mb-1">
                  <div style={{ width: "128px" }}>
                    <PrimaryButton>SAVE</PrimaryButton>
                  </div>
                  <div style={{ width: "128px" }}>
                    <SecondaryButton
                      onClick={() => {
                        setAddFormView(false);
                        setEditView(false);
                      }}
                    >
                      CANCEL
                    </SecondaryButton>
                  </div>
                </CRow>
              </>
            )}
          </CCardBody>
        </CCard>
      )}
    </>
  );
};

export default Ros;
