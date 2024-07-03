import React, { useState } from 'react'
import PatientDetailCard from '../../Components/PatientDetailCard/PatientDetailCard'
import SummaryTable from '../../Components/SummaryTable/SummaryTable'
import { CTabs, CTab, CTabList, CTabContent, CTabPanel } from '@coreui/react'
import { Link } from 'react-router-dom'

function PatientSummaryView() {

    const [ActiveKey, setActiveKey] = useState('Vitals')

    const columns = [
        {
            key: 'No',
            label: 'No.',
        },
        {
            key: 'Result',
            lable: 'Result'
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

    const items = [
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
        {
            No: 3,
            Result: 'Normal Weight',
            BMI: '24.13',
            Height: '160 CM',
            Weight: '60 KG',
            Date: '02-04-2024'
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
                            <SummaryTable columns={columns} items={items} green="green" head={"BMI"} />
                            <SummaryTable columns={columns} items={items} green="green" head={"Temperature"} />
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="profile-tab-pane" itemKey={"Health"}>
                            Profile tab content
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="contact-tab-pane" itemKey={"Prescription"}>
                            Contact tab content
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Glasses"}>
                            Disabled tab content
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Examination"}>
                            Disabled tab content
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Histories"}>
                            Disabled tab content
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="disabled-tab-pane" itemKey={"Documents"}>
                            Disabled tab content
                        </CTabPanel>
                    </CTabContent>
                </CTabs>
            </div>
        </section>
    )
}

export default PatientSummaryView
