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
import { tableDateTime } from "../../../Utils/dateUtils";

const ChiefComplaintTable = ({ columns, rowData, getselectedData, from }) => {
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
                <span className="fs-16 fw-500">{dt?.id}</span>
              </CTableHeaderCell>
              <CTableHeaderCell>
                <span className="fs-16 fw-500">
                  {dt?.addition_info?.date ? dt?.addition_info?.date : "-"}
                  {" "}
                </span>
                <span className="fs-16 fw-500">
                  {dt?.addition_info?.time ? dt?.addition_info?.time : "-"}
                </span>
              </CTableHeaderCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.addition_info?.title ? dt?.addition_info?.title :'-'}</span>
              </CTableDataCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.addition_info?.notes ? dt?.addition_info?.notes : '-'}</span>
              </CTableDataCell>
              {from !== "Consult" && (
                <CTableDataCell style={{ height: "10px" }}>
                  <div className="d-flex align-items-center justify-content-center gap-2 h-100">
                    <div
                      style={{
                        width: "50%",
                      }}
                    >
                      <img
                        alt="edit"
                        src={Assets?.EditPencil}
                        className="cursor"
                        onClick={() => selectedData(dt,dt?.id, "edit")}
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
                        onClick={() => selectedData(dt,dt?.id, "delete")}
                      />
                    </div>
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

export default ChiefComplaintTable;
