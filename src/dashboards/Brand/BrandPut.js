import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import PutForm from '../../components/Forms/PutForm';
import SideBar from '../../layouts/Dashboard/SideBar';
import DashNavbar from '../../layouts/Dashboard/DashNavbar';

const BrandPut = () => {

  const { id } = useParams();
  console.log(id);

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
              <PutForm tableName = "Brand Edit" label="Brand" route="brands" id={id} controller="Brands" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BrandPut