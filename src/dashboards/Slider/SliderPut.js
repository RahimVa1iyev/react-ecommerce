import React, { useEffect } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import SliderPutForm from '../../components/Forms/SliderPutForm'
import { useNavigate, useParams } from 'react-router-dom'

const SliderPut = () => {
  const {id} = useParams();

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
                           <SliderPutForm id ={id} />
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default SliderPut