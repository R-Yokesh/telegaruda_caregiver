import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import { CCol, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import DateSelector from "../../../../../DateRangePicker/DateSelector";
import DateCards from "../../../../../DateCards/DateCards";
import Pagination from "../../../../../Pagination/Pagination";

const PhysicalExam = ({ onClose }) => {
  const dateCards = [
    { id: 1, date: "06/07/2024" },
    { id: 2, date: "06/07/2024" },
    { id: 3, date: "06/07/2024" },
    { id: 4, date: "06/07/2024" },
    { id: 5, date: "06/07/2024" },
    { id: 6, date: "06/07/2024" },
    { id: 7, date: "06/07/2024" },
    { id: 8, date: "06/07/2024" },
    { id: 9, date: "06/07/2024" },
    { id: 10, date: "06/07/2024" },
    { id: 11, date: "06/07/2024" },
    { id: 12, date: "06/07/2024" },
    { id: 13, date: "06/07/2024" },
    { id: 14, date: "06/07/2024" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items to display per page

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to get items for the current page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dateCards?.slice(startIndex, endIndex);
  };

  return (
    <>
      <CRow className="mb-2">
        <CCol md={6} className="mb-2">
          <div className="d-flex gap-2">
            <img
              alt="BackBtn"
              src={Assets.BackBtn}
              style={{ width: "35px" }}
              onClick={onClose}
              className="cursor"
            />
            <span className="Obj-name d-flex align-items-center">
              Physical Exam
            </span>
          </div>
        </CCol>
        <CCol md={6} className="mb-2 d-flex justify-content-end">
          <div className="d-flex mt-2">
            <Breadcrumb
              paths={[
                { label: "Home", to: "/patients" },
                { label: "Patient List", to: "/patients" },
                { label: "Medical Profile", to: "/patients/history" },
                { label: "Physical Exam", to: "/patients/history" },
              ]}
            />
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-2">
        <CCol lg={8} className="">
          <DateSelector />
        </CCol>
        <CCol lg={4} className="d-flex justify-content-end align-items-center">
          <div>
            <PrimaryButton>
              <div className="d-flex align-items-center gap-2">
                <img src={Assets.Add} alt="add" />
                <span className="fs-16 fw-600">Add</span>
              </div>
            </PrimaryButton>
          </div>
        </CCol>
      </CRow>
      <div className="mb-2">
        <CRow>
          {getCurrentPageItems()?.map((item, i) => (
            <CCol lg={4} className="mb-3" key={i}>
              <DateCards data={item} />
            </CCol>
          ))}
        </CRow>
        <CRow className="mb-3">
          <CCol lg={12} className="d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              onPageChange={onPageChange}
              totalItems={dateCards?.length}
              itemsPerPage={itemsPerPage}
            />
          </CCol>
        </CRow>
      </div>
    </>
  );
};

export default PhysicalExam;
