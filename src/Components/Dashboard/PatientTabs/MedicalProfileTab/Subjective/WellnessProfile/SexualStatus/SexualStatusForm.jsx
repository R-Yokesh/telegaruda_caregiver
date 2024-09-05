import { CCol, CRow, CFormCheck, CFormTextarea } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import useApi from "../../../../../../../ApiServices/useApi";
import { DATE_FORMAT } from "../../../../../../../Config/config";

const SexualStatusForm = ({ back, defaultValues, from }) => {
  const [date, setDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [historySti, setHistorySti] = useState(false);
  const [historySexual, setHistorySexual] = useState(false);
  const [currentSti, setCurrentSti] = useState(false);
  const [stiNotes, setStiNotes] = useState('');
  const [currentStiNotes, setCurrentStiNotes] = useState('');
  const { loading, error, post, patch,get, clearCache } = useApi();
  

  // Fetch the latest record
  const fetchSexualStatus = useCallback(async () => {
    try {
      const response = await get(
        `resource/activity_wellness?limit=10&page=1&order_by=act_date&dir=desc&act_catagory=sexual-status&user_id=10`
      );
      if (response.code === 200) {
        const records = response?.data?.activity_wellnesses;
        if (records && records.length > 0) {
          // Sort records by date in descending order to get the latest record
          const sortedRecords = records.sort((a, b) => new Date(b.detail.sti.screen_date) - new Date(a.detail.sti.screen_date));
          const latestRecord = sortedRecords[0];
          const { sti, is_sti, sexual_activity } = latestRecord.detail;

          // Set state directly based on API response values
          setHistorySti(is_sti); // Dynamic value from API response
          setDate(sti.screen_date ? new Date(sti.screen_date) : null); // Set the date picker if date is available
          setCurrentSti(sti.status); // Dynamic value from API response
          setStiNotes(sti.screen_notes); // Dynamic value from API response
          setCurrentStiNotes(sti.status_notes); // Dynamic value from API response
          setHistorySexual(sexual_activity); // Dynamic value from API response
        }
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
                label={<label className="form-label mb-0">Yes</label>}
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
                label={<label className="form-label mb-0">No</label>}
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
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat={DATE_FORMAT}
                  />
                </div>
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
                    <label className="form-label">Current STI Status Notes</label>
                    <CFormTextarea
                      type="text"
                      className="form-control pad-10"
                      id="current_sti_notes"
                      placeholder="Enter"
                      defaultValue={currentStiNotes}
                      disabled={from === "Consult"}
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
            <PrimaryButton>SAVE</PrimaryButton>
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
