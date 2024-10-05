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
import { getSerialNumber, isWithin24Hours } from "../../../Utils/commonUtils";


// Helper function to format date to dd-MM-yyyy HH:mm:ss
const formatDate = (dateString) => {
  const parsedDate = Date.parse(dateString);
  if (isNaN(parsedDate)) return "N/A"; // Return "N/A" if the date is invalid

  const date = new Date(parsedDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
  const year = date.getFullYear();



  return `${day}-${month}-${year} `; // Format as dd-MM-yyyy HH:mm
};



const SymtomsTable = ({ columns, rowData, getselectedData, from, itemsPerPage, currentPage }) => {

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
                <CTableHeaderCell
                  key={i}
                  className={`${data?.label === "No." ? "subGridTh-No" : "subGridTh"} `}
                >
                  {data?.label}
                </CTableHeaderCell>
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
                <CTableDataCell className="subGrid-right grid-vertical-line">
                  {getSerialNumber(itemsPerPage, currentPage, i)}
                </CTableDataCell>
                <CTableDataCell className="subGrid-date subGrid-left grid-vertical-line">
                  <span className="fs-16 fw-500">
                    <span className="fs-16 fw-500">{formatDate(dt?.values?.date)}</span>
                  </span>
                  <span className="fs-16 fw-500">
                    {dt?.values?.time ? dt?.values?.time : "-"}
                  </span>
                </CTableDataCell>
                <CTableDataCell className="subGrid-left grid-vertical-line">
                    <span className="fs-16 fw-500">{dt?.values?.location ? dt?.values?.location : "-"}</span>
                </CTableDataCell>

                <CTableDataCell className="subGrid-left grid-vertical-line">
                  <span>{dt?.values?.symptoms ? dt?.values?.symptoms : "-"}</span>
                </CTableDataCell>
                <CTableDataCell className="subGrid-left grid-vertical-line">
                  <span>{dt?.values?.duration ? dt?.values?.duration : "-"}</span>
                </CTableDataCell>
                <CTableDataCell className="subGrid-left grid-vertical-line">
                  <span>{dt?.values?.severity ? dt?.values?.severity : "-"}</span>
                </CTableDataCell>
              
                {from !== "Consult" && (
                  <CTableDataCell className="subGrid-left grid-vertical-line">
                  <div className="d-flex align-items-center gap-3 h-100">
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
                            // width: "50%",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <img
                            alt="edit"
                            src={Assets?.EditPencil}
                            className={`cursor ${dt?.freeze === 1 ? "greyed-out" : ""
                              }`}
                            onClick={() => selectedData(dt, dt?.id, "edit")}
                          />
                        </div>
                        <div
                          style={{
                            // width: "50%",
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

export default SymtomsTable;
