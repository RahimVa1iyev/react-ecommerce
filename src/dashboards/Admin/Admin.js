import React, { useEffect, useState } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import AdminTable from '../../components/Tables/AdminTable'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {

    const [admins, setAdmins] = useState();

    const {Id} = useSelector((store) => store.table)
    const navigate = useNavigate();
  
    const getAdmins = async () => {
      const response = await axios.get("https://localhost:7039/api/Accounts/all")
      console.log(response.data);
      setAdmins(response.data)
    }
  
  
    useEffect(() => {
      getAdmins()
    }, [Id])

    useEffect(()=>{
      localStorage.getItem('adminToken') === null && navigate('/dashboard/login')
    })
    
  return (
    <>
     <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
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
              <AdminTable route="/dashboard/Admins/create" link = "admins" tableName="Admin" datas={admins} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin