import React from 'react'
import { Assets } from '../../assets/Assets'

function PatientCard() {
    return (
        <div className='card-sec'>
            <div className='row align-items-center'>
                <div className='profile col-4'>
                    <img src={Assets.Patient} alt="Patient-image" />
                </div>
                <div className='patient-details col-8'>
                    <h5>Ram Mohan S R</h5>
                    <p className='flex-sec-wrap gap-sec'>
                        <small>rammohan@cure.com</small>
                        <small>|</small>
                        <small>+91 98765 43210</small>
                    </p>
                    <p className='flex-sec-wrap gap-sec'>
                        <small>MRN: MRN 3</small>
                        <small>|</small>
                        <small>34 yrs (M)</small>
                    </p>
                </div>
            </div>
            <img src={Assets.Edit} className='edit-icon' alt="edit-icon" />
        </div>
    )
}

export default PatientCard
