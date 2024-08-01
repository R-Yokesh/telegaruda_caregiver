import React, { useEffect } from "react";
import PatentProfile from "../../Components/Dashboard/PatentProfile/PatentProfile";
import PatientTabs from "../../Components/Dashboard/PatientTabs/PatientTabs";
import { CCol, CRow } from "@coreui/react";
import { Assets } from "../../assets/Assets";
import { useState } from "react";
import DoctorCards from "../../Components/DoctorCards/DoctorCards";
import { Link, useNavigate } from "react-router-dom";
import FilterModal from "../../Components/FilterModal/FilterModal";
import useApi from "../../ApiServices/useApi";
import Pagination from "../../Components/Pagination/Pagination";
import Loader from "../../Components/Loader/Loader";

function CallHistoryView() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [DoctorDetail, setDoctorDetail] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const { loading, error, get, post } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  // const DoctorDetail = [
  //   {
  //     name: "Ram Mohan S R",
  //     email: "rammohan@cure.com",
  //     mobile: "+91 98765 43210",
  //     mrn: "MRN 3",
  //     age: "34 yrs (M)",
  //     profile: Assets.Patient,
  //   },
  //   {
  //     name: "Ram Mohan S R",
  //     email: "rammohan@cure.com",
  //     mobile: "+91 98765 43210",
  //     mrn: "MRN 3",
  //     age: "34 yrs (M)",
  //     profile: Assets.Patient,
  //   },
  //   {
  //     name: "Ram Mohan S R",
  //     email: "rammohan@cure.com",
  //     mobile: "+91 98765 43210",
  //     mrn: "MRN 3",
  //     age: "34 yrs (M)",
  //     profile: Assets.Patient,
  //   },
  //   {
  //     name: "Ram Mohan S R",
  //     email: "rammohan@cure.com",
  //     mobile: "+91 98765 43210",
  //     mrn: "MRN 3",
  //     age: "34 yrs (M)",
  //     profile: Assets.Patient,
  //   },
  // ];

  const DetailSec = () => {
    navigate("/patients/summary");
  };

  // Function to handle page change
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getDoctors = async () => {
    try {
      const response = await get(
        `resource/consults?limit=${itemsPerPage}&page=${currentPage}&participant_ref_number=10`
      );
      console.log(response); // Handle the data as needed
      if (response.code === 200) {
        setDoctorDetail(response?.data?.consults);
        setTotalItems(response?.data?.pagination?.total);
      } else {
        setDoctorDetail([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    getDoctors();
  }, [currentPage]);
  return (
    <section className="call-history-sec">
      <div className="flex-sec top-sec">
        <div className="bread-crumbs">
          <p className="mb-0">
            <Link to="/patients">Patient</Link> /{" "}
            <Link to="/patients" className="active">
              Existing Patient
            </Link>
          </p>
          <h4>Appointments - Call History</h4>
        </div>
        <div className="patient-adding">
          <button onClick={() => setVisible(!visible)}>
            <img src={Assets.filter} alt="filter-sec" className="filter-icon" />{" "}
            Filter
          </button>
        </div>
      </div>
      <div className="doctor-card-sec">
        <div className="row">
          {!loading ? (
            <>
              {DoctorDetail.map((data, i) => (
                <div className="col-4" onClick={() => DetailSec()}>
                  <Link className="card-link">
                    <DoctorCards DoctorDetail={data} />
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <div
              className="d-flex w-100 justify-content-center mb-3 align-items-center"
              style={{ height: "350px", maxHeight: "100%" }}
            >
              <Loader />
            </div>
          )}
          <CRow className="mb-3">
            <CCol lg={12} className="d-flex justify-content-center">
              <Pagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            </CCol>
          </CRow>
        </div>
      </div>
      <div className="modal-sec">
        <FilterModal visible={visible} setVisible={setVisible} />
      </div>
    </section>
  );
}

export default CallHistoryView;
