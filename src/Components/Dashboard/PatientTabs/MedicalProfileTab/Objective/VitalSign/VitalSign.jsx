import React, { useCallback, useEffect, useState } from "react";
import VitalsTab from "../../../VitalsTab/VitalsTab";
import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import MedicalTab from "../../MedicalTab";
import Modal from "../../../../../Modal/Modal";
import ObjectiveDetailPage from "../DetailPage/ObjectiveDetailPage";
import useApi from "../../../../../../ApiServices/useApi";
import { ObjectiveDatas } from "../../../../../Consultant/TableColumnsJson/ObjectiveJson";
import CardChart from "../../../../../Charts/CardChart";
import Badge from "../../../../../Badge/Badge";
import {
  transformBloodKetoneData,
  transformBloodSugarData,
  transformBloodUricAcidData,
  transformBMIData,
  transformBPData,
  transformCreatinineData,
  transformGFRData,
  transformHeartRateData,
  transformHematocritData,
  transformHemoglobinData,
  transformLFTData,
  transformLipidProfileData,
  transformRespirationRateData,
  transformSpO2Data,
  transformTemperatureData,
  transformUreaData,
  transformUrinalysisData,
} from "./FormattedDatas";
import { useLocation } from "react-router-dom";
import Loader from "../../../../../Loader/Loader";
import { findColorCodefev1_fvc } from "../../../../../../Utils/colorUtils";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  getGlucoseLabel,
  getSpeGraLabel,
} from "../../../../../../Utils/commonUtils";

const formatDateTime = (dateString) => {
  const dateObj = new Date(dateString);

  const day = String(dateObj.getDate()).padStart(2, "0"); // Get day and ensure 2 digits
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and ensure 2 digits
  const year = dateObj.getFullYear(); // Get full year

  const hours = String(dateObj.getHours()).padStart(2, "0"); // Get hours and ensure 2 digits
  const minutes = String(dateObj.getMinutes()).padStart(2, "0"); // Get minutes and ensure 2 digits

  // Format the string as DD-MM-YYYY HH:MM
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const VitalSign = ({ setVitalView, onClose }) => {
  const location = useLocation();
  const data = location.state?.PatientDetail;

  const tabs = [
    { id: 1, title: "Primary Vitals" },
    { id: 2, title: "Metabolic And Biochemical Profile" },
    { id: 3, title: "Hematologic Profile" },
    { id: 4, title: "Renal And Metabolic Markers" },
  ];
  const PatientSubMenu3 = localStorage.getItem("PatientSubMenu-3");
  const ParsedPatientSubMenu = PatientSubMenu3
    ? JSON.parse(PatientSubMenu3)
    : 1;
  function findTabById(id) {
    const titleObject = tabs?.find((title) => title.id === id);
    return titleObject
      ? titleObject
      : {
          id: 1,
          title: "Primary Vitals",
        }; // Return the title or a message if not found
  }
  function findTitleById(id) {
    const titleObject = tabs?.find((title) => title.id === id);
    return titleObject ? titleObject?.title : currentTab?.title; // Return the title or a message if not found
  }
  const [currentTab, setCurrentTab] = useState(
    findTabById(ParsedPatientSubMenu)
  );
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };

  const GoTOConsultPage = localStorage.getItem("PatientConsultTab");
  const parsedConsult = GoTOConsultPage ? JSON.parse(GoTOConsultPage) : false;

  const getData = localStorage.getItem("PatientSubMenu-4");
  const parsedData = getData ? JSON.parse(getData) : null;

  const findByIdforSelectedData = () => {
    const selectedObject = ObjectiveDatas?.find(
      (title) => title.id === parsedData + 1
    );
    openModal(selectedObject);
  };

  const currentTabtitle = findTitleById(currentTab);
  const [isModalOpen, setIsModalOpen] = useState(parsedConsult);
  const [cardSelectedData, setSelectedCardData] = useState();
  const [entities, setEntities] = useState(false);
  const [cards, setCards] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [vitalsLoading, setVitalsLoading] = useState(false);

  const [modalStatic, setModalStatic] = useState({});

  const { loading, error, get } = useApi();

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getFilterValues = (startDate, endDate, searchValue) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSearchValue(searchValue);
    setCurrentPage(1)
  };

  const modalStaticData = (card) => {
    const filteredModal = card?.filter(
      (product) => product?.id === cardSelectedData?.id
    );
    setModalStatic(filteredModal);
    setCurrentPage(1)
  };

  const [change, setChange] = useState(false);
  const fetchCardData = async () => {
    setChange(false);
    setVitalsLoading(true);
    try {
      // Create an array of promises to fetch data for each card
      const fetchPromises = ObjectiveDatas?.map(async (card) => {
        if (card?.slug !== null) {
          try {
            const response = await get(
              `resource/vitals?limit=5&page=1&from=&to=&order_by=details-%3Edate&dir=2&user_id=${data?.user_id}&slug=${card?.slug}`
            );
            const tableData = response?.data?.vitals;

            const cardbadge =
              tableData?.length > 0
                ? card?.slug === "blood-pressure"
                  ? [
                      {
                        label: `${tableData[0].details?.systolic}/${tableData[0]?.details?.diastolic} mm Hg`,
                        color: tableData[0].details?.bpFlagColor,
                      },
                      {
                        label: `${tableData[0].details?.pulse} Pulse (bpm)`,
                        color: tableData[0].details?.bpFlagColor,
                      },
                    ]
                  : card?.slug === "bmi"
                  ? [
                      {
                        label: `${tableData[0].details?.bmi} kg/m²`,
                        color: tableData[0].details?.bmiFlagColor,
                      },
                    ]
                  : card?.slug === "respiration"
                  ? [
                      {
                        label: `${tableData[0].details?.respiration} bpm`,
                        color: tableData[0].details?.respirationFlagColor,
                      },
                    ]
                  : card?.slug === "spO2"
                  ? [
                      {
                        label: `${tableData[0].details?.spo2} %`,
                        color: tableData[0].details?.spo2FlagColor,
                      },
                    ]
                  : card?.slug === "temperature"
                  ? [
                      {
                        label: `${
                          tableData[0]?.details?.unit === "Fahrenheit"
                            ? tableData[0]?.details?.temperature +
                              " °F, " +
                              fahrenheitToCelsius(
                                tableData[0]?.details?.temperature
                              ) +
                              " °C"
                            : celsiusToFahrenheit(
                                tableData[0]?.details?.temperature
                              ) +
                              " °F, " +
                              tableData[0]?.details?.temperature +
                              " °C"
                        }`,
                        color: tableData[0].details?.temperatureFlagColor,
                      },
                    ]
                  : card?.slug === "spirometer"
                  ? [
                      {
                        label: `FVC (%):  ${tableData[0].details?.fvc}`,
                        color: `${tableData[0].details?.flags?.fvcFlagColor}`,
                      },
                      {
                        label: `FEV1 (%): ${tableData[0].details?.fev1}`,
                        color: `${tableData[0].details?.flags?.fev1FlagColor}`,
                      },
                      {
                        label: `PEF (%):  ${tableData[0].details?.pef}`,
                        color: `${tableData[0].details?.flags?.pefFlagColor}`,
                      },
                      {
                        label: `FEV1/FVC Ratio:  ${tableData[0].details?.fev1_fvc}`,
                        color: `${tableData[0].details?.flags?.fev1FvcFlagColor}`,
                      },
                    ]
                  : card?.slug === "heart-rate"
                  ? [
                      {
                        label: `${tableData[0]?.details?.heart || ""} bpm`,
                        color: tableData[0].details?.heartRateFlagColor,
                      },
                    ]
                  : card?.slug === "blood-sugar"
                  ? [
                      {
                        label: `${
                          tableData[0]?.details?.blood_sugar || ""
                        } mg/dL`,
                        color: tableData[0].details?.bsFlagColor,
                      },
                    ]
                  : card?.slug === "lipid-profile"
                  ? [
                      {
                        label: `Total Cholesterol:${
                          tableData[0]?.details?.total || ""
                        } mg/dL`,
                        color: tableData[0].details?.total_message_flag,
                      },
                      {
                        label: `LDL:${
                          tableData[0]?.details?.ldl || ""
                        } mg/dL`,
                        color: tableData[0].details?.ldl_message_flag,
                      },
                      {
                        label: `HDL:${
                          tableData[0]?.details?.hdl || ""
                        } mg/dL`,
                        color: tableData[0].details?.hdl_message_flag,
                      },
                      {
                        label: `Triglycerides:${
                          tableData[0]?.details?.triglycerides || ""
                        } mg/dL`,
                        color: tableData[0].details?.triglycerides_message_flag,
                      },
                    ]
                  : card?.slug === "hct"
                  ? [
                      {
                        label: `${tableData[0]?.details?.hct || ""} %`,
                        color: tableData[0].details?.hctFlagColor,
                      },
                    ]
                  : card?.slug === "hemoglobin"
                  ? [
                      {
                        label: `${
                          tableData[0]?.details?.hemoglobin || ""
                        } g/dL`,
                        color: tableData[0].details?.hemoglobinFlagColor,
                      },
                    ]
                  : card?.slug === "keytone"
                  ? [
                      {
                        label: `${
                          tableData[0]?.details?.keytone
                        } mmol/L`,
                        color: tableData[0].details?.keytoneFlagColor,
                      },
                    ]
                  : card?.slug === "uric_acid"
                  ? [
                      {
                        label: `${
                          tableData[0]?.details?.uric_acid 
                        } mg/dL`,
                        color: tableData[0].details?.uricFlagColor,
                      },
                    ]
                  : card?.slug === "urea"
                  ? [
                      {
                        label: `${tableData[0]?.details?.urea || ""} mg/dL`,
                        color: `${tableData[0]?.details?.ureaFlagColor}`,
                      },
                    ]
                  : card?.slug === "creatinine"
                  ? [
                      {
                        label: `${
                          tableData[0]?.details?.creatinine || ""
                        } mg/dL`,
                        color: `${tableData[0]?.details?.creatinineFlagColor}`,
                      },
                    ]
                  : card?.slug === "gfr"
                  ? [
                      {
                        label: `${
                          tableData[0]?.details?.gfr || ""
                        } mL/min/1.73m²`,
                        color: `${tableData[0]?.details?.gfrFlagColor}`,
                      },
                    ]
                  : card?.slug === "urine"
                  ? [
                      {
                        label: `Color: ${tableData[0].details?.color}`,
                        color: "",
                      },
                      {
                        label: `Clarity: ${tableData[0]?.details?.clarity}`,
                        color: "",
                      },
                      {
                        label: `Glucose: ${tableData[0]?.details?.glucose}`,
                        color: getGlucoseLabel(tableData[0].details?.glucose),
                      },
                      {
                        label: `Specific Gravity: ${tableData[0].details?.specificGravity}`,
                        color: getSpeGraLabel(
                          tableData[0].details?.specificGravity
                        ),
                      },
                      {
                        label: `PH: ${tableData[0]?.details?.ph}`,
                        color: tableData[0]?.details?.value_flag,
                      },
                      {
                        label: `Protein: ${tableData[0]?.details?.protein}`,
                        color: tableData[0]?.details?.protein_flag,
                      },
                    ]
                  : []
                : [];

            const formattedData =
              card?.slug === "blood-pressure"
                ? transformBPData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "bmi"
                ? transformBMIData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "respiration"
                ? transformRespirationRateData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "spO2"
                ? transformSpO2Data(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "temperature"
                ? transformTemperatureData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "spirometer"
                ? transformLFTData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "heart-rate"
                ? transformHeartRateData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "blood-sugar"
                ? transformBloodSugarData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "lipid-profile"
                ? transformLipidProfileData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "hct"
                ? transformHematocritData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "hemoglobin"
                ? transformHemoglobinData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "keytone"
                ? transformBloodKetoneData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "uric_acid"
                ? transformBloodUricAcidData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "urea"
                ? transformUreaData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "creatinine"
                ? transformCreatinineData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "gfr"
                ? transformGFRData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : card?.slug === "urine"
                ? transformUrinalysisData(
                    response?.data?.vitals,
                    response?.data?.pagination
                  )
                : null;
            setVitalsLoading(false);
            return {
              ...card,
              created: response?.data?.vitals[0]?.details?.date,
              cardbadge,
              ...formattedData,
            };
          } catch (error) {
            setVitalsLoading(false);
            console.error(`Error fetching data for card ${card.id}:`, error);
            return {
              ...card,
              cardbadge: card.badge,
              created: "",
            };
          }
        }
      });

      // Wait for all fetches to complete
      const updatedCards = await Promise.all(fetchPromises);
      setCards(updatedCards);
      getFilter();
      modalStaticData(updatedCards);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };
  useEffect(() => {
    fetchCardData();
  }, [change, data?.user_id]);
  // entities, cardSelectedData

  const fetchSingleCardData = useCallback(
    async (card) => {
      try {
        const response = await get(
          `resource/vitals?limit=5&page=${currentPage ?? ""}&searchkey=${
            searchValue ?? ""
          }&from=${startDate ?? ""}&to=${
            endDate ?? ""
          }&order_by=details-%3Edate&dir=2&user_id=${data?.user_id}&slug=${
            cardSelectedData?.slug
          }`
        );
        const tableData = response?.data?.vitals;
        const cardbadge =
          tableData?.length > 0
            ? cardSelectedData?.slug === "blood-pressure"
              ? [
                  {
                    label: `${tableData[0].details?.systolic}/${tableData[0]?.details?.diastolic} mm Hg`,
                    color: tableData[0].details?.bpFlagColor,
                  },
                ]
              : cardSelectedData?.slug === "bmi"
              ? [
                  {
                    label: `${tableData[0].details?.bmi} kg/m²`,
                    color: tableData[0].details?.bmiFlagColor,
                  },
                ]
              : card?.slug === "respiration"
              ? [
                  {
                    label: `${tableData[0].details?.respiration} bpm`,
                    color: tableData[0].details?.respirationFlagColor,
                  },
                ]
              : card?.slug === "spO2"
              ? [
                  {
                    label: `${tableData[0].details?.spo2} %`,
                    color: tableData[0].details?.spo2FlagColor,
                  },
                ]
              : card?.slug === "temperature"
              ? [
                  {
                    label: `${
                      tableData[0]?.details?.unit === "Fahrenheit"
                        ? tableData[0]?.details?.temperature +
                          " °F, " +
                          fahrenheitToCelsius(
                            tableData[0]?.details?.temperature
                          ) +
                          " °C"
                        : celsiusToFahrenheit(
                            tableData[0]?.details?.temperature
                          ) +
                          " °F, " +
                          tableData[0]?.details?.temperature +
                          " °C"
                    }`,
                    color: tableData[0]?.details?.temperatureFlagColor,
                  },
                ]
              : card?.slug === "spirometer"
              ? [
                  {
                    label: `FVC (%):  ${tableData[0].details?.fvc}`,
                    color: `${tableData[0].details?.flags?.fvcFlagColor}`,
                  },
                  {
                    label: `FEV1 (%): ${tableData[0].details?.fev1}`,
                    color: `${tableData[0].details?.flags?.fev1FlagColor}`,
                  },
                  {
                    label: `PEF (%):  ${tableData[0].details?.pef}`,
                    color: `${tableData[0].details?.flags?.pefFlagColor}`,
                  },
                  {
                    label: `FEV1/FVC Ratio:  ${tableData[0].details?.fev1_fvc}`,
                    color: `${tableData[0].details?.flags?.fev1FvcFlagColor}`,
                  },
                ]
              : card?.slug === "heart-rate"
              ? [
                  {
                    label: `${tableData[0]?.details?.heart || ""} bpm`,
                    color: tableData[0].details?.heartRateFlagColor,
                  },
                ]
              : card?.slug === "blood-sugar"
              ? [
                  {
                    label: `${
                      tableData[0]?.details?.blood_sugar || ""
                    } mg/dL`,
                    color: tableData[0].details?.bsFlagColor,
                  },
                ]
              : card?.slug === "lipid-profile"
              ? [
                  {
                    label: `Total Cholesterol:${
                      tableData[0]?.details?.total || ""
                    } mg/dL`,
                    color: tableData[0].details?.total_message_flag,
                  },
                  {
                    label: `LDL:${tableData[0]?.details?.ldl || ""} mg/dL`,
                    color: tableData[0].details?.ldl_message_flag,
                  },
                  {
                    label: `HDL:${tableData[0]?.details?.hdl || ""} mg/dL`,
                    color: tableData[0].details?.hdl_message_flag,
                  },
                  {
                    label: `Triglycerides:${
                      tableData[0]?.details?.triglycerides || ""
                    } mg/dL`,
                    color: tableData[0].details?.triglycerides_message_flag,
                  },
                ]
              : card?.slug === "hct"
              ? [
                  {
                    label: `${tableData[0]?.details?.hct || ""} %`,
                    color: tableData[0].details?.hctFlagColor,
                  },
                ]
              : card?.slug === "hemoglobin"
              ? [
                  {
                    label: `${tableData[0]?.details?.hemoglobin || ""} g/dL`,
                    color: tableData[0].details?.hemoglobinFlagColor,
                  },
                ]
              : card?.slug === "keytone"
              ? [
                  {
                    label: `${tableData[0]?.details?.keytone || ""} mmol/L`,
                    color: tableData[0].details?.keytoneFlagColor,
                  },
                ]
              : card?.slug === "uric_acid"
              ? [
                  {
                    label: `${tableData[0]?.details?.uric_acid || ""} mg/dL`,
                    color: tableData[0].details?.uricFlagColor,
                  },
                ]
              : card?.slug === "urea"
              ? [
                  {
                    label: `${tableData[0]?.details?.urea || ""} mg/dL`,
                    color: `${tableData[0]?.details?.ureaFlagColor}`,
                  },
                ]
              : card?.slug === "creatinine"
              ? [
                  {
                    label: `${
                      tableData[0]?.details?.creatinine || ""
                    } mg/dL`,
                    color: `${tableData[0]?.details?.creatinineFlagColor}`,
                  },
                ]
              : card?.slug === "gfr"
              ? [
                  {
                    label: `${
                      tableData[0]?.details?.gfr || ""
                    } mL/min/1.73m²`,
                    color: `${tableData[0]?.details?.gfrFlagColor}`,
                  },
                ]
              : card?.slug === "urine"
              ? [
                  {
                    label: `Color: ${tableData[0].details?.color}`,
                    color: "",
                  },
                  {
                    label: `Clarity: ${tableData[0]?.details?.clarity}`,
                    color: "",
                  },
                  {
                    label: `Glucose: ${tableData[0]?.details?.glucose}`,
                    color: getGlucoseLabel(tableData[0].details?.glucose),
                  },
                  {
                    label: `Specific Gravity: ${tableData[0].details?.specificGravity}`,
                    color: getSpeGraLabel(
                      tableData[0].details?.specificGravity
                    ),
                  },
                  {
                    label: `PH: ${tableData[0]?.details?.ph}`,
                    color: tableData[0]?.details?.value_flag,
                  },
                  {
                    label: `Protein: ${tableData[0]?.details?.protein}`,
                    color: tableData[0]?.details?.protein_flag,
                  },
                ]
              : []
            : [];

        const formattedData =
          card?.slug === "blood-pressure"
            ? transformBPData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "bmi"
            ? transformBMIData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "respiration"
            ? transformRespirationRateData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "spO2"
            ? transformSpO2Data(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "temperature"
            ? transformTemperatureData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "spirometer"
            ? transformLFTData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "heart-rate"
            ? transformHeartRateData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "blood-sugar"
            ? transformBloodSugarData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "lipid-profile"
            ? transformLipidProfileData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "hct"
            ? transformHematocritData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "hemoglobin"
            ? transformHemoglobinData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "keytone"
            ? transformBloodKetoneData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "uric_acid"
            ? transformBloodUricAcidData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "urea"
            ? transformUreaData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "creatinine"
            ? transformCreatinineData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "gfr"
            ? transformGFRData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : card?.slug === "urine"
            ? transformUrinalysisData(
                response?.data?.vitals,
                response?.data?.pagination
              )
            : null;

        const updatedCard = {
          ...card,
          created: response?.data?.vitals[0]?.details?.date,
          cardbadge,
          ...formattedData,
        };
        setSelectedCardData(updatedCard);

      } catch (error) {
        console.error(
          `Error fetching data for card ${cardSelectedData?.id}:`,
          error
        );
        return {
          ...card,
          cardbadge: card.badge,
          created: "",
        };
      }
    },
    [
      get,
      currentPage,
      searchValue,
      startDate,
      endDate,
      data?.user_id,
      cardSelectedData?.slug,
      cardSelectedData?.id,
    ]
  );

  const openModal = (data) => {
    setCurrentPage(1);
    setSelectedCardData(data);
    // TableDatas(data);
    setIsModalOpen(true);
    setStartDate(null);
    setEndDate(null);
    setSearchValue("");
  };

  useEffect(() => {
    modalStaticData(cards);
  }, [isModalOpen]);

  const closeModal = () => {
    setModalStatic({});
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (parsedData !== null) {
      findByIdforSelectedData();
    }
  }, [parsedData]);

  const getFilter = () => {
    const filteredProducts = cards?.filter(
      (product) => product?.category === currentTabtitle
    );
    setFiltered(filteredProducts);
  };

  useEffect(() => {
    getFilter();
  }, [currentTabtitle, cards]);

  const renderImage = (contentUrl) => {
    return (
      <img
        src={contentUrl}
        alt="mage1"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    );
  };

  // // Function to render PDF content
  const renderPdf = (contentUrl) => {
    return (
      <iframe
        title="PDF Viewer"
        src={contentUrl}
        style={{ width: "100%", height: "140px", border: "none" }}
      />
    );
  };

  useEffect(() => {
    fetchSingleCardData(cardSelectedData);
  }, [fetchSingleCardData, data?.user_id]);

  return (
    <>
      <CRow>
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
              Vital Signs
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
                { label: "Vital Signs", to: "/patients/history" },
              ]}
            />
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={12}>
          <MedicalTab
            tabs={tabs}
            getCurrentTab={getCurrentTab}
            defaultTab={currentTab?.id - 1}
          />
        </CCol>
      </CRow>
      {!vitalsLoading ? (
        <CRow className="mt-3">
          {/* <CCol md={12}>
          <VitalsTab category={currentTabtitle} openModal={openModal} />
        </CCol> */}
          {filtered?.map((item, index) => (
            <CCol md={6} xl={4} key={index} className="mb-3">
              <CCard
                className={`vital-cards`}
                onClick={() => {
                  openModal(item);
                }}
              >
                <CCardBody>
                  <div className="vital-icon-and-title">
                    <div>
                      <img alt="bp" src={item?.icon} />
                    </div>
                    <div className="vital-card-title">
                      <span className="vital-card-text-bold">{item?.name}</span>
                      {/* <span className="vital-card-text">
                        Recently Added{" "}
                        {item?.created
                          ?.split(" ")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </span> */}
                      <span className="fs-14 fw-500">
                        {item?.tableData?.[0]?.date
                          ? formatDateTime(item?.tableData[0].date) // Format date to DD-MM-YYYY HH:MM
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="vital-badge">
                    <div className="vital-badge-list">
                      {item?.cardbadge?.map((dt, i) => (
                        <div key={i} style={{ height: "24px" }}>
                          <Badge label={dt?.label} color={dt?.color} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="vital-line-container">
                    {/* <img alt="line" src={Assets.Vitalline} /> */}
                    {/* {item?.name === "Heart" ? (
                    <div className="chart-item">
                      <div className="rectangle">
                            <img src={Assets.ecgSample} alt="ecg" />
                          </div>
                      {renderImage(Assets.ecgSample)}
                      {renderPdf("https://www.orimi.com/pdf-test.pdf")}
                    </div>
                  ) : (
                    <CardChart datas={item} />
                  )} */}
                    <CardChart datas={item} />
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      ) : (
        <div
          className="d-flex w-100 justify-content-center mb-3 align-items-center"
          style={{ height: "350px", maxHeight: "100%" }}
        >
          <Loader />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CContainer className="p-0">
          <CRow>
            <CCol className="mb-3">
              <ObjectiveDetailPage
                data={cardSelectedData}
                getTableDatas={(data) => {
                  setModalStatic({});
                  fetchSingleCardData(data || cardSelectedData);
                  modalStaticData(cards);
                  setChange(true);
                }}
                getFilterValues={(data1, data2, data3) => {
                  getFilterValues(data1, data2, data3);
                  setFilters(false);
                }}
                currentPage={currentPage}
                onPageChange={onPageChange}
                topData={modalStatic}
                setModalStatic={setModalStatic}
              />
              {/* <ObjectiveDetailPage
                data={entities}
                getTableDatas={(data) => TableDatas(data)}
              /> */}
            </CCol>
          </CRow>
        </CContainer>
      </Modal>
    </>
  );
};

export default VitalSign;
