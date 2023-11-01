import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto';
import { TbCoins } from 'react-icons/tb';
import SideBar from '../layouts/Dashboard/SideBar';
import DashNavbar from '../layouts/Dashboard/DashNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Index = () => {


  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const navigate = useNavigate();

  const [months , setMonths] = useState();
  const [price ,setPrice] = useState();
  const [userCount,setUserCount] = useState(0);
  const [orderCount,setOrderCount] =useState()
  const [income,setIncome] =useState({
    daily : {},
    monthly : {},
    yearly : {}
  })

const getMonthlySale = async () =>{
    await axios.get(`http://rahimcode-001-site1.ftempurl.com/api/Charts/montlysales`)
                                .then(res=> {
                                    setMonths(res.data.months.reverse());
                                    setPrice(res.data.prices.reverse())
                                })
}

const getOrderStatusCount = async () =>{
    await axios.get(`http://rahimcode-001-site1.ftempurl.com/api/Charts/count`)
                .then(res=>setOrderCount(res.data))
}

const getUserCount = async () =>{
 var response = await axios.get(`http://rahimcode-001-site1.ftempurl.com/api/Accounts/count`)
   setUserCount(response.data.count);
}

const getIncome = async () => {
  var response = await axios.get(`http://rahimcode-001-site1.ftempurl.com/api/Charts/income`)
  console.log(response.data);
  setIncome(previousState => {return {...previousState,daily : response.data.daily}})
  setIncome(previousState => {return {...previousState,monthly : response.data.monthly}})
  setIncome(previousState => {return {...previousState,yearly : response.data.yearly}})
}


  const labels1 = months;
  const data1 = {
    labels: labels1,
    datasets: [
      {
        label: 'Montly Sale',
        data: price,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const labels2 = ['Accepted', 'Rejected', 'Pending'];
  const data2 = {
    labels: labels2,
    datasets: [
      {
        label: 'Count',
        data: [orderCount && orderCount.acceptedCount,orderCount && orderCount.rejectedCount, orderCount && orderCount.pendingCount ],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    if (chartRef1 && chartRef1.current) {
      const ctx1 = chartRef1.current.getContext('2d');
      if (chartRef1.current.chart) {
        chartRef1.current.chart.destroy();
      }
      chartRef1.current.chart = new Chart(ctx1, {
        type: 'bar',
        data: data1,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max : 3000
            },
          },
        },
      });
    }

    if (chartRef2 && chartRef2.current) {
      const ctx2 = chartRef2.current.getContext('2d');
      if (chartRef2.current.chart) {
        chartRef2.current.chart.destroy();
      }
      chartRef2.current.chart = new Chart(ctx2, {
        type: 'doughnut',
        data: data2,
      });
    }


  }, [data1, data2]);


  useEffect(()=>{
     getMonthlySale();
     getOrderStatusCount();
     getIncome();
     getUserCount();
  },[])

  useEffect(()=>{
    localStorage.getItem('adminToken') === null && navigate('/dashboard/login')
  },[])

    return (
        <>
            <div className="top-side">
                <div className="container-fluid">
                    <div id='admin-media' className=" row  ">
                        <div className="col-lg-2-5 col-12">
                            <div className="dash-side-bar">
                                <SideBar openTab={false} />
                            </div>
                        </div>
                        <div className="col-lg-9-5 col-12">
                            <div className="dashboard-index">

                              <div className="dash-nav">
                              <DashNavbar />
                              </div>

                                <div className="stat">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-lg-3 col-12">
                                            <div className="stat-box d-flex align-items-baseline">
                                                <div className="stat-box-left ">
                                                    <h6>Daily Revenue</h6>
                                                    <p className='money'>${income.daily && income.daily.income}</p>
                                                    <p className='d-flex align-items-baseline gap-2' >{income.daily && income.daily.interestRate > 0 ? <span className='percent'>+{ income.daily.interestRate}%</span> : <span className='percent text-danger'>{ income && income.daily.interestRate}%</span>}
                                                     <span className='text'>since yesterday</span>  </p>
                                                </div>

                                                <div className="stat-box-right ">
                                                    <TbCoins className='coin' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-12">
                                            <div className="stat-box d-flex align-items-baseline">
                                                <div className="stat-box-left">
                                                    <h6>Monthly Revenue</h6>
                                                    <p className='money'>${income && income.monthly.income}</p>
                                                    <p className='d-flex align-items-baseline gap-2' >{income && income.monthly.interestRate >= 0 ? <span className='percent'>+{income.monthly.interestRate}%</span> : <span className='percent text-danger'>{income.monthly.interestRate}%</span>}
                                                     <span className='text'>since month</span>  </p>
                                                </div>

                                                <div className="stat-box-right ">
                                                    <TbCoins className='coin' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-12">
                                            <div className="stat-box d-flex align-items-baseline">
                                                <div className="stat-box-left">
                                                    <h6>Yearly Revenue</h6>
                                                    <p className='money'>${income && income.yearly.income}</p>
                                                    <p className='d-flex align-items-baseline gap-2' >{income && income.yearly.interestRate >= 0 ? <span className='percent'>+{income.yearly.interestRate}%</span> : <span className='percent text-danger'>{income.yearly.interestRate}%</span>}
                                                     <span className='text'>since year</span>  </p>
                                                </div>

                                                <div className="stat-box-right ">
                                                    <TbCoins className='coin' />
                                                </div>
                                            </div>
                                        </div>
                                     
                                    </div>
                                </div>


                                <div className="charts row align-items-center  ">

                                    <div className="col-lg-8 col-12">
                                       <div className="column-chart">
                                       <canvas ref={chartRef1} ></canvas>
                                       </div>

                                    </div>
                                    <div className="col-lg-4 col-12">

                                    <div className="bar-chart">
                                    <canvas ref={chartRef2} ></canvas>
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