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
import { getSerialNumber } from "../../Utils/commonUtils";


const ProcedurerTable = ({ columns, rowData, getselectedData, from, itemsPerPage, currentPage }) => {
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
                  <span className="fs-16 fw-500"> {dt?.values?.date?.split(" ")[0]
                    .split("-")
                    .reverse()
                    .join("-")} </span>
                    <span className="fs-16 fw-500">
                    {dt?.values?.time ? dt?.values?.time : "-"}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <span className="fs-16 fw-500">{dt?.values?.code ? dt?.values?.code : "-"}</span>
                </CTableDataCell>
                <CTableDataCell>{dt?.values?.name ? dt?.values?.name : "-"}</CTableDataCell>
                {/* <CTableDataCell>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <img
                    alt="delete"
                    src={Assets?.visibleEye}
                    className="cursor"
                    onClick={() => selectedData(dt, "details")}
                  />
                </div>
              </CTableDataCell> */}
                {from !== "Consult" && (
                  <CTableDataCell style={{ height: "10px" }}>
                    <div className="d-flex align-items-center justify-content-center gap-2 h-100">
                      {dt?.consult_id === !null ? (
                        <div><img src={Assets.Warning} alt="warn" className="cursor" /></div>
                      ) : (
                        <>
                          <div
                            style={{
                              width: "50%",
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
                              width: "50%",
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

export default ProcedurerTable;
