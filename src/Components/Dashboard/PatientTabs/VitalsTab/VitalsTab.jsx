import { CBadge, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import React from "react";
import "./VitalsTab.css";
import { Assets } from "../../../../assets/Assets";
import Badge from "../../../Badge/Badge";
import CardChart from "../../../Charts/CardChart";
import { ObjectiveDatas } from "../../../Consultant/TableColumnsJson/ObjectiveJson";

const VitalsTab = ({ category, openModal }) => {
  const filteredProducts = ObjectiveDatas?.filter(
    (product) => product?.category === category
  );

  const renderImage = (contentUrl) => {
    return (
      <img
        src={contentUrl}
        alt="mage1"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    );
  };

  // // Function to render PDF content
  const renderPdf = (contentUrl) => {
    return (
      <iframe
        title="PDF Viewer"
        src={contentUrl}
        style={{ width: "100%", height: "140px", border: "none" }}
      />
    );
  };
  return (
    <>
      <CRow className="mb-1">
        <CCol md={12}>
          <CRow className="mt-3 ">
            {filteredProducts?.map((item, index) => (
              <CCol md={6} xl={4} key={index} className="mb-3">
                <CCard
                  className={`vital-cards`}
                  onClick={() => {
                    openModal(item);
                  }}
                >
                  <CCardBody>
                    <div className="vital-icon-and-title">
                      <div>
                        <img alt="bp" src={item.icon} />
                      </div>
                      <div className="vital-card-title">
                        <span className="vital-card-text-bold">
                          {item.name}
                        </span>
                        <span className="vital-card-text">{item.date}</span>
                      </div>
                    </div>
                    <div className="vital-badge">
                      <div className="vital-badge-list">
                        {item.badge.map((dt, i) => (
                          <div key={i} style={{ height: "24px" }}>
                            <Badge label={dt?.label} color={dt?.color} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="vital-line-container">
                      {/* <img alt="line" src={Assets.Vitalline} /> */}
                      {item?.name === "ECG" ? (
                        <div className="chart-item">
                          {/* <div className="rectangle">
                            <img src={Assets.ecgSample} alt="ecg" />
                          </div> */}
                          {renderImage(Assets.ecgSample)}
                          {/* {renderPdf("https://www.orimi.com/pdf-test.pdf")} */}
                        </div>
                      ) : (
                        <CardChart datas={item} />
                      )}
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCol>
      </CRow>
    </>
  );
};

export default VitalsTab;
