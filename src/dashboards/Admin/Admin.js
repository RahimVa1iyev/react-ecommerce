import React from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'

const Admin = () => {
  return (
    <>
 <div className="top-side">
        <div className="container-fluid">
          <div className="row  ">
            <div className="col-lg-2-5">
              <div className="dash-side-bar">
                <SideBar openTab = {true} active = 'brand' />
              </div>
            </div>
            <div className="col-lg-9-5">
              <div className="dashboard-index">
                <DashNavbar />
              </div>
              <FrTable route="/dashboard/brands/create" link = "brands" tableName="Brand" datas={brands} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin