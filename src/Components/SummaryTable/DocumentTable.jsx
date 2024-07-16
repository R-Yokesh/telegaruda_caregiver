import React from 'react'
import { CTable, CTableRow, CTableHeaderCell, CTableDataCell, CTableHead, CTableBody } from '@coreui/react'

function DocumentTable({ columns, items, head }) {
    return (
        <div className='table-sec'>
            <h4>{head}</h4>
            <CTable>
                <CTableHead>
                    <CTableRow color="dark">
                        {columns.map((item) => (
                            <CTableHeaderCell scope="col">{item.label}</CTableHeaderCell>
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {items.map((data) => (
                        <CTableRow>
                            <CTableHeaderCell scope="row">{data.No}</CTableHeaderCell>
                            <CTableDataCell>{data.Date}</CTableDataCell>
                            <CTableDataCell>{data.LabTest}</CTableDataCell>
                            <CTableDataCell>{data.Notes}</CTableDataCell>
                            <CTableDataCell><a href={data.Link} className='table-link' target="_blank" rel="noopener noreferrer">{data.Link}</a></CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    )
}

export default DocumentTable
