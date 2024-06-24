import React from 'react'
import { Assets } from '../../assets/Assets'

function PatientCard({ PatientDetail }) {
    return (
        <div className='card-sec'>
            <div className='row align-items-center'>
                <div className='profile col-4'>
                    <img src={PatientDetail.profile} alt="Patient-image" />
                </div>
                <div className='patient-details col-8'>
                    <h5>{PatientDetail.name}</h5>
                    <p className='flex-sec-wrap gap-sec'>
                        <small>{PatientDetail.email}</small>
                        <small>|</small>
                        <small>{PatientDetail.mobile}</small>
                    </p>
                    <p className='flex-sec-wrap gap-sec'>
                        <small>MRN: {PatientDetail.mrn}</small>
                        <small>|</small>
                        <small>{PatientDetail.age}</small>
                    </p>
                </div>
            </div>
            <img src={Assets.Edit} className='edit-icon' alt="edit-icon" />
        </div>
    )
}

export default PatientCard
