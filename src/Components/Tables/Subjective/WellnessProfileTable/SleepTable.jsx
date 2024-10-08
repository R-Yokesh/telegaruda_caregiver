import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";
import Badge from "../../../Badge/Badge";
import { Assets } from "../../../../assets/Assets";
import { getSerialNumber } from "../../../../Utils/commonUtils";

const formatTime = (timeString) => {
  const parsedTime = Date.parse(timeString);
  if (isNaN(parsedTime)) return "-"; // Return "-" if the time is invalid

  const date = new Date(parsedTime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`; // Return formatted time as HH:mm
};


const SleepTable = ({ columns, rowData, getselectedData, from, itemsPerPage, currentPage }) => {
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
                <CTableDataCell className="subGrid-right grid-vertical-line numWell">
                  {getSerialNumber(itemsPerPage, currentPage, i)}
                </CTableDataCell>
                <CTableDataCell className="subGrid-date subGrid-left grid-vertical-line">
                  <span className="fs-16 fw-500" style={{ marginRight: "6px" }}>{dt?.act_date?.split(" ")[0]?.split("-")?.reverse()?.join("-")}</span>
                  <span className="fs-16 fw-500">
                    {dt?.act_time ? dt?.act_time.split(":").slice(0, 2).join(":") : "-"}
                  </span>
                </CTableDataCell>
                <CTableDataCell className="subGrid-date subGrid-left grid-vertical-line">
                  <span className="fs-16 fw-500">{dt?.act_type}</span>
                </CTableDataCell>

                <CTableDataCell className="subGrid-date subGrid-left grid-vertical-line">
                  <span>{dt?.act_duration}</span>
                </CTableDataCell>
                {from !== "Consult" && (
                  <CTableDataCell className="subGrid-date subGrid-left grid-vertical-line actWell">
                    <div className="d-flex align-items-center gap-3 h-100">
                      {dt?.consult_id === !null ? (
                        <div><img src={Assets.Warning} alt="warn" className="cursor" /></div>
                      ) : (
                        <>
                          <div
                            style={{
                              //  width: "50%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <img
                              alt="edit"
                              src={Assets?.EditPencil}
                              className={`cursor ${dt?.freeze === 1 ? "greyed-out" : ""}`}
                              onClick={() => selectedData(dt, dt?.id, "edit")}
                            />
                          </div>
                          <div
                            style={{
                              //  width: "50%",
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <img
                              alt="delete"
                              src={Assets?.Delete}
                              className='cursor'
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

export default SleepTable;
