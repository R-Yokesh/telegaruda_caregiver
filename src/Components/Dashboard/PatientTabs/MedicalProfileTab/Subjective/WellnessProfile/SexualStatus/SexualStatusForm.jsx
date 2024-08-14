import { CCol, CRow, CFormCheck ,CFormTextarea} from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";

const SexualStatusForm = ({ back, defaultValues }) => {
    const [date, setDate] = useState(null);
    const [historySti, setHistorySti] = useState(false);
    const [currentSti, setCurrentSti] = useState(false);

    useEffect(() => {
        const parseDateString = (dateString) => {
            const parts = dateString?.split(" ");
            const datePart = parts[0];
            const [month, day, year] = datePart?.split("-")?.map(Number);
            return new Date(year, month - 1, day);
        };

        const defaultDateString = defaultValues?.date;
        const defaultDate = defaultValues?.date ? parseDateString(defaultDateString) : new Date();
        setDate(defaultDate);
    }, [defaultValues]);

    const handleHistoryStiClick = (event) => {
        setHistorySti(event.target.value === "yes");
    };

    const handleCurrentStiClick = (event) => {
        setCurrentSti(event.target.value === "positive");
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
                            />
                            <CFormCheck
                                className="mb-0"
                                inline
                                type="radio"
                                id="activityNo"
                                value="no"
                                label={<label className="form-label mb-0">No</label>}
                                name="activity"
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
                                checked={historySti === true}
                                onChange={handleHistoryStiClick}
                            />
                            <CFormCheck
                                className="mb-0"
                                inline
                                type="radio"
                                id="historyNo"
                                value="no"
                                label={<label className="form-label mb-0">No</label>}
                                name="sti"
                                checked={historySti === false}
                                onChange={handleHistoryStiClick}
                            />
                        </div>
                    </div>
                </CCol>
            </CRow>

            {historySti && (
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
                                            class="form-control  pad-10"
                                            id="validationTooltip01"
                                            placeholder="Enter"
                                            defaultValue={defaultValues?.sti_current_notes}
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
                                        checked={currentSti === true}
                                        onChange={handleCurrentStiClick}
                                    />
                                    <CFormCheck
                                        className="mb-0"
                                        inline
                                        type="radio"
                                        id="statusNegative"
                                        value="negative"
                                        label={<label className="form-label mb-0">Negative</label>}
                                        name="sti_status"
                                        checked={currentSti === false}
                                        onChange={handleCurrentStiClick}
                                    />
                                    <CFormCheck
                                        className="mb-0"
                                        inline
                                        type="radio"
                                        id="statusUnknown"
                                        value="unknown"
                                        label={<label className="form-label mb-0">Unknown</label>}
                                        name="sti_status"
                                        checked={currentSti === false}
                                        onChange={handleCurrentStiClick}
                                    />
                                </div>
                            </div>
                        </CCol>
                        {currentSti && (
                            <CCol lg={6}>
                                <div style={{ width: "100%" }}>
                                    <div className="position-relative">
                                        <label className="form-label">Current STI Notes</label>
                                        <CFormTextarea
                                            type="text"
                                            class="form-control  pad-10"
                                            id="validationTooltip01"
                                            placeholder="Enter"
                                            defaultValue={defaultValues?.name}
                                        />
                                    </div>
                                </div>
                            </CCol>
                        )}
                    </CRow>
                </>
            )}

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

export default SexualStatusForm;
