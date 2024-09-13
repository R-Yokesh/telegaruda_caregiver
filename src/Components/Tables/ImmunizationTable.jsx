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
import { getSerialNumber } from "../../Utils/commonUtils";

// Add this CSS styling
const tableCellStyle = {
  borderRight: "1px solid #ccc", // Light grey vertical line
  padding: "8px",
};

// Helper function to format date to dd-MM-yyyy
const formatDate = (dateString) => {
  const parsedDate = Date.parse(dateString);
  if (isNaN(parsedDate)) return "N/A"; // Return "N/A" if the date is invalid

  const date = new Date(parsedDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`; // Format as dd-MM-yyyy
};


const ImmunizationTable = ({ columns, rowData, getselectedData, from,itemsPerPage,currentPage }) => {
  const selectedData = (data, slug, type) => {
    getselectedData(data, slug, type);
  };

  return (
    <>
      <CTable className="lab-responsive-table">
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
              <CTableHeaderCell style={tableCellStyle}>
              {getSerialNumber(itemsPerPage, currentPage, i)}
              </CTableHeaderCell>
              <CTableDataCell style={tableCellStyle}>
                <span className="fs-16 fw-500">{dt?.name}</span>
              </CTableDataCell>
              <CTableDataCell style={tableCellStyle}>
                <div>
                  {dt?.attributes?.values.map((value, index) => (
                    <div key={index} className="fs-16 fw-500">
                      {value?.periods}
                    </div>
                  ))}
                </div>
              </CTableDataCell>

              <CTableDataCell style={tableCellStyle}>
                {dt?.attributes?.values.map((value, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    {!value.taken_at ? (
                      <img
                        alt="edit"
                        src={Assets?.vaccined}
                        className="cursor"
                        style={{ width: "25px" }}
                        onClick={() => {
                          if (from !== "Consult") {
                            selectedData(value, dt?.slug, "delete");
                          }
                        }}
                      />
                    ) : (
                      <img
                        alt="delete"
                        style={{ width: "25px" }}
                        src={Assets?.colorVaccined}
                        className="cursor"
                      />
                    )}
                  </div>
                ))}
              </CTableDataCell>

              <CTableDataCell style={tableCellStyle}>
                <div>
                  {dt?.attributes?.values.map((value, index) => (
                    <div key={index} className="fs-16 fw-500">
                      {formatDate(value?.dosage_date)}
                    </div>
                  ))}
                </div>
              </CTableDataCell>

              <CTableDataCell style={tableCellStyle}>
                <div>
                  {dt?.attributes?.values.map((value, index) => (
                    <div key={index} className="fs-16 fw-500">
                      {formatDate(value?.taken_at)}
                    </div>
                  ))}
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default ImmunizationTable;
