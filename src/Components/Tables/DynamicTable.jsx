import React from "react";
import Badge from "../Badge/Badge";
import { Assets } from "../../assets/Assets";

const DynamicTable = ({ columnsData, tableData }) => {
  return (
    <>
      <div className="responsive-table-container">
        <table class="responsive-table">
          <thead>
            <tr>
              {columnsData?.map((column) => (
                <th key={column.id}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columnsData.map((column) => (
                  <td key={`${rowIndex}-${column?.id}`}>
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  function renderCell(row, column) {
    const columnKey = getColumnKey(column?.label);
    const value = row[columnKey];

    if (columnKey === "ecg_result") {
      return (
        <div style={{ width: "180px" }}>
          <Badge label={value?.name} color={value?.status} />
        </div>
      );
    } else if (columnKey === "result") {
      return (
        <div style={{ width: "180px" }}>
          <Badge label={value?.name} color={value?.status} />
        </div>
      );
    } else if (columnKey === "action") {
      return (
        <div className="d-flex gap-2">
          {value.map((data, i) => (
            <div key={i} className="d-flex">
              {renderActionButton(data)}
            </div>
          ))}
        </div>
      );
    } else {
      // Default rendering for regular data
      return <span className="fs-16 fw-500">{value}</span>;
    }
  }

  function renderActionButton(data) {
    switch (data.type) {
      case "warning":
        return <img src={Assets.Warning} alt="warn" className="cursor" />;
      case "edit":
        return <img src={Assets.EditPencil} alt="edit" className="cursor" />;
      case "delete":
        return <img src={Assets.Delete} alt="delete" className="cursor" />;
      default:
        return null;
    }
  }

  function getColumnKey(columnLabel) {
    // Convert label to a key format used in your data object
    // Example: "Heart Rate (BPM)" -> "heart_rate_(bpm)"
    return columnLabel.toLowerCase().replace(/\s+/g, "_");
  }
};

export default DynamicTable;
