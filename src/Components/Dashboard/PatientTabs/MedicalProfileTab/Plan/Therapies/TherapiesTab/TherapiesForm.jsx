import { CCol, CFormCheck, CFormSelect, CRow, CFormTextarea } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
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
import { duration } from "moment";

const TherapiesForm = ({ back, fetchTherapies, setAddFormView, defaultValues }) => {


    const { loading, error, get, post, clearCache, patch } = useApi();
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        type: defaultValues?.type || "",
        therapy_name: defaultValues?.therapy_name || "",
        therapist_name: defaultValues?.therapist_name || "",
        duration: defaultValues?.duration || "",
        notes: defaultValues?.notes || "",

    });




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





    const options = ["Physical", "Occupational", "Speech", "Psychotherapy", "Others"];


    // Function to update Type
    const getSelectedValue = (data) => {
        setFormData((prevState) => ({
          ...prevState,
          type: data,
        }));

    };

    const validate = () => {
        let isValid = true;
        const newErrors = {};

        if (!selectedDate) {
            newErrors.date = "Date is required.";
            isValid = false;
        }
        if (!selectedTime) {
            newErrors.time = "Time is required.";
            isValid = false;
        }
        if (!formData.type) {
            newErrors.type = "Type is required.";
            isValid = false;
        }
        if (!formData.therapy_name) {
            newErrors.therapy_name = "Therapy Name is required.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    const onSubmit = () => {
        if (validate()) {
            if (defaultValues.id !== undefined) {
                console.log("Edit clicked");
                editTherapies()

            }
            if (defaultValues.id === undefined) {
                console.log("Add clicked");
                addTherapies();

            }
        }
    };

    // Add Therapies
    const addTherapies = async () => {

        try {
            const body = {
                patient_id: "10", 
                date: `${format(selectedDate, "yyyy-MM-dd")} ${format(selectedTime, "HH:mm")}`,
                type: formData?.type,
                therapy_name: formData?.therapy_name,
                therapist_name: formData?.therapist_name,
                duration: formData?.duration,
                notes: formData?.notes,
            };
            // Use the provided `post` function to send the request
            const response = await post(`resource/therapy`, body);

            if (response.code === 201) {
                clearCache();
                await fetchTherapies();
                setAddFormView(false);
                toast.success("Added successfully");

            } else {
                console.error("Failed to fetch data:", response.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Edit Therapies

    const editTherapies = async () => {

        try {
            const body = {
                patient_id: "10", 
                date: `${format(selectedDate, "yyyy-MM-dd")} ${format(selectedTime, "HH:mm")}`,
                type: formData?.type,
                therapy_name: formData?.therapy_name,
                therapist_name: formData?.therapist_name,
                duration: formData?.duration,
                notes: formData?.notes,
            };

            // Use the provided `post` function to send the request
            const response = await patch(`resource/therapy/${defaultValues.id}`, body);

            if (response.code === 200) {
                clearCache();
                await fetchTherapies();
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
                    <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                            Date *
                        </label>
                        <div className="date-size">
                            <DatePicker
                                showIcon
                                selected={selectedDate}
                                onChange={handleDateChange}
                                closeOnScroll={true}
                                wrapperClassName="date-picker-wrapper"
                                dateFormat={DATE_FORMAT}
                            />
                            {errors.date && <div className="error-text">{errors.date}</div>}
                        </div>
                    </div>
                </CCol>
                <CCol lg={4}>
                    <div class="position-relative">
                        <label for="validationTooltip01" class="form-label">
                            Time *
                        </label>
                        <div className="date-size">
                            <DatePicker
                                showIcon
                                selected={selectedTime}
                                onChange={handleTimeChange}
                                showTimeSelect
                                showTimeSelectOnly
                                closeOnScroll={true}
                                timeIntervals={5}
                                dateFormat="h:mm aa"
                            />
                            {errors.time && <div className="error-text">{errors.time}</div>}
                        </div>
                    </div>
                </CCol>
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
                                  defaultValue={
                                    defaultValues?.type
                                      ? options[findItemIndex(options, defaultValues?.type)]
                                      : null
                                  }
                                  getSelectedValue={getSelectedValue}
                                />
                            </div>
                            {errors.type && <div className="error-text">{errors.type}</div>}
                        </div>
                    </div>
                </CCol>
            </CRow>

            <CRow className="mb-3">
                <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                        <div className="position-relative">
                            <label htmlFor="validationTooltip01" className="form-label">
                                Therapy Name *
                            </label>
                            <input
                                type="text"
                                className="form-control pad-10"
                                id="validationTooltip01"
                                placeholder="Enter"
                                value={formData?.therapy_name}
                                name="therapy_name"
                                onChange={handleChange}
                            />
                            {errors.therapy_name && <div className="error-text">{errors.therapy_name}</div>}
                        </div>
                    </div>
                </CCol>
                <CCol lg={6}>
                    <div style={{ width: "100%" }}>
                        <div className="position-relative">
                            <label htmlFor="validationTooltip01" className="form-label">
                                Therapist Name
                            </label>
                            <input
                                type="text"
                                className="form-control pad-10"
                                id="validationTooltip01"
                                placeholder="Enter"
                                value={formData?.therapist_name}
                                name="therapist_name"
                                onChange={handleChange}
                            />
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
                                value={formData?.duration}
                                name="duration"
                                onChange={handleChange}
                                maxLength={2}
                                onInput={(e) => {
                                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                }}
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
                                value={formData?.notes}
                                name="notes"
                                onChange={handleChange}
                            />
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
    )
}

export default TherapiesForm