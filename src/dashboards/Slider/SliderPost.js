import React, { useEffect } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import SliderPostForm from '../../components/Forms/SliderPostForm'
import { useNavigate } from 'react-router-dom'

const SliderPost = () => {
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
                                <SideBar />
                            </div>
                        </div>
                        <div className="col-lg-9-5">
                            <div className="dashboard-index">
                               <DashNavbar />
                            </div>
                           <SliderPostForm  />
                        </div>
                    </div>
                </div>
            </div>

    </>
  )
}

export default SliderPost