import React, { useState } from "react";
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

function FilterModal({ visible, setVisible, RegDoctors, getFilter }) {
  const today = new Date();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [errors, setErrors] = useState({
    startDate: "",
    endDate: "",
    doctor: "",
  });

  function ClearFunction() {
    setStartDate();
    setEndDate();
    setSelectedDoctor("");
    setErrors({
      startDate: "",
      endDate: "",
      doctor: "",
    });
  }

  // Handler function for the select change event
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDoctor(selectedValue);
    console.log("Selected doctor ID:", selectedValue);
    setErrors((prev) => ({ ...prev, doctor: "" }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      startDate: "",
      endDate: "",
      doctor: "",
    };

    // if (!selectedDoctor) {
    //   newErrors.doctor = "Please select a doctor.";
    //   isValid = false;
    // }

    if (startDate && endDate && startDate > endDate) {
      newErrors.startDate = "Start date must be before end date.";
      newErrors.endDate = "End date must be after start date.";
      isValid = false;
    }

    if (!startDate && endDate) {
      newErrors.startDate = "Start date is required when end date is selected.";
      isValid = false;
    }

    if (startDate && !endDate) {
      newErrors.endDate = "End date is required when start date is selected.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const ApplyFilter = () => {
    if (validate()) {
      setVisible(false);
      const data = {
        id: selectedDoctor ? selectedDoctor : null,
        startDate: startDate ? startDate?.toLocaleDateString() : null,
        endDate: endDate ? endDate?.toLocaleDateString() : null,
      };
      getFilter(data);
    }
  };
  return (
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
        {/* <CFormSelect
          aria-label="Default select example"
          options={[
            "Filter with Doctor",
            { label: "Doctor One", value: "1" },
            { label: "Doctor Two", value: "2" },
            { label: "Dcotor Three", value: "3" },
          ]}
        /> */}
        <CFormSelect
          aria-label="Default select example"
          onChange={handleSelectChange}
          value={selectedDoctor} // Optional: to control the select value
        >
          <option value="">Filter with Doctor</option>{" "}
          {/* Default or placeholder option */}
          {RegDoctors?.map((doctor) => (
            <option key={doctor?.user?.id} value={doctor?.user?.id}>
              {doctor?.user?.first_name} {doctor?.user?.last_name}
            </option>
          ))}
        </CFormSelect>
        {/* {errors.doctor && <p className="error-text">{errors.doctor}</p>} */}
        <CRow>
          <CCol lg={6} sm={12}>
            <p className="date-sec">From Date</p>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              isClearable
              className="date-range-picker picker-sec"
              dateFormat="dd/MM/yyyy"
              maxDate={today}
            />
          {errors.startDate && <p className="error-text">{errors.startDate}</p>}
          </CCol>
          <CCol lg={6} sm={12}>
            <p className="date-sec">End Date</p>
            <DatePicker
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              isClearable
              className="date-range-picker picker-sec"
              dateFormat="dd/MM/yyyy"
              maxDate={today}
            />
            {errors.endDate && <p className="error-text">{errors.endDate}</p>}
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
          onClick={() => ApplyFilter()}
        >
          Apply Filter
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default FilterModal;
