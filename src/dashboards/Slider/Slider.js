import React, { useEffect, useState } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import FrTable from '../../components/Tables/FrTable'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PrTable from '../../components/Tables/PrTable'
import SliderTable from '../../components/Tables/SliderTable'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slider = () => {
   const [datas , setDatas] = useState();
   var navigate = useNavigate();

  const {Id} = useSelector((store) => store.table)


   useEffect(()=>{
     const getSliders = async () => {
         var response = await axios.get("https://localhost:7039/api/Sliders/all")
         setDatas(response.data)
     }   
     getSliders();
   },[Id])

console.log(datas);
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
                <SideBar  openTab = {true} active = 'slider' />
              </div>
            </div>
            <div className="col-lg-9-5">
              <div className="dashboard-index">
                <DashNavbar />
              </div>
               <SliderTable sliders = {datas}  />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Slider