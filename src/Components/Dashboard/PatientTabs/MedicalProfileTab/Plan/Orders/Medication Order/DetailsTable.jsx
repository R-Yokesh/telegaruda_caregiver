import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";
import { Assets } from "../../../../../../../assets/Assets";
import Badge from "../../../../../../Badge/Badge";

const DetailsTable = ({ columns, rowData, getselectedData }) => {
  const selectedData = (data, type) => {
    getselectedData(data, type);
  };
  return (
    <>
      <CTable className="detailsTable">
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
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.name}</span>
                </div>
              </CTableHeaderCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.rx}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.frequency[0]}</span>
                </div>
              </CTableDataCell>

              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <span>{dt?.duration}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <span>{dt?.qty}</span>
                </div>
              </CTableDataCell>
              {i === 0 && (
                <CTableDataCell
                  style={{ height: "10px" }}
                  rowSpan={rowData.length}
                >
                  <div className="d-flex align-items-center justify-content-center gap-2 h-100">
                    <div
                      style={{
                        width: "50%",
                      }}
                    >
                      <img
                        alt="edit"
                        src={Assets?.TickCircle}
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
                        src={Assets?.PlusCircle}
                        className="cursor"
                        onClick={() => selectedData(dt, "details")}
                        style={{transform:'rotate(45deg)'}}
                      />
                    </div>
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

export default DetailsTable;
