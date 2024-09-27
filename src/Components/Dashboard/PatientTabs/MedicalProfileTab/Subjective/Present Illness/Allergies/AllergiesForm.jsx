import {
  CCol,
  CFormCheck,
  CFormSelect,
  CRow,
  CFormTextarea,
} from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { format, isValid, parse } from "date-fns";
import { getCurrentTime } from "../../../../../../../Utils/dateUtils";
import { Assets } from "../../../../../../../assets/Assets";
import { toast } from "react-toastify";
import useApi from "../../../../../../../ApiServices/useApi";
import {
  findItemIndex,
  getFileTypeFromMime,
  openFile,
} from "../../../../../../../Utils/commonUtils";
import Select from "react-select";
import SearchableDrop from "../../../../../../Dropdown/SearchableDrop";
import ProviderDrop from "../../../../../../Dropdown/ProviderDrop";
import { useLocation } from "react-router-dom";

const AllergiesForm = ({ back, defaultValues, addAllergy, editAllergy,isSubmitting }) => {
  const { loading, error, get, post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    category: defaultValues?.values?.category || "",
    other_reaction: defaultValues?.values?.other_reaction || "",
    severity: defaultValues?.values?.severity || "",
    provider: defaultValues?.values?.provider || "",
    notes: defaultValues?.values?.notes || "",
    status: defaultValues?.values?.status || "",
  });

  const [allergyDetails, setAlleryDetails] = useState([]);
  const [allergyKey, setAllergyKey] = useState(
    defaultValues?.values?.name?.name || ""
  );
  const [allergyName, setAllergyName] = useState(
    defaultValues?.values?.name || {}
  );
  const [reactiondetails, setRactionDetails] = useState([]);
  const [reactionKey, setRactionKey] = useState(
    defaultValues?.values?.reaction?.name || ""
  );
  const [reaction, setReaction] = useState(
    defaultValues?.values?.reaction || {}
  );
  const [providerDetails, setproviderDetails] = useState([]);
  const [providerKey, setProviderKey] = useState(
    defaultValues?.values?.provider ? defaultValues?.values?.provider.user?.first_name +
      " " +
      defaultValues?.values?.provider.user?.last_name : ""
  );
  const [provider, setProvider] = useState(
    defaultValues?.values?.provider || {}
  );

  const defaultDateTime = defaultValues?.values?.date || "";
  // Split date and time
  const defaultDate = defaultDateTime.split(" ")[0] || "";
  const defaultTime = defaultValues?.addition_info?.time || getCurrentTime();
  useEffect(() => {
    // Combine default date and time into a single Date object
    let date = new Date();

    if (defaultDate) {
      const parsedDate = parse(defaultDate, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        date = parsedDate;
      }
    }

    if (defaultTime) {
      const [hours, minutes] = defaultTime.split(":").map(Number);
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0); // Reset seconds
    }

    setSelectedDate(date);
    setSelectedTime(date); // Initialize time picker with the same Date object
  }, [defaultDate, defaultTime]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setSelectedTime(date); // Sync time picker with the updated date
    }
  };

  const handleTimeChange = (time) => {
    if (time) {
      const updatedDateTime = new Date(selectedDate || time);
      updatedDateTime.setHours(time.getHours());
      updatedDateTime.setMinutes(time.getMinutes());
      updatedDateTime.setSeconds(0); // Reset seconds

      setSelectedDate(updatedDateTime); // Optionally update date as well
      setSelectedTime(time);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setSelectedTime(null); // Clear the selected time
  };
  const handleDateClear = () => {
    setSelectedDate(null); // Clear the selected time
    setSelectedTime(null);
  };

  const severityOptions = [
    "Normal",
    "Mild",
    "Moderate",
    "Severe",
    "Very Severe",
    "Worst",
  ];
  const statusOptions = ["Active", "Inactive"];

  // Function to update Severity
  const getSeverityValue = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      severity: data,
    }));
  };

  // Function to update Status
  const getStatusValue = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      status: data,
    }));
  };
  console.log("validate", provider);
  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!selectedDate) {
      newErrors.date = "Date is required.";
      isValid = false;
    }
    if (!allergyName || !allergyName?.name) {
      newErrors.allergyName = "Allergy Name is required.";
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
      isValid = false;
    }
    if (!reaction || !reaction?.name) {
      newErrors.reaction = "Reaction is required.";
      isValid = false;
    }
    // if (!formData.other_reaction) {
    //   newErrors.other_reaction = "Other Reaction is required.";
    //   isValid = false;
    // }
    if (!formData.severity) {
      newErrors.severity = "Severity is required.";
      isValid = false;
    }
    if (provider?.user_id === undefined) {
      newErrors.provider = "provider is required.";
      isValid = false;
    }
    if (!formData.status) {
      newErrors.status = "Status is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  console.log(reaction, "first", defaultValues);

  const onSubmit = () => {
    if (validate()) {
      const values = {
        name: allergyName,
        // {
        //   id: allergyName?.id,
        //   attributes: {
        //     allergy_type: allergyName?.attributes?.allergy_type,
        //     allergy_category: allergyName?.attributes?.allergy_category,
        //   },
        //   master_type_slug: allergyName?.master_type_slug,
        //   name: allergyName?.name,
        //   slug: allergyName?.slug,
        //   is_active: allergyName?.is_active,
        // },
        // type: "Drug",
        category: formData.category,
        reaction: reaction,
        // {
        //   id: reaction?.id,
        //   attributes: reaction?.attributes,
        //   master_type_slug: reaction?.master_type_slug,
        //   name: reaction?.name,
        //   slug: reaction?.slug,
        //   is_active: reaction?.is_active,
        // },
        other_reaction: formData?.other_reaction,
        date: format(selectedDate, "dd-MM-yyyy"),
        severity: formData?.severity,
        // provider: `${provider?.user?.first_name} ${provider?.user?.last_name}`,
        provider: provider,
        notes: formData?.notes,
        status: formData?.status,
        // treated_by: "d",
        // is_active: 1,
      };
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editAllergy(values, defaultValues?.id);
      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addAllergy(values);
      }
    }
  };

  const getSelectedAllergy = (data) => {
    setAllergyName(data);
    setFormData((prevState) => ({
      ...prevState,
      category: data?.name,
    }));
  };

  const getSelectedReaction = (selectedOption) => {
    setReaction(selectedOption);
  };

  const handleProviderChange = (selectedOption) => {
    setProvider(selectedOption);
  };

  // API integration of allergies list
  const getAllergy = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters?slug=allergy&searchkey=${allergyKey}&limit=50&country=IN`
      );
      const listData = response?.data?.masters; //
      setAlleryDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, allergyKey]);

  useEffect(() => {
    getAllergy();
  }, [getAllergy]);

  // API integration of allergies list
  const getReaction = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters?slug=reaction&searchkey=${reactionKey}&limit=50&country=IN`
      );
      const listData = response?.data?.masters; //
      setRactionDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, reactionKey]);

  useEffect(() => {
    getReaction();
  }, [getReaction]);

  const getSelectedProvider = (data) => {
    setProvider(data);
  };
  // API integration of Provider list
  const getProvider = useCallback(async () => {
    try {
      const response = await get(
        `resource/providers?order_by=id&searchkey=${providerKey}&dir=1`
      );
      const listData = response?.data?.providers; //
      setproviderDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, providerKey]);

  useEffect(() => {
    getProvider();
  }, [getProvider]);

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          {/* <div className="position-relative">
            <label htmlFor="validationTooltip01" className="form-label">
              Onset Date *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                maxDate={new Date()}
                isClearable
                // disabled
              />
              {errors.date && <div className="error-text">{errors.date}</div>}
            </div>
          </div> */}
          <div class="position-relative d-flex flex-column gap-1">
            <label for="validationTooltip01" class="form-label">
            Onset Date *
            </label>
            <div className="w-100 d-flex align-items-center gap-2">
              <div style={{ width: "80%" }}>
                <DatePicker
                  showIcon
                  selected={selectedDate}
                  onChange={handleDateChange}
                  // isClearable
                  closeOnScroll={true}
                  wrapperClassName="date-picker-wrapper"
                  dateFormat={DATE_FORMAT}
                  maxDate={new Date()}
                />
              </div>
              <div style={{ width: "20%" }}>
                {selectedDate && (
                  <img
                    src={Assets.Close}
                    onClick={handleDateClear}
                    alt="close"
                    style={{
                      borderRadius: "15px",
                      height: "18px",
                    }}
                    className="cursor"
                  />
                )}
              </div>
            </div>

            {errors.date && <div className="error-text">{errors.date}</div>}
          </div>
        </CCol>
        
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Allergy Name *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                {/* <Select
                  options={allergyName}
                  value={selectedAllergy}
                  onChange={handleAllergyChange}
                  isSearchable
                  placeholder="Select"
                /> */}
                <SearchableDrop
                  getSelectedValue={getSelectedAllergy}
                  options={allergyDetails}
                  defaultValue={allergyKey}
                  dropKey={setAllergyKey}
                />
              </div>
              {errors.allergyName && (
                <div className="error-text">{errors.allergyName}</div>
              )}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Category *
              </label>
              <input
                type="text"
                className="form-control pad-10"
                id="validationTooltip01"
                placeholder=""
                disabled
                value={formData.category}
              />
              {errors.category && (
                <div className="error-text">{errors.category}</div>
              )}
            </div>
          </div>
        </CCol>
      </CRow>
      {/* Additional form rows below */}
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Reaction *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <SearchableDrop
                  getSelectedValue={getSelectedReaction}
                  options={reactiondetails}
                  defaultValue={reactionKey}
                  dropKey={setRactionKey}
                />
              </div>
              {errors.reaction && (
                <div className="error-text">{errors.reaction}</div>
              )}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Other Reactions
              </label>
              <CFormTextarea
                type="text"
                className="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                name="other_reaction"
                value={formData.other_reaction}
                onChange={handleChange}
              />
              {errors.other_reaction && (
                <div className="error-text">{errors.other_reaction}</div>
              )}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Severity *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={severityOptions}
                  defaultValue={
                    defaultValues?.values?.severity
                      ? severityOptions[
                          findItemIndex(
                            severityOptions,
                            defaultValues?.values?.severity
                          )
                        ]
                      : null
                  }
                  getSelectedValue={getSeverityValue}
                />
              </div>
              {errors.severity && (
                <div className="error-text">{errors.severity}</div>
              )}
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Provider *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <ProviderDrop
                  getSelectedValue={getSelectedProvider}
                  options={providerDetails}
                  defaultValue={providerKey}
                  dropKey={setProviderKey}
                />
              </div>
              {errors.provider && (
                <div className="error-text">{errors.provider}</div>
              )}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Notes
              </label>
              <CFormTextarea
                type="text"
                className="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
              {errors.notes && <div className="error-text">{errors.notes}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Status *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={statusOptions}
                  defaultValue={
                    defaultValues?.values?.status
                      ? statusOptions[
                          findItemIndex(
                            statusOptions,
                            defaultValues?.values?.status
                          )
                        ]
                      : null
                  }
                  getSelectedValue={getStatusValue}
                />
              </div>
              {errors.status && (
                <div className="error-text">{errors.status}</div>
              )}
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow className="mb-1">
        <div style={{ width: "128px" }}>
        <PrimaryButton onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "SAVE"}
          </PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default AllergiesForm;
