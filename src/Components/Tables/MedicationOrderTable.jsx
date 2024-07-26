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
  console.log("first", rowData[0]);
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
                  <div className="d-flex flex-column">
                    {dt?.medicines?.map((dat, i) => (
                      <span className="fs-16 fw-500">{dat?.name}</span>
                    ))}
                  </div>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="d-flex flex-column">
                    {dt?.medicines?.map((dat, i) => (
                      <span className="fs-16 fw-500">{dat?.strength} mg</span>
                    ))}
                  </div>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="d-flex flex-column">
                    {dt?.medicines?.map((dat, i) => (
                      <span className="fs-16 fw-500">
                        {dat?.m} | {dat?.a} | {dat?.e} | {dat?.n}
                      </span>
                    ))}
                  </div>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="d-flex flex-column">
                    {dt?.medicines?.map((dat, i) => (
                      <span
                        className="fs-16 fw-500"
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        {dat?.food}
                      </span>
                    ))}
                  </div>
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
                        : dt?.lab_status === "Prescribed"
                        ? "warning"
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
                    {dt?.lab_status === "Waiting For Approval" ? (
                      <img
                        alt="edit"
                        src={Assets?.UpdateIcon}
                        className="cursor"
                        onClick={() => selectedData(dt, "details")}
                      />
                    ) : dt?.lab_status === "Prescribed" ? (
                      <>
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
                      </>
                    ) : dt?.lab_status === "Received" ? (
                      <>
                        <img
                          alt="delete"
                          src={Assets?.UStatus}
                          className="cursor"
                          onClick={() => selectedData(dt, "edit")}
                          style={{ width: "35px" }}
                        />
                      </>
                    ) : null}
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
