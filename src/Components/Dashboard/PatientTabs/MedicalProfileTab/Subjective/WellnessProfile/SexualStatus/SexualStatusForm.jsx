import { CCol, CRow, CFormCheck, CFormTextarea } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import useApi from "../../../../../../../ApiServices/useApi";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { format, parse } from "date-fns";

const SexualStatusForm = ({ back, defaultValues, from }) => {
  const [date, setDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [historySti, setHistorySti] = useState("no");
  const [historySexual, setHistorySexual] = useState("no");
  const [currentSti, setCurrentSti] = useState();
  const [stiNotes, setStiNotes] = useState("");
  const [allStatus, setAllStatus] = useState({});
  const [currentStiNotes, setCurrentStiNotes] = useState("");
  const { loading, error, post, patch, get, clearCache } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxDate = new Date(); // Restrict future dates

  // Fetch the latest record
  const fetchSexualStatus = useCallback(async () => {
    try {
      const response = await get(
        `resource/activity_wellness?act_catagory=sexual-status&user_id=${data?.user_id}&limit=1&page=1&order_by=act_date&dir=1`
      );
      if (response.code === 200) {
        const records = response?.data?.activity_wellnesses[0];
        console.log(records);
        setAllStatus(records);
        setHistorySexual(records?.act_type === "Active" ? "yes" : "no");
        setHistorySti(records?.detail?.is_sti || "no");
        const defaultDate = parse(
          records?.detail?.sti?.screen_date,
          DATE_FORMAT,
          new Date()
        );
        setSelectedDate(defaultDate);
        setStiNotes(records?.detail?.sti?.screen_notes);
        setCurrentSti(records?.detail?.sti?.status || "unknown");
        setCurrentStiNotes(records?.detail?.sti?.status_notes);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get]);

  useEffect(() => {
    fetchSexualStatus();
  }, [fetchSexualStatus]);

  const handleHistoryStiClick = (event) => {
    setHistorySti(event.target.value);
  };

  const handleHistorySexualClick = (event) => {
    setHistorySexual(event.target.value);
  };

  const handleCurrentStiClick = (event) => {
    setCurrentSti(event.target.value);
  };

  const statusEdit = async (selectedId) => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const url = `resource/activity_wellness/${selectedId}`; // Replace with your API endpoint
      const body = {
        patient_id: data?.user_id, //data?.user_id
        act_catagory: "sexual-status",
        act_type: historySexual === "yes" ? "Active" : "In active",
        detail: {
          is_sti: historySti,
          sti:
            historySti === "yes"
              ? {
                screen_date: format(selectedDate, DATE_FORMAT),
                screen_notes: stiNotes,
                status: currentSti,
                status_notes:
                  currentSti === "positive" ? currentStiNotes : "",
              }
              : {},
        },
      };
      await patch(url, body);
      clearCache();
      await fetchSexualStatus();
      toast.success("Updated successfully");
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      // Reset the loading state to false after the API call is done
      setIsSubmitting(false);
    }
  };
  const statusAdd = async () => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const url = `resource/activity_wellness`; // Replace with your API endpoint
      const body = {
        patient_id: data?.user_id, //data?.user_id
        act_catagory: "sexual-status",
        act_type: historySexual === "yes" ? "Active" : "In active",
        detail: {
          is_sti: historySti,
          sti:
            historySti === "yes"
              ? {
                screen_date: format(selectedDate, DATE_FORMAT),
                screen_notes: stiNotes,
                status: currentSti,
                status_notes:
                  currentSti === "positive" ? currentStiNotes : "",
              }
              : {},
        },
      };
      await post(url, body);
      clearCache();
      await fetchSexualStatus();
      toast.success("Added successfully");
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      // Reset the loading state to false after the API call is done
      setIsSubmitting(false);
    }
  };
  const validation = () => {
    const newErrors = {};

    if (historySti === "yes") {
      if (!selectedDate) {
        newErrors.selectedDate = "Last STI Screening Date is required.";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors to state
      return false;
    }

    return true;
  };
  const onSubmit = async () => {
    if (validation()) {
      if (allStatus?.id === undefined) {
        await statusAdd();
        setErrors("");
      }
      if (allStatus?.id !== undefined) {
        await statusEdit(allStatus?.id);
        setErrors("");
      }
    }
  };
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={6}>
          <p className="radio-label">Sexual Activity</p>
          <div className="d-flex align-items-end w-100">
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
                id="activityYes"
                value="yes"
                label={<label className="form-label mb-0">Active</label>}
                name="activity"
                checked={historySexual === "yes"}
                onChange={handleHistorySexualClick}
                disabled={from === "Consult"}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="activityNo"
                value="no"
                label={<label className="form-label mb-0">Not Active</label>}
                name="activity"
                checked={historySexual === "no"}
                onChange={handleHistorySexualClick}
                disabled={from === "Consult"}
              />
            </div>
          </div>
        </CCol>

        <CCol lg={6}>
          <p className="radio-label">History of STI</p>
          <div className="d-flex align-items-end w-100">
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
                id="historyYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="sti"
                checked={historySti === "yes"}
                onChange={handleHistoryStiClick}
                disabled={from === "Consult"}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="historyNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="sti"
                checked={historySti === "no"}
                onChange={handleHistoryStiClick}
                disabled={from === "Consult"}
              />
            </div>
          </div>
        </CCol>
      </CRow>

      {historySti === "yes" && (
        <>
          <CRow className="mb-3">
            <CCol lg={6}>
              <div className="position-relative">
                <label className="form-label">Last STI Screening Date *</label>
                <div className="date-size">
                  <DatePicker
                    showIcon
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat={DATE_FORMAT}
                    maxDate={maxDate}
                  />
                </div>
                {errors.selectedDate && (
                  <p className="text-danger">{errors.selectedDate}</p>
                )}
              </div>
            </CCol>
            <CCol lg={6}>
              <div style={{ width: "100%" }}>
                <div className="position-relative">
                  <label className="form-label">STI History Notes</label>
                  <CFormTextarea
                    type="text"
                    className="form-control pad-10"
                    id="sti_history_notes"
                    placeholder="Enter"
                    defaultValue={stiNotes}
                    disabled={from === "Consult"}
                    onChange={(e) => setStiNotes(e.target.value)}
                  />
                </div>
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol lg={6}>
              <p className="radio-label">Current STI Status</p>
              <div className="d-flex align-items-end w-100">
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
                    id="statusPositive"
                    value="positive"
                    label={<label className="form-label mb-0">Positive</label>}
                    name="sti_status"
                    checked={currentSti === "positive"}
                    onChange={handleCurrentStiClick}
                    disabled={from === "Consult"}
                  />
                  <CFormCheck
                    className="mb-0"
                    inline
                    type="radio"
                    id="statusNegative"
                    value="negative"
                    label={<label className="form-label mb-0">Negative</label>}
                    name="sti_status"
                    checked={currentSti === "negative"}
                    onChange={handleCurrentStiClick}
                    disabled={from === "Consult"}
                  />
                  <CFormCheck
                    className="mb-0"
                    inline
                    type="radio"
                    id="statusUnknown"
                    value="unknown"
                    label={<label className="form-label mb-0">Unknown</label>}
                    name="sti_status"
                    checked={currentSti === "unknown"}
                    onChange={handleCurrentStiClick}
                    disabled={from === "Consult"}
                  />
                </div>
              </div>
            </CCol>
            {currentSti === "positive" && (
              <CCol lg={6}>
                <div style={{ width: "100%" }}>
                  <div className="position-relative">
                    <label className="form-label">
                      Current STI Status Notes
                    </label>
                    <CFormTextarea
                      type="text"
                      className="form-control pad-10"
                      id="current_sti_notes"
                      placeholder="Enter"
                      defaultValue={currentStiNotes}
                      disabled={from === "Consult"}
                      onChange={(e) => setCurrentStiNotes(e.target.value)}
                    />
                  </div>
                </div>
              </CCol>
            )}
          </CRow>
        </>
      )}

      {from !== "Consult" && (
        <CRow className="mb-1">
          <div style={{ width: "128px" }}>
            {/* <PrimaryButton onClick={onSubmit}>
              {allStatus?.id !== undefined ? "UPDATE" : "ADD"}
            </PrimaryButton> */}
            <PrimaryButton onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : allStatus?.id !== undefined ? "UPDATE" : "ADD"}
            </PrimaryButton>

          </div>
          <div style={{ width: "128px" }}>
            <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
          </div>
        </CRow>
      )}
    </>
  );
};

export default SexualStatusForm;
