import { CCol, CFormCheck, CFormSelect, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import ActiveButton from "../../../../../../Buttons/ActiveButton/ActiveButton";
import DropdownButton from "../../../../../../Buttons/DropDownButton/DropDownButton";

const MedicationCompleted = ({ back, defaultValues }) => {
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
    // Handle date values differently
    const processedValue =
      fieldName === "startDate" || fieldName === "endDate"
        ? value
          ? value.toISOString()
          : "" // Convert date to ISO string
        : value; // For non-date fields, just use the value directly

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

  return (
    <>
      <div className="mb-3 p-4">
        <CRow className="d-flex align-items-center mb-3">
          <CCol lg={6}>
            <span className="fs-16 fw-600">View Medicine</span>
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
                        <input
                          name="type"
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="Enter"
                          defaultValue={medicine?.type}
                          disabled={true}
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
                          Medicine Name *
                        </label>
                        <input
                          type="text"
                          class="form-control  pad-10"
                          id="validationTooltip01"
                          placeholder="Enter"
                          name="name"
                          defaultValue={medicine?.name}
                          disabled={true}
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
                          placeholder="Enter"
                          name="strength"
                          defaultValue={medicine?.strength}
                          disabled={true}
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
                          disabled={true}
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
                          disabled={true}
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
                          placeholder="Enter"
                          name="days"
                          defaultValue={medicine?.days}
                          disabled={true}
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
                          placeholder="Enter"
                          name="totalQty"
                          defaultValue={medicine?.totalQty}
                          disabled={true}
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
                                : true
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
                                : true
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
                          disabled={true}
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
                          disabled={true}
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
                          disabled={true}
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
                          disabled={true}
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
                          disabled={true}
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
                          disabled={true}
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
                          disabled={true}
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
                          disabled={true}
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
                defaultValues?.lab_status === "Prescribed" && (
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
                )
              ) : (
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
                <DropdownButton />
              </div>
              <div style={{ width: "128px" }}>
                <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
              </div>
            </CRow>
          </>
        )}
      </div>
    </>
  );
};

export default MedicationCompleted;
