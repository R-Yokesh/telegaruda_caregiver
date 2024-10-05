import React, { useEffect, useState } from "react";
import { Assets } from "../../assets/Assets";
import { formatDateTime } from "../../Utils/dateUtils";

function DoctorCards({ DoctorDetail }) {
  const [publisherObjects, setPublisherObjects] = useState([]);

  useEffect(() => {
    if (DoctorDetail) {
      const getPublisherData = () => {
        return DoctorDetail?.participants?.filter(
          (participant) => participant?.role === "publisher"
        );
      };
      setPublisherObjects(getPublisherData);
    }
  }, [DoctorDetail]);
  return (
    <div className="card-sec fx-grow">
      <div className="row align-items-center">
        <div className="profile col-4">
          <img
            src={DoctorDetail?.profile || Assets.NoImg}
            alt="Patient-image"
          />
        </div>
        <div className="patient-details col-8 p-2">
          <h5>
            Dr.{" "}
            {DoctorDetail?.participants
              ? publisherObjects[0]?.participant_info?.name
              : "--"}
          </h5>
          <p className="gap-sec d-flex flex-wrap">
            <small className="fs-10 fw-500">
              {DoctorDetail?.participants
                ? publisherObjects[0]?.participant_info?.email
                : "--"}
            </small>
            <small className="fs-10 fw-500">|</small>
            <small className="fs-10 fw-500">
              {DoctorDetail?.participants
                ? publisherObjects[0]?.participant_info?.phone
                : "--"}
            </small>
          </p>
          <p className="flex-sec-wrap gap-sec">
            <small className="fs-10 fw-600">
              {DoctorDetail?.participants
                ? publisherObjects[0]?.participant_info?.additional_info
                    ?.consult_speciality
                : "--"}
            </small>
            <small className="fs-10 fw-600">|</small>
            <small className="fs-10 fw-600">
              {DoctorDetail?.scheduled_at
                ? formatDateTime(DoctorDetail?.scheduled_at)
                : "--"}
            </small>
          </p>
        </div>
      </div>
      {DoctorDetail?.consult_status?.slug === "ended" && (
        <img src={Assets.notes} className="edit-icon" alt="edit-icon" />
      )}
    </div>
  );
}

export default DoctorCards;
