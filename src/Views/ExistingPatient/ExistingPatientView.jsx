import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import PatientCard from "../../Components/PatientCard/PatientCard";
import { Link, useNavigate } from "react-router-dom";
import { Assets } from "../../assets/Assets";
import {
  CCol,
  CContainer,
  CFormCheck,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import PrimaryButton from "../../Components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Components/Buttons/SecondaryButton/SecondaryButton";
import useApi from "../../ApiServices/useApi";
import Pagination from "../../Components/Pagination/Pagination";
import Loader from "../../Components/Loader/Loader";
import PhoneNumberInput from "../../Components/PhoneNumberInput/PhoneNumberInput";
import { toast } from "react-toastify";
import ProfileUpdate from "./ProfileUpdate";
import { format } from "date-fns";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function ExistingPatientView() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [PatientDetail, setPatientDetail] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mrnNumber, setMrnNumber] = useState("");

  const [mobile, setMobile] = useState("");
  const [iso, setIso] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    mobileNumber: "",
  });

  const getPhone = (isoCode, mobilenum) => {
    setIso(isoCode);
    setMobile(mobilenum);
  };

  const { loading, clearCache, get, post } = useApi();
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
    setErrors({});
  };

  const validate = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      mobileNumber: "",
    };

    if (!firstName) newErrors.firstName = "First Name is required.";
    if (!lastName) newErrors.lastName = "Last Name is required.";
    if (!age) newErrors.age = "Age is required.";
    if (isNaN(age)) newErrors.age = "Age must be a number.";
    if (!gender) newErrors.gender = "Gender is required.";
    if (!mobile) newErrors.mobileNumber = "Mobile Number is required.";
    // if (mobile?.length > 10)
    //   newErrors.mobileNumber = "Mobile Number must be in 10 digit.";
    // You can add more validations for phone number if needed

    setErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).some((error) => error);
  };

  const onSubmit = () => {
    if (validate()) {
      createPatient();
    }
  };

  const getPatients = async () => {
    try {
      const response = await get(
        `resource/patients?limit=${itemsPerPage}&page=${currentPage}`
      );
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

  const createPatient = async () => {
    try {
      const url = `resource/patients`; // Replace with your API endpoint
      const body = {
        user: {
          address: {},
          first_name: firstName,
          last_name: lastName,
          gender: gender,
          mobile: mobile,
          role: "folio",
          is_2fa: 0,
          isd_code: iso,
          dob: null,
          username: format(new Date(), "ddMMyyyyHHmmss"), //to generate unique user id
          email: "unknown@unknown.co",
          is_active: 1,
          timezone_id: 1,
        },
        additional_info: { age: age, mrn_number: mrnNumber },
        peripheral_credentials: {},
        is_admin: 1,
      };
      await post(url, body);
      clearCache();
      await getPatients();
      toast.success("Added successfully");
      addPatientModalClose();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  useEffect(() => {
    getPatients();
  }, [currentPage]);
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
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
                <div className="col-lg-4 col-md-6 col-sm-12 col-12 d-flex">
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
        size="lg"
      >
        <CModalBody className="pad-custom">
          <CContainer>
            <div className="mb-2">
              <span className="fs-20 fw-600">New Patient</span>
            </div>
            <CRow className="mb-2">
              {/* <CCol lg={4} className="mb-2">
                <label className="profile-pic">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  {image && (
                    <img
                      alt="profile"
                      src={image}
                      className="profile-uploaded"
                    />
                  )}
                  {!image && (
                    <>
                      <img
                        alt="profile"
                        src={Assets.ProfileImg}
                        className="profile-uploaded"
                      />
                    </>
                  )}
                </label>
                <ProfileUpdate />
              </CCol> */}
              <CCol lg={12} className="mb-2">
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
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && (
                          <div className="text-danger">{errors.firstName}</div>
                        )}
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
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && (
                          <div className="text-danger">{errors.lastName}</div>
                        )}
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
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        {errors.age && (
                          <div className="text-danger">{errors.age}</div>
                        )}
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Gender *
                        </label>
                        <div>
                          <CFormCheck
                            inline
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineCheckbox1"
                            value="Male"
                            label="Male"
                            checked={gender === "Male"}
                            onChange={handleGenderChange}
                          />
                          <CFormCheck
                            inline
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineCheckbox2"
                            value="Female"
                            label="Female"
                            checked={gender === "Female"}
                            onChange={handleGenderChange}
                          />
                          <CFormCheck
                            inline
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineCheckbox3"
                            value="Other"
                            label="Other"
                            checked={gender === "Other"}
                            onChange={handleGenderChange}
                          />
                        </div>
                        {errors.gender && (
                          <div className="text-danger">{errors.gender}</div>
                        )}
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={6}>
                    {/* <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Mobile Number *
                        </label>
                       
                        <PhoneNumberInput getPhone={getPhone} />
                        {errors.mobileNumber && (
                          <div className="text-danger">
                            {errors.mobileNumber}
                          </div>
                        )}
                      </div>
                    </div> */}

                    <div>
                      <p className="form-label">Mobile Number</p>
                      <PhoneInput
                        country={'in'}
                        placeholder="Enter" // Set placeholder here
                        onChange={(value) => setMobile(value)}
                      />
                      {errors.mobileNumber && (
                        <div className="text-danger">
                          {errors.mobileNumber}
                        </div>
                      )}
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
                          value={mrnNumber}
                          onChange={(e) => setMrnNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <div style={{ width: "128px" }}>
                <PrimaryButton onClick={onSubmit}>CREATE</PrimaryButton>
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
