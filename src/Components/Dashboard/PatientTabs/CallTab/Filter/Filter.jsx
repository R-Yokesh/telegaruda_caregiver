import React, { useCallback, useEffect, useState } from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CButton,
  CModalFooter,
  CFormSelect,
  CRow,
  CCol,
} from "@coreui/react";
// import { useState } from 'react'
import DatePicker from "react-datepicker";
import useApi from "../../../../../ApiServices/useApi";

const Filter = ({ visible, setVisible, getFilterValues }) => {
  const today = new Date();
  const { get } = useApi();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [selectedGender, setSelectedGender] = useState("");
  const [speciality, setSpeciality] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  function ClearFunction() {
    setStartDate();
    setEndDate();
    setSelectedGender("");
    setSelectedSpeciality("");
  }

  // Handler function for select change
  const handleChange = (event) => {
    setSelectedGender(event.target.value);
  };
  const handleSpecialityChange = (event) => {
    setSelectedSpeciality(event.target.value);
  };

  const onApply = () => {
    setVisible(false);
    getFilterValues(selectedGender, selectedSpeciality);
  };

  const getSpecialitysLists = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters/all?order_by=id&dir=1&slug=speciality`
      );
      const listData = response?.data?.masters; //
      setSpeciality(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get]);
  const formattedOptions = [
    { label: "Select", value: "" }, // Default "Select" option
    ...speciality?.map((option) => ({
      label: option?.name, // Use the name property for the label
      value: option?.slug, // Use the slug property for the value
    })),
  ];
  useEffect(() => {
    getSpecialitysLists();
  }, [getSpecialitysLists]);
  return (
    <div>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        className="modal-cutomize"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">FILTER</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormSelect
            aria-label="Default select example"
            options={[
              "Filter with Doctor",
              { label: "Doctor One", value: "1" },
              { label: "Doctor Two", value: "2" },
              { label: "Dcotor Three", value: "3" },
            ]}
          />
          <CRow className="mb-4">
            <CCol lg={6} sm={12}>
              <p className="date-sec">From Date</p>
              <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                isClearable
                className="date-range-picker picker-sec"
                dateFormat="MM/dd/yyyy"
              />
            </CCol>
            <CCol lg={6} sm={12}>
              <p className="date-sec">End Date</p>
              <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                isClearable
                className="date-range-picker picker-sec"
              />
            </CCol>
          </CRow>
          <CRow className="">
            <CCol lg={6} md={6} sm={12}>
              <CFormSelect
                aria-label="Default select example"
                label={"Specialty"}
                options={formattedOptions}
                value={selectedSpeciality}
                onChange={handleSpecialityChange}
              />
            </CCol>
            <CCol lg={6} md={6} sm={12}>
              <CFormSelect
                aria-label="Default select example"
                label={"Roaster Availability"}
                options={[
                  "Available",
                  { label: "Doctor One", value: "1" },
                  { label: "Doctor Two", value: "2" },
                  { label: "Dcotor Three", value: "3" },
                ]}
              />
            </CCol>
          </CRow>
          <CRow className="">
            <CCol lg={6} md={6} sm={12}>
              <CFormSelect
                aria-label="Default select example"
                label={"Gender"}
                options={[
                  "All",
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Others", value: "Others" },
                ]}
                value={selectedGender} // Set the value from state
                onChange={handleChange} // Attach the change handler
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => ClearFunction()}
            className="clear-filter-btn"
          >
            Clear Filter
          </CButton>
          <CButton
            color="primary"
            className="apply-filter-sec"
            onClick={() => onApply()}
          >
            Apply Filter
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Filter;
