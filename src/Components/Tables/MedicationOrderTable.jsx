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

const MedicationOrderTable = ({ columns, rowData, getselectedData }) => {
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
              <CTableHeaderCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.id}</span>
                </div>
              </CTableHeaderCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.date}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.name}</span>
                </div>
              </CTableDataCell>

              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <span>{dt?.lab_name}</span>
                  <Badge
                    label={dt?.lab_status}
                    color={
                      dt?.lab_status === "Received"
                        ? "primary"
                        : dt?.lab_status === "Delivered"
                        ? "success"
                        : "error"
                    }
                  />
                </div>
              </CTableDataCell>

              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center gap-2 h-100">
                  <div
                    style={{
                      width: "100%",
                    }}
                    className="d-flex align-items-center justify-content-center gap-3 "
                  >
                    {dt?.lab_status === "Waiting For Approval" && (
                      <img
                        alt="edit"
                        src={Assets?.UpdateIcon}
                        className="cursor"
                        onClick={() => selectedData(dt, "details")}
                      />
                    )}
                    <img
                      alt="delete"
                      src={Assets?.EditPencil}
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
                  {/* <div
                    style={{
                      width: dt?.lab_status === "Accepted" ? "50%" : "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <img
                      alt="delete"
                      src={Assets?.visibleEye}
                      className="cursor"
                      onClick={() => selectedData(dt, "edit")}
                    />
                  </div> */}
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default MedicationOrderTable;
