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
import { getSerialNumber } from "../../../Utils/commonUtils";
import { format } from "date-fns";
import { formatFetchDate } from "../../../Utils/dateUtils";

const PsychiatricTable = ({
  columns,
  rowData,
  getselectedData,
  from,
  currentPage,
  itemsPerPage,
}) => {
  const selectedData = (data, type) => {
    getselectedData(data, type);
  };

  const formatText = (text, score) => {
    let cleanedText = text?.replace(/@\w+\s*/g, "");

    // Extract status between ! markers
    const statusMatch = text?.match(/!(.*?)!/);
    const status = statusMatch ? statusMatch[1] : "";

    // Remove the status part from the cleaned text
    cleanedText = cleanedText?.replace(/!.*!/, "")?.trim();

    // Extract title and sub-title
    const titleMatch = cleanedText?.match(/^([^,]*?)(?:,|$)/);
    const subTitMatch = cleanedText?.match(/, (.+)$/);

    // Prepare the final object
    console.log({
      title: titleMatch ? titleMatch[1]?.trim() : "",
      subTit: subTitMatch ? subTitMatch[1]?.trim() : "",
      status: status?.trim(),
    });
    return (
      <div className="d-flex flex-column align-items-center">
        <Badge label={score} color={status} />
      </div>
    );
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
              <CTableHeaderCell>
                <span className="fs-16 fw-500">
                  {getSerialNumber(itemsPerPage, currentPage, i)}
                </span>
              </CTableHeaderCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">{dt?.name}</span>
              </CTableDataCell>
              <CTableDataCell>
                <span className="fs-16 fw-500">
                  {formatFetchDate(dt?.latest_form_submisson?.created_at)}
                  {/* {formatText(dt?.latest_form_submisson?.message)} */}
                </span>
              </CTableDataCell>
              {/* <CTableDataCell>
              <span className="fs-16 fw-500">{dt?.result}</span>
              </CTableDataCell> */}
              <CTableDataCell style={{ height: "10px" }}>
                <div className="d-flex flex-column align-items-center">
                  <Badge
                    label={dt?.latest_form_submisson?.score}
                    color={"error"}
                  />
                </div>
              </CTableDataCell>

              {from !== "Consult" && (
                <CTableDataCell>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <img
                      alt="edit"
                      src={
                        dt?.latest_form_submisson?.score
                          ? Assets?.testSubIcon
                          : Assets?.testUnSubIcon
                      }
                      className="cursor"
                      onClick={() => selectedData(dt, "add")}
                    />
                    {dt?.latest_form_submisson?.score && (
                      <img
                        alt="delete"
                        src={Assets?.testViewIcon}
                        className="cursor"
                        onClick={() => selectedData(dt, "view")}
                      />
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

export default PsychiatricTable;
