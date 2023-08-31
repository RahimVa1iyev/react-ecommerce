import React from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import PutForm from '../../components/Forms/PutForm'
import { useParams } from 'react-router-dom'

const SizePut = () => {
const {id} = useParams();

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
              <PutForm tableName = "Size Edit" label ="Size" route="sizes" id={id} controller="Sizes" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SizePut