import React from 'react'
import { CTable, CTableRow, CTableHeaderCell, CTableDataCell, CTableHead, CTableBody } from '@coreui/react'

function Prescription({ columns, items, head }) {
    return (
        <div className='table-sec'>
            <CTable>
                <CTableHead>
                    <CTableRow color="dark">
                        {columns.map((item) => (
                            item.label == "Frequency" ?
                                (
                                    <CTableHeaderCell scope="col">{item.label} <br />M | A | E | N</CTableHeaderCell>
                                ) :
                                (
                                    <CTableHeaderCell scope="col">{item.label}</CTableHeaderCell>
                                )
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {items.map((data) => (
                        <CTableRow>
                            <CTableHeaderCell scope="row">{data.RX}</CTableHeaderCell>
                            <CTableDataCell>{data.Frequency} <br />{data.food}</CTableDataCell>
                            <CTableDataCell>{data.Duration}</CTableDataCell>
                            <CTableDataCell>{data.Qty}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    )
}

export default Prescription
