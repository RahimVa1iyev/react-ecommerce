import React from 'react'

import { TbCoins } from 'react-icons/tb';
import SideBar from '../layouts/Dashboard/SideBar';
import DashNavbar from '../layouts/Dashboard/DashNavbar';

const Index = () => {
    return (
        <>
            <div className="top-side">
                <div className="container-fluid">
                    <div className="row  ">
                        <div className="col-lg-2-5">
                            <div className="dash-side-bar">
                                <SideBar openTab ={false} />
                            </div>
                        </div>
                        <div className="col-lg-9-5">
                            <div className="dashboard-index">

                                <DashNavbar />

                                <div className="stat">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="stat-box d-flex align-items-baseline">
                                                <div className="stat-box-left">
                                                    <h6>TODAY'S MONEY</h6>
                                                    <p className='money'>$53,000</p>
                                                    <p ><span className='percent'>+55%</span> <span className='text'>since yesterday</span>  </p>
                                                </div>

                                                <div className="stat-box-right ">
                                                    <TbCoins className='coin' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="stat-box d-flex align-items-baseline">
                                                <div className="stat-box-left">
                                                    <h6>TODAY'S MONEY</h6>
                                                    <p className='money'>$53,000</p>
                                                    <p ><span className='percent'>+55%</span> <span className='text'>since yesterday</span>  </p>
                                                </div>

                                                <div className="stat-box-right ">
                                                    <TbCoins className='coin' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="stat-box d-flex align-items-baseline">
                                                <div className="stat-box-left">
                                                    <h6>TODAY'S MONEY</h6>
                                                    <p className='money'>$53,000</p>
                                                    <p ><span className='percent'>+55%</span> <span className='text'>since yesterday</span>  </p>
                                                </div>

                                                <div className="stat-box-right ">
                                                    <TbCoins className='coin' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="stat-box d-flex align-items-baseline">
                                                <div className="stat-box-left">
                                                    <h6>TODAY'S MONEY</h6>
                                                    <p className='money'>$53,000</p>
                                                    <p ><span className='percent'>+55%</span> <span className='text'>since yesterday</span>  </p>
                                                </div>

                                                <div className="stat-box-right ">
                                                    <TbCoins className='coin' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index