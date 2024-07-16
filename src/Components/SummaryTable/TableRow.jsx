import { CRow, CCol } from '@coreui/react'
import React from 'react'

function TableRow({ PrescritionData }) {
    return (
        <div className='percription-id'>
            <div className='flex-sec justify-content-between table-sec-headings'>
                <p><b>Prescription Id: {PrescritionData.id}</b></p>
                <p><b>{PrescritionData.eyesight}</b></p>
                <p><b>Date: {PrescritionData.date}</b></p>
            </div>
        </div>
    )
}

export default TableRow
