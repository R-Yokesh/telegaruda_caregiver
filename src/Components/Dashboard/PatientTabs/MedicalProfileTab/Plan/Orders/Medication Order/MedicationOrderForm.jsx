import {
  CCol,
  CFormCheck,
  CFormSelect,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import ActiveButton from "../../../../../../Buttons/ActiveButton/ActiveButton";
import DropdownButton from "../../../../../../Buttons/DropDownButton/DropDownButton";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import { DATE_FORMAT } from "../../../../../../../Config/config";

const MedicationOrderForm = ({ back, defaultValues }) => {
  const [date, setDate] = useState(null);
  const [medicines, setMedicines] = useState(
    defaultValues.medicines
      ? defaultValues.medicines
      : [
          {
            id: 1,
            type: "",
            name: "",
            strength: "",
            strengthMeasurement: "",
            days: "",
            totalQty: "",
            startDate: "",
            endDate: "",
            instruction: "",
            reason: "",
            status: "",
            m: 0,
            a: 0,
            e: 0,
            n: 0,
            food: "bf",
          },
        ]
  );

  // Function to handle adding a new medicine field
  const handleAddMedicine = () => {
    const newMedicines = [...medicines];
    const id = newMedicines.length + 1;
    newMedicines.push({
      id,
      type: "",
      name: "",
      strength: "",
      strengthMeasurement: "",
      days: "",
      totalQty: "",
      startDate: "",
      endDate: "",
      instruction: "",
      reason: "",
      status: "",
    });
    setMedicines(newMedicines);
  };
  const handleRemoveMedicine = (id) => {
    const newMedicines = medicines.filter((medicine) => medicine.id !== id);
    setMedicines(newMedicines);
  };

  // Function to handle input change in medicine fields
  const handleMedicineInputChange = (id, value, fieldName) => {
    console.log(fieldName, value);
    const newValue = value?.replace(/[^0-9]/g, "");
    const processedValue =
      fieldName === "startDate" || fieldName === "endDate"
        ? value
          ? value.toISOString()
          : "" // Convert date to ISO string
        : fieldName === "strength"
        ? newValue
        : fieldName === "totalQty"
        ? newValue
        : fieldName === "days"
        ? newValue
        : value;

    const newMedicines = medicines.map((medicine) => {
      if (medicine.id === id) {
        return { ...medicine, [fieldName]: processedValue };
      }
      return medicine;
    });

    setMedicines(newMedicines);
  };

  useEffect(() => {
    // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      return new Date(year, month - 1, day);
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
  const options = ["Morning", "Afternoon", "Evening", "Night"];
  console.log("first", medicines);
  const [btnValue, setBtnValue] = useState();
  const [btnView, setBtnView] = useState(false);

  const getbtnNames = (data) => {
    setBtnValue(data);
    if (data === "SEND TO PHARMACY") {
      setBtnView(true);
    }
  };
  console.log(btnValue, "SEND TO PHARMACY");

  const [strength, setStrength] = useState(defaultValues?.strength || "");
  const [qty, setQty] = useState(defaultValues?.strength || "");
  const [timeTaken, setTimeTaken] = useState(defaultValues?.strength || "");

  const numCheck = (e) => {
    const input = e.target.value;
    const name = e.target.name;

    const newValue = input.replace(/[^0-9]/g, "");
    if (name === "strength") {
      setStrength(newValue);
    }
    if (name === "totalQty") {
      setQty(newValue);
    }
    if (name === "days") {
      setTimeTaken(newValue);
    }
  };

  return (
    <>
      <div className="mb-3 p-4">
        <CRow className="d-flex align-items-center mb-3">
          <CCol lg={6}>
            <span className="fs-16 fw-600">
              {defaultValues?.medicines?.length >= 1 ? "Edit " : "Add "} New
              Medicine
            </span>
          </CCol>

          <CCol lg={5} className="d-flex justify-content-end">
            <div style={{ width: "120px" }}>
              <ActiveButton onClick={back}>
                <div className="d-flex align-items-center gap-2">
                  <img src={Assets?.listview} alt="close" />
                  <span>List View</span>
                </div>
              </ActiveButton>
            </div>
          </CCol>
        </CRow>

        {defaultValues?.medicines?.length >= 1 ? (
          <>
            <CRow className="mb-3">
              <CCol lg={11}>
                <div className="vertical-line"></div>
              </CCol>
            </CRow>
            <CRow className="mb-3 h-100 d-flex align-items-center justify-content-between">
              <CCol lg={4}>
                <div style={{ width: "100%" }}>
                  <div class="position-relative">
                    <label for="validationTooltip01" class="form-label">
                      Status
                    </label>
                    <CFormSelect
                      size="lg"
                      className="mb-3"
                      aria-label="Large select example"
                      name="strengthMeasurement"
                      defaultValue={defaultValues?.lab_status}
                    >
                      {/* <option>Select</option> */}
                      <option value="Prescribed">Prescribed</option>
                      <option value="Received">Received</option>
                      <option value="Dispensed">Dispensed</option>
                      <option value="Delivered">Delivered</option>
                    </CFormSelect>
                  </div>
                </div>
              </CCol>
              <CCol
                lg={8}
                className="mt-4 d-flex justify-content-between"
                style={{ width: "42%" }}
              >
                <CRow className="mb-3">
                  <div style={{ width: "250px" }}>
                    <PrimaryButton>SAVE</PrimaryButton>
                    {/* <DropdownButton /> */}
                  </div>
                  <div style={{ width: "128px" }}>
                    <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
                  </div>
                </CRow>
              </CCol>
            </CRow>
          </>
        ) : null}
        <CRow className="mb-3">
          <CCol lg={11}>
            <div className="vertical-line"></div>
          </CCol>
        </CRow>
        {medicines.map((medicine, index) => (
          <>
            <CRow className="d-flex align-items-center mb-3" key={index}>
              <CCol lg={11}>
                <CRow className="mb-3">
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Medicine Type *
                        </label>
                        <CFormSelect
                          size="lg"
                          className="mb-3"
                          aria-label="Large select example"
                          name="type"
                          defaultValue={medicine?.type}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        >
                          <option>Select</option>
                          <option value="Brand">Brand</option>
                          <option value="Generic">Generic</option>
                        </CFormSelect>
                        {/* <input
                          name="type"
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="Enter"
                          defaultValue={medicine?.type}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        /> */}
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Medicine Name *
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="Enter"
                          name="name"
                          defaultValue={medicine?.name}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Strength
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="00"
                          name="strength"
                          value={medicine?.strength}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Strength measurement
                        </label>
                        <CFormSelect
                          size="lg"
                          className="mb-3"
                          aria-label="Large select example"
                          name="strength"
                          defaultValue={medicine?.strength}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        >
                          <option>Select</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </CFormSelect>
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol lg={4}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Route of administration
                        </label>
                        <CFormSelect
                          size="lg"
                          className="mb-3"
                          aria-label="Large select example"
                          name="strengthMeasurement"
                          defaultValue={medicine?.strengthMeasurement}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        >
                          <option>Select</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </CFormSelect>
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={4}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          No. of Day(s)
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="00"
                          name="days"
                          value={medicine?.days}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={4}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Total Qty / Taken
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="00"
                          name="totalQty"
                          value={medicine?.totalQty}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Start Date
                        </label>
                        {/* <input
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="Enter"
                          name="startDate"
                          defaultValue={medicine?.startDate}
                          onChange={(e) => handleMedicineInputChange(medicine?.id, e.target.value, e.target.name)}
                        /> */}
                        <div className="date-size">
                          <DatePicker
                            disabled={
                              defaultValues?.lab_status === "Prescribed"
                                ? false
                                : defaultValues?.medicines?.length >= 1
                                ? true
                                : false
                            }
                            name="startDate"
                            showIcon
                            selected={
                              medicine?.startDate
                                ? new Date(medicine?.startDate)
                                : new Date()
                            }
                            onChange={(date) =>
                              handleMedicineInputChange(
                                medicine?.id,
                                date,
                                "startDate"
                              )
                            }
                            dateFormat={DATE_FORMAT}
                          />
                        </div>
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          End Date
                        </label>
                        {/* <input
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="Enter"
                          name="endDate"
                          defaultValue={medicine?.endDate}
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        /> */}
                        <div className="date-size">
                          <DatePicker
                            disabled={
                              defaultValues?.lab_status === "Prescribed"
                                ? false
                                : defaultValues?.medicines?.length >= 1
                                ? true
                                : false
                            }
                            name="endDate"
                            showIcon
                            selected={
                              medicine?.endDate
                                ? new Date(medicine?.endDate)
                                : new Date()
                            }
                            onChange={(date) =>
                              handleMedicineInputChange(
                                medicine?.id,
                                date,
                                "endDate"
                              )
                            }
                            dateFormat={DATE_FORMAT}
                          />
                        </div>
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol lg={3} style={{ paddingRight: "0" }}>
                    <div style={{ width: "100%" }} className="d-flex gap-3">
                      <div>
                        <label for="validationTooltip01" class="form-label">
                          M
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10 text-align-center"
                          id="validationTooltip01"
                          placeholder="0"
                          name="m"
                          defaultValue={medicine?.m}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                      <div>
                        <label for="validationTooltip01" class="form-label">
                          A
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10 text-align-center"
                          id="validationTooltip01"
                          placeholder="0"
                          name="a"
                          defaultValue={medicine?.a}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                      <div>
                        <label for="validationTooltip01" class="form-label">
                          E
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10 text-align-center"
                          id="validationTooltip01"
                          placeholder="0"
                          name="e"
                          defaultValue={medicine?.e}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                      <div>
                        <label for="validationTooltip01" class="form-label">
                          N
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10 text-align-center"
                          id="validationTooltip01"
                          placeholder="0"
                          name="n"
                          defaultValue={medicine?.n}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={3}>
                    <div className="h-100 d-flex align-items-end w-100 justify-content-end">
                      <div
                        style={{
                          boxSizing: "border-box",
                          borderRadius: "5px",
                          border: "1px solid #17171D33",
                          padding: "10px",
                        }}
                      >
                        <CFormCheck
                          key={index}
                          className="mb-0"
                          inline
                          type="radio"
                          id="inlineCheckbox1"
                          value="bf"
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          label={
                            <label
                              for="validationTooltip01"
                              class="form-label mb-0"
                            >
                              BF
                            </label>
                          }
                          name="food"
                          defaultChecked={
                            medicine?.food === "bf" ? true : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
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
                              AF
                            </label>
                          }
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          name="food"
                          defaultChecked={
                            medicine?.food === "af" ? true : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Instruction
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="Enter"
                          name="instruction"
                          defaultValue={medicine?.instruction}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                      <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                          Reason for medication
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="Enter"
                          name="reason"
                          defaultValue={medicine?.reason}
                          disabled={
                            defaultValues?.lab_status === "Prescribed"
                              ? false
                              : defaultValues?.medicines?.length >= 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleMedicineInputChange(
                              medicine?.id,
                              e.target.value,
                              e.target.name
                            )
                          }
                        />
                      </div>
                    </div>
                  </CCol>
                </CRow>
              </CCol>
              {defaultValues?.medicines?.length >= 1 ? (
                defaultValues?.lab_status === "Prescribed" &&
                (medicine?.id === 1 ? null : (
                  <CCol lg={1}>
                    <div style={{ width: "40px" }}>
                      <ActiveButton
                        onClick={() => handleRemoveMedicine(medicine.id)}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img src={Assets.whiteDel} alt="add" />
                        </div>
                      </ActiveButton>
                    </div>
                  </CCol>
                ))
              ) : medicine.id === 1 ? null : (
                <CCol lg={1}>
                  <div style={{ width: "40px" }}>
                    <ActiveButton
                      onClick={() => handleRemoveMedicine(medicine.id)}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img src={Assets.whiteDel} alt="add" />
                      </div>
                    </ActiveButton>
                  </div>
                </CCol>
              )}
            </CRow>
            <CRow className="mb-3">
              <CCol lg={11}>
                <div className="vertical-line"></div>
              </CCol>
            </CRow>
          </>
        ))}
        {defaultValues?.medicines?.length >= 1 ? (
          defaultValues?.lab_status === "Prescribed" && (
            <>
              <CRow className="mb-3">
                <CCol lg={11}>
                  <div style={{ width: "40px" }}>
                    <ActiveButton onClick={handleAddMedicine}>
                      <div className="d-flex align-items-center gap-2">
                        <img src={Assets.whiteAdd} alt="add" />
                      </div>
                    </ActiveButton>
                  </div>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol lg={11}>
                  <div className="vertical-line"></div>
                </CCol>
              </CRow>
            </>
          )
        ) : (
          <>
            <CRow className="mb-3">
              <CCol lg={11}>
                <div style={{ width: "40px" }}>
                  <ActiveButton onClick={handleAddMedicine}>
                    <div className="d-flex align-items-center gap-2">
                      <img src={Assets.whiteAdd} alt="add" />
                    </div>
                  </ActiveButton>
                </div>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol lg={11}>
                <div className="vertical-line"></div>
              </CCol>
            </CRow>
          </>
        )}

        {defaultValues?.medicines?.length >= 1 ? null : (
          <>
            <CRow>
              <CCol lg={4}>
                <div style={{ width: "100%" }}>
                  <div class="position-relative">
                    <label for="validationTooltip01" class="form-label">
                      Status
                    </label>
                    <CFormSelect
                      size="lg"
                      className="mb-3"
                      aria-label="Large select example"
                      name="strengthMeasurement"
                      defaultValue={defaultValues?.lab_status}
                    >
                      {/* <option>Select</option> */}
                      <option value="Prescribed">Prescribed</option>
                      <option value="Received">Received</option>
                      <option value="Dispensed">Dispensed</option>
                      <option value="Delivered">Delivered</option>
                    </CFormSelect>
                  </div>
                </div>
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <div style={{ width: "250px" }}>
                {/* <PrimaryButton>SEND TO PHARMACY</PrimaryButton> */}
                <DropdownButton
                  buttonName2={"SEND TO PHARMACY"}
                  getbtnNames={getbtnNames}
                />
              </div>
              <div style={{ width: "128px" }}>
                <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
              </div>
            </CRow>
          </>
        )}

        {btnView && (
          <BlurBackground>
            <CModal
              alignment="center"
              visible={btnView}
              onClose={() => setBtnView(false)}
              aria-labelledby="VerticallyCenteredExample"
              size="md"
            >
              <CModalBody className="p-3">
                <label for="validationTooltip01" class="form-label">
                  Select a Pharmacy
                </label>
                <div className="w-100 mt-2 d-flex justify-content-center flex-column align-items-center">
                  <CFormSelect
                    size="lg"
                    className="mb-3"
                    aria-label="Large select example"
                    name="strength"
                  >
                    <option>Select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                  <div className="d-flex gap-2 mt-2">
                    <div style={{ width: "80px" }}>
                      <PrimaryButton onClick={() => setBtnView(false)}>
                        Save
                      </PrimaryButton>
                    </div>
                    <div style={{ width: "80px" }}>
                      <SecondaryButton onClick={() => setBtnView(false)}>
                        Cancel
                      </SecondaryButton>
                    </div>
                  </div>
                </div>
              </CModalBody>
            </CModal>
          </BlurBackground>
        )}
      </div>
    </>
  );
};

export default MedicationOrderForm;
