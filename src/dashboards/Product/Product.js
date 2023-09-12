// import React, { useState, useEffect, CSSProperties } from 'react'
// import SideBar from '../../layouts/Dashboard/SideBar'
// import DashNavbar from '../../layouts/Dashboard/DashNavbar'
// import PrTable from '../../components/Tables/PrTable'
// import ClockLoader from "react-spinners/ClockLoader";
// import axios from 'axios';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import SliderLoader from '../../components/Loader/SliderLoader';
// import TableLoader from '../../components/Loader/TableLoader';
// import InfiniteScroll from 'react-infinite-scroll-component';



// const Product = () => {


//     var [products, setProducts] = useState();
//     let [loading, setLoading] = useState(true);

//     const getProducts = async () => {

//         const values = { pageScroll: 1, perPage: 5 }
//         const response = await axios.post("https://localhost:7039/api/Products/all", values)
//         console.log(response.data);
//         setProducts(response.data)
//         setLoading(false)
//     }

//     window.onscroll = function () {
//         if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 200) {

//             const getProducts = async () => {

//                 const values = { pageScroll: 1, perPage: 10 }
//                 const response = await axios.post("https://localhost:7039/api/Products/all", values)
//                 console.log(response.data);
//                 setProducts(products.addRange(response.data))
//                 setLoading(false)
//             }
//             getProducts();
//         }
//         else {
//             console.log(document.body.scrollTop);
//         }
//     }

//     useEffect(() => {

//         getProducts();

//     }, [])


//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />
//             <div className="top-side">
//                 <div className="container-fluid">
//                     <div className="row  ">
//                         <div className="col-lg-2-5">
//                             <div className="dash-side-bar">
//                                 <SideBar openTab={true} active='product' />
//                             </div>
//                         </div>
//                         <div className="col-lg-9-5">
//                             <div className="dashboard-index">

//                                 <DashNavbar />
//                             </div>

//                             {
//                                 loading === true ? < TableLoader className='mt-5' /> : <PrTable products={products} />
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Product


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

const Product = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    const fetchMoreData = async () => {
        const values = { pageScroll: page, perPage: 5 };
        const response = await axios.post("https://localhost:7039/api/Products/all", values);

        if (response.data.length === 0) {
            setHasMore(false);
        } else {
            setProducts([...products, ...response.data]);
            setPage(page + 1);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchMoreData();
    }, []);

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
                        <div className="col-lg-2-5">
                            <div className="dash-side-bar">
                                <SideBar openTab={true} active='product' />
                            </div>
                        </div>
                        <div className="col-lg-9-5">
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
