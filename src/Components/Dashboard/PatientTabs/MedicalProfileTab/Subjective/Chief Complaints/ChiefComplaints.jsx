import React from "react";
import Table from "../../../../../Tables/Table";
import { Assets } from "../../../../../../assets/Assets";
import { CCol, CRow } from "@coreui/react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";

const ChiefComplaints = ({ OnClose }) => {
  const columns = [
    { label: "No." },
    { label: "Complaints" },
    { label: "Notes" },
    { label: "Actions" },
  ];

  const data = {
    columnsData: columns,
    tableData: [
      {
        no_: 1,
        complaints:
          "Abdominal pain, radiating to right shoulder and shoulder blades",
        notes: "Taking dole",
        action: [{ type: "edit" }, { type: "delete" }],
      },
    ],
  };
  return (
    <>
      <CRow>
        <CCol md={6} className="mb-2">
          <div className="d-flex gap-2">
            <img
              alt="BackBtn"
              src={Assets.BackBtn}
              style={{ width: "35px" }}
              onClick={OnClose}
              className="cursor"
            />
            <span className="Obj-name d-flex align-items-center">
              Chief Complaints
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
                { label: "Chief Complaints", to: "/patients/history" },
              ]}
            />
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6} xl={6} className="mb-3 chief-complaints">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </CCol>
        <CCol
          md={6}
          xl={6}
          className="mb-3 d-flex justify-content-end align-items-center gap-15"
        >
          <div className="patient-adding">
            <button>+ ADD</button>
          </div>
          <div className="patient-adding">
            <button>
              <img src={Assets.ThreeDots} alt="settings" />
            </button>
          </div>
        </CCol>
      </CRow>
      <Table columns={columns} data={data} />
    </>
  );
};

export default ChiefComplaints;
