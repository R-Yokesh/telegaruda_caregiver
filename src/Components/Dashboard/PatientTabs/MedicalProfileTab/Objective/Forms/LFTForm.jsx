import { CCol, CContainer, CRow, CFormTextarea } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import useApi from "../../../../../../ApiServices/useApi";
import { format, isValid, parse } from "date-fns";
import { toast } from "react-toastify";
import { CustomInput, getCurrentTime } from "../../../../../../Utils/dateUtils";
import { DATE_FORMAT } from "../../../../../../Config/config";
import { useLocation } from "react-router-dom";
import "./LFTForm.css";
import { Assets } from "../../../../../../assets/Assets";

const LFTForm = ({ addBack, defaultData, getTableDatas }) => {
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const { post, patch } = useApi();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [fvcL, setFvcL] = useState(defaultData?.["fvc_(%)"] || "");
  const [fvcPercent, setFvcPercent] = useState(defaultData?.fvcPercent || "");
  const [fev1L, setFev1L] = useState(defaultData?.["fev1_(%)"] || "");
  const [fev1Percent, setFev1Percent] = useState(
    defaultData?.fev1Percent || ""
  );
  const [pefL, setPefL] = useState(defaultData?.["pef_(%)"]);
  const [pefPercent, setPefPercent] = useState(defaultData?.pefPercent);
  const [fev1FvcPercent, setFev1FvcPercent] = useState(
    defaultData?.["fev1/fvc_(%)"]
  );
  const [fef25L, setFef25L] = useState(defaultData?.fef25);
  const [fef25Percent, setFef25Percent] = useState(defaultData?.fef25Percent);
  const [fef50L, setFef50L] = useState(defaultData?.fef50);
  const [fef50Percent, setFef50Percent] = useState(defaultData?.fef50Percent);
  const [fef75L, setFef75L] = useState(defaultData?.fef75);
  const [fef75Percent, setFef75Percent] = useState(defaultData?.fef75Percent);
  const [fef2575L, setFef2575L] = useState(defaultData?.fef2575);
  const [fef2575Percent, setFef2575Percent] = useState(
    defaultData?.fef2575Percent
  );
  const [notes, setNotes] = useState(defaultData?.notes);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxDate = new Date(); // Restrict future dates
  const defaultDateTime = defaultData?.date;

  // Split date and time
  const defaultDate = defaultDateTime?.split(" ")[0] || "";
  const defaultTime = defaultDateTime?.split(" ")[1] || getCurrentTime();
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
      const [hours, minutes] = defaultTime?.split(":").map(Number);
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0); // Reset seconds
    }

    setSelectedDate(date);
    setSelectedTime(date); // Initialize time picker with the same Date object
  }, [defaultDate, defaultTime]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setSelectedTime(date); // Sync time picker with the updated date
    }
  };

  const handleTimeChange = (time) => {
    if (time) {
      const updatedDateTime = new Date(selectedDate || time);
      updatedDateTime.setHours(time.getHours());
      updatedDateTime.setMinutes(time.getMinutes());
      updatedDateTime.setSeconds(0); // Reset seconds

      setSelectedDate(updatedDateTime); // Optionally update date as well
      setSelectedTime(time);
    }
  };

  const numWithDecimal = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/^(\d{2})\d*$/, "$1")
      .replace(/^(\d{2})\.(\d{2}).*$/, "$1.$2")
      .replace(/(\..*)\./g, "$1");
  };

  const convertNum = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };
  // Validate inputs
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!selectedDate) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    if (!selectedTime) {
      newErrors.time = "Time is required";
      isValid = false;
    }
    // if (!notes) {
    //   newErrors.notes = "Notes is required";
    //   isValid = false;
    // }
    // Check required numerical fields
    const fields = [
      {
        name: "fvcL",
        value: fvcL,
        maxLength: 5,
        required: true,
        label: "FVC (l)",
      },
      {
        name: "fvcPercent",
        value: fvcPercent,
        maxLength: 2,
        required: true,
        label: "FVC (%)",
      },
      {
        name: "fev1L",
        value: fev1L,
        maxLength: 5,
        required: true,
        label: "FEV1 (l)",
      },
      {
        name: "fev1Percent",
        value: fev1Percent,
        maxLength: 2,
        required: true,
        label: "FEV1 (%)",
      },
      // {
      //   name: "pefL",
      //   value: pefL,
      //   maxLength: 5,
      //   required: true,
      //   label: "PEF (L/s)",
      // },
      // {
      //   name: "pefPercent",
      //   value: pefPercent,
      //   maxLength: 2,
      //   required: true,
      //   label: "PEF (%)",
      // },
      {
        name: "fev1FvcPercent",
        value: fev1FvcPercent,
        maxLength: 2,
        required: true,
        label: "FEV1/FVC (%)",
      },
    ];
    fields.forEach((field) => {
      if (
        field.required &&
        (field.value === undefined ||
          field.value === null ||
          field.value === "")
      ) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      } else if (field.maxLength && field.value.length > field.maxLength) {
        newErrors[
          field.name
        ] = `Maximum length is ${field.maxLength} characters`;
        isValid = false;
      } else if (isNaN(field.value)) {
        newErrors[field.name] = "Must be a number";
        isValid = false;
      } else if (field.value <= 0) {
        // Check if the value is less than or equal to 0
        newErrors[field.name] = `${field.label} must be greater than 0`;
        isValid = false;
      }
    });
    // fields?.forEach((field) => {
    //   if (field?.required && !field?.value) {
    //     newErrors[field?.name] = `${field?.label} is required`;
    //     isValid = false;
    //   } else if (field?.maxLength && field?.value?.length > field?.maxLength) {
    //     newErrors[
    //       field.name
    //     ] = `Maximum length is ${field.maxLength} characters`;
    //     isValid = false;
    //   } else if (isNaN(field.value)) {
    //     newErrors[field.name] = "Must be a number";
    //     isValid = false;
    //   }
    // });

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = () => {
    if (validateForm()) {
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
          date: format(selectedDate, "dd-MM-yyyy"),
          time: format(selectedTime, "HH:mm"),
          fvc: Number(fvcL),
          fvcPercent: Number(fvcPercent),
          fev1: Number(fev1L),
          fev1Percent: Number(fev1Percent),
          fev1_fvc: Number(fev1FvcPercent),
          pef: Number(pefL),
          pefPercent: Number(pefPercent),
          fef25: Number(fef25L),
          fef25Percent: Number(fef25Percent),
          fef50: Number(fef50L),
          fef50Percent: Number(fef50Percent),
          fef75: Number(fef75L),
          fef75Percent: Number(fef75Percent),
          fef2575: Number(fef2575L),
          fef2575Percent: Number(fef2575Percent),
          notes: notes,
        },
        user_id: data?.user_id,
        slug: "spirometer",
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
          date: format(selectedDate, "dd-MM-yyyy"),
          time: format(selectedTime, "HH:mm"),
          fvc: Number(fvcL),
          fvcPercent: Number(fvcPercent),
          fev1: Number(fev1L),
          fev1Percent: Number(fev1Percent),
          fev1_fvc: Number(fev1FvcPercent),
          pef: Number(pefL),
          pefPercent: Number(pefPercent),
          fef25: Number(fef25L),
          fef25Percent: Number(fef25Percent),
          fef50: Number(fef50L),
          fef50Percent: Number(fef50Percent),
          fef75: Number(fef75L),
          fef75Percent: Number(fef75Percent),
          fef2575: Number(fef2575L),
          fef2575Percent: Number(fef2575Percent),
          notes: notes,
        },
        user_id: data?.user_id,
        slug: "spirometer",
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

  const handleClear = () => {
    setSelectedTime(null); // Clear the selected time
  };
  const handleDateClear = () => {
    setSelectedDate(null); // Clear the selected time
    setSelectedTime(null);
  };
  return (
    <>
      <CContainer>
        <CRow className="mb-3">
          <CCol lg={6}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                Date *
              </label>
              <div className="w-100 d-flex align-items-center gap-2">
                <div style={{ width: "80%" }}>
                  <DatePicker
                    showIcon
                    selected={selectedDate}
                    onChange={handleDateChange}
                    // isClearable
                    closeOnScroll={true}
                    wrapperClassName="date-picker-wrapper"
                    dateFormat={DATE_FORMAT}
                    maxDate={maxDate}
                  />
                </div>
                <div style={{ width: "20%" }}>
                  {selectedDate && (
                    <img
                      src={Assets.Close}
                      onClick={handleDateClear}
                      alt="close"
                      style={{
                        borderRadius: "15px",
                        height: "18px",
                      }}
                      className="cursor"
                    />
                  )}
                </div>
              </div>

              {errors.date && <div className="error-text">{errors.date}</div>}
            </div>
          </CCol>
          <CCol lg={6}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                Time *
              </label>
              <div className="w-100 d-flex align-items-center gap-2">
                <div style={{ width: "80%" }}>
                  <DatePicker
                    selected={selectedTime}
                    onChange={handleTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    closeOnScroll={true}
                    timeIntervals={5}
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    customInput={<CustomInput />}
                    showIcon={false}
                    wrapperClassName="time-picker-style"
                  />
                </div>
                <div style={{ width: "20%" }}>
                  {selectedTime && (
                    <img
                      src={Assets.Close}
                      onClick={handleClear}
                      alt="close"
                      style={{
                        borderRadius: "15px",
                        height: "18px",
                      }}
                      className="cursor"
                    />
                  )}
                </div>
              </div>
              {errors.time && <div className="error-text">{errors.time}</div>}
            </div>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol lg={4}>
            <div className="fvc-container">
              <table className="fvc-table">
                <thead>
                  <tr>
                    <th colSpan="2" className="head">
                      FVC *
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={5}
                        onInput={numWithDecimal}
                        value={fvcL}
                        onChange={(e) => setFvcL(e.target.value)}
                      />
                      (l)
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={2}
                        onInput={convertNum}
                        value={fvcPercent}
                        onChange={(e) => setFvcPercent(e.target.value)}
                      />
                      (%)
                    </td>
                  </tr>
                  {errors.fvcL && (
                    <div className="error-text">{errors.fvcL}</div>
                  )}
                  {errors.fvcPercent && (
                    <div className="error-text">{errors.fvcPercent}</div>
                  )}
                </tbody>
              </table>
            </div>
          </CCol>
          <CCol lg={4}>
            <div className="fvc-container">
              <table className="fvc-table">
                <thead>
                  <tr>
                    <th colSpan="2" className="head">
                      {" "}
                      FEV1 *
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={5}
                        onInput={numWithDecimal}
                        value={fev1L}
                        onChange={(e) => setFev1L(e.target.value)}
                      />
                      (l)
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={2}
                        onInput={convertNum}
                        value={fev1Percent}
                        onChange={(e) => setFev1Percent(e.target.value)}
                      />
                      (%)
                    </td>
                  </tr>
                  {errors.fev1L && (
                    <div className="error-text">{errors.fev1L}</div>
                  )}
                  {errors.fev1Percent && (
                    <div className="error-text">{errors.fev1Percent}</div>
                  )}
                </tbody>
              </table>
            </div>
          </CCol>
          <CCol lg={4}>
            <div className="fvc-container">
              <table className="fvc-table">
                <thead>
                  <tr>
                    <th colSpan="2" className="head">
                      {" "}
                      PEF
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={5}
                        onInput={numWithDecimal}
                        value={pefL}
                        onChange={(e) => setPefL(e.target.value)}
                      />
                      (l/s)
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={2}
                        onInput={convertNum}
                        value={pefPercent}
                        onChange={(e) => setPefPercent(e.target.value)}
                      />
                      (%)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol lg={4}>
            <div className="fvc-container">
              <table className="fvc-table">
                <thead>
                  <tr>
                    <th colSpan="2" className="head">
                      FEF25
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={5}
                        onInput={numWithDecimal}
                        value={fef25L}
                        onChange={(e) => setFef25L(e.target.value)}
                      />
                      (l/s)
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={2}
                        onInput={convertNum}
                        value={fef25Percent}
                        onChange={(e) => setFef25Percent(e.target.value)}
                      />
                      (%)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CCol>
          <CCol lg={4}>
            <div className="fvc-container">
              <table className="fvc-table">
                <thead>
                  <tr>
                    <th colSpan="2" className="head">
                      FEF50
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={5}
                        onInput={numWithDecimal}
                        value={fef50L}
                        onChange={(e) => setFef50L(e.target.value)}
                      />
                      (l/s)
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={2}
                        onInput={convertNum}
                        value={fef50Percent}
                        onChange={(e) => setFef50Percent(e.target.value)}
                      />
                      (%)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CCol>
          <CCol lg={4}>
            <div className="fvc-container">
              <table className="fvc-table">
                <thead>
                  <tr>
                    <th colSpan="2" className="head">
                      FEF75
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={5}
                        onInput={numWithDecimal}
                        value={fef75L}
                        onChange={(e) => setFef75L(e.target.value)}
                      />
                      (l/s)
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={2}
                        onInput={convertNum}
                        value={fef75Percent}
                        onChange={(e) => setFef75Percent(e.target.value)}
                      />
                      (%)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div className="fvc-container">
              <table className="fvc-table">
                <thead>
                  <tr>
                    <th colSpan="2" className="head">
                      FEF2575{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={5}
                        onInput={numWithDecimal}
                        value={fef2575L}
                        onChange={(e) => setFef2575L(e.target.value)}
                      />
                      (l/s)
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter"
                        className="fvc-input"
                        maxLength={2}
                        onInput={convertNum}
                        value={fef2575Percent}
                        onChange={(e) => setFef2575Percent(e.target.value)}
                      />
                      (%)
                    </td>
                  </tr>
                  {errors.pefL && (
                    <div className="error-text">{errors.pefL}</div>
                  )}
                  {errors.pefPercent && (
                    <div className="error-text">{errors.pefPercent}</div>
                  )}
                </tbody>
              </table>
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                FEV1/FVC *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={defaultData?.["fev1/fvc"]}
                maxLength={2}
                onInput={numWithDecimal}
                value={fev1FvcPercent}
                onChange={(e) => setFev1FvcPercent(e.target.value)}
              />
              {errors.fev1FvcPercent && (
                <div className="error-text">{errors.fev1FvcPercent}</div>
              )}
            </div>
          </CCol>
        </CRow>

        <CRow className="mb-3"></CRow>
        <CRow className="mb-3">
          <CCol lg={8}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Notes
              </label>
              <CFormTextarea
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              {errors.notes && <div className="error-text">{errors.notes}</div>}
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

export default LFTForm;
