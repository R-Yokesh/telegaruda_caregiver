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
import {
  capitalizeFirstLetter,
  getSerialNumber,
} from "../../../Utils/commonUtils";
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

  const formatText = (text) => {
    // Clean the text by removing markers
    let cleanedText = text?.replace(/@\w+\s*/g, "");

    // Extract status between ! markers
    const statusMatch = text?.match(/!(.*?)!/);
    const status = statusMatch ? statusMatch[1] : "";

    // Remove the status part from the cleaned text
    cleanedText = cleanedText?.replace(/!.*!/, "")?.trim();

    // Extract the score
    const scoreMatch =
      text?.match(/@f\s*([\d.]+)/) || text?.match(/Pro Rated is.*?([\d.]+)/);
    const score = scoreMatch ? scoreMatch[1] : "";

    // Extract title and sub-title
    const titleMatch = cleanedText?.match(/^([^,]*?)(?:,|$)/);
    const subTitMatch = cleanedText?.match(/, (.+)$/);

    // Extract additional information (e.g., "Minimal")
    const additionalMatch = text?.match(/@f \s*(.*?)\s*@c /);
    const additional = additionalMatch ? additionalMatch[1].trim() : "";

    return (
      <>
        {text ? (
          <div className="d-flex justify-content-end align-items-center gap-2">
            {score?.trim() ? (titleMatch ? titleMatch[1]?.trim() : "") : null}{" "}
            {subTitMatch ? subTitMatch[1]?.trim() : ""}{" "}
            <Badge
              label={
                <>
                  <span style={{ color: status?.trim() ? "white" : "black" }}>
                    {score?.trim()
                      ? score?.trim() + " Score"
                      : titleMatch
                      ? titleMatch[1]?.trim()
                      : ""}{" "}
                  </span>
                  <br />
                  <span>{additional}</span>
                </>
              }
              color={status?.trim()}
            />
          </div>
        ) : (
          <div>
            <span></span>
          </div>
        )}
      </>
    );
  };
  const extractHeadingsAndStatus = (text) => {
    const regex =
      /@span\s+([^@]*)\s+@c\s+(!\w+!)\s+@f\s+([^@]*)\s+@c\s+@br\s+@c\s+! @f\s+(Score is \d+)\s+@c@br/g;

    const results = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      const heading = match[1].trim(); // Heading captured
      const status = match[2].replace(/!/g, "").trim(); // Status without '!'
      const subText = match[3].trim(); // Subtext captured
      const score = match[4].trim(); // Score captured

      results.push({ heading, status, subText, score });
    }

    return (
      <div style={{ textAlign: "end" }}>
        {results?.map((dt, i) => (
          <div key={i} className="mb-2">
            <span style={{ color: "black" }}>{dt?.heading} </span>
            <Badge
              label={
                <>
                  <span>{dt?.subText ?? ""}</span>
                </>
              }
              color={dt?.status}
            />
            <span style={{ fontWeight: "bold" }}> {dt?.score ?? ""}</span>
          </div>
        ))}
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
                <span className="fs-16 fw-500">
                  {capitalizeFirstLetter(dt?.name)}
                  {/* {dt?.name} */}
                </span>
              </CTableDataCell>
              <CTableDataCell className="subGrid-date">
                <span className="fs-16 fw-500">
                  {formatFetchDate(dt?.latest_form_submisson?.created_at)}
                  {/* {formatText(dt?.latest_form_submisson?.message)} */}
                </span>
              </CTableDataCell>
              {/* <CTableDataCell>
              <span className="fs-16 fw-500">{dt?.result}</span>
              </CTableDataCell> */}
              <CTableDataCell style={{ height: "10px" }}>
                {/* <div className="d-flex flex-column align-items-center">
                  <Badge
                    label={dt?.latest_form_submisson?.score}
                    color={"error"}
                  />
                </div> */}
                {dt?.id === 22
                  ? extractHeadingsAndStatus(dt?.latest_form_submisson?.message)
                  : formatText(
                      dt?.latest_form_submisson?.message,
                      dt?.latest_form_submisson?.score
                    )}
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
