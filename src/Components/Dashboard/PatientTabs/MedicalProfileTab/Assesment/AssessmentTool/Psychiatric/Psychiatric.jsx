import {
    CCard,
    CCardBody,
    CCol,
    CModal,
    CModalBody,
    CRow,
} from "@coreui/react";
import React, { useState } from "react";
import Pagination from "../../../../../../Pagination/Pagination";
import PsychiatricTable from "../../../../../../Tables/AssessmentTools/PsychiatricTable";
import PsychiatricForm from "./PsychiatricForm";

const Psychiatric = () => {

    const columnData = [
        { label: "NO" },
        { label: "Name" },
        { label: "Taken" },
        { label: "result" },
        { label: "Actions" },
    ];
    const rowData = [
        {
            id: 1,
            name: "Physical Symptoms",
            date: "26-07-2024 ",
            result: "12 Score Medium",
            questions: [
                {
                    label: "Stomach pain",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Back pain",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Pain in your arms, legs, or joints (knees, hips, etc.)",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Menstrual cramps or other problems with your periods WOMEN ONLY",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Headaches",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Chest pain",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Dizziness",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Fainting spells",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Feeling your heart pound or race",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Shortness of breath",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Pain or problems during sexual intercourse",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Constipation, loose bowels, or diarrhea",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Nausea, gas, or indigestion",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Feeling tired or having low energy",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
                {
                    label: "Trouble sleeping",
                    options: ["Not bothered at all", "Bothered a little", "Bothered a lot"]
                },
            ],
        },
        {
            id: 2,
            name: "Anger",
            questions: [
                {
                    label: "I was irritated more than people knew",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
                {
                    label: "I felt angry",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
                {
                    label: "I felt like I was ready to explode",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
                {
                    label: "I was grouchy",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
                {
                    label: "I felt annoyed",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },

            ]
        },
        {
            id: 3,
            name: "Anxiety",
            questions: [
                {
                    label: "I felt fearful",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
                {
                    label: "I felt anxious",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
                {
                    label: "I felt worried",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
                {
                    label: "I found it hard to focus on anything other than my anxiety",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
                {
                    label: "I felt nervous",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
                {
                    label: "I felt uneasy",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
                {
                    label: "I felt tense",
                    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
                },
            ]
        },
        {
            id: 4,
            name: "Depression",

        },
        {
            id: 5,
            name: "Mania",

        },
        {
            id: 6,
            name: "Autism Spectrum Disorder",

        },
        {
            id: 7,
            name: "Social Communication Disorder",

        },
        {
            id: 8,
            name: "Dimensions Of Psychosis Symptom Severity",

        },
        {
            id: 9,
            name: "Conduct Disorder",

        },
        {
            id: 10,
            name: "Nonsuicidal Self-Injury",

        },
        {
            id: 11,
            name: "Oppositional Defiant Disorder",

        },
        {
            id: 12,
            name: "Somatic Symptom Disorder",

        },

    ];

    const [addFormView, setAddFormView] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedData, setSelectedData] = useState({});
    const [formTitle, setFormTitle] = useState(""); // State for form title

    const itemsPerPage = 12; // Number of items to display per page

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

    const viewFormPage = () => {
        setAddFormView(true);
    };

    const getselectedData = (data, type) => {
        console.log(type, "first", data);
        setSelectedData(data);
        setFormTitle(data?.name); // Set form title based on selected data
        if (type === "view") {
            viewFormPage();
        }
    };


    return (
        <>
            {!addFormView && (
                <>
                    <div className="mb-2">
                        <PsychiatricTable
                            rowData={getCurrentPageItems()}
                            columns={columnData}
                            getselectedData={getselectedData}
                        />

                        {/* <CRow className="mb-3">
                            <CCol lg={12} className="d-flex justify-content-center">
                                <Pagination
                                    currentPage={currentPage}
                                    onPageChange={onPageChange}
                                    totalItems={rowData?.length}
                                    itemsPerPage={itemsPerPage}
                                />
                            </CCol>
                        </CRow> */}
                    </div>
                </>
            )}
            {addFormView && (
                <CCard className="p-2 cursor-default mb-5">
                    <CCardBody className="mb-3">
                        <PsychiatricForm
                            back={() => {
                                setAddFormView(false);
                                setSelectedData({});
                            }}
                            defaultValues={selectedData}
                            questions={selectedData.questions || []}
                            formTitle={formTitle}
                        />
                    </CCardBody>
                </CCard>
            )}


        </>
    )
}

export default Psychiatric