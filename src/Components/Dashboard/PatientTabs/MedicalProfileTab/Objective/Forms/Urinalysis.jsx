import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../../../../../ApiServices/useApi";

const Urinalysis = ({ addBack, defaultData, getTableDatas }) => {
  const { post, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cell, setCell] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
  //   const parseDateString = (dateString) => {
  //     const parts = dateString?.split(" ");
  //     const datePart = parts[0];
  //     const timePart = parts[1];
  //     const [month, day, year] = datePart?.split("-")?.map(Number);
  //     const [hours, minutes] = timePart?.split(":")?.map(Number);
  //     return new Date(year, month - 1, day, hours, minutes);
  //   };

  //   // Example default date string
  //   const defaultDateString = defaultData?.date;

  //   // Parse default date string to Date object
  //   const defaultDate = defaultData
  //     ? parseDateString(defaultDateString)
  //     : new Date();

  //   // Set default date in state
  //   setSelectedDate(defaultDate);
  //   setSelectedTime(defaultDate);
  // }, [defaultData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };
  const extractNum = (data) => {
    const numbers = parseFloat(data?.match(/\d+(\.\d+)?/)[0]); // Replace non-digits with empty string

    return numbers || "";
  };

  const oneNumWithOneDecimal = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/^(\d{1})\d*$/, "$1")
      .replace(/^(\d{1})\.(\d{1}).*$/, "$1.$2")
      .replace(/(\..*)\./g, "$1");
  };

  const oneNumWithDecimal = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/^(\d{1})\d*$/, "$1")
      .replace(/^(\d{1})\.(\d{3}).*$/, "$1.$2")
      .replace(/(\..*)\./g, "$1");
  };

  const twoNumWithDecimal = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/^(\d{2})\d*$/, "$1")
      .replace(/^(\d{2})\.(\d{2}).*$/, "$1.$2")
      .replace(/(\..*)\./g, "$1");
  };
  const threeNumWithDecimal = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/^(\d{3})\d*$/, "$1")
      .replace(/^(\d{3})\.(\d{2}).*$/, "$1.$2")
      .replace(/(\..*)\./g, "$1");
  };

  const wholeNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const [formData, setFormData] = useState({
    color: "",
    clarity: "",
    specificGravity: "",
    ph: "",
    protein: "",
    glucose: "",
    ketones: "",
    bloodInUrine: "",
    leukocyteEsterase: "",
    nitrites: "",
    urobilinogen: "",
    bilirubin: "",
    redBloodCells: "",
    whiteBloodCells: "",
    epithelialCells: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const requiredFields = [
      "color",
      "clarity",
      "ph",
      "protein",
      "glucose",
      "ketones",
      "bloodInUrine",
      "leukocyteEsterase",
      "nitrites",
      "urobilinogen",
      "bilirubin",
    ];

    let currentErrors = {};
    let isValid = true;

    for (const field of requiredFields) {
      if (!formData[field]) {
        currentErrors[field] = `${field.replace(
          /([A-Z])/g,
          " $1"
        )} is required.`;
        isValid = false;
      }
    }

    setErrors(currentErrors);
    return isValid;
  };

  const onSubmit = () => {
    if (validateInputs()) {
      if (defaultData) {
        console.log("Edit clicked");
        onEdit();
      }
      if (!defaultData) {
        console.log("Add clicked");
        onAdd();
      }
    }
  };

  const onAdd = async () => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const url = `resource/vitals`; // Replace with your API endpoint
      const body = {
        details: {
          color: formData.color,
          clarity: formData.clarity,
          specificGravity: formData.specificGravity,
          ph: formData.ph,
          value: formData.ph,
          // protein: formData.protein,
          protein: '++++',
          glucose: formData.glucose,
          sugar: formData.glucose,
          ketones: formData.ketones,
          bloodInUrine: formData.bloodInUrine,
          leukocyteEsterase: formData.leukocyteEsterase,
          nitrites: formData.nitrites,
          urobilinogen: formData.urobilinogen,
          bilirubin: formData.bilirubin,
          redBloodCells: formData.redBloodCells,
          whiteBloodCells: formData.whiteBloodCells,
          epithelialCells: formData.epithelialCells,
        },
        user_id: data?.user_id,
        slug: "urine",
      };
      await post(url, body);
      await getTableDatas(defaultData);
      toast.success("Added successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      // Reset the loading state to false after the API call is done
      setIsSubmitting(false);
    }
  };

  const onEdit = async () => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const url = `resource/vitals/${defaultData.id}`; // Replace with your API endpoint
      const body = {
        details: {
          color: formData.color,
          clarity: formData.clarity,
          specific_gravity: formData.specificGravity,
          ph: formData.ph,
          value: formData.ph,
          protein: formData.protein,
          glucose: formData.glucose,
          sugar: formData.glucose,
          ketones: formData.ketones,
          blood_in_urine: formData.bloodInUrine,
          leukocytes: formData.leukocyteEsterase,
          nitrites: formData.nitrites,
          urobilinogen: formData.urobilinogen,
          bilirubin: formData.bilirubin,
          rbc: formData.redBloodCells,
          wbc: formData.whiteBloodCells,
          epithelial_cells: formData.epithelialCells,
        },
        user_id: data?.user_id,
        slug: "urine",
      };
      await patch(url, body);
      await getTableDatas(defaultData);
      toast.success("Updated successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      // Reset the loading state to false after the API call is done
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <CContainer>
        <CRow className="mb-3">
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="color" className="form-label">
                Color *
              </label>
              <select
                name="color"
                className="form-select"
                value={formData.color}
                onChange={handleChange}
                aria-label="Color select"
              >
                <option>Select</option>
                <option value="straw">Straw</option>
                <option value="yellow">Yellow</option>
                <option value="amber">Amber</option>
                <option value="red">Red</option>
                <option value="brown">Brown</option>
                <option value="green">Green</option>
              </select>
              {errors.color && <div className="error-text">{errors.color}</div>}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="clarity" className="form-label">
                Clarity *
              </label>
              <select
                name="clarity"
                className="form-select"
                value={formData.clarity}
                onChange={handleChange}
                aria-label="Clarity select"
              >
                <option>Select</option>
                <option value="clear">Clear</option>
                <option value="slightly cloudy">Slightly Cloudy</option>
                <option value="cloudy">Cloudy</option>
                <option value="turbid">Turbid</option>
              </select>
              {errors.clarity && (
                <div className="error-text">{errors.clarity}</div>
              )}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="specificGravity" className="form-label">
                Specific Gravity
              </label>
              <input
                type="text"
                name="specificGravity"
                className="form-control"
                value={formData.specificGravity}
                onChange={handleChange}
                placeholder="Enter"
              />
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="ph" className="form-label">
                pH *
              </label>
              <input
                type="text"
                name="ph"
                className="form-control"
                value={formData.ph}
                onChange={handleChange}
                placeholder="Enter"
              />
              {errors.ph && <div className="error-text">{errors.ph}</div>}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="protein" className="form-label">
                Protein *
              </label>
              <select
                name="protein"
                className="form-select"
                value={formData.protein}
                onChange={handleChange}
                aria-label="Protein select"
              >
                <option>Select</option>
                <option value="Trace">Trace</option>
                <option value="1+ (30 mg/dL)">1+ (30 mg/dL)</option>
                <option value="2+ (100 mg/dL)">2+ (100 mg/dL)</option>
                <option value="3+ (300 mg/dL)">3+ (300 mg/dL)</option>
                <option value="4+ (>2000 mg/dL)">4+ (2000 mg/dL)</option>
              </select>
              {errors.protein && (
                <div className="error-text">{errors.protein}</div>
              )}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="glucose" className="form-label">
                Glucose *
              </label>
              <select
                name="glucose"
                className="form-select"
                value={formData.glucose}
                onChange={handleChange}
                aria-label="Glucose select"
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Trace">Trace</option>
                <option value="1+ (100 mg/dL)">1+ (100 mg/dL)</option>
                <option value="2+ (250 mg/dL)">2+ (250 mg/dL)</option>
                <option value="3+ (500 mg/dL)">3+ (500 mg/dL)</option>
                <option value="4+ (1000 mg/dL)">4+ (1000 mg/dL)</option>
              </select>
              {errors.glucose && (
                <div className="error-text">{errors.glucose}</div>
              )}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="ketones" className="form-label">
                Ketones *
              </label>
              <select
                name="ketones"
                className="form-select"
                value={formData.ketones}
                onChange={handleChange}
                aria-label="Ketones select"
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Trace">Trace</option>
                <option value="Small (1+) mg/dL">Small (1+) mg/dL</option>
                <option value="Moderate (2+) mg/dL">Moderate (2+) mg/dL</option>
                <option value="Large (3+) mg/dL">Large (3+) mg/dL</option>
              </select>
              {errors.ketones && (
                <div className="error-text">{errors.ketones}</div>
              )}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="bloodInUrine" className="form-label">
                Blood in Urine *
              </label>
              <select
                name="bloodInUrine"
                className="form-select"
                value={formData.bloodInUrine}
                onChange={handleChange}
                aria-label="Blood in Urine select"
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Trace">Trace</option>
                <option value="Small (1+) mg/dL">Small (1+) mg/dL</option>
                <option value="Moderate (2+) mg/dL">Moderate (2+) mg/dL</option>
                <option value="Large (3+) mg/dL">Large (3+) mg/dL</option>
              </select>
              {errors.bloodInUrine && (
                <div className="error-text">{errors.bloodInUrine}</div>
              )}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="leukocyteEsterase" className="form-label">
                Leukocyte Esterase *
              </label>
              <select
                name="leukocyteEsterase"
                className="form-select"
                value={formData.leukocyteEsterase}
                onChange={handleChange}
                aria-label="Leukocyte Esterase select"
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Trace">Trace</option>
                <option value="Small (1+) mg/dL">Small (1+) mg/dL</option>
                <option value="Moderate (2+) mg/dL">Moderate (2+) mg/dL</option>
                <option value="Large (3+) mg/dL">Large (3+) mg/dL</option>
              </select>
              {errors.leukocyteEsterase && (
                <div className="error-text">{errors.leukocyteEsterase}</div>
              )}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="nitrites" className="form-label">
                Nitrites *
              </label>
              <select
                name="nitrites"
                className="form-select"
                value={formData.nitrites}
                onChange={handleChange}
                aria-label="Nitrites select"
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Positive">Positive</option>
              </select>
              {errors.nitrites && (
                <div className="error-text">{errors.nitrites}</div>
              )}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="urobilinogen" className="form-label">
                Urobilinogen *
              </label>
              <input
                type="text"
                name="urobilinogen"
                className="form-control"
                value={formData.urobilinogen}
                onChange={handleChange}
                placeholder="Enter"
              />
              {errors.urobilinogen && (
                <div className="error-text">{errors.urobilinogen}</div>
              )}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="bilirubin" className="form-label">
                Bilirubin *
              </label>
              <select
                name="bilirubin"
                className="form-select"
                value={formData.bilirubin}
                onChange={handleChange}
                aria-label="Bilirubin select"
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Positive">Positive</option>
              </select>
              {errors.bilirubin && (
                <div className="error-text">{errors.bilirubin}</div>
              )}
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="redBloodCells" className="form-label">
                Red Blood Cells
              </label>
              <input
                type="text"
                name="redBloodCells"
                className="form-control"
                value={formData.redBloodCells}
                onChange={handleChange}
                placeholder="Enter"
                maxLength={2}
              />
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="whiteBloodCells" className="form-label">
                White Blood Cells
              </label>
              <input
                type="text"
                name="whiteBloodCells"
                className="form-control"
                value={formData.whiteBloodCells}
                onChange={handleChange}
                placeholder="Enter"
                maxLength={2}
              />
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div className="position-relative">
              <label htmlFor="epithelialCells" className="form-label">
                Epithelial Cells
              </label>
              <select
                name="epithelialCells"
                className="form-select"
                value={formData.epithelialCells}
                onChange={handleChange}
                aria-label="Epithelial Cells select"
              >
                <option>Select</option>
                <option value="Red Blood Cell">
                  Squamous Epithelial Cells
                </option>
                <option value="White Blood Cell">
                  Transitional Epithelial Cells
                </option>
                <option value="Epithelial Cell">
                  Renal Tubular Epithelial Cells
                </option>
              </select>
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Crystals
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
              // defaultValue={"Uric Acid Crystals"}
              >
                <option>Select</option>
                <option value="Uric Acid Crystals">Uric Acid Crystals</option>
                <option value="Calcium Oxalate Crystals">
                  Calcium Oxalate Crystals
                </option>
                <option value="Struvite Crystals">Struvite Crystals</option>
                <option value="Cystine Crystals ">Cystine Crystals </option>
              </select>
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Microorganisms
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
              // defaultValue={"Bacteria"}
              >
                <option>Select</option>
                <option value="Bacteria">Bacteria</option>
                <option value="Yeast">Yeast</option>
                <option value="Parasites">Parasites</option>
              </select>
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={3} md={2}>
            <PrimaryButton onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "SAVE"}
            </PrimaryButton>
          </CCol>
          <CCol xs={3} md={2}>
            <SecondaryButton onClick={() => addBack()}>CANCEL</SecondaryButton>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default Urinalysis;

{
  /* <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                Date *
              </label>
              <DatePicker
                showIcon
                selected={selectedDate}
                onChange={handleDateChange}
                isClearable
                closeOnScroll={true}
                wrapperClassName="date-picker-wrapper"
              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                Time *
              </label>
              <DatePicker
                showIcon
                selected={selectedTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                isClearable
                closeOnScroll={true}
                timeIntervals={5}
                dateFormat="h:mm aa"
              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Urine (μmol/kg/d)*
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={extractNum(defaultData?.urine)}
              />
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Urine (pH)*
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.ph}
              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Sugar (mg/dL)*
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.sugar}
              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Protein*
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.protein}

              />
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Leukocytes*
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.leukocytes}

              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                RBC*
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.rbc}

              />
            </div>
          </CCol>
        </CRow> */
}
