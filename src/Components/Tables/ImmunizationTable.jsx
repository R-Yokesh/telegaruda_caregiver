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

const ImmunizationTable = ({ columns, rowData, getselectedData }) => {
  const selectedData = (data, type) => {
    getselectedData(data, type);
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
              <CTableHeaderCell>
                <span className="fs-16 fw-500">{dt?.id}</span>
              </CTableHeaderCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.vaccine}</span>
              </CTableDataCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.period}</span>
              </CTableDataCell>
              <CTableDataCell>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  {!dt.taken_date ? (
                    <img
                      alt="edit"
                      src={Assets?.vaccined}
                      className="cursor"
                      style={{ width: "40px" }}
                      onClick={() => selectedData(dt, "delete")}
                    />
                  ) : (
                    <img
                      alt="delete"
                      style={{ width: "40px" }}
                      src={Assets?.colorVaccined}
                      className="cursor"
                      // onClick={() => selectedData(dt, "edit")}
                    />
                  )}
                </div>
              </CTableDataCell>
              <CTableDataCell>{dt?.dosage_date}</CTableDataCell>
              <CTableDataCell>{dt?.taken_date}</CTableDataCell>
              {/* <CTableDataCell>
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
              </CTableDataCell> */}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default ImmunizationTable;
