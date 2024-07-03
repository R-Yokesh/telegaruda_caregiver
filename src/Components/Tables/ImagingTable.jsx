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

const ImagingTable = ({ columns, rowData }) => {
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
                <span className="fs-16 fw-500">{dt?.date}</span>
              </CTableDataCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.name}</span>
              </CTableDataCell>
              <CTableDataCell>
                <Badge label={dt?.file} color={"primary"} />
              </CTableDataCell>
              <CTableDataCell>{dt?.notes}</CTableDataCell>
              <CTableDataCell>{dt?.link}</CTableDataCell>
              <CTableDataCell>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <img alt="edit" src={Assets?.TableEdit} className="cursor" />
                  <img alt="delete" src={Assets?.TableDelete} />
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default ImagingTable;
