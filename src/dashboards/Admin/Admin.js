import React, { useEffect, useState } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import AdminTable from '../../components/Tables/AdminTable'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Admin = () => {

    const [admins, setAdmins] = useState();

    const {Id} = useSelector((store) => store.table)
  
    const getAdmins = async () => {
      const response = await axios.get("https://localhost:7039/api/Accounts/all")
      console.log(response.data);
      setAdmins(response.data)
    }
  
  
    useEffect(() => {
      getAdmins()
    }, [Id])
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
              <AdminTable route="/dashboard/Admins/create" link = "admins" tableName="Admin" datas={admins} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin