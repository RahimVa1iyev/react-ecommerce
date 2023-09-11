import React, { useEffect, useState } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar';
import DashNavbar from '../../layouts/Dashboard/DashNavbar';
import FrTable from '../../components/Tables/FrTable';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Size = () => {

    const [sizes, setSizes] = useState();
  
    const {Id} = useSelector((store) => store.table)
  
    const getSizes = async () => {
      const response = await axios.get("https://localhost:7039/api/Sizes/all")
      setSizes(response.data)
    }
  
  
    useEffect(() => {
      getSizes()
    }, [Id])
  
  
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
                  <SideBar openTab = {true} active = 'size' />
                </div>
              </div>
              <div className="col-lg-9-5">
                <div className="dashboard-index">
                  <DashNavbar />
                </div>
                <FrTable route="/dashboard/sizes/create"  link = "sizes" tableName="Size" datas={sizes} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Size