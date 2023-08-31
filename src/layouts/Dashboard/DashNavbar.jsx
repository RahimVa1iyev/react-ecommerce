import React from 'react'
import { FiSearch } from 'react-icons/fi';
import { BsFillPersonFill } from 'react-icons/bs';
const DashNavbar = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-between ">
                <div className="route-page">
                    <span className='f-span'>Pages</span> <span className='s-span'>/</span> <span className='s-span'> Dashboard</span>
                    <h6>Dashboard</h6>
                </div>

                <div className="top-side-right d-flex align-items-center gap-4">
                    <div className="search-side d-flex align-items-center">
                        <FiSearch className='search-icon' />
                        <input type="text" placeholder='Type here..' />
                    </div>
                    <div className="sign-side d-flex align-items-center gap-2 ">
                        <BsFillPersonFill className='person-icon' />
                        <span>Sign In</span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DashNavbar