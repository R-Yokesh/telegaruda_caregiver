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
  
const PsychiatricTable = ({ columns, rowData, getselectedData }) => {

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
              <CTableHeaderCell>
                <span className="fs-16 fw-500">{dt?.id}</span>
              </CTableHeaderCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.name}</span>
              </CTableDataCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.date}</span>
              </CTableDataCell>
              {/* <CTableDataCell>
              <span className="fs-16 fw-500">{dt?.result}</span>
              </CTableDataCell> */}
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <Badge
                    label={dt?.result}
                    color={
                      dt?.result 
                        ? "error"
                        : ""
                      
                    }
                  />
                </div>
              </CTableDataCell>
            
              <CTableDataCell>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    
                  <img
                    alt="edit"
                    src={i === 0 ? Assets?.testSubIcon : Assets?.testUnSubIcon}
                    className="cursor"
                  />
                   {/* {i === 0 && ( */}
                    <img
                      alt="delete"
                      src={Assets?.testViewIcon}
                      className="cursor"
                      onClick={() => selectedData(dt, "view")}
                    />
                  {/* )} */}
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default PsychiatricTable