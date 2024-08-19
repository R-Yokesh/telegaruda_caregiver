import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";

const Urinalysis = ({ addBack, defaultData }) => {
  console.log("first", defaultData);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cell, setCell] = useState();

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
  return (
    <>
      <CContainer>
        {/* <CRow className="mb-3">
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
        </CRow> */}
        <CRow className="mb-3">
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Color *
              </label>
              <select class="form-select" aria-label="Disabled select example">
                <option>Select</option>
                <option value="straw">Straw</option>
                <option value="yellow">Yellow</option>
                <option value="amber">Amber</option>
                <option value="red">Red</option>
                <option value="brown">Brown</option>
                <option value="green">Green</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Clarity *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                // defaultValue={"clear"}
              >
                <option>Select</option>
                <option value="clear">Clear</option>
                <option value="slightly cloudy">Slightly Cloudy</option>
                <option value="cloudy">Cloudy</option>
                <option value="turbid">Turbid</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Specific Gravity 
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.ph}
                placeholder="Enter"
                maxLength={5}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/^(\d{2})\.(\d{2}).*$/, "$1.$2") 
                    .replace(/(\..*)\./g, "$1");
                }}
              />
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            {/* <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                pH *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                // defaultValue={"Normal"}
              >
                <option>Select</option>
                <option value="Normal (6-7)">Normal (6-7)</option>
                <option value="Acidic(<6)">Acidic ({"<"}6)</option>
                <option value="Alkaline(>7)">Alkaline ({">"}7)</option>
              </select>
            </div> */}
             <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
              pH *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.ph}
                placeholder="Enter"
                maxLength={5}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/^(\d{2})\.(\d{2}).*$/, "$1.$2") 
                    .replace(/(\..*)\./g, "$1");
                }}
              />
            </div>

          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Protein *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                // defaultValue={"Trace"}
              >
                <option>Select</option>
                <option value="Trace">Trace</option>
                <option value="1+ (30 mg/dL)">1+ (30 mg/dL)</option>
                <option value="2+ (100 mg/dL)">2+ (100 mg/dL)</option>
                <option value="3+ (300 mg/dL)">3+ (300 mg/dL)</option>
                <option value="4+ (>2000 mg/dL)">4+ ({">"}2000 mg/dL)</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Glucose *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                // defaultValue={"Negative"}
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Trace">Trace</option>
                <option value="1+ (100 mg/dL)">1+ (100 mg/dL)</option>
                <option value="2+ (250 mg/dL)">2+ (250 mg/dL)</option>
                <option value="3+ (500 mg/dL)">3+ (500 mg/dL)</option>
                <option value="4+ (1000 mg/dL)">4+ (1000 mg/dL)</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Ketones *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                // defaultValue={"Negative"}
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Trace">Trace</option>
                <option value="Small (1+) mg/dL">Small (1+) mg/dL</option>
                <option value="Moderate (2+) mg/dL">Moderate (2+) mg/dL</option>
                <option value="Large (3+) mg/dL">Large (3+) mg/dL</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Blood in Urine *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                // defaultValue={"Negative"}
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Trace">Trace</option>
                <option value="Small (1+) mg/dL">Small (1+) mg/dL</option>
                <option value="Moderate (2+) mg/dL">Moderate (2+) mg/dL</option>
                <option value="Large (3+) mg/dL">Large (3+) mg/dL</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Leukocyte Esterase *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                // defaultValue={"Negative"}
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Trace">Trace</option>
                <option value="Small (1+) mg/dL">Small (1+) mg/dL</option>
                <option value="Moderate (2+) mg/dL">Moderate (2+) mg/dL</option>
                <option value="Large (3+) mg/dL">Large (3+) mg/dL</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Nitrites *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                // defaultValue={"Negative"}
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Positive">Positive</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Urobilinogen *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.ph}
                placeholder="Enter"
                maxLength={3}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/^(\d{2})\.(\d{2}).*$/, "$1.$2") 
                    .replace(/(\..*)\./g, "$1");
                }}
              />
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Bilirubin *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                // defaultValue={"Negative"}
              >
                <option>Select</option>
                <option value="Negative">Negative</option>
                <option value="Positive">Positive</option>
              </select>
            </div>
          </CCol>
        </CRow>
        <div className="vertical-line mb-3"></div>
        <CRow>
        <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
              Red Blood Cells
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.ph}
                placeholder="Enter"
                maxLength={2}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
                }}
              />
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
              White Blood Cells
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.ph}
                placeholder="Enter"
                maxLength={2}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
                }}
              />
            </div>
          </CCol>
          <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
              Epithelial Cells 
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                // defaultValue={"Red Blood Cell"}
                // onChange={(e) => setCell(e.target.value)}
              >
                <option>Select</option>
                <option value="Red Blood Cell">Squamous Epithelial Cells</option>
                <option value="White Blood Cell">Transitional Epithelial Cells</option>
                <option value="Epithelial Cell">Renal Tubular Epithelial Cells</option>
              </select>
            </div>
          </CCol>
         
          {/* {cell === "Epithelial Cell" && (
            <CCol lg={4} className="mb-3">
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Epithelial Cells *
                </label>
                <select
                  class="form-select"
                  aria-label="Disabled select example"
                  // defaultValue={"Squamous Epithelial Cells"}
                >
                  <option>Select</option>

                  <option value="Squamous Epithelial Cells">
                    Squamous Epithelial Cells
                  </option>
                  <option value="Transitional Epithelial Cells">
                    Transitional Epithelial Cells
                  </option>
                  <option value="Renal Tubular Epithelial Cells">
                    Renal Tubular Epithelial Cells
                  </option>
                </select>
              </div>
            </CCol>
          )} */}
        </CRow>
        <CRow className="mb-3"> 
        <CCol lg={4} className="mb-3">
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Crystals *
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
                Microorganisms *
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
            <PrimaryButton onClick={() => addBack()}>SAVE</PrimaryButton>
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
