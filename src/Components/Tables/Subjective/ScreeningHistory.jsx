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

const ScreeningHistory = ({ columns, rowData, getselectedData }) => {
  const selectedData = (data, type) => {
    getselectedData(data, type);
  };
  return (
    <>
      <CTable className="lab-responsive-table-screening">
        <CTableHead color="dark">
          <CTableRow>
            {columns?.map((data, i) => (
              <CTableHeaderCell key={i}>{data?.label}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {rowData?.map((dt, i) => (
            <CTableRow key={i}>
              <CTableHeaderCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center h-100">
                  <span className="fs-16 fw-500">{dt?.id}</span>
                </div>
              </CTableHeaderCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center h-100">
                  <span className="fs-16 fw-500">{dt?.date_of_last_pap}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center h-100">
                  <span className="fs-16 fw-500">{dt?.history_of_abnormal}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center h-100">
                  <span className="fs-16 fw-500">{dt?.date_of_last_mamogram}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center h-100">
                  {dt?.history_of_mamogram}
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center h-100">
                  {dt?.date_of_last_breast}
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center h-100">
                  {dt?.history_of_breast}
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center gap-2 h-100">
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
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default ScreeningHistory;
