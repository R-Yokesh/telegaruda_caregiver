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
                        <small className="fs-10 fw-500">{DoctorDetail.email}</small>
                        <small className="fs-10 fw-500">|</small>
                        <small className="fs-10 fw-500">{DoctorDetail.mobile}</small>
                    </p>
                    <p className='flex-sec-wrap gap-sec'>
                        <small className="fs-10 fw-600">MRN: {DoctorDetail.mrn}</small>
                        <small className="fs-10 fw-600">|</small>
                        <small className="fs-10 fw-600">{DoctorDetail.age}</small>
                    </p>
                </div>
            </div>
            <img src={Assets.notes} className='edit-icon' alt="edit-icon" />
        </div>
    )
}

export default DoctorCards
