import React from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import { useLocation, useNavigate } from "react-router-dom";

function TableColor({
  columns,
  items,
  head,
  green,
  PatientMenu,
  PatientSubMenu1,
  PatientSubMenu2,
  PatientSubMenu3,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const locdata = location.state.PatientDetail;

  const goTo = () => {
    navigate("/patients/history", { state: { PatientDetail: locdata } });
    localStorage.removeItem("patiendDetailTab");
    localStorage.setItem("PatientMenu", JSON.stringify(PatientMenu));
    localStorage.setItem("PatientSubMenu-1", JSON.stringify(PatientSubMenu1));
    localStorage.setItem("PatientSubMenu-2", JSON.stringify(PatientSubMenu2));
    localStorage.setItem("PatientSubMenu-3", JSON.stringify(PatientSubMenu3));
  };
  console.log(locdata);
  return (
    <>
      <div onClick={() => goTo()}>
        <h4>{head}</h4>
      </div>
      <CTable className="lab-responsive-table">
        <CTableHead>
          <CTableRow color="dark">
            {columns.map((items) => (
              <CTableHeaderCell scope="col">{items.label}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {items.map((item, index) => (
            <CTableRow key={index}>
              {columns.map((col, colIndex) =>
                colIndex === 1 && green ? (
                  <CTableDataCell key={col.label}>
                    <span className="green">{item[col.label]}</span>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell key={col.key}>
                    {item[col.label]}
                  </CTableDataCell>
                )
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
}

export default TableColor;
