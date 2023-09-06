import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto';
import { TbCoins } from 'react-icons/tb';
import SideBar from '../layouts/Dashboard/SideBar';
import DashNavbar from '../layouts/Dashboard/DashNavbar';
import axios from 'axios';

const Index = () => {


  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  const [months , setMonths] = useState();
  const [price ,setPrice] = useState();

const getMonthlySale = async () =>{
    await axios.get(`https://localhost:7039/api/Charts/montlysales`)
                                .then(res=> {
                                    setMonths(res.data.months.reverse());
                                    setPrice(res.data.prices.reverse())
                                })
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

  const labels2 = ['Red', 'Blue', 'Yellow'];
  const data2 = {
    labels: labels2,
    datasets: [
      {
        label: 'My Second Dataset',
        data: [300, 50, 100],
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
              max : 2000
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

  },[])

    return (
        <>
            <div className="top-side">
                <div className="container-fluid">
                    <div className="row  ">
                        <div className="col-lg-2-5">
                            <div className="dash-side-bar">
                                <SideBar openTab={false} />
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


                                <div className="charts row align-items-center  ">

                                    <div className="col-lg-8">
                                       <div className="column-chart">
                                       <canvas ref={chartRef1} ></canvas>
                                       </div>

                                    </div>
                                    <div className="col-lg-4">

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