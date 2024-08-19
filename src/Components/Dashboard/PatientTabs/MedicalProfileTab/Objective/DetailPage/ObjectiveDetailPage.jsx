import {
  CBadge,
  CCol,
  CContainer,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../../../../../assets/Assets";
import Table from "../../../../../Tables/Table";
import Badge from "../../../../../Badge/Badge";
import ActiveButton from "../../../../../Buttons/ActiveButton/ActiveButton";
import ChartTab from "../../../../../Charts/ChartTab";
import DynamicTable from "../../../../../Tables/DynamicTable";

import BPForm from "../Forms/BPForm";
import HeartRate from "../Forms/HeartRate";
import LFTForm from "../Forms/LFTForm";
import LipidProfileForm from "../Forms/LipidProfileForm";
import Temperature from "../Forms/Temperature";
import Spo2 from "../Forms/Spo2";
import RespirationRateForm from "../Forms/RespirationRateForm";
import BMI from "../Forms/BMI";
import BSugar from "../Forms/BSugar";
import Hemogloin from "../Forms/Hemogloin";
import HCT from "../Forms/HCT";
import BUricAcid from "../Forms/BUricAcid";
import BKetone from "../Forms/BKetone";
import Urea from "../Forms/Urea";
import Creatinine from "../Forms/Creatinine";
import GFR from "../Forms/GFR";
import Urinalysis from "../Forms/Urinalysis";
import BlurBackground from "../../../../../BlurBackground/BlurBackground";
import DateRangePicker from "../../../../../DateRangePicker/DateRangePicker";
import ECGChart from "../ECG Chart/ECGChart";
import useApi from "../../../../../../ApiServices/useApi";

const ObjectiveDetailPage = ({ data, getTableDatas }) => {
  const [chartView, setChartView] = useState(false);
  const [addView, setAddView] = useState(false);
  const [filterView, setFilterView] = useState(false);

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

  const filterPage = () => {
    setFilterView(true);
  };
  const filterBack = () => {
    setFilterView(false);
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
                  {filterView && (
                    <ActiveButton onClick={() => filterBack()}>
                      <div className="d-flex align-items-center gap-2">
                        <img src={Assets.CloseX} alt="add" />
                        <span className="fs-16 fw-600">Filter</span>
                      </div>
                    </ActiveButton>
                  )}
                  {!filterView && (
                    <PrimaryButton>
                      <div
                        className="d-flex align-items-center gap-2"
                        onClick={() => filterPage()}
                      >
                        <img src={Assets.Filter} alt="add" />
                        <span className="fs-16 fw-600">Filter</span>
                      </div>
                    </PrimaryButton>
                  )}
                </CCol>
                {/* {data.id !== 14 && ( */}
                <>
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
                </>
                {/* )} */}
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
        <CRow>
          <CCol xl={12}>
            {chartView ? (
              data?.name === "ECG" ? (
                <ECGChart data={data} />
              ) : (
                <ChartTab data={data} />
              )
            ) : (
              <>
                {filterView && <DateRangePicker onClose={filterBack} />}
                <DynamicTable
                  columnsData={data?.columnsData}
                  tableData={data?.tableData}
                  getTableDatas={getTableDatas}
                />
              </>
            )}
          </CCol>
        </CRow>

        {/* Modal for add  */}
        {addView && (
          <BlurBackground>
            <CModal
              alignment="center"
              visible={addView}
              onClose={addBack}
              aria-labelledby="VerticallyCenteredExample"
              size="lg"
            >
              <CModalHeader>
                <h4 className="fw-600">Add {data?.name}</h4>
              </CModalHeader>
              <CModalBody className="p-4">
                {data?.name === "Blood Pressure" && (
                  <BPForm
                    addBack={addBack}
                    getTableDatas={getTableDatas}
                  />
                )}
                {data?.name === "Heart" && <HeartRate addBack={addBack} />}
                {data?.name === "Lung Function Test (LFT)" && (
                  <LFTForm addBack={addBack} />
                )}
                {data?.name === "Lipid Profile" && (
                  <LipidProfileForm addBack={addBack} />
                )}
                {data?.name === "Temperature" && (
                  <Temperature addBack={addBack} />
                )}
                {data?.name === "SpO2" && <Spo2 addBack={addBack} />}
                {data?.name === "Respiration Rate" && (
                  <RespirationRateForm addBack={addBack} />
                )}
                {data?.name === "BMI" && <BMI addBack={addBack} />}
                {data?.name === "Blood Sugar" && <BSugar addBack={addBack} />}
                {data?.name === "Hemoglobin" && <Hemogloin addBack={addBack} />}
                {data?.name === "Hematocrit (HCT)" && <HCT addBack={addBack} />}
                {data?.name === "Blood Uric Acid" && (
                  <BUricAcid addBack={addBack} />
                )}
                {data?.name === "Blood Ketone" && <BKetone addBack={addBack} />}
                {data?.name === "Urea" && <Urea addBack={addBack} />}
                {data?.name === "Creatinine" && (
                  <Creatinine addBack={addBack} />
                )}
                {data?.name === "GFR" && <GFR addBack={addBack} />}
                {data?.name === "Urinalysis" && (
                  <Urinalysis addBack={addBack} />
                )}
              </CModalBody>
            </CModal>
          </BlurBackground>
        )}
      </CContainer>
    </>
  );
};

export default ObjectiveDetailPage;
