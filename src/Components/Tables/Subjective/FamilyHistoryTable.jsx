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
import { getSerialNumber } from "../../../Utils/commonUtils";

const FamilyHistoryTable = ({
  columns,
  rowData,
  getselectedData,
  currentPage,
  itemsPerPage,
}) => {
  const selectedData = (fullData, data) => {
    getselectedData(fullData, data);
  };
  return (
    <>
      <CTable className="lab-responsive-table">
        <CTableHead color="dark">
          <CTableRow>
            {columns?.map((data, i) => (
               <CTableHeaderCell
               key={i}
               className={`${data?.label === "No." ? "subGridTh-No" : "subGridTh"} `}
             >
               {data?.label}
             </CTableHeaderCell>
            ))}
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
                <CTableDataCell className="subGrid-left grid-vertical-line">
                  <span className="fs-16 fw-500">{dt?.name}</span>
              </CTableDataCell>
              <CTableDataCell className="subGrid-left grid-vertical-line">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.attributes?.values[0]?.status}
                    onChange={(e) =>
                      selectedData(dt, dt?.attributes?.values[0])
                    }
                  />
              </CTableDataCell>
              <CTableDataCell className="subGrid-left grid-vertical-line">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.attributes?.values[1]?.status}
                    onChange={(e) =>
                      selectedData(dt, dt?.attributes?.values[1])
                    }
                  />
              </CTableDataCell>
              <CTableDataCell className="subGrid-left grid-vertical-line">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.attributes?.values[2]?.status}
                    onChange={(e) =>
                      selectedData(dt, dt?.attributes?.values[2])
                    }
                  />
              </CTableDataCell>
              <CTableDataCell className="subGrid-left grid-vertical-line">              
                <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.attributes?.values[3]?.status}
                    onChange={(e) =>
                      selectedData(dt, dt?.attributes?.values[3])
                    }
                  />
              </CTableDataCell>
              <CTableDataCell className="subGrid-left grid-vertical-line">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.attributes?.values[4]?.status}
                    onChange={(e) =>
                      selectedData(dt, dt?.attributes?.values[4])
                    }
                  />
              </CTableDataCell>
              <CTableDataCell className="subGrid-left grid-vertical-line">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.attributes?.values[5]?.status}
                    onChange={(e) =>
                      selectedData(dt, dt?.attributes?.values[5])
                    }
                  />
              </CTableDataCell>
              <CTableDataCell className="subGrid-left grid-vertical-line">
                  <CFormCheck
                    id="flexCheckChecked"
                    defaultChecked={dt?.attributes?.values[6]?.status}
                    onChange={(e) =>
                      selectedData(dt, dt?.attributes?.values[6])
                    }
                  />
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
          ))
        )}
        </CTableBody>
      </CTable>
    </>
  );
};

export default FamilyHistoryTable;
