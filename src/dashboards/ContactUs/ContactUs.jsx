import React, { useEffect, useState } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import MessageTable from '../../components/Tables/MessageTable'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../../control/fetchSlice'
import { useNavigate } from 'react-router-dom'

const ContactUs = () => {
    const {messages} = useSelector(store => store.fetch);
    const dispatch = useDispatch();
 

    useEffect(()=>{
       dispatch(getMessages())
    },[])

    const navigate = useNavigate()
    useEffect(()=>{
        localStorage.getItem('adminToken') === null && navigate('/dashboard/login')
      },[])
  return (
    <>
            <div className="top-side">
        <div className="container-fluid">
          <div className="row  ">
            <div className="col-lg-2-5">
              <div className="dash-side-bar">
                <SideBar openTab = {true} active = 'contact' />
              </div>
            </div>
            <div className="col-lg-9-5">
              <div className="dashboard-index">
                <DashNavbar />
              </div>
              <MessageTable  datas={messages && messages} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs