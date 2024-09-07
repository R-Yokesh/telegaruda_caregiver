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

  // Helper function to format date to dd-MM-yyyy HH:mm:ss
const formatDate = (dateString) => {
  const parsedDate = Date.parse(dateString);
  if (isNaN(parsedDate)) return "N/A"; // Return "N/A" if the date is invalid

  const date = new Date(parsedDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}`; // Format as dd-MM-yyyy HH:mm
};

const NextAppointmentTable = ({ columns, rowData, getselectedData, from }) => {
  const selectedData = (data,id, type) => {
    getselectedData(data,id, type);
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
                <span className="fs-16 fw-500">{dt?.id ? dt?.id : "-"}</span>
              </CTableHeaderCell>
              <CTableDataCell>
              <span className="fs-16 fw-500">{formatDate(dt?.values?.date)}</span>
              </CTableDataCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{`${dt?.provider?.first_name || ''} ${dt?.provider?.last_name || ''}`}</span>
              </CTableDataCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.reason ? dt?.reason : "-"}</span>
              </CTableDataCell>
              {from !== "Consult" && (
                <CTableDataCell>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <img
                      alt="edit"
                      src={Assets?.TableEdit}
                      className="cursor"
                      onClick={() => selectedData(dt,dt?.id, "edit")}
                    />
                    <img
                      alt="delete"
                      src={Assets?.TableDelete}
                      className="cursor"
                      onClick={() => selectedData(dt,dt?.id,  "delete")}
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

export default NextAppointmentTable;
