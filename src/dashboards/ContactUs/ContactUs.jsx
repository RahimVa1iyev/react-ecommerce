import React, { useEffect, useState } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import MessageTable from '../../components/Tables/MessageTable'
import axios from 'axios'

const ContactUs = () => {
    const [messages , setMessages] = useState();

    const getMessages = async () =>{
        await axios.get(`https://localhost:7039/api/Contacts/all`)
                   .then(res=> setMessages(res.data))
                   .catch(err=>console.log(err.response.data))
    }

    useEffect(()=>{
       getMessages();
    },[])
  return (
    <>
            <div className="top-side">
        <div className="container-fluid">
          <div className="row  ">
            <div className="col-lg-2-5">
              <div className="dash-side-bar">
                <SideBar openTab = {true} active = 'admin' />
              </div>
            </div>
            <div className="col-lg-9-5">
              <div className="dashboard-index">
                <DashNavbar />
              </div>
              <MessageTable route="/dashboard/Admins/create" link = "admins" tableName="Admin" datas={messages} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs