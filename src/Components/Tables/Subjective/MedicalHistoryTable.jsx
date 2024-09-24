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

const MedicalHistoryTable = ({
  columns,
  rowData,
  getselectedData,
  from,
  itemsPerPage,
  currentPage,
}) => {
  const selectedData = (data, id, type) => {
    getselectedData(data, id, type);
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
          {rowData?.length <= 0 ? (
            <tr>
              <td colSpan={columns.length} className="no-data-message">
                No data available
              </td>
            </tr>
          ) : (
            rowData?.map((dt, i) => (
              <CTableRow key={i}>
                <CTableHeaderCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    {getSerialNumber(itemsPerPage, currentPage, i)}
                  </div>
                </CTableHeaderCell>
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <span className="fs-16 fw-500">
                      {dt?.values?.onset_date ? dt?.values?.onset_date : ""}
                    </span>
                  </div>
                </CTableDataCell>
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <span className="fs-16 fw-500">
                      {dt?.values?.condition?.name}
                    </span>
                  </div>
                </CTableDataCell>

                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex flex-column align-items-center">
                    <span>{dt?.values?.condition?.icd?.slug ?? "-"}</span>
                  </div>
                </CTableDataCell>
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex flex-column align-items-center">
                    <span style={{ textTransform: "capitalize" }}>{dt?.values?.condition?.chronic_illness}</span>
                  </div>
                </CTableDataCell>
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex flex-column align-items-center">
                    <span style={{ textTransform: "capitalize" }}>
                      {dt?.values?.condition?.previous_illness}
                    </span>
                  </div>
                </CTableDataCell>

                {/* <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <span>{dt?.notes}</span>
                </div>
              </CTableDataCell> */}

                {from !== "Consult" && (
                  <CTableDataCell style={{ height: "10px" }}>
                    <div className="d-flex align-items-center justify-content-center gap-2 h-100">
                      {dt?.consult_id === !null ? (
                        <div>
                          <img
                            src={Assets.Warning}
                            alt="warn"
                            className="cursor"
                          />
                        </div>
                      ) : (
                        <>
                          <div
                            style={{
                              width: "50%",
                            }}
                          >
                            <img
                              alt="edit"
                              src={Assets?.EditPencil}
                              className={`cursor ${
                                dt?.freeze === 1 ? "greyed-out" : ""
                              }`}
                              onClick={() => selectedData(dt, dt?.id, "edit")}
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
                              onClick={() => selectedData(dt, dt?.id, "delete")}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </CTableDataCell>
                )}
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>
    </>
  );
};

export default MedicalHistoryTable;
