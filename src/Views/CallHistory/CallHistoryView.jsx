import React from 'react'
import PatentProfile from '../../Components/Dashboard/PatentProfile/PatentProfile';
import PatientTabs from '../../Components/Dashboard/PatientTabs/PatientTabs'
import { CCol, CRow } from "@coreui/react";
import { Assets } from '../../assets/Assets';
import { useState } from 'react';
import DoctorCards from '../../Components/DoctorCards/DoctorCards';
import { Link } from 'react-router-dom';
// import FilterModal from '../../Components/FilterModal/FilterModal';

function CallHistoryView() {
    const tabs = [
        {
            id: 1,
            title: "Call",
            image: Assets.Call,
        },
        {
            id: 2,
            title: "Medical Profile",
            image: Assets.Notes,
        },

        {
            id: 3,
            title: "Camera Control",
            image: Assets.Camera,
        },
        {
            id: 4,
            title: "Pair",
            image: Assets.Qr,
        },
    ];
    const [currentTab, setCurrentTab] = useState(2);
    const getCurrentTab = (data) => {
        setCurrentTab(data);
    };
    const DoctorDetail = [
        {
            name: 'Ram Mohan S R',
            email: 'rammohan@cure.com',
            mobile: '+91 98765 43210',
            mrn: 'MRN 3',
            age: '34 yrs (M)',
            profile: Assets.Patient
        },
        {
            name: 'Ram Mohan S R',
            email: 'rammohan@cure.com',
            mobile: '+91 98765 43210',
            mrn: 'MRN 3',
            age: '34 yrs (M)',
            profile: Assets.Patient
        },
        {
            name: 'Ram Mohan S R',
            email: 'rammohan@cure.com',
            mobile: '+91 98765 43210',
            mrn: 'MRN 3',
            age: '34 yrs (M)',
            profile: Assets.Patient
        },
        {
            name: 'Ram Mohan S R',
            email: 'rammohan@cure.com',
            mobile: '+91 98765 43210',
            mrn: 'MRN 3',
            age: '34 yrs (M)',
            profile: Assets.Patient
        },
    ]
    return (
        <section className='call-history-sec'>
            <CRow className="mb-4">
                <CCol md={12} xl={5} className="mb-2">
                    <PatentProfile />
                </CCol>
                <CCol md={12} xl={7}>
                    <PatientTabs tabs={tabs} getCurrentTab={getCurrentTab} />
                </CCol>
            </CRow>
            <div className='flex-sec top-sec'>
                <div className='bread-crumbs'>
                    <p className='mb-0'><Link to='/patients'>Patient</Link> / <Link to='/patients' className='active'>Existing Patient</Link></p>
                    <h4>Appointments - Call History</h4>
                </div>
                <div className='patient-adding'>
                    <button><img src={Assets.filter} alt="filter-sec" className='filter-icon' /> Filter</button>
                </div>
            </div>
            <div className='doctor-card-sec'>
                <div className='row'>
                    {DoctorDetail.map((data, i) => (
                        <div className='col-4'>
                            <DoctorCards DoctorDetail={data} />
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className='modal-sec'>
                <FilterModal />
            </div> */}
        </section>
    )
}

export default CallHistoryView
