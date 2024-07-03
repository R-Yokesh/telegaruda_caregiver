import React, { useState } from 'react'
import { CModal, CModalBody, CModalHeader, CModalTitle, CButton, CModalFooter, CFormSelect, CRow, CCol } from '@coreui/react'
// import { useState } from 'react'
import DatePicker from "react-datepicker";

function FilterModal({ visible, setVisible }) {

    const today = new Date();

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    function ClearFunction() {
        setStartDate();
        setEndDate();
    }
    return (
        <CModal
            visible={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="LiveDemoExampleLabel"
            className='modal-cutomize'
            backdrop="static"
        >
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">FILTER</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormSelect
                    aria-label="Default select example"
                    options={[
                        'Filter with Doctor',
                        { label: 'Doctor One', value: '1' },
                        { label: 'Doctor Two', value: '2' },
                        { label: 'Dcotor Three', value: '3' }
                    ]}
                />
                <CRow>
                    <CCol lg={6} sm={12}>
                        <p className='date-sec'>From Date</p>
                        <DatePicker
                            showIcon
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            isClearable
                            className="date-range-picker picker-sec"
                            dateFormat="MM/dd/yyyy"
                        />
                    </CCol>
                    <CCol lg={6} sm={12}>
                        <p className='date-sec'>End Date</p>
                        <DatePicker
                            showIcon
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            isClearable
                            className="date-range-picker picker-sec"
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => ClearFunction()} className='clear-filter-btn'>
                    Clear Filter
                </CButton>
                <CButton color="primary" className='apply-filter-sec' onClick={() => setVisible(false)}>Apply Filter</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default FilterModal
