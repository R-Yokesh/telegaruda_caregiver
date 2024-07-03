import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import Card from "../../../../Cards/Card";
import Breadcrumb from "../../../../Breadcrumb/Breadcrumb";
import "../Objective/Objective.css";
import Table from "../../../../Tables/Table";


const Subjective = () => {
    const cardData = [
        { id: 1, name: "Chief Complaints", image: Assets.VitalSig },
        { id: 2, name: "History of Present Illness (HPI)", image: Assets.PhyExam },
        { id: 3, name: "History", image: Assets.History },
        { id: 4, name: "Wellness Profile", image: Assets.WellnessProfile },
        { id: 5, name: "Review of Systems (ROS)", image: Assets.ReviewSytm },
        { id: 6, name: "Assessment Tool", image: Assets.AssesmentTool },
    ];

    const [currentTab, setCurrentTab] = useState({
        id: 1,
        title: "Chief Complaints",
    });
    const [selectedData, setSelectedData] = useState();
    const [cardView, setCardView] = useState(false);
    // const [cardSelectedData, setSelectedCardData] = useState();

    const getSelectedData = (data) => {
        setSelectedData(data);
        if (data?.id === 1) {
            setCardView(true);
        }
    };
    const getCurrentTab = (data) => {
        setCurrentTab(data);
    };

    // function findTitleById(id) {
    //     const titleObject = tabs?.find((title) => title.id === id);
    //     return titleObject ? titleObject?.title : "Primary Vitals"; // Return the title or a message if not found
    // }

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
                complaints: "Abdominal pain, radiating to right shoulder and shoulder blades",
                notes: "Taking dole",
                action: [
                    { type: "edit" },
                    { type: "delete" },
                ],
            },
        ],
    };


    return (
        <>
            <CContainer className="mt-3">
                {!cardView ? (
                    <CRow>
                        {cardData.map((dt, i) => (
                            <CCol md={4} xl={3} className="mb-3">
                                <Card className="min-height-200" data={dt} getSelectedData={getSelectedData} />
                            </CCol>
                        ))}
                    </CRow>
                ) : (
                    <>
                        <CRow>
                            <CCol md={6} className="mb-2">
                                <div className="d-flex gap-2">
                                    <img
                                        alt="BackBtn"
                                        src={Assets.BackBtn}
                                        style={{ width: "35px" }}
                                        onClick={() => setCardView(false)}
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
                    </>
                )}
                <CRow>
                    <CCol md={6} xl={6} className="mb-3 chief-complaints">
                        <div className="search-bar">
                            <input type="text" placeholder="Search" />
                            <button type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </CCol>
                    <CCol md={6} xl={6} className="mb-3 d-flex justify-content-end align-items-center gap-15">
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
            </CContainer>
        </>
    );
};

export default Subjective;
