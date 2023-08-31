import React, { useEffect, useState } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import FrTable from '../../components/Tables/FrTable'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Colour = () => {

    const [colours, setColours] = useState();
  
    const {Id} = useSelector((store) => store.table)
  
    const getColours = async () => {
      const response = await axios.get("https://localhost:7039/api/Colors/all")
      setColours(response.data)
    }
  
  
    useEffect(() => {
      getColours()
    }, [Id])
  return (
    <>
      <div className="top-side">
        <div className="container-fluid">
          <div className="row  ">
            <div className="col-lg-2-5">
              <div className="dash-side-bar">
                <SideBar openTab = {true} active = 'color' />
              </div>
            </div>
            <div className="col-lg-9-5">
              <div className="dashboard-index">
                <DashNavbar />
              </div>
              <FrTable route="/dashboard/colors/create"  link = "colors" tableName="Color" datas={colours} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Colour