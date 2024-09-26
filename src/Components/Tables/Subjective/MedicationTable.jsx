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

const MedicationTable = ({
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
                  <div className="d-flex align-items-center justify-content-center h-100 flex-column">
                    <span className="fs-16 fw-500">
                      {dt?.values[0]?.medicine_name
                        ? dt?.values[0]?.medicine_name
                        : "-"}
                    </span>
                    <small>
                      {dt?.values[0]?.medicine_type}
                      {/* {dt?.values[0]?.strength ? dt?.values[0]?.strength : "-"} {dt?.values[0]?.strength_measurement ? dt?.values[0]?.strength_measurement : "-"} {dt?.values[0]?.dosage ? dt?.values[0]?.dosage : "-"} */}
                    </small>
                  </div>
                </CTableDataCell>

                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <span className="fs-16 fw-500">
                      {dt?.values[0]?.medicine_taken?.m?.length !== 0
                        ? dt?.values[0]?.medicine_taken?.m
                        : 0}{" "}
                      -{" "}
                      {dt?.values[0]?.medicine_taken?.a?.length !== 0
                        ? dt?.values[0]?.medicine_taken?.a
                        : 0}{" "}
                      -{" "}
                      {dt?.values[0]?.medicine_taken?.e?.length !== 0
                        ? dt?.values[0]?.medicine_taken?.e
                        : 0}{" "}
                      -{" "}
                      {dt?.values[0]?.medicine_taken?.n?.length !== 0
                        ? dt?.values[0]?.medicine_taken?.n
                        : 0}
                    </span>
                  </div>
                </CTableDataCell>
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <span
                      className="fs-16 fw-500"
                      style={{ textTransform: "capitalize" }}
                    >
                      {dt?.values[0]?.medicine_takenat
                        ? dt?.values[0]?.medicine_takenat.toUpperCase()
                        : "-"}
                    </span>
                  </div>
                </CTableDataCell>
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <span className="fs-16 fw-500">
                      {dt?.values[0]?.total_qty
                        ? dt?.values[0]?.total_qty
                        : "-"}
                    </span>
                  </div>
                </CTableDataCell>
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <span className="fs-16 fw-500">
                      {dt?.values[0]?.start_date
                        ?.split(" ")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </span>
                  </div>
                </CTableDataCell>
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <span className="fs-16 fw-500">
                      {" "}
                      {dt?.values[0]?.status ? dt?.values[0]?.status : "-"}{" "}
                    </span>
                  </div>
                </CTableDataCell>

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
                              src={Assets?.visibleEye}
                              //  className={`cursor ${dt?.freeze === 1 ? "greyed-out" : ""}`}
                              className="cursor"
                              onClick={() => selectedData(dt, dt?.id, "view")}
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

export default MedicationTable;
