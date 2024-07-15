import React from 'react'
import { CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell } from '@coreui/react'

function SummaryTable({ columns, items, green, head }) {

    return (
        <div className={`table-sec ${green}`} >
            <h4>{head}</h4>
            <CTable columns={columns} items={items} tableHeadProps={{ color: 'dark' }} />
        </div >
    )
}

export default SummaryTable
