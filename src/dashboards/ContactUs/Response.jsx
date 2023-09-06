import React from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import MessageForm from '../../components/Forms/MessageForm'
import { useParams } from 'react-router-dom'

const Response = () => {
    const {id} = useParams();
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
              <MessageForm  id ={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Response