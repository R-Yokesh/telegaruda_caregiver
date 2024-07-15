import React from 'react'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'

function TableColor({ columns, items, head, green }) {
    return (
        <div className='table-sec'>
            <h4>{head}</h4>
            <CTable>
                <CTableHead>

                    <CTableRow color="dark">
                        {columns.map((items) => (
                            <CTableHeaderCell scope="col">{items.key}</CTableHeaderCell>
                        ))}
                    </CTableRow>

                </CTableHead>
                <CTableBody>
                    {/* {items.map((data) => (
                        <CTableRow>
                            <CTableHeaderCell scope="row">{data.No}</CTableHeaderCell>
                            <CTableDataCell> <span className='green'>{data.Result}</span></CTableDataCell>
                            <CTableDataCell>{data.BMI}</CTableDataCell>
                            <CTableDataCell>{data.Height}</CTableDataCell>
                            <CTableDataCell>{data.Weight}</CTableDataCell>
                            <CTableDataCell>{data.Date}</CTableDataCell>
                        </CTableRow>
                    ))} */}
                    {items.map((item, index) => (
                        <CTableRow key={index}>
                            {columns.map((col, colIndex) => (
                                colIndex === 1 && green ? (
                                    <CTableDataCell key={col.key}>
                                        <span className='green'>{item[col.key]}</span>
                                    </CTableDataCell>
                                ) : (
                                    <CTableDataCell key={col.key}>{item[col.key]}</CTableDataCell>
                                )
                            ))}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    )
}

export default TableColor
