import { CCol, CFormCheck, CFormSelect, CRow, CFormTextarea } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";

const TherapiesForm = ({ back, defaultValues }) => {

    const options = ["Physical", "Occupational", "Speech","Psychotherapy","Others"];

    const getSelectedValue = (data) => {
        console.log(data);
    };

    const options1 = ["one", "Two", "Three",];

    const getSelectedValue1 = (data) => {
        console.log(data);
    };


    return (
        <>
            <CRow className="mb-3">
                <CCol lg={4}>
                    <div style={{ width: "100%" }}>
                        <div class="position-relative">
                            <label for="validationTooltip01" class="form-label">
                                Type *
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
                                    getSelectedValue={getSelectedValue}
                                />
                            </div>
                        </div>
                    </div>
                </CCol>
                <CCol lg={4}>
                    <div style={{ width: "100%" }}>
                        <div class="position-relative">
                            <label for="validationTooltip01" class="form-label">
                                Therapy Name *
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
                                    getSelectedValue={getSelectedValue1}
                                />
                            </div>
                        </div>
                    </div>
                </CCol>
                <CCol lg={4}>
                <div style={{ width: "100%" }}>
                        <div class="position-relative">
                            <label for="validationTooltip01" class="form-label">
                                Therapy Name *
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
                                    getSelectedValue={getSelectedValue1}
                                />
                            </div>
                        </div>
                    </div>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                        <div className="position-relative">
                            <label htmlFor="validationTooltip01" className="form-label">
                                Duration (in days)
                            </label>
                            <input
                                type="text"
                                className="form-control pad-10"
                                id="validationTooltip01"
                                placeholder="00"
                                defaultValue={defaultValues?.duration}
                            />
                        </div>
                    </div>
                </CCol>
                <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                        <div className="position-relative">
                            <label htmlFor="validationTooltip01" className="form-label">
                               Notes
                            </label>
                            <input
                                type="text"
                                className="form-control pad-10"
                                id="validationTooltip01"
                                placeholder="Enter"
                                defaultValue={defaultValues?.notes}
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

export default TherapiesForm