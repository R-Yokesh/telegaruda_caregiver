import React, { useEffect, useState } from "react";
import VitalsTab from "../../../VitalsTab/VitalsTab";
import { CCol, CContainer, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import MedicalTab from "../../MedicalTab";
import Modal from "../../../../../Modal/Modal";
import ObjectiveDetailPage from "../DetailPage/ObjectiveDetailPage";
import useApi from "../../../../../../ApiServices/useApi";
import { ObjectiveDatas } from "../../../../../Consultant/TableColumnsJson/ObjectiveJson";

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
  const [entities, setEntities] = useState([]);

  const { loading, error, get } = useApi();

  const transformData = (originalData) => {
    if (!Array.isArray(originalData) || originalData.length === 0) {
      return null;
    }

    // Map through original data to create tableData
    const tableData = originalData.map((item, index) => ({
      "no.": index + 1,
      result: {
        status: item.details.bpFlagColor === "success" ? "success" : "error",
        name: item.details.bpFlag || "Unknown",
      },
      systolic: item.details.systolic || "N/A",
      diastolic: item.details.diastolic || "N/A",
      "pulse_(in_bpm)": item.details.pulse || "N/A",
      date: `${item.details.date} ${item.details.time || ""}`,
      action:
        item.freeze === 1
          ? [{ type: "warning" }]
          : [{ type: "edit" }, { type: "delete" }],
      name: "Blood Pressure",
      id: item.id,
      user_id: item.user_id,
    }));

    // Create badge and other static information
    const badge =
      tableData.length > 0
        ? [
            {
              label: `${tableData[0].systolic}/${tableData[0].diastolic} mm Hg`,
              color: tableData[0].result.status,
            },
          ]
        : [];

    return {
      id: 1,
      icon: Assets.VitalBP,
      name: "Blood Pressure",
      date: `Recently Added ${tableData[0].date
        .split(" ")[0]
        .split("-")
        .reverse()
        .join("-")}`,
      category: "Primary Vitals",
      badge,
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "SYSTOLIC" },
        { id: 4, label: "DIASTOLIC" },
        { id: 5, label: "PULSE (IN BPM)" },
        { id: 6, label: "DATE" },
        { id: 7, label: "ACTION" },
      ],
      tableData,
      chartLabel1: "PULSE (IN BPM)",
    };
  };

  const TableDatas = async (data) => {
    try {
      const response = await get(
        `resource/vitals?limit=10&page=1&from=&to=&order_by=details-%3Edate&dir=2&user_id=10&slug=blood-pressure`
      );
      setIsModalOpen(true);
      if (response.code === 200) {
        const formattedData = transformData(response?.data?.vitals);
        setEntities(formattedData);
      } else {
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const openModal = (data) => {
    setSelectedCardData(data);
    TableDatas(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (parsedData !== null) {
      findByIdforSelectedData();
    }
  }, [parsedData]);
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
      <CRow>
        <CCol md={12}>
          <VitalsTab category={currentTabtitle} openModal={openModal} />
        </CCol>
      </CRow>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CContainer className="p-0">
          <CRow>
            <CCol className="mb-3">
              <ObjectiveDetailPage data={cardSelectedData} />
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
