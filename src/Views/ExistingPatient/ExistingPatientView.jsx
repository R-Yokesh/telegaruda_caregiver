import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import PatientCard from "../../Components/PatientCard/PatientCard";
import { Link, useNavigate } from "react-router-dom";
import { Assets } from "../../assets/Assets";
import { CCol, CContainer, CModal, CModalBody, CRow } from "@coreui/react";
import PrimaryButton from "../../Components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Components/Buttons/SecondaryButton/SecondaryButton";

function ExistingPatientView() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const PatientDetail = [
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
  ];

  const DetailSec = () => {
    localStorage.removeItem("patiendDetailTab");
    navigate("/patients/history");
  };

  const addPatient = () => {
    console.log("first");
    setVisible(!visible);
  };

  const addPatientModalClose = () => {
    setVisible(false);
  };
  // onClick={addPatient}
  return (
    <section className="existing-patient">
      <div className="flex-sec top-sec">
        <div className="bread-crumbs">
          <p>
            <Link to="/patients">Patient</Link> /{" "}
            <Link to="/patients" className="active">
              Existing Patient
            </Link>
          </p>
        </div>
        <div className="patient-adding">
          <button>+ ADD Patient</button>
        </div>
      </div>
      <div className="row">
        {PatientDetail.map((data, i) => (
          <div className="col-4" onClick={() => DetailSec()}>
            <Link
              //   to={"/patients/history"}
              className="card-link"
            >
              <PatientCard PatientDetail={data} />
            </Link>
          </div>
        ))}
      </div>

      <CModal
        alignment="center"
        visible={visible}
        onClose={addPatientModalClose}
        aria-labelledby="VerticallyCenteredExample"
        size="xl"
      >
        <CModalBody className="pad-custom">
          <CContainer>
            <div className="mb-2">
              <span className="fs-20 fw-600">New Patient</span>
            </div>
            <CRow className="g-3 mb-2">
              <CCol lg={5} className="mb-2"></CCol>
              <CCol lg={7} className="mb-2">
                <CRow className="g-3">
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          First Name *
                        </label>
                        <input
                          type="text"
                          class="form-control pad-10"
                          id="validationTooltip01"
                          placeholder="Enter"
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          class="form-control pad-10"
                          id="validationTooltip01"
                          placeholder="Enter"
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={6}>col-lg-4</CCol>
                  <CCol lg={6}>col-lg-4</CCol>
                  <CCol lg={6}>col-lg-4</CCol>
                  <CCol lg={6}>col-lg-4</CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <div style={{ width: "128px" }}>
                <PrimaryButton>CREATE</PrimaryButton>
              </div>
              <div style={{ width: "128px" }}>
                <SecondaryButton onClick={addPatientModalClose}>
                  CANCEL
                </SecondaryButton>
              </div>
            </CRow>
          </CContainer>
        </CModalBody>
      </CModal>
    </section>
  );
}

export default ExistingPatientView;
