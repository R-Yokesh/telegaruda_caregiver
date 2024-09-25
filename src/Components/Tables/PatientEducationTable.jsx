import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";
import { Assets } from "../../assets/Assets";
import { format, parse } from "date-fns";
import { getSerialNumber } from "../../Utils/commonUtils";

// Helper function to format date to dd-MM-yyyy HH:mm:ss
const formatDate = (dateString) => {
  const parsedDate = Date.parse(dateString);
  if (isNaN(parsedDate)) return "N/A"; // Return "N/A" if the date is invalid

  const date = new Date(parsedDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year} `; // Format as dd-MM-yyyy HH:mm
};

const PatientEducationTable = ({
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
                <CTableHeaderCell>
                  {getSerialNumber(itemsPerPage, currentPage, i)}
                </CTableHeaderCell>
                <CTableDataCell>
                  <span className="fs-16 fw-500">
                    {formatDate(dt?.addition_info?.date)}
                  </span>
                  {/* <span className="fs-16 fw-500">
                    {dt?.addition_info?.time ? dt?.addition_info?.time : "-"}
                  </span> */}
                </CTableDataCell>

                <CTableDataCell>
                  <span className="fs-16 fw-500">
                    {dt?.addition_info?.title ? dt?.addition_info?.title : "-"}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <span className="fs-16 fw-500">
                    {dt?.addition_info?.notes ? dt?.addition_info?.notes : "-"}
                  </span>
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
                              display: "flex",
                              justifyContent: "flex-end",
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

export default PatientEducationTable;
