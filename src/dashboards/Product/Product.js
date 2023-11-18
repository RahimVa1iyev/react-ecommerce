

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SideBar from '../../layouts/Dashboard/SideBar';
import DashNavbar from '../../layouts/Dashboard/DashNavbar';
import PrTable from '../../components/Tables/PrTable';
import ClockLoader from "react-spinners/ClockLoader";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SliderLoader from '../../components/Loader/SliderLoader';
import TableLoader from '../../components/Loader/TableLoader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

  const {Id} = useSelector((store) => store.table)


    const fetchMoreData = async () => {
        const values = { pageScroll: page, perPage: 5 };
        const response = await axios.post("https://api-project-ecommerce.azurewebsites.net/api/Products/all", values);

        if (response.data.length === 0) {
            setHasMore(false);
        } else {
            setProducts([...products, ...response.data]);
            setPage(page + 1);
        }

        setLoading(false);
    };

    const resetData = async () => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
        setLoading(true);

        const values = { pageScroll: 1, perPage: 5 }; // Fetch initial data
        const response = await axios.post("https://api-project-ecommerce.azurewebsites.net/api/Products/all", values);
        console.log(response.data)

        if (response.data.length === 0) {
            setHasMore(false);
        } else {
            setProducts(response.data);
            setPage(2); // Set page to the next page number for infinite scrolling
        }

        setLoading(false);
    };

    useEffect(() => {
        resetData(); // Fetch initial data when Id changes
    }, [Id]);

    // useEffect(() => {
    //     fetchMoreData();
    // }, [Id]);

    // useEffect(() => {
    //     // Whenever Id changes, you can reset the products and trigger fetchMoreData again
    //     setProducts([]);
    //     setPage(1);
    //     setHasMore(true);
    //     setLoading(true);
    //     fetchMoreData();
    // }, [Id]);

    const navigate = useNavigate()
    useEffect(()=>{
        localStorage.getItem('adminToken') === null && navigate('/dashboard/login')
      },[])

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="top-side">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2-5 col-12">
                            <div className="dash-side-bar">
                                <SideBar openTab={true} active='product' />
                            </div>
                        </div>
                        <div className="col-lg-9-5 col-12">
                            <div className="dashboard-index">
                                <DashNavbar />
                            </div>

                            <InfiniteScroll
                                dataLength={products.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<TableLoader className='mt-5' />}
                                endMessage={<p>No more data to load</p>}
                            >
                                <PrTable products={products} />
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
