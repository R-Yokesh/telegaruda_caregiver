import {
  CFormCheck,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";
import { Assets } from "../../../assets/Assets";

const FamilyHistoryTable = ({
  columns,
  rowData,
  getselectedData,
  addFormView,
}) => {
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
                  <span className="fs-16 fw-500">{dt?.disease}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.grandparents === "yes" ? true : false}
                    disabled={!addFormView}
                  />
                </div>
              </CTableDataCell>

              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.father === "yes" ? true : false}
                    disabled={!addFormView}
                  />
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.mother === "yes" ? true : false}
                    disabled={!addFormView}
                  />
                </div>
              </CTableDataCell>

              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.Brother === "yes" ? true : false}
                    disabled={!addFormView}
                  />
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.Sister === "yes" ? true : false}
                    disabled={!addFormView}
                  />
                </div>
              </CTableDataCell>

              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.Daughter === "yes" ? true : false}
                    disabled={!addFormView}
                  />
                </div>
              </CTableDataCell>
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.Son === "yes" ? true : false}
                    disabled={!addFormView}
                  />
                </div>
              </CTableDataCell>

              {/* <CTableDataCell style={{ height: "10px" }}>
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
                      onClick={() => selectedData(dt, "edit")}
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

export default FamilyHistoryTable;
