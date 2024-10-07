import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";
import { Assets } from "../../../assets/Assets";
import { getSerialNumber } from "../../../Utils/commonUtils";

const SurgicalTable = ({
  columns,
  rowData,
  getselectedData,
  from,
  itemsPerPage,
  currentPage,
}) => {
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
                      {dt?.values?.surgery_date
                        ?.split(" ")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </span><br />
                    <span className="fs-16 fw-500">{dt?.values?.surgery_time ? dt?.values?.surgery_time : "-"}</span>
                </CTableDataCell>
                <CTableDataCell className="subGrid-left grid-vertical-line">
                    <span className="fs-16 fw-500">
                      {dt?.values?.surgical_name?.name}
                    </span>
                </CTableDataCell>
                <CTableDataCell className="subGrid-left grid-vertical-line">
                    <span>{dt?.values?.icd?.slug}</span>
                </CTableDataCell>
                <CTableDataCell className="subGrid-left grid-vertical-line">
                    <span>{dt?.values?.surgery_done_by}</span>
                </CTableDataCell>
                <CTableDataCell className="subGrid-left grid-vertical-line">
                    <span>{dt?.values?.hospital_name}</span>
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

export default SurgicalTable;
