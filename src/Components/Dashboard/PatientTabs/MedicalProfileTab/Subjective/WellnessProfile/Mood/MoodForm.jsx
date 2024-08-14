import { CCol, CRow, CFormCheck } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";


const MoodForm = ({ back, defaultValues }) => {

    const [date, setDate] = useState(null);

    useEffect(() => {
        // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
        const parseDateString = (dateString) => {
            const parts = dateString?.split(" ");
            const datePart = parts[0];
            const timePart = parts[1];
            const [month, day, year] = datePart?.split("-")?.map(Number);
            const [hours, minutes] = timePart?.split(":")?.map(Number);
            const date = new Date(year, month - 1, day, hours, minutes);
            return date;
        };

        // Example default date string
        const defaultDateString = defaultValues?.date;

        // Parse default date string to Date object
        const defaultDate = defaultValues?.date
            ? parseDateString(defaultDateString)
            : new Date();

        // Set default date in state
        setDate(defaultDate);
    }, [defaultValues]);





    return (
        <>
            <CRow className="mb-3">
                <CCol lg={6}>
                    <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                            Date *
                        </label>
                        <div className="date-size">
                            <DatePicker
                                showIcon
                                selected={date}
                                onChange={(date) => setDate(date)}
                            //  dateFormat="MM-dd-yyyy"
                            />
                        </div>
                    </div>
                </CCol>
                <CCol lg={6}>
                    <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                            Time *
                        </label>
                        <div className="date-size">
                            <DatePicker
                                showIcon
                                selected={date}
                                onChange={(date) => setDate(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        </div>
                    </div>
                </CCol>

            </CRow>
            <CRow className="mb-3">
                <p className="radio-label">Type *</p>
                <CCol lg={12}>

                    <div className="h-100 d-flex align-items-end w-100 ">

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
                                label={
                                    <label
                                        for="validationTooltip01"
                                        class="form-label mb-0"
                                    >
                                        Happy
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
                                    <label
                                        for="validationTooltip01"
                                        class="form-label mb-0"
                                    >
                                        Sad
                                    </label>
                                }
                                name="food"
                            />
                            <CFormCheck
                                className="mb-0"
                                inline
                                type="radio"
                                id="inlineCheckbox3"
                                value="af"
                                label={
                                    <label
                                        for="validationTooltip01"
                                        class="form-label mb-0"
                                    >
                                        Angry
                                    </label>
                                }
                                name="food"
                            />
                            <CFormCheck
                                className="mb-0"
                                inline
                                type="radio"
                                id="inlineCheckbox4"
                                value="af"
                                label={
                                    <label
                                        for="validationTooltip01"
                                        class="form-label mb-0"
                                    >
                                        Relaxed
                                    </label>
                                }
                                name="food"
                            />
                            <CFormCheck
                                className="mb-0"
                                inline
                                type="radio"
                                id="inlineCheckbox5"
                                value="af"
                                label={
                                    <label
                                        for="validationTooltip01"
                                        class="form-label mb-0"
                                    >
                                        Excited
                                    </label>
                                }
                                name="food"
                            />
                            <CFormCheck
                                className="mb-0"
                                inline
                                type="radio"
                                id="inlineCheckbox6"
                                value="af"
                                label={
                                    <label
                                        for="validationTooltip01"
                                        class="form-label mb-0"
                                    >
                                        Anxious
                                    </label>
                                }
                                name="food"
                            />
                            <CFormCheck
                                className="mb-0"
                                inline
                                type="radio"
                                id="inlineCheckbox7"
                                value="af"
                                label={
                                    <label
                                        for="validationTooltip01"
                                        class="form-label mb-0"
                                    >
                                        Content
                                    </label>
                                }
                                name="food"
                            />
                            <CFormCheck
                                className="mb-0"
                                inline
                                type="radio"
                                id="inlineCheckbox8"
                                value="af"
                                label={
                                    <label
                                        for="validationTooltip01"
                                        class="form-label mb-0"
                                    >
                                        Frustrated
                                    </label>
                                }
                                name="food"
                            />
                            <CFormCheck
                                className="mb-0"
                                inline
                                type="radio"
                                id="inlineCheckbox9"
                                value="af"
                                label={
                                    <label
                                        for="validationTooltip01"
                                        class="form-label mb-0"
                                    >
                                        Surprised
                                    </label>
                                }
                                name="food"
                            />
                            <CFormCheck
                                className="mb-0"
                                inline
                                type="radio"
                                id="inlineCheckbox10"
                                value="af"
                                label={
                                    <label
                                        for="validationTooltip01"
                                        class="form-label mb-0"
                                    >
                                        Confident
                                    </label>
                                }
                                name="food"
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
    )
}

export default MoodForm