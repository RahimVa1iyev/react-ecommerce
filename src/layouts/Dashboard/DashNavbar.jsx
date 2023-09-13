import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
const DashNavbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="d-flex align-items-center justify-content-between ">
                <div className="route-page">
                    <span className='f-span'>Pages</span> <span className='s-span'>/</span> <span className='s-span'> Dashboard</span>
                    <h6>Dashboard</h6>
                </div>

                <div className="top-side-right d-flex align-items-center gap-4">
                   
                    <div  className="sign-side d-flex align-items-center gap-2 ">
                        <BiLogOut className='person-icon' />
                        <span onClick={()=>{localStorage.removeItem('adminToken');navigate('/dashboard/login')}} >Log Out</span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DashNavbar