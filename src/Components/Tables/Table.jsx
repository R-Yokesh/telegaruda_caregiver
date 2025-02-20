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

const Table = ({ columns, rowData, data }) => {
  const formattedColumns = data?.columnsData.map((column) => ({
    ...column,
    accessor: column.label.toLowerCase().replace(/\s/g, "_"), // Create accessor for dynamic data access
  }));

  // Handle potential missing rows
  const formattedData = data?.tableData.map((row) => {
    return formattedColumns.reduce((acc, column) => {
      const value = row[column.label.toLowerCase().replace(/\s/g, "_")]; // Access data based on accessor
      acc[column.accessor === "ecg_result" ? "result" : column.accessor] =
        value || "-"; // Set default value if data is missing
      return acc;
    }, {});
  });

  console.log(data, formattedColumns, "first formattedData", formattedData);

  return (
    // <>
    //   <CTable className="responsive-table">
    //     <CTableHead color="dark">
    //       <CTableRow>
    //         {columns?.map((data, i) => (
    //           <CTableHeaderCell key={i}>{data?.label}</CTableHeaderCell>
    //         ))}
    //       </CTableRow>
    //     </CTableHead>
    //     <CTableBody>
    //       {rowData?.map((dt, i) => (
    //         <CTableRow key={i}>
    //           <CTableHeaderCell>{dt?.id}</CTableHeaderCell>
    //           <CTableDataCell>
    //             <Badge label={dt?.result?.name} color={dt?.result?.status} />
    //           </CTableDataCell>
    //           <CTableDataCell>{dt?.systolic}</CTableDataCell>
    //           <CTableDataCell>{dt?.diastolic}</CTableDataCell>
    //           <CTableDataCell>{dt?.pluse}</CTableDataCell>
    //           <CTableDataCell>{dt?.date}</CTableDataCell>
    //           <CTableDataCell>{dt?.diastolic}</CTableDataCell>
    //         </CTableRow>
    //       ))}
    //     </CTableBody>
    //   </CTable>
    // </>
    <>
      <div className="responsive-table-container">
        <table class="responsive-table">
          <thead>
            <tr>
              {formattedColumns?.map((data, i) => (
                <th key={i}>{data?.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formattedData?.map((dt, i) => (
              <tr key={i}>
                <td>{dt?.id}</td>
                <td>
                  <div style={{ width: "180px" }}>
                    <Badge
                      label={dt?.result?.name}
                      color={dt?.result?.status}
                    />
                  </div>
                </td>
                <td>
                  <span className="fs-16 fw-500">{dt?.systolic}</span>
                </td>
                <td>
                  <span className="fs-16 fw-500">{dt?.diastolic}</span>
                </td>
                <td>
                  <span className="fs-16 fw-500">{dt?.pluse}</span>
                </td>
                <td>
                  <div style={{ width: "100px" }}>
                    <div className="table-content fs-16 fw-500">{dt?.date}</div>
                  </div>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    {dt?.action?.map((data, i) => (
                      <div className="d-flex">
                        {data.type === "warning" && (
                          <img
                            src={Assets.Warning}
                            alt="warn"
                            className="cursor"
                          />
                        )}
                        {data.type === "edit" && (
                          <img
                            src={Assets.EditPencil}
                            alt="warn"
                            className="cursor"
                          />
                        )}
                        {data.type === "delete" && (
                          <img
                            src={Assets.Delete}
                            alt="warn"
                            className="cursor"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
