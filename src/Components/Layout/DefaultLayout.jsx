import React from 'react'
import Header from '../Header/Header'
import SideBar from '../Sidebar/SideBar'

const DefaultLayout = () => {
    return (
        <div>
            <div className='d-flex'>
                <SideBar/>
                <div className='flex-grow-1 d-flex flex-column'>
                   <Header/>
                    <div className='flex-grow-1 bg-light px-3'>
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout