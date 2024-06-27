import React from 'react'
import { Assets } from '../../assets/Assets'

function DoctorCards({ DoctorDetail }) {
    return (
        <div className='card-sec'>
            <div className='row align-items-center'>
                <div className='profile col-4'>
                    <img src={DoctorDetail.profile} alt="Patient-image" />
                </div>
                <div className='patient-details col-8'>
                    <h5>{DoctorDetail.name}</h5>
                    <p className='flex-sec-wrap gap-sec'>
                        <small>{DoctorDetail.email}</small>
                        <small>|</small>
                        <small>{DoctorDetail.mobile}</small>
                    </p>
                    <p className='flex-sec-wrap gap-sec'>
                        <small>MRN: {DoctorDetail.mrn}</small>
                        <small>|</small>
                        <small>{DoctorDetail.age}</small>
                    </p>
                </div>
            </div>
            <img src={Assets.notes} className='edit-icon' alt="edit-icon" />
        </div>
    )
}

export default DoctorCards
