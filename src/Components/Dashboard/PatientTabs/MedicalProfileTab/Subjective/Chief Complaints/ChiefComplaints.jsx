// import React from "react";
// import Table from "../../../../../Tables/Table";
// import { Assets } from "../../../../../../assets/Assets";
// import { CCol, CRow } from "@coreui/react";
// import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
// import ChiefComplaintTable from "../../../../../Tables/Subjective/ChiefComplaintTable";

// const ChiefComplaints = ({ OnClose }) => {
//   const columns = [
//     { label: "No." },
//     { label: "Complaints" },
//     { label: "Notes" },
//     { label: "Actions" },
//   ];

//   const data = {
//     columnsData: columns,
//     tableData: [
//       {
//         no_: 1,
//         complaints:
//           "Abdominal pain, radiating to right shoulder and shoulder blades",
//         notes: "Taking dole",
//         action: [{ type: "edit" }, { type: "delete" }],
//       },
//     ],
//   };
//   return (
//     <>
//       <CRow>
//         <CCol md={6} className="mb-2">
//           <div className="d-flex gap-2">
//             <img
//               alt="BackBtn"
//               src={Assets.BackBtn}
//               style={{ width: "35px" }}
//               onClick={OnClose}
//               className="cursor"
//             />
//             <span className="Obj-name d-flex align-items-center">
//               Chief Complaints
//             </span>
//           </div>
//         </CCol>
//         <CCol md={6} className="mb-2 d-flex justify-content-end">
//           <div className="d-flex mt-2">
//             <Breadcrumb
//               paths={[
//                 { label: "Home", to: "/patients" },
//                 { label: "Patient List", to: "/patients" },
//                 { label: "Medical Profile", to: "/patients/history" },
//                 { label: "Chief Complaints", to: "/patients/history" },
//               ]}
//             />
//           </div>
//         </CCol>
//       </CRow>
//       <CRow>
//         <CCol md={6} xl={6} className="mb-3 chief-complaints">
//           <div className="search-bar">
//             <input type="text" placeholder="Search" />
//             <button type="submit">
//               <i className="fas fa-search"></i>
//             </button>
//           </div>
//         </CCol>
//         <CCol
//           md={6}
//           xl={6}
//           className="mb-3 d-flex justify-content-end align-items-center gap-15"
//         >
//           <div className="patient-adding">
//             <button>+ ADD</button>
//           </div>
//           <div className="patient-adding">
//             <button>
//               <img src={Assets.ThreeDots} alt="settings" />
//             </button>
//           </div>
//         </CCol>
//       </CRow>
//       <Table columns={columns} data={data} />
//       <ChiefComplaintTable/>
//     </>
//   );
// };

// export default ChiefComplaints;

import {
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import Pagination from "../../../../../Pagination/Pagination";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../../../../../assets/Assets";
import BlurBackground from "../../../../../BlurBackground/BlurBackground";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import ChiefComplaintTable from "../../../../../Tables/Subjective/ChiefComplaintTable";
import ChiefComplaintsForm from "./ChiefComplaintsForm";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import DateSelector from "../../../../../DateRangePicker/DateSelector";
import { useNavigate } from "react-router-dom";
import useApi from "../../../../../../ApiServices/useApi";
import DateRangePicker from "../../../../../DateRangePicker/DateRangePicker";
import { useLocation } from "react-router-dom";

const ChiefComplaints = ({ OnClose, from }) => {
  const columnData = [
    { label: "No." },
    { label: "Date" },
    { label: "Complaints" },
    { label: "Notes" },
    { label: "Actions" },
  ];
  // const rowData = [
  //   {
  //     id: 1,
  //     complaints:
  //       "Abdominal pain, radiating to right shoulder and shoulder blades",
  //     notes: "Taking dole",
  //     date: "2024-07-05 17:52",
  //   },
  //   {
  //     id: 2,
  //     complaints:
  //       "Abdominal pain, radiating to right shoulder and shoulder blades",
  //     notes: "Taking dole",
  //     date: "2024-07-05 18:15",
  //   },
  //   {
  //     id: 3,
  //     complaints:
  //       "Abdominal pain, radiating to right shoulder and shoulder blades",
  //     notes: "Taking dole",
  //     date: "2024-08-05 03:15",
  //   },
  //   {
  //     id: 4,
  //     complaints:
  //       "Abdominal pain, radiating to right shoulder and shoulder blades",
  //     notes: "Taking dole",
  //     date: "2024-08-05 18:15",
  //   },
  //   {
  //     id: 5,
  //     complaints:
  //       "Abdominal pain, radiating to right shoulder and shoulder blades",
  //     notes: "Taking dole",
  //     date: "2024-08-05 18:15",
  //   },
  //   {
  //     id: 6,
  //     complaints:
  //       "Abdominal pain, radiating to right shoulder and shoulder blades",
  //     notes: "Taking dole",
  //     date: "2024-08-05 18:15",
  //   },
  //   {
  //     id: 7,
  //     complaints:
  //       "Abdominal pain, radiating to right shoulder and shoulder blades",
  //     notes: "Taking dole",
  //     date: "2024-08-05 18:15",
  //   },
  //   {
  //     id: 8,
  //     complaints:
  //       "Abdominal pain, radiating to right shoulder and shoulder blades",
  //     notes: "Taking dole",
  //     date: "2024-08-05 18:15",
  //   },
  // ];

  const { loading, error, get,del,clearCache } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;

  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [addFormView, setAddFormView] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [id, setId] = useState(null);
  const [ startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState({});

  const itemsPerPage = 5; // Number of items to display per page

  const getFilterValues = (startDate, endDate, searchValue) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setSearchValue(searchValue);
   
  };

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to get items for the current page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rowData?.slice(startIndex, endIndex);
  };

  const addFormPage = () => {
    setAddFormView(true);
  };

  const detailPage = () => {
    setDetailView(true);
  };

  const getselectedData = (data,id, type) => {
    setSelectedData(data);
    if (type === "edit") {
      addFormPage();
    }
    if (type === "delete") {
      setId(id);
      detailPage();
      
    }
  };

  const getChiefComplaints = useCallback(async () => {
    try {
      const response = await get(
        `resource/docs?limit=${itemsPerPage}&page=${currentPage}&from=${startDate ?? ""}&to=${endDate ?? ""}&searchkey=${searchValue ?? ""}&order_by=created_at&dir=2&slug=chief-complaints&user_id=${data?.user_id}&scanOrdersOnly=&scanstatus=`
      );
      if (response.code === 200) {
        console.log(response.data.docs);
        
        setRowData(response.data.docs);
        setPagination(response.data.pagination);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [get, currentPage,addFormView,startDate,endDate,searchValue]);

  useEffect(() => {
    getChiefComplaints();
  }, [getChiefComplaints]);

  
  const deleteChiefComplaints = async () => {
    try {
      const response = await del(`resource/docs/${id}`);
  
      if (response.code === 200) {
        setDetailView(false);
        clearCache();
        getChiefComplaints();

      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  return (
    <>
      {from !== "Consult" && (
        <CRow>
          <CCol md={6} className="mb-2">
            <div className="d-flex gap-2">
              <img
                alt="BackBtn"
                src={Assets.BackBtn}
                style={{ width: "35px" }}
                onClick={() => {
                  OnClose();
                }}
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
      )}
      {!addFormView && (
        <>
          {from !== "Consult" && (
            <CRow>
              <CCol lg={8} md={8} xl={8} className="mb-3 ">
                {/* <div className="search-bar">
                <input type="text" placeholder="Search" />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div> */}
                <DateRangePicker getFilterValues={getFilterValues} />
              </CCol>
              <CCol
                lg={4}
                md={4}
                xl={4}
                className="mb-3 d-flex justify-content-end align-items-center gap-15"
              >
                <div className="patient-adding" onClick={() => addFormPage()}>
                  <button>+ ADD</button>
                </div>
                {/* <div className="patient-adding">
                  <button>
                    <img src={Assets.ThreeDots} alt="settings" />
                  </button>
                </div> */}
              </CCol>
            </CRow>
          )}
          <div className="mb-2">
            <ChiefComplaintTable
              rowData={rowData}
              columns={columnData}
              getselectedData={getselectedData}
              from={from}
              currentPage={currentPage || 1}
              itemsPerPage={itemsPerPage || 5}
            />
            {from !== "Consult" && (
              <CRow className="mb-3">
                <CCol lg={12} className="d-flex justify-content-center">
                  <Pagination
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalItems={pagination?.total}
                    itemsPerPage={itemsPerPage}
                  />
                </CCol>
              </CRow>
            )}
          </div>
        </>
      )}
      {addFormView && (
        <CCard className="p-2 cursor-default mb-5">
          <CCardBody className="mb-3">
            <ChiefComplaintsForm
              back={() => {
                setAddFormView(false);
                setSelectedData({});
              }}
              setAddFormView={setAddFormView}
              getChiefComplaints={getChiefComplaints}
              defaultValues={selectedData}
            />
          </CCardBody>
        </CCard>
      )}

      {detailView && (
        <BlurBackground>
          <CModal
            alignment="center"
            visible={detailView}
            onClose={() => setDetailView(false)}
            aria-labelledby="VerticallyCenteredExample"
          >
            <CModalBody className="p-3">
              <div className="w-100 mt-2 d-flex justify-content-center flex-column align-items-center">
                <h5>Are you sure want to delete ?</h5>
                <div className="d-flex gap-2 mt-2">
                  <div style={{ width: "80px" }}>
                    <PrimaryButton onClick={() => deleteChiefComplaints()}>
                      Yes
                    </PrimaryButton>
                  </div>
                  <div style={{ width: "80px" }}>
                    <SecondaryButton onClick={() => setDetailView(false)}>
                      No
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </CModalBody>
          </CModal>
        </BlurBackground>
      )}
    </>
  );
};

export default ChiefComplaints;
