import { CCol, CContainer, CFormInput, CRow } from "@coreui/react";
import React from "react";
import "./AccountsForm.css";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";
const AccountsForm = () => {
  return (
    <div>
      <CContainer className="form-container-whole">
        <CRow className="mb-3">
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>First Name</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>Last Name *</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>Blood Group</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={6} md={4}>
            <CFormInput
              type="date"
              id="exampleFormControlInput1"
              label={<span>First Name</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
            {/* <CDatePicker date="2022/2/16" label="Date Picker" locale="en-US" /> */}
          </CCol>
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>Gender *</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>Address 1 *</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>Address 2 *</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>City *</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>Zipcode</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>State *</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>Country *</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>Timezone *</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>Mobile *</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
          <CCol xs={6} md={4}>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label={<span>Email *</span>}
              placeholder="Enter"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
          <CCol xs={6} md={4}></CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={3} md={2}>
            <PrimaryButton>SAVE</PrimaryButton>
          </CCol>
          <CCol xs={3} md={2}>
            <SecondaryButton>CANCEL</SecondaryButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AccountsForm;
