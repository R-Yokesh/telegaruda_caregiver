import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import PatientCard from '../../Components/PatientCard/PatientCard'
import { Link } from 'react-router-dom'

function ExistingPatientView() {
    return (
        <section className='existing-patient'>
            <div className='flex-sec top-sec'>
                <div className='bread-crumbs'>
                    <p><Link to='/patients'>Patient</Link> / <Link to='/patients' className='active'>Existing Patient</Link></p>
                </div>
                <div className='patient-adding'>
                    <button>+ ADD Patient</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-4'>
                    <PatientCard />
                </div>
            </div>
        </section >
    )
}

export default ExistingPatientView
