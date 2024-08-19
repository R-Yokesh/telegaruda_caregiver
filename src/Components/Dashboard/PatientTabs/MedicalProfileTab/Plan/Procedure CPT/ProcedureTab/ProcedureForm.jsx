import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import DatePicker from "react-datepicker";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { isValid, parse } from "date-fns";

const ProcedureForm = ({ back, defaultValues }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [disableText, setDisableText] = useState(false);
  const gravidaoptions = ["93000", "93009", "93001", "93002", "93003"];
  const findgravidaIndex =
    defaultValues?.id &&
    gravidaoptions?.indexOf(defaultValues?.id);
  const getSelectedGravida = (data) => {
    console.log(data);
    setDisableText(true);
  };

  const defaultDateTime = defaultValues?.date || "";

  // Split date and time
  const defaultDate = defaultDateTime.split(" ")[0] || "";
  const defaultTime = defaultValues?.time || "00:00";
  useEffect(() => {
    // Combine default date and time into a single Date object
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
      date.setSeconds(0); // Reset seconds
    }

    setDate(date);
    setTime(date);
  }, [defaultDate, defaultTime]);
  const handleTimeChange = (time) => {
    if (time) {
      const updatedDateTime = new Date(date || time);
      updatedDateTime.setHours(time.getHours());
      updatedDateTime.setMinutes(time.getMinutes());
      updatedDateTime.setSeconds(0); // Reset seconds

      setDate(updatedDateTime); // Optionally update date as well
      setTime(time);
    }
  };
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Date *
              </label>
              <div className="date-size">
                <DatePicker
                  showIcon
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat={DATE_FORMAT}
                />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Time *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={time}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                isClearable
                closeOnScroll={true}
                timeIntervals={5}
                dateFormat="h:mm aa"
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                CPT Code *
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.treatment}
              /> */}
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  getSelectedValue={getSelectedGravida}
                  options={gravidaoptions}
                  defaultValue={gravidaoptions[findgravidaIndex]}
                />
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={12}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Description *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                // defaultValue={defaultValues?.remark}
                disabled
                defaultValue={defaultValues?.description}
                value={
                  disableText
                    ? "Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report."
                    : null
                }
              />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-1">
        <div style={{ width: "128px" }}>
          <PrimaryButton>SAVE</PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default ProcedureForm;
