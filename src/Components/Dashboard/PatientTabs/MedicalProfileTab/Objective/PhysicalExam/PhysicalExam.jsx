import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import DateSelector from "../../../../../DateRangePicker/DateSelector";
import DateCards from "../../../../../DateCards/DateCards";
import Pagination from "../../../../../Pagination/Pagination";
import ActiveButton from "../../../../../Buttons/ActiveButton/ActiveButton";
import SingleDatePicker from "../../../../../DateRangePicker/SingleDatePicker";
import OptionItem from "../../../../../OptionItems/OptionItem";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import BlurBackground from "../../../../../BlurBackground/BlurBackground";
import useApi from "../../../../../../ApiServices/useApi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ExamOptions from "../../../../../OptionItems/ExamOptions";
import { format } from "date-fns";
import DateSearch from "../../../../../DateRangePicker/DateSearch";

const PhysicalExam = ({ onClose, from }) => {
  // const dateCards = [
  //   {
  //     id: 1,
  //     date: "06-07-2024",
  //     ga: {
  //       status: "Abnormal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //     skin: {
  //       status: "Normal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //   },
  //   {
  //     id: 2,
  //     date: "06-07-2024",
  //     ga: {
  //       status: "Normal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //     skin: {
  //       status: "Abnormal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //   },
  //   {
  //     id: 3,
  //     date: "06-07-2024",
  //     ga: {
  //       status: "Normal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //     skin: {
  //       status: "Abnormal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //   },
  //   {
  //     id: 4,
  //     date: "06-07-2024",
  //     ga: {
  //       status: "Normal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //     skin: {
  //       status: "Abnormal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //   },
  //   {
  //     id: 5,
  //     date: "06-07-2024",
  //     ga: {
  //       status: "Normal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //     skin: {
  //       status: "Abnormal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //   },
  //   {
  //     id: 6,
  //     date: "06-07-2024",
  //     ga: {
  //       status: "Normal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //     skin: {
  //       status: "Abnormal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //   },
  //   {
  //     id: 7,
  //     date: "06-07-2024",
  //     ga: {
  //       status: "Normal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //     skin: {
  //       status: "Abnormal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //   },
  //   {
  //     id: 8,
  //     date: "06-07-2024",
  //     ga: {
  //       status: "Normal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //     skin: {
  //       status: "Abnormal",
  //       notes: "Lorem ipsum",
  //       select: ["Posture and Gait"],
  //     },
  //   },
  //   { id: 9, date: "06-07-2024" },
  //   { id: 10, date: "06-07-2024" },
  //   { id: 11, date: "06-07-2024" },
  //   { id: 12, date: "06-07-2024" },
  //   { id: 13, date: "06-07-2024" },
  //   { id: 14, date: "06-07-2024" },
  // ];

  const { get, post, clearCache, del } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;

  const [lists, setLists] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [generalOpen, setGeneralOpen] = useState(false);
  const [headings, setHeadings] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addFormView, setAddFormView] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [notes, setNotes] = useState({});
  const [deleteView, setDeleteView] = useState(false);
  const [selectedData, setSelectedData] = useState(
    from === "Consult" ? lists[1] : null
  );
  const [editView, setEditView] = useState(from === "Consult" ? true : false);
  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // useEffect(() => {
  //   setEditView(true);
  // }, [from]);

  const itemsPerPage = 9; // Number of items to display per page

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to get items for the current page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return lists?.slice(startIndex, endIndex);
  };

  const addFormPage = () => {
    setAddFormView(true);
  };

  const getselected = (data, method) => {
    setSelectedData(data);
    if (method === "delete") {
      setDeleteView(true);
    }
    if (method === "edit") {
      addFormPage();
      setEditView(true);
      setSelectedOptions(data.values || {});
      setNotes(data.notes || {});
      setDate(data?.values?.date);
    }
  };

  const getOptions = useCallback(
    async (headingSlug) => {
      try {
        const response = await get(
          `resource/masters/all?attr_slug=${headingSlug}&slug=systemic_sub_types&with_values=true&order_by=id&dir=1`
        );
        const optionsData = response?.data?.masters;
        // setSubOptions(optionsData);
        setSubOptions((prevMap) => ({
          ...prevMap,
          [headingSlug]: optionsData,
        }));
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    },
    [get]
  );
  const getSavedValue = useCallback(async () => {
    try {
      const response = await get(
        `resource/patientHealth/all?user_id=${data?.user_id}&slug=&from=${
          date ?? format(new Date(), "dd-MM-yyyy")
        }&to=${
          date ?? format(new Date(), "dd-MM-yyyy")
        }&slug_array=allergy,breast,cvs,ears,endocrine,eyes,gastro,general,genito-urinary,head,hematology,mouththroat,musculoskeletal,neck,neurology,nose,peripheral-vascular-disease,psychiatry,respiratory,skin&group_by=date_slug`
      );
      const savedData = response?.data?.patient_healths;
      console.log("Saved Data:", savedData);

      // Initialize state for selected options and notes
      const initialSelections = {};
      const initialNotes = {};

      savedData?.forEach((item) => {
        console.log("first item", item);
        const { slug, values, notes } = item;
        if (values) {
          Object.keys(values).forEach((key) => {
            if (values[key]) {
              initialSelections[key] = true;
              initialNotes[slug] = values?.notes; // Assuming notes are stored with a slug key
            }
          });
        }
      });

      setSelectedOptions(initialSelections);
      setNotes(initialNotes); // Ensure this state is initialized
    } catch (error) {
      console.error("Error fetching saved data:", error);
    }
  }, [get, date, addFormView]);

  const getHeadings = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters/all?slug=systemic-examination&order_by=id&dir=1&patient_id=${data?.user_id}`
      );
      const headingData = response?.data?.masters;
      setHeadings(headingData);
      getSavedValue();
      headingData?.forEach((item) => getOptions(item?.slug));
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [data?.user_id, get, getOptions, getSavedValue, addFormView]);

  const handleSelect = (option, isSelected) => {
    // Update the selected options as an object
    const updatedOptions = {
      ...selectedOptions,
      [option.slug]: isSelected,
    };

    setSelectedOptions(updatedOptions);
    clearCache();

    // Format the options into an object where only the selected options are true
    const formattedOptions = Object.keys(subOptions).reduce((acc, key) => {
      if (key === option.attributes?.reference_slug) {
        subOptions[key].forEach((opt) => {
          acc[opt.slug] = updatedOptions[opt.slug] || false;
        });
      }
      return acc;
    }, {});

    // Example API call with the formatted options
    onSubmit(formattedOptions, option.attributes?.reference_slug);
  };

  const handleNotesKeyPress = (slug, event) => {
    if (event.key === "Enter") {
      onSubmit(
        { ...selectedOptions, [slug]: true }, // Sending selected options along with notes
        slug
      );
    }
  };

  const handleNotesChange = (slug, value) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [slug]: value,
    }));
  };

  const getLists = useCallback(async () => {
    try {
      const response = await get(
        `resource/patientHealth?limit=10&page=1&from=${startDate ?? ""}&to=${
          endDate ?? ""
        }&order_by=created_at&dir=2&user_id=${
          data?.user_id
        }&slug=&searchkey=&slug_array=allergy,breast,cvs,ears,endocrine,eyes,gastro,general,genito-urinary,head,hematology,mouththroat,musculoskeletal,neck,neurology,nose,peripheral-vascular-disease,psychiatry,respiratory,skin`
      );
      const listData = response?.data?.patient_healths; //pagination
      setLists(listData);
      setTotalItem(response?.data?.pagination);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, deleteView, addFormView, startDate, endDate]);

  useEffect(() => {
    getSavedValue();
  }, [getSavedValue, date]);

  useEffect(() => {
    getHeadings();
  }, [getHeadings]);

  useEffect(() => {
    getLists();
  }, [getLists]);

  const onSubmit = async (formattedOptions, selectedSlug) => {
    console.log("firstnote", notes[selectedSlug]);
    try {
      const url = `resource/patientHealth`; // Replace with your API endpoint
      const body = {
        values: {
          ...formattedOptions,
          date: date === null ? format(new Date(), "dd-MM-yyyy") : date,
          // others: [], // option to add extra on the fly for perticular section
          notes: notes[selectedSlug] || "",
        },
        slug: selectedSlug,
        up_create: true,
        patient_id: data?.user_id, //data?.user_id
      };
      await post(url, body);
      toast.success("Updated successfully");
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const onDelete = async () => {
    clearCache();
    try {
      const url = `resource/patientHealth/${selectedData?.id}`; // Replace with your API endpoint
      await del(url);
      toast.success("Deleted successfully");
      setDeleteView(false);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  const getFilterValues = (date1, date2) => {
    console.log(date1, "first date", date2);
    setStartDate(date1);
    setEndDate(date2);
  };
  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <>
      {from !== "Consult" && (
        <>
          <CRow className="mb-0">
            <CCol md={6} className="mb-2">
              <div className="d-flex gap-2">
                <img
                  alt="BackBtn"
                  src={Assets.BackBtn}
                  style={{ width: "35px" }}
                  onClick={onClose}
                  className="cursor"
                />
                <span className="Obj-name d-flex align-items-center">
                  Physical Exam
                </span>
              </div>
            </CCol>
            <CCol md={6} className="mb-2 d-flex justify-content-end">
              <div className="d-flex mt-2">
                <Breadcrumb
                  paths={[
                    { label: "Home", to: "/patients" },
                    { label: "Patient List", to: "/patients" },
                    { label: "Medical Profile", to: "/patients/history" },
                    { label: "Physical Exam", to: "/patients/history" },
                  ]}
                />
              </div>
            </CCol>
          </CRow>
          {!addFormView && (
            <>
              <CRow className="mb-2">
                <CCol lg={8} className="">
                  {/* <DateSelector getFilterValues={getFilterValues} /> */}
                  <DateSearch getFilterValues={getFilterValues} />
                </CCol>
                <CCol
                  lg={4}
                  className="d-flex justify-content-end align-items-center"
                >
                  <div>
                    <PrimaryButton
                      onClick={() => {
                        addFormPage();
                        setSelectedData({});
                        setDate(null);
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img src={Assets.Add} alt="add" />
                        <span className="fs-16 fw-600">Add</span>
                      </div>
                    </PrimaryButton>
                  </div>
                </CCol>
              </CRow>
              <div className="mb-2">
                {lists.length > 0 ? (
                  <>
                    <CRow>
                      {lists?.map((item, i) => (
                        <CCol lg={4} className="mb-3" key={i}>
                          <DateCards data={item} onClick={getselected} />
                        </CCol>
                      ))}
                    </CRow>
                    <CRow className="mb-3">
                      <CCol lg={12} className="d-flex justify-content-center">
                        <Pagination
                          currentPage={currentPage}
                          onPageChange={onPageChange}
                          totalItems={totalItem?.total}
                          itemsPerPage={itemsPerPage}
                        />
                      </CCol>
                    </CRow>
                  </>
                ) : (
                  <>
                    <div className="d-flex w-100 justify-content-center mt-5 mb-3">
                      <h4>No Data Available</h4>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          {deleteView && (
            <BlurBackground>
              <CModal
                alignment="center"
                visible={deleteView}
                onClose={() => setDeleteView(false)}
                aria-labelledby="VerticallyCenteredExample"
              >
                <CModalBody className="p-3">
                  <div className="w-100 mt-2 d-flex justify-content-center flex-column align-items-center">
                    <h5>Are you sure want to delete ?</h5>
                    <div className="d-flex gap-2 mt-2">
                      <div style={{ width: "80px" }}>
                        <PrimaryButton onClick={() => onDelete()}>
                          Yes
                        </PrimaryButton>
                      </div>
                      <div style={{ width: "80px" }}>
                        <SecondaryButton onClick={() => setDeleteView(false)}>
                          No
                        </SecondaryButton>
                      </div>
                    </div>
                  </div>
                </CModalBody>
              </CModal>
            </BlurBackground>
          )}
          {addFormView && (
            <CCard className="p-2 cursor-default mb-5">
              <CCardBody className="mb-3">
                <CRow className="mb-2">
                  <CCol className="d-flex align-items-center gap-2">
                    <span>Date</span>
                    <SingleDatePicker
                      getStartDate={(date) => setDate(date)}
                      date={date}
                    />
                  </CCol>
                  <CCol className="d-flex justify-content-end">
                    <div style={{ width: "120px" }}>
                      <ActiveButton
                        onClick={() => {
                          setAddFormView(false);
                          setEditView(false);
                          setSelectedData({});
                          clearDates();
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img src={Assets?.listview} alt="close" />
                          <span>List View</span>
                        </div>
                      </ActiveButton>
                    </div>
                  </CCol>
                </CRow>
                <div className="vertical-line mb-3"></div>
                {headings?.map((item, i) => (
                  <>
                    <CRow className="mb-2" key={item?.id}>
                      <CCol
                        lg={12}
                        className="d-flex align-items-center gap-2 mb-1"
                      >
                        {!generalOpen && (
                          <img
                            alt="plus"
                            src={Assets?.PlusIcon}
                            // onClick={generalTabOpen}
                            className="cursor"
                          />
                        )}
                        {generalOpen && (
                          <img
                            alt="plus"
                            src={Assets?.MinusIcon}
                            // onClick={generalTabClose}
                            className="cursor"
                          />
                        )}
                        <span className="fs-16 fw-600">{item?.name}</span>
                      </CCol>
                      <>
                        <CRow>
                          {subOptions?.[item?.slug]?.map((option, index) => (
                            <CCol lg={"auto"}>
                              <ExamOptions
                                key={index}
                                label={option}
                                onSelect={handleSelect}
                                // selected={selectedOptions.includes(
                                //   option?.name
                                // )}
                                selected={!!selectedOptions[option.slug]}
                                disabled={editView}
                              />
                            </CCol>
                          ))}
                          <CCol lg={12} className="mb-2">
                            <div className="position-relative">
                              <label
                                htmlFor={`notes-${item?.slug}`}
                                className="form-label"
                              >
                                Notes
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`notes-${item?.slug}`}
                                placeholder="Enter notes"
                                value={notes[item?.slug] || ""} // Use notes from state
                                onChange={(e) =>
                                  handleNotesChange(item?.slug, e.target.value)
                                }
                                onKeyDown={(e) =>
                                  handleNotesKeyPress(item?.slug, e)
                                } // Trigger API call on Enter
                                disabled={editView}
                              />
                            </div>
                          </CCol>
                        </CRow>
                      </>
                    </CRow>
                    <div className="vertical-line mt-2 mb-3" key={i}></div>
                  </>
                ))}
              </CCardBody>
            </CCard>
          )}
        </>
      )}
    </>
  );
};

export default PhysicalExam;
