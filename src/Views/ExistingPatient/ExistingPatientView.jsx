import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import PatientCard from "../../Components/PatientCard/PatientCard";
import { Link, useNavigate } from "react-router-dom";
import { Assets } from "../../assets/Assets";

function ExistingPatientView() {
  const navigate = useNavigate();

  const PatientDetail = [
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
    {
      name: "Ram Mohan S R",
      email: "rammohan@cure.com",
      mobile: "+91 98765 43210",
      mrn: "MRN 3",
      age: "34 yrs (M)",
      profile: Assets.Patient,
    },
  ];

  const DetailSec = () => {
    localStorage.removeItem("patiendDetailTab");
    navigate("/patients/history");
  };

  return (
    <section className="existing-patient">
      <div className="flex-sec top-sec">
        <div className="bread-crumbs">
          <p>
            <Link to="/patients">Patient</Link> /{" "}
            <Link to="/patients" className="active">
              Existing Patient
            </Link>
          </p>
        </div>
        <div className="patient-adding">
          <button>+ ADD Patient</button>
        </div>
      </div>
      <div className="row">
        {PatientDetail.map((data, i) => (
          <div className="col-4" onClick={() => DetailSec()}>
            <Link
              //   to={"/patients/history"}
              className="card-link"
            >
              <PatientCard PatientDetail={data} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExistingPatientView;
