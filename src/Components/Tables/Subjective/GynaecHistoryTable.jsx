import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";
import Badge from "../../Badge/Badge";
import { Assets } from "../../../assets/Assets";
import { getSerialNumber } from "../../../Utils/commonUtils";


const GynaecHistoryTable = ({
  columns,
  rowData,
  getselectedData,
  from,
  itemsPerPage,
  currentPage,
}) => {
  const selectedData = (data, type) => {
    getselectedData(data, type);
  };
  return (
    <div className="table-container">
      <CTable className="lab-responsive-table-screening">
        <CTableHead color="dark">
          <CTableRow>
            {columns?.map((data, i) =>
              from === "Consult-Gynaec" && i === columns.length - 1 ? null : (
                <CTableHeaderCell key={i}>{data?.label}</CTableHeaderCell>

              )
            )}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {rowData?.map((dt, i) => (
            <CTableRow key={i}>
              <CTableHeaderCell style={{ height: "10px" }}>
              {getSerialNumber(itemsPerPage, currentPage, i)}
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{}</span>
                </div>
              </CTableHeaderCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                <span className="fs-16 fw-500">{dt?.values?.menarche_age}</span>
                </div>
              </CTableDataCell>
              {/* 
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.cycle_in_days}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  {dt?.flow_duration}
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  {dt?.flow_type}
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  {dt?.bleeding}
                </div>
              </CTableDataCell> */}
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                <span>{dt?.values?.cycle?.irregular}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                <span>{dt?.values?.dysmenorrhea}</span>
                </div>
              </CTableDataCell>{" "}
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <span>{dt?.values?.lmp}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                <span className="fs-16 fw-500">{dt?.values?.menopause}</span>
                </div>
              </CTableDataCell>
              {from !== "Consult-Gynaec" && (
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center gap-2 h-100">
                    <div
                      style={{
                        width: "50%",
                      }}
                    >
                      <img
                        alt="edit"
                        src={Assets?.EditPencil}
                        className="cursor"
                        onClick={() => selectedData(dt, "edit")}
                      />
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <img
                        alt="delete"
                        src={Assets?.Delete}
                        className="cursor"
                        onClick={() => selectedData(dt, "delete")}
                      />
                    </div>
                  </div>
                </CTableDataCell>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default GynaecHistoryTable;
