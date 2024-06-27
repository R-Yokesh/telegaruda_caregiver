import React from 'react'
import { CModal, CModalBody, CModalHeader, CModalTitle, CButton, CModalFooter } from '@coreui/react'

function FilterModal() {
    return (
        <CModal
            visible={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="LiveDemoExampleLabel"
        >
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <p>Woohoo, you're reading this text in a modal!</p>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                </CButton>
                <CButton color="primary">Save changes</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default FilterModal
