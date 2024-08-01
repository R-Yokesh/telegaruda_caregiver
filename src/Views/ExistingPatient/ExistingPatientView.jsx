import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import PatientCard from "../../Components/PatientCard/PatientCard";
import { Link, useNavigate } from "react-router-dom";
import { Assets } from "../../assets/Assets";
import { CCol, CContainer, CModal, CModalBody, CRow } from "@coreui/react";
import PrimaryButton from "../../Components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Components/Buttons/SecondaryButton/SecondaryButton";
import useApi from "../../ApiServices/useApi";
import Pagination from "../../Components/Pagination/Pagination";
import Loader from "../../Components/Loader/Loader";

function ExistingPatientView() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [PatientDetail, setPatientDetail] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const { loading, error, get, post } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Number of items to display per page

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const PatientDetail = [
  //   {
  //     name: "Ram Mohan S R",
  //     email: "rammohan@cure.com",
  //     mobile: "+91 98765 43210",
  //     mrn: "MRN 3",
  //     age: "34 yrs (M)",
  //     profile: Assets.Patient,
  //   },
  //   {
  //     name: "Ram Mohan S R",
  //     email: "rammohan@cure.com",
  //     mobile: "+91 98765 43210",
  //     mrn: "MRN 3",
  //     age: "34 yrs (M)",
  //     profile: Assets.Patient,
  //   },
  //   {
  //     name: "Ram Mohan S R",
  //     email: "rammohan@cure.com",
  //     mobile: "+91 98765 43210",
  //     mrn: "MRN 3",
  //     age: "34 yrs (M)",
  //     profile: Assets.Patient,
  //   },
  //   {
  //     name: "Ram Mohan S R",
  //     email: "rammohan@cure.com",
  //     mobile: "+91 98765 43210",
  //     mrn: "MRN 3",
  //     age: "34 yrs (M)",
  //     profile: Assets.Patient,
  //   },
  // ];

  const DetailSec = () => {
    // localStorage.removeItem("patiendDetailTab");
    navigate("/patients/history");
  };

  const addPatient = () => {
    console.log("first");
    setVisible(!visible);
  };

  const addPatientModalClose = () => {
    setVisible(false);
  };

  const getPatients = async () => {
    try {
      const response = await get(
        `resource/patients?limit=${itemsPerPage}&page=${currentPage}`
      );
      console.log(response); // Handle the data as needed
      if (response.code === 200) {
        setPatientDetail(response?.data?.patients);
        setTotalItems(response?.data?.pagination?.total);
      } else {
        setPatientDetail([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    getPatients();
  }, [currentPage]);

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
        {/* onClick={addPatient} */}
        <div className="patient-adding" onClick={addPatient}>
          <button>+ ADD Patient</button>
        </div>
      </div>
      <div className="row mb-3">
        {!loading ? (
          PatientDetail.length <= 0 ? null : (
            <>
              {PatientDetail.map((data, i) => (
                <div className="col-4">
                  {/* <Link
                  //   to={"/patients/history"}
                  className="card-link"
                > */}
                  <PatientCard PatientDetail={data} />
                  {/* </Link> */}
                </div>
              ))}
            </>
          )
        ) : (
          <div
            className="d-flex w-100 justify-content-center mb-3 align-items-center"
            style={{ height: "350px", maxHeight: "100%" }}
          >
            <Loader />
          </div>
        )}
        <CRow className="mb-3">
          <CCol lg={12} className="d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              onPageChange={onPageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </CCol>
        </CRow>
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
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Age *
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
                          Gender *
                        </label>
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Mobile Number *
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
                          MRN Number/Patient Id
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
