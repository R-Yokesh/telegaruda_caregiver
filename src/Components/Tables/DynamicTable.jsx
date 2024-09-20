import React, { useState } from "react";
import Badge from "../Badge/Badge";
import { Assets } from "../../assets/Assets";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import BlurBackground from "../BlurBackground/BlurBackground";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";
import RespirationRateForm from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/RespirationRateForm";
import Spo2 from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/Spo2";
import Temperature from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/Temperature";
import LFTForm from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/LFTForm";
import HeartRate from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/HeartRate";
import BSugar from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/BSugar";
import LipidProfileForm from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/LipidProfileForm";
import HCT from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/HCT";
import Hemogloin from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/Hemogloin";
import BKetone from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/BKetone";
import BUricAcid from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/BUricAcid";
import GFR from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/GFR";
import Creatinine from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/Creatinine";
import Urea from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/Urea";
import Urinalysis from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/Urinalysis";
import BMI from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/BMI";
import BPForm from "../Dashboard/PatientTabs/MedicalProfileTab/Objective/Forms/BPForm";
import useApi from "../../ApiServices/useApi";
import { toast } from "react-toastify";
import { format, isValid, parse } from "date-fns";

const DynamicTable = ({
  columnsData,
  tableData,
  getTableDatas,
  from,
  render,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const { loading, del, clearCache } = useApi();

  const deleteData = (data) => {
    setSelectedData(data);
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

  const onDelete = async () => {
    try {
      const url = `resource/vitals/${selectedData?.id}`; // Replace with your API endpoint
      await del(url);
      await getTableDatas(selectedData);
      toast.success("Deleted successfully");
      setDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  return (
    <>
      <div className="responsive-table-container">
        <table
          class="responsive-table"
          style={{ background: from === "Consult" ? "white" : "transparent" }}
        >
          <thead>
            <tr>
              {columnsData?.map(
                (data, i) =>
                  from === "Consult" && i === columnsData.length - 1 ? null : (
                    <th key={i}>{data?.label}</th>
                  )
                // <th key={column.id}>{column.label}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData?.length <= 0 ? (
              <tr>
                <td colSpan={columnsData.length} className="no-data-message">
                  No data available
                </td>
              </tr>
            ) : (
              tableData?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columnsData.map((column, i) =>
                    from === "Consult" &&
                    i === columnsData.length - 1 ? null : (
                      <td key={`${rowIndex}-${column?.id}`}>
                        {renderCell(row, column)}
                      </td>
                    )
                  )}
                </tr>
              ))
            )}
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
                    <PrimaryButton onClick={() => onDelete()}>
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
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}
              {selectedData?.name === "Blood Pressure" && (
                <BPForm
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}

              {selectedData?.name === "Respiration Rate" && (
                <RespirationRateForm
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}
              {selectedData?.name === "SpO2" && (
                <Spo2
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}

              {selectedData?.name === "Temperature" && (
                <Temperature
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}

              {selectedData?.name === "Lung Function Test (LFT)" && (
                <LFTForm
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}
              {selectedData?.name === "Heart" && (
                <HeartRate
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}
              {selectedData?.name === "Blood Sugar" && (
                <BSugar
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}
              {selectedData?.name === "Lipid Profile" && (
                <LipidProfileForm
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}
              {selectedData?.name === "Hematocrit (HCT)" && (
                <HCT
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}
              {selectedData?.name === "Hemoglobin" && (
                <Hemogloin
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}

              {selectedData?.name === "Blood Ketone" && (
                <BKetone
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}

              {selectedData?.name === "Blood Uric Acid" && (
                <BUricAcid
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}

              {selectedData?.name === "GFR" && (
                <GFR
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}
              {selectedData?.name === "Creatinine" && (
                <Creatinine
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
                />
              )}
              {selectedData?.name === "Urea" && (
                <Urea
                  addBack={() => setEditModal(false)}
                  defaultData={selectedData}
                  getTableDatas={() => getTableDatas(selectedData)}
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

  const renderImage = (contentUrl) => {
    return (
      <img
        src={contentUrl}
        alt="Image"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    );
  };

  function renderCell(row, column) {
    const columnKey = getColumnKey(column?.label);
    const value = row[columnKey];

    if (columnKey === "result_file") {
      // Function to render PDF content
      const renderPdf = (contentUrl) => {
        window.open(contentUrl, "_blank");
      };
      return (
        <div style={{ width: "80px" }} onClick={() => renderPdf(value.link)}>
          <span className="hyperlink">{value?.name}</span>
        </div>
      );
    } else if (columnKey === "result") {
      return (
        <div style={{ width: "180px" }}>
          {value?.name !== "" ? (
            <Badge label={value?.name ?? "-"} color={value?.status ?? "-"} />
          ) : value?.name === "" ? (
            <>--</>
          ) : (
            <span>{value}</span>
          )}
        </div>
      );
    } else if (columnKey === "date") {
      // Function to format date-time string
      const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) {
          return "Invalid date-time"; // Handle empty or invalid input
        }

        // Parse the date and time string
        const parsedDate = parse(
          dateTimeString,
          "yyyy-MM-dd HH:mm",
          new Date()
        );

        // Check if the parsed date is valid
        if (!isValid(parsedDate)) {
          return "Invalid date-time"; // Handle invalid date
        }

        // Format the date and time into 'dd-MM-yyyy HH:mm'
        return format(parsedDate, "dd-MM-yyyy HH:mm");
      };

      return (
        <div style={{ width: "180px" }}>
          <span>{formatDateTime(value)} </span>
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
            className={`cursor ${data?.disabled ? "greyed-out" : ""}`}
            onClick={() => !data.disabled && editData(row)} // Disable click if disabled
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
