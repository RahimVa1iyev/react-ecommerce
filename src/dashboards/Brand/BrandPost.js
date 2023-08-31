import React from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import PostForm from '../../components/Forms/PostForm'

const BrandPost = () => {
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
                           <PostForm tableName = "Brand Create" label ="Brand" route = "brands" controller ="Brands"  />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrandPost