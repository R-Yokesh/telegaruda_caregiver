import { CCol, CFormCheck, CFormSelect, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { toast } from "react-toastify";
import { format, isValid, parse } from "date-fns";
import { getCurrentTime } from "../../../../../../../Utils/dateUtils";
import useApi from "../../../../../../../ApiServices/useApi";
import {
  findItemIndex,
  getFileTypeFromMime,
  openFile,
} from "../../../../../../../Utils/commonUtils";
import { useLocation } from "react-router-dom";


const MedicationForm = ({ back, setAddFormView, fetchMedication, defaultValues }) => {



  const { loading, error, get, post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    medicine_type: defaultValues?.values?.medicine_type || "",
    medicine_name: defaultValues?.values?.medicine_name || "",
    dosage: defaultValues?.values?.dosage || "",
    strength : defaultValues?.values?.strength  || "",
    strength_measurement: defaultValues?.values?.strength_measurement || "",
    total_qty: defaultValues?.values?.total_qty || "",
    route_administration: defaultValues?.values?.route_administration || "",
    no_of_days: defaultValues?.values?.no_of_days || "",
    m: defaultValues?.values?.m || "",
    a: defaultValues?.values?.a || "",
    e: defaultValues?.values?.e || "",
    n: defaultValues?.values?.n || "",
    medicine_taken: defaultValues?.values?.medicine_taken || "",
    notes: defaultValues?.values?.notes || "",
    status: defaultValues?.values?.status || "",



  });
  
  const [searchTerm, setSearchTerm] = useState("");

  const minDate = new Date(); // Restrict past dates
  const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const currentDate = new Date();
  const formattedDate = getFormattedDate(currentDate);

  const defaultDateTime = defaultValues?.date || "";

  const defaultDate = defaultDateTime.split(" ")[0] || "";
  const defaultTime = defaultDateTime.split(" ")[1] || getCurrentTime();

  useEffect(() => {
    let date = new Date();

    if (defaultDate) {
      const parsedDate = parse(defaultDate, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        date = parsedDate;
      }
    }

    if (defaultTime) {
      const [hours, minutes] = defaultTime.split(":").map(Number);
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
    }

    setSelectedStartDate(date);
    setSelectedEndDate(date);
    setSelectedTime(date);
  }, [defaultDate, defaultTime]);

  // Separate handlers for start and end date changes
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    if (date) {
      setSelectedTime(date);
    }
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    if (date) {
      setSelectedTime(date);
    }
  };

  // Function to handle time change
  const handleTimeChange = (time) => {
    if (time) {
      const updatedDateTime = new Date(selectedStartDate || time);
      updatedDateTime.setHours(time.getHours());
      updatedDateTime.setMinutes(time.getMinutes());
      updatedDateTime.setSeconds(0);

      setSelectedStartDate(updatedDateTime);
      setSelectedTime(time);
    }
  };

  

  const options = ["Taking", "Not Taking", "Discontinued", "Status Unknown"];
  const getSelectedValue = (data) => {
    console.log(data);
  };

  const options1 = ["Brand", "Generic"];
   // Function to update symptoms
   const getSelectedValue1 = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      symptoms: data,
    }));
  };

  const options2 = [
    "Tablet",
    "Chewable tablet",
    "Sublingual tablet",
    "Buccal tablet",
    "Capsule",
    "Hard capsule",
    "Soft gelatin capsule",
    "Powder",
    "Oral powder",
    "Topical powder",
    "Liquid",
    "Syrup",
    "Elixir",
    "Suspension",
    "Solution",
    "Tincture",
    "Ointment",
    "Cream",
    "Gel",
    "Paste",
    "Suppository",
    "Patch",
    "Inhaler",
    "Metered-dose inhaler (MDI)",
    "Dry powder inhaler (DPI)",
    "Nasal Spray",
    "Eye Drop",
    "Ear Drop",
    "Intravenous (IV) solution",
    "Intramuscular (IM) injection",
    "Subcutaneous (SC) injection",
    "Intradermal (ID) injection",
    "Implant",
  ];
  const getSelectedValue2 = (data) => {
    console.log(data);
  };


  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!selectedStartDate) {
      newErrors.date = " Start Date is required.";
      isValid = false;
    }
    if (!selectedEndDate) {
      newErrors.date = "End Date is required.";
      isValid = false;
    }
    if (!formData.medicine_type) {
      newErrors.medicine_type = "Medication Type is required.";
      isValid = false;
    }
    if (!formData.medicine_name) {
      newErrors.medicine_name = "Medication Name is required.";
      isValid = false;
    }
    if (!formData.dosage) {
      newErrors.dosage = "Dosage is required.";
      isValid = false;
    }
    if (!formData.strength) {
      newErrors.strength = "Strength is required.";
      isValid = false;
    }
    if (!formData.strength_measurement) {
      newErrors.strength_measurement = "Strength Measurement is required.";
      isValid = false;
    }
    if (!formData.total_qty) {
      newErrors.total_qty = "Quantity is required.";
      isValid = false;
    }
    if (!formData.route_administration) {
      newErrors.route_administration = "Administration is required.";
      isValid = false;
    }
    if (!formData.no_of_days) {
      newErrors.no_of_days = "Number of days is required.";
      isValid = false;
    }
    if (!formData.status) {
      newErrors.status = "Status is required.";
      isValid = false;
    }


    setErrors(newErrors);
    return isValid;
  };


  const onSubmit = () => {
    console.log('clicked checking')
    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
         editMedication()

      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
         addMedication();

      }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addMedication = async () => {

    try {
      const body = {

        slug: "prescription",
        patient_id: data?.user_id,
       
        values: {
          start_date: format(selectedStartDate, "dd-MM-yyyy"),
          end_date: format(selectedEndDate, "dd-MM-yyyy"),
          dosage: formData.dosage,
          strength: formData.strength,
          strength_measurement: formData.strength_measurement,
          total_qty: formData.total_qty,
          route_administration: formData.route_administration,
          no_of_days: formData.no_of_days,
          m: formData.m,
          a: formData.a,
          e: formData.e,
          n: formData.n,
          medicine_taken: formData.medicine_taken,
          notes: formData.notes,
          status: formData.status
        }
      };

      // Use the provided `post` function to send the request
      const response = await post(`resource/patientHealth`, body);

      if (response.code === 201) {
        clearCache();
        await fetchMedication();
        setAddFormView(false);
        toast.success("Added successfully");

      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const editMedication = async () => {
    try {
     
      const body = {

        slug: "prescription",
        patient_id: data?.user_id,
       
        values: {
          start_date: format(selectedStartDate, "dd-MM-yyyy"),
          end_date: format(selectedEndDate, "dd-MM-yyyy"),
          dosage: formData.dosage,
          strength: formData.strength,
          strength_measurement: formData.strength_measurement,
          total_qty: formData.total_qty,
          route_administration: formData.route_administration,
          no_of_days: formData.no_of_days,
          m: formData.m,
          a: formData.a,
          e: formData.e,
          n: formData.n,
          medicine_taken: formData.medicine_taken,
          notes: formData.notes,
          status: formData.status
        }
      };
      // Use the provided `post` function to send the request
      const response = await patch(`resource/patientHealth/${defaultValues.id}`, body);

      if (response.code === 200) {
        clearCache();
        await fetchMedication();
        setAddFormView(false);
        toast.success("Updated successfully");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };






  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Medication Type *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options1}
                  defaultValue={
                    defaultValues?.values?.type
                      ? options1[findItemIndex(options1, defaultValues?.values?.type)]
                      : null
                  }
                  getSelectedValue={getSelectedValue1}
                />
              </div>
              {errors.medicine_type && <div className="error-text">{errors.medicine_type}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Medication Name *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.name}
              />
             {errors.medicine_name && <div className="error-text">{errors.medicine_name}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Dosage *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options2}
                  // defaultValue={options[1]}
                  getSelectedValue={getSelectedValue2}
                />
              </div>
              {errors.dosage && <div className="error-text">{errors.dosage}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Strength *
              </label>
                <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="0000"
                // value={formData?.duration_days}
                name="duration_days"
                onChange={handleChange}
                maxLength={4}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
               
              />
              {errors.strength && <div className="error-text">{errors.strength}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Strength measurement *
              </label>
              <CFormSelect
                size="lg"
                className="mb-3"
                aria-label="Large select example"
                name="strength"
                defaultValue={'mg'}
              >
                <option>Select</option>
                <option value="cfu/ml">
                  Colony forming units per milliliter (cfu/ml)
                </option>
                <option value="iu">International unit (iu) </option>
                <option value="meq/ml">
                  Milliequivalent per liter (meq/ml)
                </option>
                <option value="meq">Milliequivalent(meq)</option>
                <option value="Milligram per milliliter">
                  Milligram per milliliter{" "}
                </option>
                <option value="mg">Milligram(mg)</option>{" "}
                <option value="ml">milliliter(ml)</option>
                <option value="%">percentage(%) </option>
                <option value="unt">Unit (unt)</option>
                <option value="unt/ml">Unit per milliliter (unt/ml)</option>
                <option value="kg">Kilogram (kg) </option>
                <option value="mcg">Microgram (mcg)</option>
              </CFormSelect>
              {errors.strength_measurement && <div className="error-text">{errors.strength_measurement}</div>}
            </div>
          </div>
        </CCol>

        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Total Qty / Taken *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="0000"
                name="total_qty"
                value={formData.total_qty}
                onChange={handleChange}
                maxLength={4}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              
              />
              {errors.total_qty && <div className="error-text">{errors.total_qty}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Route of administration *
              </label>
              <CFormSelect
                size="lg"
                className="mb-3"
                aria-label="Large select example"
                name="strengthMeasurement"
              >
                <option>Select</option>
                <option value="Oral">Oral</option>{" "}
                <option value="Sublingual">Sublingual</option>
                <option value="Buccal">Buccal </option>
                <option value="Intravenous">Intravenous </option>
                <option value="Intramuscular">Intramuscular</option>
                <option value="Subcutaneous">Subcutaneous</option>
                <option value="Intradermal">Intradermal</option>
                <option value="Topical">Topical</option>{" "}
                <option value="Transdermal">Transdermal</option>
                <option value="Ocular">Ocular </option>
                <option value="Otic">Otic </option>
                <option value="Nasal">Nasal</option>
                <option value="Inhalation">Inhalation</option>
                <option value="Rectal">Rectal</option>
                <option value="Vaginal">Vaginal </option>
                <option value="Implant">Implant </option>
                <option value="Intrathecal">Intrathecal</option>
                <option value="Epidural">Epidural</option>
              </CFormSelect>
              {errors.route_administration && <div className="error-text">{errors.route_administration}</div>}
            </div>
          </div>
        </CCol>

        <CCol lg={4} className="mb-3">
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Start Date *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                dateFormat="MM-dd-yyyy"
                disabled
              />
               {errors.date && <div className="error-text">{errors.date}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                No. of Day(s) *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="000"
                name="days"
                // value={timeTaken}
                onChange={handleChange}
                maxLength={3}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                
              />
              {errors.no_of_days && <div className="error-text">{errors.no_of_days}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              End Date *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                dateFormat="MM-dd-yyyy"
                minDate={minDate}
              />
               {errors.date && <div className="error-text">{errors.date}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3" style={{ paddingRight: "0" }}>
          <div style={{ width: "100%" }} className="d-flex gap-3">
            <div>
              <label for="validationTooltip01" class="form-label">
                M
              </label>
              <input
                type="text"
                class="form-control  pad-10 text-align-center"
                id="validationTooltip01"
                placeholder="0"
                name="m"
              />
              {errors.m && <div className="error-text">{errors.m}</div>}
            </div>
            <div>
              <label for="validationTooltip01" class="form-label">
                A
              </label>
              <input
                type="text"
                class="form-control  pad-10 text-align-center"
                id="validationTooltip01"
                placeholder="0"
                name="a"
              />
              {errors.a && <div className="error-text">{errors.a}</div>}
            </div>
            <div>
              <label for="validationTooltip01" class="form-label">
                E
              </label>
              <input
                type="text"
                class="form-control  pad-10 text-align-center"
                id="validationTooltip01"
                placeholder="0"
                name="e"
              />
              {errors.e && <div className="error-text">{errors.e}</div>}
            </div>
            <div>
              <label for="validationTooltip01" class="form-label">
                N
              </label>
              <input
                type="text"
                class="form-control  pad-10 text-align-center"
                id="validationTooltip01"
                placeholder="0"
                name="n"
              />
              {errors.n && <div className="error-text">{errors.n}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={3} className="mb-3">
          <div className="h-100 d-flex align-items-end w-100 justify-content-start">
            <div
              style={{
                boxSizing: "border-box",
                borderRadius: "5px",
                border: "1px solid #17171D33",
                padding: "10px",
              }}
            >
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="inlineCheckbox1"
                value="bf"
                disabled={
                  defaultValues?.lab_status === "Prescribed"
                    ? false
                    : defaultValues?.medicines?.length >= 1
                      ? true
                      : false
                }
                label={
                  <label for="validationTooltip01" class="form-label mb-0">
                    BF
                  </label>
                }
                name="food"
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="inlineCheckbox2"
                value="af"
                label={
                  <label for="validationTooltip01" class="form-label mb-0">
                    AF
                  </label>
                }
                name="food"
              />
            </div>
          </div>
        </CCol>
        <CCol lg={5} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Notes
              </label>
              <CFormTextarea
                id="exampleFormControlTextarea1"
                rows={3} >
              </CFormTextarea>
            </div>
          </div>
        </CCol>
        {/* <CCol lg={7} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Reason for medication
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                name="reason"
              />
            </div>
          </div>
        </CCol> */}
        <CCol lg={5} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Status *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options}
                  defaultValue={options[1]}
                  getSelectedValue={getSelectedValue}
                />
              </div>
              {errors.status && <div className="error-text">{errors.status}</div>}
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-1">
        <div style={{ width: "128px" }}>
          <PrimaryButton onClick={() => onSubmit()}>SAVE</PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default MedicationForm;
