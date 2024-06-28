import React, { useState } from "react";
import Badge from "../Badge/Badge";
import { Assets } from "../../assets/Assets";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import BlurBackground from "../BlurBackground/BlurBackground";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";
import BMI from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/EditForms/BMI";
import BPForm from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/EditForms/BPForm";
import RespirationRateForm from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/RespirationRateForm";
import Spo2 from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/Spo2";
import Temperature from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/Temperature";
import LFTForm from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/LFTForm";
import HeartRate from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/HeartRate";
import BSugar from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/BSugar";
import LipidProfileForm from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/LipidProfileForm";
import HCT from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/HCT";
import Hemogloin from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/Hemogloin";
import BKetone from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/BKetone";
import BUricAcid from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/BUricAcid";
import GFR from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/GFR";
import Creatinine from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/Creatinine";
import Urea from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/Urea";
import Urinalysis from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/AddForms/Urinalysis";

const DynamicTable = ({ columnsData, tableData }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  const deleteData = (data) => {
    if (data) {
      setDeleteModal(true);
    }
  };

  const editData = (data) => {
    setSelectedData(data);
    if (data) {
      setEditModal(true);
    }
  };
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

      {/* Delete Modal */}
      {deleteModal && (
        <BlurBackground>
          <CModal
            alignment="center"
            visible={deleteModal}
            onClose={() => setDeleteModal(false)}
            aria-labelledby="VerticallyCenteredExample"
          >
            <CModalBody className="p-3">
              <div className="w-100 mt-2 d-flex justify-content-center flex-column align-items-center">
                <h5>Are you sure want to delete ?</h5>
                <div className="d-flex gap-2 mt-2">
                  <div style={{ width: "80px" }}>
                    <PrimaryButton onClick={() => setDeleteModal(false)}>
                      Yes
                    </PrimaryButton>
                  </div>
                  <div style={{ width: "80px" }}>
                    <SecondaryButton onClick={() => setDeleteModal(false)}>
                      No
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </CModalBody>
          </CModal>
        </BlurBackground>
      )}

      {/* Edit Modal */}
      {editModal && (
        <BlurBackground>
          <CModal
            alignment="center"
            visible={editModal}
            onClose={() => setEditModal(false)}
            aria-labelledby="VerticallyCenteredExample"
            size="lg"
          >
            <CModalHeader>
              <h4 className="fw-600">Edit {selectedData?.name}</h4>
            </CModalHeader>
            <CModalBody className="p-3">
              {selectedData?.name === "BMI" && (
                <BMI
                  editBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
              {selectedData?.name === "Blood Pressure" && (
                <BPForm
                  editBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}

              {selectedData?.name === "Respiration Rate" && (
                <RespirationRateForm
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
              {selectedData?.name === "SpO2" && (
                <Spo2
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}

              {selectedData?.name === "Temperature" && (
                <Temperature
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}

              {selectedData?.name === "Lung Function Test (LFT)" && (
                <LFTForm
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
              {selectedData?.name === "Heart Rate" && (
                <HeartRate
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
              {selectedData?.name === "Blood Sugar" && (
                <BSugar
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
              {selectedData?.name === "Lipid Profile" && (
                <LipidProfileForm
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
              {selectedData?.name === "HCT" && (
                <HCT
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
              {selectedData?.name === "Hemoglobin" && (
                <Hemogloin
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}

              {selectedData?.name === "Blood Ketone" && (
                <BKetone
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}

              {selectedData?.name === "Blood Uric Acid" && (
                <BUricAcid
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}

              {selectedData?.name === "GFR" && (
                <GFR
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
              {selectedData?.name === "Creatinine" && (
                <Creatinine
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
              {selectedData?.name === "Urea" && (
                <Urea
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
              {selectedData?.name === "Urinalysis" && (
                <Urinalysis
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                />
              )}
            </CModalBody>
          </CModal>
        </BlurBackground>
      )}
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
              {renderActionButton(data, row)}
            </div>
          ))}
        </div>
      );
    } else {
      // Default rendering for regular data
      return <span className="fs-16 fw-500">{value}</span>;
    }
  }

  function renderActionButton(data, row) {
    switch (data.type) {
      case "warning":
        return <img src={Assets.Warning} alt="warn" className="cursor" />;
      case "edit":
        return (
          <img
            src={Assets.EditPencil}
            alt="edit"
            className="cursor"
            onClick={() => editData(row)}
          />
        );
      case "delete":
        return (
          <img
            src={Assets.Delete}
            alt="delete"
            className="cursor"
            onClick={() => deleteData(row)}
          />
        );
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
