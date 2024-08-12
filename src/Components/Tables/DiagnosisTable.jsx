import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";
import Badge from "../Badge/Badge";
import { Assets } from "../../assets/Assets";

const DiagnosisTable = ({ columns, rowData, getselectedData, from }) => {
  const selectedData = (data, type) => {
    getselectedData(data, type);
  };
  return (
    <>
      <CTable className="lab-responsive-table">
        <CTableHead color="dark">
          <CTableRow>
            {columns?.map((data, i) =>
              from === "Consult" && i === columns.length - 1 ? null : (
                <CTableHeaderCell key={i}>{data?.label}</CTableHeaderCell>
              )
            )}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {rowData?.map((dt, i) => (
            <CTableRow key={i}>
              <CTableHeaderCell>
                <span className="fs-16 fw-500">{dt?.id}</span>
              </CTableHeaderCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.date}</span>
              </CTableDataCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.condition}</span>
              </CTableDataCell>
              <CTableDataCell>{dt?.treatment}</CTableDataCell>
              {/* <CTableDataCell>{dt?.remark}</CTableDataCell> */}
              {from !== "Consult" && (
                <CTableDataCell>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <img
                      alt="edit"
                      src={Assets?.TableEdit}
                      className="cursor"
                      onClick={() => selectedData(dt, "edit")}
                    />
                    <img
                      alt="delete"
                      src={Assets?.TableDelete}
                      className="cursor"
                      onClick={() => selectedData(dt, "delete")}
                    />
                  </div>
                </CTableDataCell>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default DiagnosisTable;
