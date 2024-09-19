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
import { getSerialNumber,isWithin24Hours } from "../../../Utils/commonUtils";

const MedicationTable = ({ columns, rowData, getselectedData, from,itemsPerPage,currentPage }) => {

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
              <CTableHeaderCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                {getSerialNumber(itemsPerPage, currentPage, i)}
                </div>
              </CTableHeaderCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100 flex-column">
                  <span className="fs-16 fw-500">{dt?.values?.name?.name ? dt?.values?.name?.name : "-" }</span>
                  <small>
                    {dt?.values?.strength ? dt?.values?.strength : "-"} {dt?.values?.strength_measurement ? dt?.values?.strength_measurement : "-"} {dt?.values?.dosage ? dt?.values?.dosage : "-"}
                  </small>
                </div>
              </CTableDataCell>

              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">
                    {dt?.values?.m ? dt?.values?.m : "-"} | {dt?.values?.a}  | {dt?.values?.e} | {dt?.values?.n}
                  </span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.values?.food_times ? dt?.values?.food_times : "-"}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.values?.quantity ? dt?.values?.quantity : "-"}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.values?.start_date ? dt?.values?.start_date : "-"}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500"> {dt?.values?.status ? dt?.values?.status : "-"} </span>
                </div>
              </CTableDataCell>

              {from !== "Consult" && (
                 <CTableDataCell style={{ height: "10px" }}>
                 <div className="d-flex align-items-center justify-content-center gap-2 h-100">
                   {dt?.freeze ? (
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
                           className={`cursor ${isWithin24Hours(`${dt?.values?.date} ${dt?.values?.time}`) ? "" : "greyed-out"}`}
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
                           className={`cursor ${isWithin24Hours(`${dt?.values?.date} ${dt?.values?.time}`) ? "" : "greyed-out"}`}
                           onClick={() => selectedData(dt, dt?.id, "delete")}
                         />
                       </div>
                     </>
                   )}

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

export default MedicationTable;
