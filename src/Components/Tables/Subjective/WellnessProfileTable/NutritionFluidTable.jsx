import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";
import Badge from "../../../Badge/Badge";
import { Assets } from "../../../../assets/Assets";
import { getSerialNumber,isWithin24Hours } from "../../../../Utils/commonUtils";

const NutritionFluidTable = ({ columns, rowData, getselectedData, from,itemsPerPage, currentPage }) => {
  const selectedData = (data,id, type) => {

    getselectedData(data,id, type);
  };
  return (
    <>
      <CTable className="lab-responsive-table">
        <CTableHead color="dark">
          <CTableRow>
            {columns?.map((data, i) =>
              from === "Consult-Intake" && i === columns.length - 1 ? null : (
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
              <CTableHeaderCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                {getSerialNumber(itemsPerPage, currentPage, i)}
                </div>
              </CTableHeaderCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.act_date}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.act_type}</span>
                </div>
              </CTableDataCell>

              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <span>{dt?.act_intake}</span>
                </div>
              </CTableDataCell>
              {from !== "Consult-Intake" && (
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

export default NutritionFluidTable;
