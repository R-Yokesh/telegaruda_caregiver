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

const PhysicalExam = ({ onClose, from }) => {
  const dateCards = [
    {
      id: 1,
      date: "06-07-2024",
      ga: {
        status: "Abnormal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "Normal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 2,
      date: "06-07-2024",
      ga: {
        status: "Normal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "Abnormal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 3,
      date: "06-07-2024",
      ga: {
        status: "Normal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "Abnormal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 4,
      date: "06-07-2024",
      ga: {
        status: "Normal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "Abnormal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 5,
      date: "06-07-2024",
      ga: {
        status: "Normal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "Abnormal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 6,
      date: "06-07-2024",
      ga: {
        status: "Normal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "Abnormal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 7,
      date: "06-07-2024",
      ga: {
        status: "Normal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "Abnormal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    {
      id: 8,
      date: "06-07-2024",
      ga: {
        status: "Normal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
      skin: {
        status: "Abnormal",
        notes: "Lorem ipsum",
        select: ["Posture and Gait"],
      },
    },
    { id: 9, date: "06-07-2024" },
    { id: 10, date: "06-07-2024" },
    { id: 11, date: "06-07-2024" },
    { id: 12, date: "06-07-2024" },
    { id: 13, date: "06-07-2024" },
    { id: 14, date: "06-07-2024" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [addFormView, setAddFormView] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [skinselectedOptions, setSkinSelectedOptions] = useState([]);

  const [labelName1, setLabelname1] = useState("");
  const [deleteView, setDeleteView] = useState(false);
  const [selectedData, setSelectedData] = useState(
    from === "Consult" ? dateCards[1] : {}
  );
  const [isSelected, setIsSelected] = useState(false);
  const [labelName, setLabelname] = useState(selectedData?.ga?.status || "");
  const [editView, setEditView] = useState(false);

  useEffect(() => {
    setEditView(true);
  }, [from]);

  const options = [
    "Appearance (well, ill, distressed, etc.)",
    "Level of Consciousness (alert, drowsy, unresponsive, etc.)",
    "Posture and Gait",
  ];

  const skinoptions = [
    "Appearance (well, ill, distressed, etc.)",
    "Level of Consciousness (alert, drowsy, unresponsive, etc.)",
    "Posture and Gait",
  ];

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

  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [constiOpen, setConstiOpen] = useState(false);
  const [generalOpen, setGeneralOpen] = useState(false);
  const [heentOpen, setHeentOpen] = useState(false);

  const nutritionTabOpen = () => {
    setNutritionOpen(true);
  };

  const nutritionTabClose = () => {
    setNutritionOpen(false);
  };

  const constiTabOpen = () => {
    setConstiOpen(true);
  };

  const constiTabClose = () => {
    setConstiOpen(false);
  };

  const generalTabOpen = () => {
    setGeneralOpen(true);
  };

  const generalTabClose = () => {
    setGeneralOpen(false);
  };

  const heentTabOpen = () => {
    setHeentOpen(true);
  };

  const heentTabClose = () => {
    setHeentOpen(false);
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
      if (selectedData?.ga?.status === "Abnormal") {
        setGeneralOpen(true);
      }
      if (selectedData?.skin?.status === "Abnormal") {
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

  return (
    <>
      {from === "Consult" && (
        <CCard className="p-2 cursor-default mb-5">
          <CCardBody className="mb-3">
            <CRow className="mb-2">
              <CCol className="d-flex align-items-center gap-2">
                <span>Date</span>
                <SingleDatePicker defaultDate={selectedData?.date} />
              </CCol>
            </CRow>
            <div className="vertical-line mb-3"></div>

            <CRow className="mb-2">
              <CCol lg={12} className="d-flex align-items-center gap-2 mb-1">
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
                <span className="fs-16 fw-600">General Appearance</span>
              </CCol>
              <CRow>
                <CCol>
                  <div className="d-flex justify-content-center align-items-center">
                    <label class="form-label">Status:</label>
                    <div
                      className={`option-item ${
                        labelName === "Normal" ? "selected primary-bg" : ""
                      } ${editView ? "disabled" : ""}`}
                      onClick={() => {
                        toggleSelected("Normal");
                        setGeneralOpen(false);
                      }}
                    >
                      {"Normal"}
                    </div>
                    <div
                      className={`option-item ${
                        labelName === "Abnormal" ? "selected primary-bg" : ""
                      } ${editView ? "disabled" : ""}`}
                      onClick={() => {
                        toggleSelected("Abnormal");
                        setGeneralOpen(true);
                      }}
                    >
                      {"Abnormal"}
                    </div>
                  </div>
                </CCol>
              </CRow>
              {generalOpen && (
                <>
                  {labelName === "Abnormal" && (
                    <CRow>
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
              <CCol lg={12} className="d-flex align-items-center gap-2 mb-1">
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
                <span className="fs-16 fw-600">Skin</span>
              </CCol>
              <CRow>
                <CCol>
                  <div className="d-flex justify-content-center align-items-center">
                    <label class="form-label">Status:</label>
                    <div
                      className={`option-item ${
                        labelName1 === "Normal" ? "selected primary-bg" : ""
                      } ${editView ? "disabled" : ""}`}
                      onClick={() => {
                        toggleSelected1("Normal");
                        setHeentOpen(false);
                      }}
                    >
                      {"Normal"}
                    </div>
                    <div
                      className={`option-item ${
                        labelName1 === "Abnormal" ? "selected primary-bg" : ""
                      } ${editView ? "disabled" : ""}`}
                      onClick={() => {
                        toggleSelected1("Abnormal");
                        setHeentOpen(true);
                      }}
                    >
                      {"Abnormal"}
                    </div>
                  </div>
                </CCol>
              </CRow>
              {heentOpen && (
                <>
                  {/* <CRow>
            <CCol>
              <div className="d-flex justify-content-center align-items-center">
                <label class="form-label">Status:</label>
                <div
                  className={`option-item ${
                    labelName1 === "Normal" ? "selected primary-bg" : ""
                  }`}
                  onClick={() => toggleSelected1("Normal")}
                >
                  {"Normal"}
                </div>
                <div
                  className={`option-item ${
                    labelName1 === "Abnormal"
                      ? "selected primary-bg"
                      : ""
                  }`}
                  onClick={() => toggleSelected1("Abnormal")}
                >
                  {"Abnormal"}
                </div>
              </div>
            </CCol>
          </CRow> */}
                  {labelName1 === "Abnormal" && (
                    <>
                      <CRow>
                        {skinoptions?.map((option, index) => (
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
          </CCardBody>
        </CCard>
      )}
      {from !== "Consult" && (
        <>
          <CRow className="mb-0">
            <CCol md={6} className="mb-2">
              <div className="d-flex gap-2">
                <img
                  alt="BackBtn"
                  src={Assets.BackBtn}
                  style={{ width: "35px" }}
                  onClick={onClose}
                  className="cursor"
                />
                <span className="Obj-name d-flex align-items-center">
                  Physical Exam
                </span>
              </div>
            </CCol>
            <CCol md={6} className="mb-2 d-flex justify-content-end">
              <div className="d-flex mt-2">
                <Breadcrumb
                  paths={[
                    { label: "Home", to: "/patients" },
                    { label: "Patient List", to: "/patients" },
                    { label: "Medical Profile", to: "/patients/history" },
                    { label: "Physical Exam", to: "/patients/history" },
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
                {/* <CRow className="mb-2">
              <CCol lg={12} className="d-flex align-items-center gap-2 mb-1">
                {!nutritionOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    onClick={nutritionTabOpen}
                    className="cursor"
                  />
                )}
                {nutritionOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    onClick={nutritionTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Nutritional</span>
              </CCol>
              {nutritionOpen && (
                <>
                  <CCol lg={12} className="mb-2">
                    <div class="position-relative">
                      <label for="validationTooltip01" class="form-label">
                        Custom Entry
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationTooltip01"
                        placeholder="Custom Entry"
                      />
                    </div>
                  </CCol>
                  <CRow>
                    {options?.map((option, index) => (
                      <CCol lg={"auto"}>
                        <OptionItem
                          key={index}
                          label={option}
                          onSelect={handleSelect}
                        />
                      </CCol>
                    ))}
                  </CRow>
                </>
              )}
            </CRow>
            <div className="vertical-line mt-2 mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={12} className="d-flex align-items-center gap-2 mb-1">
                {!constiOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    onClick={constiTabOpen}
                    className="cursor"
                  />
                )}
                {constiOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    onClick={constiTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">Constitutional</span>
              </CCol>
              {constiOpen && (
                <>
                  <CCol lg={12} className="mb-2">
                    <div class="position-relative">
                      <label for="validationTooltip01" class="form-label">
                        Custom Entry
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationTooltip01"
                        placeholder="Custom Entry"
                      />
                    </div>
                  </CCol>
                  <CRow>
                    {options?.map((option, index) => (
                      <CCol lg={"auto"}>
                        <OptionItem
                          key={index}
                          label={option}
                          onSelect={handleSelect}
                        />
                      </CCol>
                    ))}
                  </CRow>
                </>
              )}
            </CRow>
            <div className="vertical-line mt-2 mb-3"></div> */}
                <CRow className="mb-2">
                  <CCol
                    lg={12}
                    className="d-flex align-items-center gap-2 mb-1"
                  >
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
                    <span className="fs-16 fw-600">General Appearance</span>
                  </CCol>
                  <CRow>
                    <CCol>
                      <div className="d-flex justify-content-center align-items-center">
                        <label class="form-label">Status:</label>
                        <div
                          className={`option-item ${
                            labelName === "Normal" ? "selected primary-bg" : ""
                          } ${editView ? "disabled" : ""}`}
                          onClick={() => {
                            toggleSelected("Normal");
                            setGeneralOpen(false);
                          }}
                        >
                          {"Normal"}
                        </div>
                        <div
                          className={`option-item ${
                            labelName === "Abnormal"
                              ? "selected primary-bg"
                              : ""
                          } ${editView ? "disabled" : ""}`}
                          onClick={() => {
                            toggleSelected("Abnormal");
                            setGeneralOpen(true);
                          }}
                        >
                          {"Abnormal"}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                  {generalOpen && (
                    <>
                      {labelName === "Abnormal" && (
                        <CRow>
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
                              <label
                                for="validationTooltip01"
                                class="form-label"
                              >
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
                  <CCol
                    lg={12}
                    className="d-flex align-items-center gap-2 mb-1"
                  >
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
                    <span className="fs-16 fw-600">Skin</span>
                  </CCol>
                  <CRow>
                    <CCol>
                      <div className="d-flex justify-content-center align-items-center">
                        <label class="form-label">Status:</label>
                        <div
                          className={`option-item ${
                            labelName1 === "Normal" ? "selected primary-bg" : ""
                          } ${editView ? "disabled" : ""}`}
                          onClick={() => {
                            toggleSelected1("Normal");
                            setHeentOpen(false);
                          }}
                        >
                          {"Normal"}
                        </div>
                        <div
                          className={`option-item ${
                            labelName1 === "Abnormal"
                              ? "selected primary-bg"
                              : ""
                          } ${editView ? "disabled" : ""}`}
                          onClick={() => {
                            toggleSelected1("Abnormal");
                            setHeentOpen(true);
                          }}
                        >
                          {"Abnormal"}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                  {heentOpen && (
                    <>
                      {/* <CRow>
                    <CCol>
                      <div className="d-flex justify-content-center align-items-center">
                        <label class="form-label">Status:</label>
                        <div
                          className={`option-item ${
                            labelName1 === "Normal" ? "selected primary-bg" : ""
                          }`}
                          onClick={() => toggleSelected1("Normal")}
                        >
                          {"Normal"}
                        </div>
                        <div
                          className={`option-item ${
                            labelName1 === "Abnormal"
                              ? "selected primary-bg"
                              : ""
                          }`}
                          onClick={() => toggleSelected1("Abnormal")}
                        >
                          {"Abnormal"}
                        </div>
                      </div>
                    </CCol>
                  </CRow> */}
                      {labelName1 === "Abnormal" && (
                        <>
                          <CRow>
                            {skinoptions?.map((option, index) => (
                              <CCol lg={"auto"}>
                                <OptionItem
                                  key={index}
                                  label={option}
                                  onSelect={handleSelectSkin}
                                  selected={skinselectedOptions?.includes(
                                    option
                                  )}
                                  disabled={editView}
                                />
                              </CCol>
                            ))}
                          </CRow>
                          <CCol lg={12} className="mb-2">
                            <div class="position-relative">
                              <label
                                for="validationTooltip01"
                                class="form-label"
                              >
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
      )}
    </>
  );
};

export default PhysicalExam;
