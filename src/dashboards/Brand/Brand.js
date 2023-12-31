import React, { useState, useEffect } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import FrTable from '../../components/Tables/FrTable'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Brand = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState();

  const {Id} = useSelector((store) => store.table)

  const getBrands = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/Brands/all` )
    setBrands(response.data)
  }


  useEffect(() => {
    getBrands()
  }, [Id])

  useEffect(()=>{
    localStorage.getItem('adminToken') === null && navigate('/dashboard/login')
  },[])

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
            theme="dark"
         />
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

export default Brand