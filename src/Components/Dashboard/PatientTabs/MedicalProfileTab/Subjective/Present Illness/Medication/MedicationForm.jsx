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
import SearchInput from "../../../../../../Input/SearchInput";


const MedicationForm = ({ back, addMedication, defaultValues }) => {



  const { loading, error, get, post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    medicine_type: defaultValues?.values[0]?.medicine_type || "",
    // medicine_name: defaultValues?.values[0]?.medicine_name || "",
    dosage: defaultValues?.values[0]?.dosage || "",
    strength: defaultValues?.values[0]?.strength || "",
    strength_measurement: defaultValues?.values[0]?.strength_measurement || "",
    total_qty: defaultValues?.values[0]?.total_qty || "",
    route_administration: defaultValues?.values[0]?.route_administration || "",
    no_of_days: defaultValues?.values[0]?.no_of_days || "",
    m: defaultValues?.values[0]?.medicine_taken?.m || "",
    a: defaultValues?.values[0]?.medicine_taken?.a || "",
    e: defaultValues?.values[0]?.medicine_taken?.e || "",
    n: defaultValues?.values[0]?.medicine_taken?.n || "",
    medicine_taken: defaultValues?.values[0]?.medicine_takenat || "",
    notes: defaultValues?.values[0]?.notes || "",
    status: defaultValues?.values[0]?.status || "",



  });

  const [medicationDetails, setMedicationDetails] = useState([]);
  const [medicationKey, setMedicationKey] = useState(defaultValues?.values[0]?.medicine_name || "");
  const [medicationName, setMedicationName] = useState(defaultValues?.values[0]?.medicine_name || {});




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



  const statusOptions = ["Taking", "Not Taking", "Discontinued", "Status Unknown"];
  const getSelectedStatus = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      status: data,
    }));
  };

  const medicineTypeOptions = ["Brand", "Generic"];
  // Function to update symptoms
  const getSelectedMedicineType = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      medicine_type: data,
    }));
  };

  const dosageOptions = [
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
  const getSelectedDosage = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      dosage: data,
    }));
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
    if (!medicationName) {
      newErrors.medicationName = "Medication Name is required.";
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
   const values = [
    {
      start_date: format(selectedStartDate, "yyyy-MM-dd"),
      end_date: format(selectedEndDate, "yyyy-MM-dd"),
      medicine_type: formData?.medicine_type,
      medicine_name: medicationName?.slug,
      dosage: formData?.dosage,
      strength: formData?.strength,
      strength_measurement: formData?.strength_measurement,
      total_qty: formData?.total_qty,
      route_administration: formData?.route_administration,
      no_of_days: formData?.no_of_days,
      medicine_takenat: formData.medicine_taken,
      notes: formData.notes,
      status: formData.status,
      medicine_taken: {
        m: formData.m,
        a: formData.a,
        e: formData.e,
        n: formData.n,
      },
      medicine_input: {
        m: "",
        a: "",
        e: "",
        n: "",
      },
    }
  ] 
    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        // editMedication()

      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addMedication(values);

      }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //medication name list
  const getmedication = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters/all?slug=medicineType&order_by=name&dir=1&searchkey=${medicationKey}`
      );
      const listData = response?.data?.masters; //
      setMedicationDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, medicationKey]);

  useEffect(() => {
    getmedication();
  }, [getmedication]);

  const getSelectedmedication = (data) => {
    setMedicationName(data);
  };

  // // Add Medication
  // const addMedication = async () => {
  //   try {
  //     const body = {

  //       slug: "medicine",
  //       patient_id: data?.user_id,
  //       values: [
  //         {
  //           start_date: format(selectedStartDate, "dd-MM-yyyy"),
  //           end_date: format(selectedEndDate, "dd-MM-yyyy"),
  //           medicine_type: formData?.medicine_type,
  //           medicine_name: medicationName?.slug,
  //           dosage: formData?.dosage,
  //           strength: formData?.strength,
  //           strength_measurement: formData?.strength_measurement,
  //           total_qty: formData?.total_qty,
  //           route_administration: formData?.route_administration,
  //           no_of_days: formData?.no_of_days,
  //           medicine_takenat: formData.medicine_taken,
  //           notes: formData.notes,
  //           status: formData.status,
  //           medicine_taken: {
  //             m: formData.m,
  //             a: formData.a,
  //             e: formData.e,
  //             n: formData.n,
  //           },
  //           medicine_input: {
  //             m: "",
  //             a: "",
  //             e: "",
  //             n: "",
  //           },
  //         }
  //       ] 
  //     };

  //     // Use the provided `post` function to send the request
  //     const response = await post(`resource/patientHealth`, body);

  //     if (response.code === 201) {
  //       clearCache();
  //       await fetchMedication();
  //       setAddFormView(false);
  //       toast.success("Added successfully");

  //     } else {
  //       console.error("Failed to fetch data:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const editMedication = async () => {
  //   try {
  //     const body = {

  //       slug: "medicine",
  //       patient_id: data?.user_id,

  //       values: {
  //         start_date: format(selectedStartDate, "dd-MM-yyyy"),
  //         end_date: format(selectedEndDate, "dd-MM-yyyy"),
  //         dosage: formData.dosage,
  //         strength: formData.strength,
  //         strength_measurement: formData.strength_measurement,
  //         total_qty: formData.total_qty,
  //         route_administration: formData.route_administration,
  //         no_of_days: formData.no_of_days,
  //         m: formData.m,
  //         a: formData.a,
  //         e: formData.e,
  //         n: formData.n,
  //         medicine_taken: formData.medicine_taken,
  //         notes: formData.notes,
  //         status: formData.status
  //       }
  //     };
  //     // Use the provided `post` function to send the request
  //     const response = await patch(`resource/patientHealth/${defaultValues.id}`, body);

  //     if (response.code === 200) {
  //       clearCache();
  //       await fetchMedication();
  //       setAddFormView(false);
  //       toast.success("Updated successfully");
  //     } else {
  //       console.error("Failed to fetch data:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }

  // };






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
                  options={medicineTypeOptions}
                  defaultValue={
                    defaultValues?.values[0]?.medicine_type
                      ? medicineTypeOptions[findItemIndex(medicineTypeOptions, defaultValues?.values[0]?.medicine_type)]
                      : null
                  }
                  getSelectedValue={getSelectedMedicineType}
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
              <SearchInput
                data={medicationDetails}
                setSurgeryKey={setMedicationKey}
                getSelectedData={getSelectedmedication}
                defaultkey={medicationKey}
              />
              {errors.medicationName && <div className="error-text">{errors.medicationName}</div>}
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
                  options={dosageOptions}
                  defaultValue={
                    defaultValues?.values[0]?.dosage
                      ? dosageOptions[findItemIndex(dosageOptions, defaultValues?.values[0]?.dosage)]
                      : null
                  }
                  getSelectedValue={getSelectedDosage}
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
                value={formData?.strength}
                name="strength"
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
                name="strength_measurement"
                defaultValue={'mg'}
                value={formData.strength_measurement}
                onChange={handleChange}
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
                value={formData?.total_qty}
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
                name="route_administration"
                value={formData.route_administration}
                onChange={handleChange}
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
                dateFormat="dd-MM-yyyy"
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
                name="no_of_days"
                value={formData?.no_of_days}
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
                dateFormat="dd-MM-yyyy"
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
                value={formData?.m}
                onChange={handleChange}
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
                value={formData?.a}
                onChange={handleChange}
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
                value={formData?.e}
                onChange={handleChange}
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
                value={formData?.n}
                onChange={handleChange}
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
                id="food_bf"
                name="bf"
                value="bf"
                checked={formData?.medicine_taken === "bf"}
                onChange={(e) => setFormData({ ...formData, medicine_taken: e.target.value })}
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
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="food_af"
                name="af"
                value="af"
                checked={formData?.medicine_taken === "af"}
                onChange={(e) => setFormData({ ...formData, medicine_taken: e.target.value })}
               
                label={
                  <label for="validationTooltip01" class="form-label mb-0">
                    AF
                  </label>
                }

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
                 name="notes"
                value={formData?.notes}
                onChange={handleChange}
                rows={3} >
              </CFormTextarea>
            </div>
          </div>
        </CCol>
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
                  options={statusOptions}
                  defaultValue={
                    defaultValues?.values[0]?.status
                      ? statusOptions[findItemIndex(statusOptions, defaultValues?.values[0]?.status)]
                      : null
                  }
                  getSelectedValue={getSelectedStatus}
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
