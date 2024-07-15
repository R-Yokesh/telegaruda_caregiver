import React, { useState } from 'react'
import PatientDetailCard from '../../Components/PatientDetailCard/PatientDetailCard'
import SummaryTable from '../../Components/SummaryTable/SummaryTable'
import TableRow from '../../Components/SummaryTable/TableRow'
import ExamCard from '../../Components/SummaryTable/ExamCard'
import TableColor from '../../Components/SummaryTable/TableColor'
import TableSec from '../../Components/SummaryTable/TableSec'
import DocumentTable from '../../Components/SummaryTable/DocumentTable'
import Prescription from '../../Components/SummaryTable/Prescription'
import { CTabs, CTab, CTabList, CTabContent, CTabPanel } from '@coreui/react'
import { Link } from 'react-router-dom'

function PatientSummaryView() {

    const [ActiveKey, setActiveKey] = useState('Vitals')
    // BMI Data
    const VitalsColumns = [
        {
            key: 'No',
            label: 'No.',
        },
        {
            key: 'Result',
            label: 'Result'
        },
        {
            key: 'BMI',
            label: 'BMI',
        },
        {
            key: 'Height',
            label: 'Height',
        },
        {
            key: 'Weight',
            label: 'Weight',
        },
        {
            key: 'Date',
            label: 'Date',
        },
    ]

    const VitalsItems = [
        {
            No: 1,
            Result: 'Normal Weight',
            BMI: '24.13',
            Height: '160 CM',
            Weight: '60 KG',
            Date: '02-04-2024'
        },
        {
            No: 2,
            Result: 'Normal Weight',
            BMI: '24.13',
            Height: '160 CM',
            Weight: '60 KG',
            Date: '02-04-2024',
            _cellProps: { class: { scope: 'hey' } }
        },
    ]

    // Temparature Data
    const TemColumns = [
        {
            key: 'No',
            label: 'No.',
        },
        {
            key: 'Result',
            label: 'Result'
        },
        {
            key: 'Temperature',
            label: 'Temperature',
        },
        {
            key: 'Type',
            label: 'Type',
        },
        {
            key: 'Date',
            label: 'Date',
        },
    ]

    const TemItems = [
        {
            No: 1,
            Result: 'Normal',
            Temperature: '99.88 °F, 36.8 °C',
            Type: 'Oral',
            Date: '02-04-2024   15:45'
        },
        {
            No: 2,
            Result: 'Normal',
            Temperature: '99.88 °F, 36.8 °C',
            Type: 'Oral',
            Date: '02-04-2024   15:45'
        },
    ]

    // Glassess Data
    const GlassColumns = [
        {
            key: 'RX',
            label: 'RX',
        },
        {
            key: 'SPH',
            label: 'SPH'
        },
        {
            key: 'CYL',
            label: 'CYL',
        },
        {
            key: 'Axis',
            label: 'Axis',
        },
    ]

    const GlassItems = [
        {
            RX: 'D.V',
            SPH: '2',
            CYL: '2',
            Axis: '50 °',
        },
        {
            RX: 'D.V',
            SPH: '2',
            CYL: '2',
            Axis: '50 °',
        },
    ]

    const PrescritionData = {
        id: '488',
        eyesight: 'Right Eye (R.E)',
        date: '02-04-2024 15:45'
    }

    const PrescritionDataTwo = {
        id: '489',
        eyesight: 'Left Eye (L.E)',
        date: '02-04-2024 15:45'
    }

    // Histories Data
    // Glassess Data
    const HistoryColumns = [
        {
            key: 'No',
            label: 'No.',
        },
        {
            key: 'Condition',
            label: 'Condition'
        },
        {
            key: 'OnsetDate',
            label: 'Onset Date',
        },
        {
            key: 'RecoveredDate',
            label: 'RecoveredDate',
        },
        {
            key: 'TreatedBy',
            label: 'Treated By',
        },
        {
            key: 'Treatment',
            label: 'Treatment',
        },
        {
            key: 'Remark',
            label: 'Remark',
        },
        {
            key: 'Status',
            label: 'Status',
        },
    ]

    const HistoryItems = [
        {
            No: '1',
            Condition: 'Fever',
            OnsetDate: '02-04-2024',
            RecoveredDate: '02-04-2024',
            TreatedBy: 'Prathi',
            Treatment: 'Buddy Splint',
            Remark: '-',
            Status: 'Inactive',
        },
        {
            No: '2',
            Condition: 'Fever',
            OnsetDate: '02-04-2024',
            RecoveredDate: '02-04-2024',
            TreatedBy: 'Prathi',
            Treatment: 'Buddy Splint',
            Remark: '-',
            Status: 'active',
        },
    ]

    // History Screens
    const Cheifcolumns = [
        {
            key: 'No',
            label: 'No.',
        },
        {
            key: 'Complaints',
            label: 'Complaints'
        },
        {
            key: 'Notes',
            label: 'Notes',
        },
    ]

    const Cheifitems = [
        {
            No: 1,
            Complaints: 'abdominal pain, radiating to right shoulder and shoulder blades',
            Notes: 'Taking dole',
        },
        {
            No: 2,
            Complaints: 'abdominal pain, radiating to right shoulder and shoulder blades',
            Notes: 'Taking dole',
        },
    ]

    // Medicine Data 
    const Medicinecolumns = [
        {
            key: 'No',
            label: 'No.',
        },
        {
            key: 'MEDICINE',
            label: 'MEDICINE'
        },
        {
            key: 'Type',
            label: 'Type',
        },
        {
            key: 'STRENGTH',
            label: 'STRENGTH',
        },
        {
            key: 'INTAKEDAYS',
            label: 'INTAKE DAYS',
        },
        {
            key: 'QUANTITY',
            label: 'QUANTITY',
        },
        {
            key: 'SIGINFO',
            label: 'SIG INFO',
        },
        {
            key: 'START',
            label: 'START',
        },
        {
            key: 'END',
            label: 'END',
        },
        {
            key: 'Reason',
            label: 'Reason',
        },
        {
            key: 'Status',
            label: 'Status',
        },
    ]

    const Medicineitems = [
        {
            No: 1,
            MEDICINE: 'Dolox',
            Type: 'Brand',
            STRENGTH: 'Milligram(mg)',
            INTAKEDAYS: '6',
            QUANTITY: '6',
            SIGINFO: 'before breakfast',
            START: '22-01-2024',
            END: '22-01-2024',
            Reason: '-',
            Status: 'Active',
        },
        {
            No: 2,
            MEDICINE: 'Dolox',
            Type: 'Brand',
            STRENGTH: 'Milligram(mg)',
            INTAKEDAYS: '6',
            QUANTITY: '6',
            SIGINFO: 'before breakfast',
            START: '22-01-2024',
            END: '22-01-2024',
            Reason: '-',
            Status: 'Active',
        },
    ]

    // HPI Data
    const HPIcolumns = [
        {
            key: 'No',
            label: 'No.',
        },
        {
            key: 'Onset',
            label: 'Onset'
        },
        {
            key: 'Location',
            label: 'Location',
        },
        {
            key: 'Duration',
            label: 'Duration in Days',
        },
        {
            key: 'Characteristics',
            label: 'Characteristics (SL)',
        },
        {
            key: 'aggravating',
            label: 'aggravating factors',
        },
        {
            key: 'Relieving',
            label: 'Relieving factors',
        },
        {
            key: 'Temporal',
            label: 'Temporal factors',
        },
        {
            key: 'Severity',
            label: 'Severity',
        },
        {
            key: 'Notes',
            label: 'Notes',
        },
    ]

    const HPIitems = [
        {
            No: 1,
            Onset: '02-04-2024',
            Location: 'Knee',
            Duration: '20',
            Characteristics: 'Fracture',
            aggravating: 'Fracture',
            Relieving: 'Fracture',
            Temporal: 'Fracture',
            Severity: 'Normal',
            Notes: '-',
        },
        {
            No: 2,
            Onset: '02-04-2024',
            Location: 'Knee',
            Duration: '20',
            Characteristics: 'Fracture',
            aggravating: 'Fracture',
            Relieving: 'Fracture',
            Temporal: 'Fracture',
            Severity: 'Normal',
            Notes: '-',
        },
    ]

    // HPI Data
    const Surgicalcolumns = [
        {
            key: 'No',
            label: 'No.',
        },
        {
            key: 'DATE',
            label: 'DATE'
        },
        {
            key: 'Procedure',
            label: 'Procedure',
        },
        {
            key: 'Notes',
            label: 'Notes',
        }
    ]

    const Surgicalitems = [
        {
            No: 1,
            DATE: '02-04-2024',
            Procedure: 'Demo',
            Notes: 'Art',
        },
        {
            No: 2,
            DATE: '02-04-2024',
            Procedure: 'Demo',
            Notes: 'Art',
        },
    ]

    const ExaminationaData = [
        {
            type: 'Nutritional',
            datas: [
                {
                    valueOne: 'Lorem Ipsum',
                },
                {
                    valueOne: 'Lorem Ipsum',
                }
            ]
        },
        {
            type: 'Constitutional',
            datas: [
                {
                    valueOne: 'Lorem Ipsum',
                },
                {
                    valueOne: 'Lorem Ipsum',
                }
            ]
        },
        {
            type: 'HEENT',
            datas: [
                {
                    valueOne: 'Lorem Ipsum',
                },
                {
                    valueOne: 'Lorem Ipsum',
                }
            ]
        },

    ]

    // HPI Data
    const Prescolumns = [
        {
            key: 'RX',
            label: 'RX',
        },
        {
            key: 'Frequency',
            label: 'Frequency'
        },
        {
            key: 'Duration',
            label: 'Duration',
        },
        // {
        //     key: 'M | A | E | N',
        //     label: 'M | A | E | N',
        // },
        {
            key: 'Qty',
            label: 'Qty / Taken',
        }
    ]

    const Presitems = [
        {
            RX: 'Dolox Capsule / Tablet',
            Frequency: '1/2 | 0 | 0 | 0',
            Duration: '1 Day(s)',
            Qty: '1 Tablet',
            food: 'Before food'
        },
        {
            RX: 'Dolox Capsule / Tablet',
            Frequency: '1/2 | 0 | 0 | 0',
            Duration: '1 Day(s)',
            Qty: '1 Tablet',
        },
    ]

    // HPI Data
    const Documentcolumns = [
        {
            key: 'No.',
            label: 'No',
        },
        {
            key: 'Date',
            label: 'Date'
        },
        {
            key: 'LabTest',
            label: 'Lab Test',
        },
        // {
        //     key: 'M | A | E | N',
        //     label: 'M | A | E | N',
        // },
        {
            key: 'Notes',
            label: 'Notes',
        },
        {
            key: 'Link',
            label: 'Link',
        }
    ]

    const Documentitems = [
        {
            No: '1',
            Date: '02-04-2024',
            LabTest: 'Complete blood count',
            Notes: '-',
            Link: 'https://kartoffel.in/'
        },
        {
            No: '2',
            Date: '02-04-2024',
            LabTest: 'Complete blood count',
            Notes: '-',
            Link: 'https://kartoffel.in/'
        },
    ]

    return (
        <section className='patient-summary-sec'>
            <div className='detailing-card'>
                <PatientDetailCard />
            </div>
            <div className='tab-sec mt-4 mb-4'>
                <CTabs activeItemKey={"Vitals"} onChange={(k) => setActiveKey(k)}>
                    <CTabList variant="pills">
                        <CTab aria-controls="home-tab-pane" itemKey={"Vitals"}>Vitals</CTab>
                        <CTab aria-controls="profile-tab-pane" itemKey={"Health"}>Health</CTab>
                        <CTab aria-controls="contact-tab-pane" itemKey={"Prescription"}>Prescription</CTab>
                        <CTab aria-controls="contact-tab-pane" itemKey={"Glasses"}>Glasses</CTab>
                        <CTab aria-controls="contact-tab-pane" itemKey={"Examination"}>Examination</CTab>
                        <CTab aria-controls="contact-tab-pane" itemKey={"Histories"}>Histories</CTab>
                        <CTab aria-controls="contact-tab-pane" itemKey={"Documents"}>Documents</CTab>
                    </CTabList>
                    <div className="bread-crumbs mt-4">
                        <p>
                            <Link to="/patients">Patients</Link> / <Link to="/patients/history"> Patient History </Link> / <Link to="/patients/summary" className="active"> {ActiveKey}</Link>
                        </p>
                    </div>
                    <CTabContent>
                        <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={"Vitals"}>
                            <TableColor columns={VitalsColumns} items={VitalsItems} head={"BMI"} green={"green"} />
                            <TableColor columns={TemColumns} items={TemItems} head={"Temperature"} green={"green"} />
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="profile-tab-pane" itemKey={"Health"}>
                            <SummaryTable columns={Cheifcolumns} items={Cheifitems} head={"Chief Complaints"} />
                            <SummaryTable columns={Medicinecolumns} items={Medicineitems} head={"Medicine"} />
                            <SummaryTable columns={HPIcolumns} items={HPIitems} head={"HPI"} />
                            <SummaryTable columns={Surgicalcolumns} items={Surgicalitems} head={"Surgical Procedures"} />
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="contact-tab-pane" itemKey={"Prescription"}>
                            <TableSec PrescritionData={PrescritionData} />
                            <Prescription columns={Prescolumns} items={Presitems} head={"Prescription"} />
                            <TableSec PrescritionData={PrescritionData} />
                            <Prescription columns={Prescolumns} items={Presitems} head={"Prescription"} />
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Glasses"}>
                            <TableRow PrescritionData={PrescritionData} />
                            <SummaryTable columns={GlassColumns} items={GlassItems} />
                            <TableRow PrescritionData={PrescritionDataTwo} />
                            <SummaryTable columns={GlassColumns} items={GlassItems} />
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Examination"}>
                            <ExamCard ExaminationaData={ExaminationaData} />
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Histories"}>
                            <SummaryTable columns={HistoryColumns} items={HistoryItems} head={"Medical History"} />
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Documents"}>
                            <DocumentTable columns={Documentcolumns} items={Documentitems} head={"LAB"} />
                            <DocumentTable columns={Documentcolumns} items={Documentitems} head={"IMAGING"} />
                        </CTabPanel>
                    </CTabContent>
                </CTabs>
            </div>
        </section>
    )
}

export default PatientSummaryView
