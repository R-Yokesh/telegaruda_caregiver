import { CCol, CFormCheck, CFormSelect, CRow, CFormTextarea } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { format, isValid, parse } from "date-fns";
import { getCurrentTime } from "../../../../../../../Utils/dateUtils";
import { toast } from "react-toastify";
import useApi from "../../../../../../../ApiServices/useApi";
import {
  findItemIndex,
  getFileTypeFromMime,
  openFile,
} from "../../../../../../../Utils/commonUtils";
import Select from 'react-select';

const AllergiesForm = ({ back, defaultValues, setAddFormView, fetchAllergies }) => {

  const { loading, error, get, post, clearCache, patch } = useApi();
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

  const [allergyName, setAllergyName] = useState([]);
  const [selectedAllergy, setSelectedAllergy] = useState(defaultValues?.values?.name?.name ? {label:defaultValues?.values?.name?.name} : "");
  const [reaction, setRaction] = useState([]);
  const [selectedReaction, setSelectedReaction] = useState(defaultValues?.values?.reaction?.name ? {label:defaultValues?.values?.reaction?.name} : "");
  const [provider, setProvider] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(defaultValues?.values?.provider ? {label:defaultValues?.values?.provider} : "");
  const [searchTerm, setSearchTerm] = useState([]);


  const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const currentDate = new Date();
  const formattedDate = getFormattedDate(currentDate);

  // console.log(formattedDate); // e.g., 25-08-2024

  const defaultDateTime = defaultValues?.date || "";

  // Split date and time
  const defaultDate = defaultDateTime.split(" ")[0] || "";
  const defaultTime = defaultDateTime.split(" ")[1] || getCurrentTime();
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



  const severityOptions = ["Normal","Mild", "Moderate", "Severe","Very Severe","Worst"];
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

 
  


  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!selectedDate) {
      newErrors.date = "Date is required.";
      isValid = false;
    }
    if (!selectedAllergy) {
      newErrors.selectedAllergy = "Allergy Name is required.";
      isValid = false;
    }
    if (!formData.category) {
      newErrors.category = "Category is required.";
      isValid = false;
    }
    if (!selectedReaction) {
      newErrors.selectedReaction = "Reaction is required.";
      isValid = false;
    }
    if (!formData.other_reaction) {
      newErrors.other_reaction = "Other Reaction is required.";
      isValid = false;
    }
    if (!formData.severity) {
      newErrors.severity = "Severity is required.";
      isValid = false;
    }
    if (!selectedProvider) {
      newErrors.selectedProvider = "provider is required.";
      isValid = false;
    }
    if (!formData.status) {
      newErrors.status = "Status is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const onSubmit = () => {
    console.log('clicked checking')
    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editAllergy()

      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addAllergy();

      }
    }
  };

  const handleAllergyChange = (selectedOption) => {
    setSelectedAllergy(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      category: selectedOption.label,
    }));
  };

  const handleReactionChange = (selectedOption) => {
    setSelectedReaction(selectedOption);

  };

  const handleProviderChange = (selectedOption) => {
    setSelectedProvider(selectedOption);

  };




  // API integration of allergies list
  useEffect(() => {
    const getAllergy = async () => {
      try {
        const response = await get(
          `resource/masters?slug=allergy&searchkey=${searchTerm ?? ""}&limit=50&country=IN`
        );
        if (response.code === 200) {
          // Format the data for react-select: { label: "Name", value: "Name" }
          const formattedData = response?.data?.masters?.map((item) => ({
            label: item?.name,
            value: item,
          }));
          setAllergyName(formattedData);
        } else {
          console.error("Failed to fetch data:", response.message);
          setAllergyName([]); // Ensure it's always an array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAllergyName([]); // Ensure it's always an array
      }
    };

    getAllergy();
  }, [searchTerm]);
  

  // API integration of allergies list
  useEffect(() => {
    const getReaction = async () => {
      try {
        const response = await get(
          `resource/masters?slug=reaction&searchkey=${searchTerm ?? ""}&limit=50&country=IN`
        );
        if (response.code === 200) {
          // Format the data for react-select: { label: "Name", value: "Name" }
          const formattedData = response?.data?.masters?.map((item) => ({
            label: item?.name,
            value: item,
          }));
          setRaction(formattedData);
        } else {
          console.error("Failed to fetch data:", response.message);
          setRaction([]); // Ensure it's always an array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRaction([]); // Ensure it's always an array
      }
    };

    getReaction();
  }, [searchTerm]);

   

   // API integration of Provider list
   useEffect(() => {
    const getProvider = async () => {
      try {
        const response = await get(
          `resource/providers?order_by=id&dir=1`
        );
        if (response.code === 200) {
          // Format the data for react-select: { label: "Name", value: "Name" }
          const formattedData = response?.data?.providers?.map((item) => ({
            label: `${item?.user?.first_name} ${item?.user?.last_name}`,
            value: `${item?.user?.first_name} ${item?.user?.last_name}`,
          }));
          setProvider(formattedData);
        } else {
          console.error("Failed to fetch data:", response.message);
          setProvider([]); // Ensure it's always an array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProvider([]); // Ensure it's always an array
      }
    };

    getProvider();
  }, [searchTerm]);
  




  // Add Allergy
  const addAllergy = async () => {

    try {
      const body = {

        patient_id: "10",
        slug: "allergy",
        values: {
          name: {
            id: selectedAllergy?.value?.id,
            attributes: {
              allergy_type: selectedAllergy?.value?.attributes?.allergy_type,
              allergy_category: selectedAllergy?.value?.attributes?.allergy_category,
            },
            master_type_slug: selectedAllergy?.value?.master_type_slug,
            name: selectedAllergy?.label,
            slug: selectedAllergy?.value?.slug,
            is_active: selectedAllergy?.value?.is_active
          },
          // type: "Drug",
          category: formData.category,
          reaction: {
            id: selectedReaction?.value?.id,
            attributes: selectedReaction?.value?.attributes,
            master_type_slug: selectedReaction?.value?.master_type_slug,
            name: selectedReaction?.label,
            slug: selectedReaction?.value?.slug,
            is_active: selectedReaction?.value?.is_active
          },
          other_reaction: formData?.other_reaction,
          date: format(selectedDate, "dd-MM-yyyy"),
          severity: formData?.severity,
          provider: selectedProvider?.label,
          notes: formData?.notes,
          status: formData?.status,
          // treated_by: "d",
          // is_active: 1,
        }
      };

      // Use the provided `post` function to send the request
      const response = await post(`resource/patientHealth`, body);

      if (response.code === 201) {
        clearCache();
        await fetchAllergies();
        setAddFormView(false);
        toast.success("Added successfully");

      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Edit Allery

    const editAllergy = async () => {

      try {
        const body = {

          patient_id: "10",
          slug: "allergy",
          values: {
            name: {
              id: selectedAllergy?.value?.id,
              attributes: {
                allergy_type: selectedAllergy?.value?.attributes?.allergy_type,
                allergy_category: selectedAllergy?.value?.attributes?.allergy_category,
              },
              master_type_slug: selectedAllergy?.value?.master_type_slug,
              name: selectedAllergy.label,
              slug: selectedAllergy?.value?.slug,
              is_active: selectedAllergy?.value?.is_active
            },
            // type: "Drug",
            category: formData.category,
            reaction: {
              id: selectedReaction?.value?.id,
              attributes: selectedReaction?.value?.attributes,
              master_type_slug: selectedReaction?.value?.master_type_slug,
              name: selectedReaction?.label,
              slug: selectedReaction?.value?.slug,
              is_active: selectedReaction?.value?.is_active
            },
            other_reaction: formData?.other_reaction,
            date: format(selectedDate, "dd-MM-yyyy"),
            severity: formData?.severity,
            provider: selectedProvider?.label,
            notes: formData?.notes,
            status: formData?.status,
            // treated_by: "d",
            // is_active: 1,
          }
        };
  
        // Use the provided `post` function to send the request
        const response = await patch(`resource/patientHealth/${defaultValues.id}`, body);
  
        if (response.code === 200) {
          clearCache();
          await fetchAllergies();
          setAddFormView(false);
          toast.success("Added successfully");
  
        } else {
          console.error("Failed to fetch data:", response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
   



  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div className="position-relative">
            <label htmlFor="validationTooltip01" className="form-label">
              Onset Date *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM-dd-yyyy"
                disabled
              />
              {errors.date && <div className="error-text">{errors.date}</div>}
            </div>
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
                <Select
                  options={allergyName}
                  value={selectedAllergy}
                  onChange={handleAllergyChange}
                  isSearchable
                  placeholder="Select"
                />

              </div>
              {errors.selectedAllergy && <div className="error-text">{errors.selectedAllergy}</div>}
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
              {errors.category && <div className="error-text">{errors.category}</div>}
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
                <Select
                  options={reaction}
                  value={selectedReaction}
                  onChange={handleReactionChange}
                  isSearchable
                  placeholder="Select"
                />
              </div>
              {errors.selectedReaction && <div className="error-text">{errors.selectedReaction}</div>}
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
              {errors.other_reaction && <div className="error-text">{errors.other_reaction}</div>}
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
                    ? severityOptions[findItemIndex(severityOptions, defaultValues?.values?.severity)]
                    : null
                }
                 getSelectedValue={getSeverityValue} />
              </div>
              {errors.severity && <div className="error-text">{errors.severity}</div>}
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
                <Select
                  options={provider}
                  value={selectedProvider}
                  onChange={handleProviderChange}
                  isSearchable
                  placeholder="Select"
                />
              </div>
              {errors.selectedProvider && <div className="error-text">{errors.selectedProvider}</div>}
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
                     ? statusOptions[findItemIndex(statusOptions, defaultValues?.values?.status)]
                     : null
                 }
                  getSelectedValue={getStatusValue} 
                />
              </div>
              {errors.status && <div className="error-text">{errors.status}</div>}
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow className="mb-1">
        <div style={{ width: "128px" }}>
          <PrimaryButton onClick={() => onSubmit()}>SAVE</PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default AllergiesForm;
