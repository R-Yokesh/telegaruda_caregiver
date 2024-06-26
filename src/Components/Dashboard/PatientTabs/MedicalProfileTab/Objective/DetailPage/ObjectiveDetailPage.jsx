import {
  CBadge,
  CCol,
  CContainer,
  CFormInput,
  CModal,
  CModalBody,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React, { useState } from "react";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../../../../../assets/Assets";
import Table from "../../../../../Tables/Table";
import Badge from "../../../../../Badge/Badge";
import ActiveButton from "../../../../../Buttons/ActiveButton/ActiveButton";
import ChartTab from "../../../../../Charts/ChartTab";
import DynamicTable from "../../../../../Tables/DynamicTable";

import BPForm from "../AddForms/BPForm";
import HeartRate from "../AddForms/HeartRate";
import LFTForm from "../AddForms/LFTForm";

const ObjectiveDetailPage = ({ data }) => {
  const [chartView, setChartView] = useState(false);
  const [addView, setAddView] = useState(false);

  const columns = [
    { id: 1, label: "NO." },
    { id: 2, label: "RESULT" },
    { id: 3, label: "SYSTOLIC" },
    { id: 4, label: "DIASTOLIC" },
    { id: 5, label: "PLUSE (IN BPM" },
    { id: 6, label: "DATE" },
    { id: 7, label: "ACTION" },
  ];

  const rowData = [
    {
      id: 1,
      result: { status: "success", name: "Normal" },
      systolic: "112",
      diastolic: "25",
      pluse: "89",
      date: "02-04-2024 12:13PM",
      action: [{ type: "warning" }],
    },
    {
      id: 2,
      result: {
        status: "error",
        name: "High Blood Pressure (Hypertension) Stage 1",
      },
      systolic: "112",
      diastolic: "25",
      pluse: "89",
      date: "02-04-2024 12:13PM",
      action: [{ type: "edit" }, { type: "delete" }],
    },
    {
      id: 3,
      result: { status: "error", name: "Normal" },
      systolic: "118",
      diastolic: "12",
      pluse: "-",
      date: "02-04-2024 12:13PM",
      action: [{ type: "edit" }, { type: "delete" }],
    },
    {
      id: 4,
      result: {
        status: "error",
        name: "High Blood Pressure (Hypertension) Stage 1",
      },
      systolic: "112",
      diastolic: "25",
      pluse: "89",
      date: "02-04-2024 12:13PM",
      action: [{ type: "edit" }, { type: "delete" }],
    },
    {
      id: 5,
      result: { status: "success", name: "Normal" },
      systolic: "118",
      diastolic: "12",
      pluse: "45",
      date: "02-04-2024 12:13PM",
      action: [{ type: "edit" }, { type: "delete" }],
    },
  ];

  const chartPage = () => {
    setChartView(true);
  };
  const tablePage = () => {
    setChartView(false);
  };
  const addPage = () => {
    setAddView(true);
  };
  const addBack = () => {
    setAddView(false);
  };
  return (
    <>
      <CContainer className="p-0">
        <CContainer className="mt-2 mb-3">
          <CRow>
            <CCol lg={7}>
              <div className="d-flex flex-row gap-3">
                <img src={data?.icon} alt="icon" />
                <div className="d-flex flex-column gap-2">
                  <span className="fs-20 fw-600">{data?.name}</span>
                  <div className="d-flex flex-row gap-2 flex-wrap">
                    {data?.badge?.map((dt, i) => (
                      <Badge label={dt?.label} color={dt?.color} />
                    ))}
                  </div>
                  <span className="fs-14 fw-500">{data?.date}</span>
                </div>
              </div>
            </CCol>
            <CCol lg={5} className="d-flex align-items-center mt-2">
              <CRow className="w-100 d-flex justify-content-around">
                <CCol xs={4} md={4} lg={4}>
                  {!addView && (
                    <PrimaryButton onClick={() => addPage()}>
                      <div className="d-flex align-items-center gap-2">
                        <img src={Assets.Add} alt="add" />
                        <span className="fs-16 fw-600">Add</span>
                      </div>
                    </PrimaryButton>
                  )}
                  {addView && (
                    <ActiveButton onClick={() => addBack()}>
                      <div className="d-flex align-items-center gap-2">
                        <img src={Assets.CloseX} alt="add" />
                        <span className="fs-16 fw-600">Add</span>
                      </div>
                    </ActiveButton>
                  )}
                </CCol>
                <CCol xs={4} md={4} lg={4}>
                  <PrimaryButton>
                    <div className="d-flex align-items-center gap-2">
                      <img src={Assets.Filter} alt="add" />
                      <span className="fs-16 fw-600">Filter</span>
                    </div>
                  </PrimaryButton>
                </CCol>
                {!chartView && (
                  <CCol xs={4} md={4} lg={4}>
                    <PrimaryButton onClick={() => chartPage()}>
                      <div className="d-flex align-items-center gap-2">
                        <img src={Assets.Chart} alt="add" />
                        <span className="fs-16 fw-600">Chart</span>
                      </div>
                    </PrimaryButton>
                  </CCol>
                )}
                {chartView && (
                  <CCol xs={4} md={4} lg={4}>
                    <ActiveButton onClick={() => tablePage()}>
                      <div className="d-flex align-items-center gap-2">
                        <img src={Assets.CloseX} alt="add" />
                        <span className="fs-16 fw-600">Chart</span>
                      </div>
                    </ActiveButton>
                  </CCol>
                )}
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
        <CRow>
          <CCol xl={12}>
            {chartView ? (
              <ChartTab data={data} />
            ) : (
              <DynamicTable
                columnsData={data?.columnsData}
                tableData={data?.tableData}
              />
            )}
          </CCol>
        </CRow>

        {/* Modal for add  */}
        <CModal
          alignment="center"
          visible={addView}
          onClose={addBack}
          aria-labelledby="VerticallyCenteredExample"
          size="xl"
        >
          <CModalBody className="p-4">
            {data?.name === "Blood Pressure" && <BPForm addBack={addBack} />}
            {data?.name === "Heart Rate" && <HeartRate addBack={addBack} />}
            {data?.name === "Lung Function Test (LFT)" && (
              <LFTForm addBack={addBack} />
            )}
          </CModalBody>
        </CModal>
      </CContainer>
    </>
  );
};

export default ObjectiveDetailPage;
