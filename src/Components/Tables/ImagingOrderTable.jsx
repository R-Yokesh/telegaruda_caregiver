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

const ImagingOrderTable = ({ columns, rowData, getselectedData, from }) => {
  const selectedData = (data, type) => {
    getselectedData(data, type);
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
                <div className="d-flex align-items-center justify-content-center h-100">
                  {dt?.file !== "-" ? (
                    <Badge label={dt?.file} color={"primary"} />
                  ) : (
                    "-"
                  )}
                </div>
              </CTableDataCell>
              {/* <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  {dt?.notes}
                </div>
              </CTableDataCell> */}
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  {dt?.link}
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  {dt?.icd_code}
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <span>{dt?.scan_name}</span>
                  <Badge
                    label={dt?.scan_status}
                    color={
                      dt?.scan_status === "Accepted"
                        ? "yellow"
                        : dt?.scan_status === "Uploaded"
                        ? "success"
                        : "error"
                    }
                  />
                </div>
              </CTableDataCell>
              {from !== "Consult" && (
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center gap-2 h-100">
                    <div
                      style={{
                        width: "100%",
                      }}
                      className="d-flex align-items-center justify-content-center gap-3 "
                    >
                      {dt?.scan_status === "Accepted" ? (
                        <img
                          alt="edit"
                          src={Assets?.Approve}
                          className="cursor"
                          onClick={() => selectedData(dt, "details")}
                        />
                      ) : dt?.scan_status === "Uploaded" ? (
                        <img
                          alt="edit"
                          src={Assets?.visibleEye}
                          className="cursor"
                          onClick={() => selectedData(dt, "details")}
                        />
                      ) : dt?.scan_status === "Not Uploaded" ? (
                        <img
                          alt="edit"
                          src={Assets?.visibleEye}
                          className="cursor"
                          onClick={() => selectedData(dt, "details")}
                        />
                      ) : (
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
                      )}
                    </div>
                  </div>
                </CTableDataCell>
              )}
              {/* <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center gap-2 h-100">
                  <div
                    style={{
                      width: "100%",
                    }}
                    className="d-flex align-items-center justify-content-center gap-3 "
                  >
                    {dt?.scan_status === "Accepted" && (
                      <img
                        alt="edit"
                        src={Assets?.Accept}
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
                </div>
              </CTableDataCell> */}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default ImagingOrderTable;
