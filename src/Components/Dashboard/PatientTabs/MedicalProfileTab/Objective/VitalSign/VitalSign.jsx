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
import { transformBMIData, transformBPData } from "./FormattedDatas";

const VitalSign = ({ setVitalView, onClose }) => {
  const tabs = [
    { id: 1, title: "Primary Vitals" },
    { id: 2, title: "Metabolic And Biochemical Profile" },
    { id: 3, title: "Hematologic Profile" },
    { id: 4, title: "Renal and Metabolic Markers" },
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
  const { loading, error, get } = useApi();

  const getFilterValues = (startDate, endDate, searchValue) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSearchValue(searchValue);
  };

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        // Create an array of promises to fetch data for each card
        const fetchPromises = ObjectiveDatas.map(async (card) => {
          if (card.slug !== null) {
            try {
              const response = await get(
                `resource/vitals?limit=10&page=1&from=&to=&order_by=details-%3Edate&dir=2&user_id=10&slug=${card?.slug}`
              );
              const tableData = response?.data?.vitals;

              const cardbadge =
                tableData.length > 0
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
                          label: `${tableData[0].details?.bmi}kg/m²`,
                          color: tableData[0].details?.bmiFlagColor,
                        },
                      ]
                    : []
                  : [];
              const formattedData =
                card?.slug === "blood-pressure"
                  ? transformBPData(response?.data?.vitals)
                  : card?.slug === "bmi"
                  ? transformBMIData(response?.data?.vitals)
                  : null;

              return {
                ...card,
                created: response?.data?.vitals[0]?.details?.date,
                cardbadge,
                ...formattedData,
              };
            } catch (error) {
              console.error(`Error fetching data for card ${card.id}:`, error);
              return {
                ...card,
                cardbadge: card.badge,
                created: "N/A",
              };
            }
          }
        });

        // Wait for all fetches to complete
        const updatedCards = await Promise.all(fetchPromises);
        setCards(updatedCards);
        getFilter();
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    if (filters) {
      fetchCardData();
    }
  }, [entities, cardSelectedData]);
  // entities, cardSelectedData

  const fetchCardData = async (card) => {
    console.log(searchValue, "searchValue");
    try {
      const response = await get(
        `resource/vitals?limit=10&page=1&searchkey=${searchValue ?? ""}&from=${
          startDate ?? ""
        }&to=${endDate ?? ""}&order_by=details-%3Edate&dir=2&user_id=10&slug=${
          cardSelectedData?.slug
        }`
      );
      const tableData = response?.data?.vitals;

      const cardbadge =
        tableData.length > 0
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
                  label: `${tableData[0].details?.bmi}kg/m²`,
                  color: tableData[0].details?.bmiFlagColor,
                },
              ]
            : []
          : [];

      const formattedData =
        card?.slug === "blood-pressure"
          ? transformBPData(response?.data?.vitals)
          : card?.slug === "bmi"
          ? transformBMIData(response?.data?.vitals)
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
        created: "N/A",
      };
    }
  };

  const openModal = (data) => {
    setSelectedCardData(data);
    // TableDatas(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
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
    fetchCardData(cardSelectedData);
  }, [startDate, endDate, searchValue]);

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
                    <span className="vital-card-text">
                      Recently Added{" "}
                      {item?.created
                        ?.split(" ")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
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
                  {item?.name === "Heart" ? (
                    <div className="chart-item">
                      {/* <div className="rectangle">
                            <img src={Assets.ecgSample} alt="ecg" />
                          </div> */}
                      {renderImage(Assets.ecgSample)}
                      {/* {renderPdf("https://www.orimi.com/pdf-test.pdf")} */}
                    </div>
                  ) : (
                    <CardChart datas={item} />
                  )}
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CContainer className="p-0">
          <CRow>
            <CCol className="mb-3">
              <ObjectiveDetailPage
                data={cardSelectedData}
                getTableDatas={(data) => fetchCardData(data)}
                getFilterValues={(data1, data2, data3) => {
                  getFilterValues(data1, data2, data3);
                  setFilters(false);
                }}
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
