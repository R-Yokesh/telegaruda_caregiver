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
import { getSerialNumber } from "../../../../Utils/commonUtils";
import moment from "moment";

function ExerciseHabitTable({ columns, habitData, getselectedData, from }) {
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
          {habitData?.map((dt, i) => (
            <CTableRow key={i}>
              <CTableHeaderCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.id}</span>
                </div>
              </CTableHeaderCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{moment(dt?.act_date).format('DD-MM-yyyy')}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <span className="fs-16 fw-500">{dt?.act_type}</span>
                </div>
              </CTableDataCell>

              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <span>{dt?.act_duration}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <span>{dt?.act_intensity}</span>
                </div>
              </CTableDataCell>

              {from !== "Consult" && (
                <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center gap-2 h-100">
                {dt?.consult_id === !null ? (
                    <div><img src={Assets.Warning} alt="warn" className="cursor" /></div>
                  ) : (
                    <>
                      {/* <div
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
                      </div> */}
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
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
          ))}
        </CTableBody>
      </CTable>
    </>
  );
}

export default ExerciseHabitTable;
