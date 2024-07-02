import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import DateSelector from "../../../../../DateRangePicker/DateSelector";
import DateCards from "../../../../../DateCards/DateCards";
import Pagination from "../../../../../Pagination/Pagination";
import ActiveButton from "../../../../../Buttons/ActiveButton/ActiveButton";
import SingleDatePicker from "../../../../../DateRangePicker/SingleDatePicker";
import OptionItem from "../../../../../OptionItems/OptionItem";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";

const PhysicalExam = ({ onClose }) => {
  const dateCards = [
    { id: 1, date: "06/07/2024" },
    { id: 2, date: "06/07/2024" },
    { id: 3, date: "06/07/2024" },
    { id: 4, date: "06/07/2024" },
    { id: 5, date: "06/07/2024" },
    { id: 6, date: "06/07/2024" },
    { id: 7, date: "06/07/2024" },
    { id: 8, date: "06/07/2024" },
    { id: 9, date: "06/07/2024" },
    { id: 10, date: "06/07/2024" },
    { id: 11, date: "06/07/2024" },
    { id: 12, date: "06/07/2024" },
    { id: 13, date: "06/07/2024" },
    { id: 14, date: "06/07/2024" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [addFormView, setAddFormView] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    "Lorem ipsum",
    "Lorem ipsum",
    "Lorem ipsum",
    "Lorem ipsum",
    "Lorem ipsum",
    "Lorem ipsum",
    "Lorem ipsum 2",
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

  return (
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
                <PrimaryButton onClick={() => addFormPage()}>
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
                  <DateCards data={item} />
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
      {addFormView && (
        <CCard className="p-2 cursor-default mb-5">
          <CCardBody className="mb-3">
            <CRow className="mb-2">
              <CCol className="d-flex align-items-center gap-2">
                <span>Date</span>
                <SingleDatePicker />
              </CCol>
              <CCol className="d-flex justify-content-end">
                <div style={{ width: "120px" }}>
                  <ActiveButton onClick={() => setAddFormView(false)}>
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
            <div className="vertical-line mt-2 mb-3"></div>
            <CRow className="mb-2">
              <CCol lg={12} className="d-flex align-items-center gap-2 mb-1">
                {!generalOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    onClick={generalTabOpen}
                    className="cursor"
                  />
                )}
                {generalOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    onClick={generalTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">General</span>
              </CCol>
              {generalOpen && (
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
                {!heentOpen && (
                  <img
                    alt="plus"
                    src={Assets?.PlusIcon}
                    onClick={heentTabOpen}
                    className="cursor"
                  />
                )}
                {heentOpen && (
                  <img
                    alt="plus"
                    src={Assets?.MinusIcon}
                    onClick={heentTabClose}
                    className="cursor"
                  />
                )}
                <span className="fs-16 fw-600">HEENT</span>
              </CCol>
              {heentOpen && (
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
            <CRow className="mb-1">
              <div style={{ width: "128px" }}>
                <PrimaryButton>SAVE</PrimaryButton>
              </div>
              <div style={{ width: "128px" }}>
                <SecondaryButton>CANCEL</SecondaryButton>
              </div>
            </CRow>
          </CCardBody>
        </CCard>
      )}
    </>
  );
};

export default PhysicalExam;
