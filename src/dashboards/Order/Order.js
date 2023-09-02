import React, { useEffect } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import OrderTable from '../../components/Tables/OrderTable'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../store'
import { getOrders } from '../../control/fetchSlice'

const Order = () => {

  const {orders} = useSelector((store) => store.fetch);
  const dispatch = useDispatch();

  console.log(orders);

  useEffect(()=>{
     dispatch(getOrders())
  },[])

  return (
    <>
         <div className="top-side">
        <div className="container-fluid">
          <div className="row  ">
            <div className="col-lg-2-5">
              <div className="dash-side-bar">
                <SideBar openTab = {true} active = 'order' />
              </div>
            </div>
            <div className="col-lg-9-5">
              <div className="dashboard-index">
                <DashNavbar />
              </div>
              <OrderTable data = {orders}  />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Order