import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {FiX} from 'react-icons/fi'
import pr1 from '../assets/image/pr1.png'


const Profile = () => {

    const [orders, setOrders] = useState();
    const [token, setToken] = useState(localStorage.getItem('authToken'));


    const getOrders = async () => {
        await axios.get(`https://localhost:7039/api/Orders/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setOrders(res.data))

    }

    function formatDateTime(dateTimeString) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = months[dateTime.getMonth()];
        const day = dateTime.getDate().toString().padStart(2, '0');


        return `${day}-${month}-${year}`;
    }
    console.log(orders);
    useEffect(() => {
        getOrders();
    }, [])

    return (
        <>
            <div className="container-own mb-4 ">
                <div className="row">
                    <div className="col-lg-4 pb-5">

                        <div className="author-card pb-3">
                            <div className="author-card-cover" ></div>
                            <div className="author-card-profile">
                                <div className="author-card-avatar"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Daniel Adams" />
                                </div>
                                <div className="author-card-details">
                                    <h5 className="author-card-name text-lg">Daniel Adams</h5><span className="author-card-position">Joined February 06, 2017</span>
                                </div>
                            </div>
                        </div>
                        <div className="wizard">
                            <nav className="profile-nav">

                                <div className="nav-box d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="nav-title">Orders List</div>
                                    </div>
                                    <span className="">6</span>
                                </div>

                                <div className="nav-box">
                                    <div className='nav-title'>
                                        Profile Settings
                                    </div>
                                </div>

                                <div className="nav-box d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="nav-title">My Wishlist</div>
                                    </div>
                                    <span className="">3</span>
                                </div>

                                <div className="nav-box">
                                    <div className='nav-title'>
                                        Log Out
                                    </div>
                                </div>


                            </nav>
                        </div>
                    </div>

                    <div className="col-lg-8 pb-5">

                        <div className="table-responsive d-none">
                            <table className="table table-hover mb-0">
                                <thead className='table-header'>
                                    <tr>
                                        <th>Order Item</th>
                                        <th>Date Purchased</th>
                                        <th>Status</th>
                                        <th>Total</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody className='table-body'>

                                    {
                                        orders && orders.map((order, index) => (
                                            <tr>
                                                <td>{order.totalItem}</td>
                                                <td>{formatDateTime(order.isCreateAt)}</td>
                                                <td><span className={order.status === 1 ? "order-status warning" : order.status === 2 ? "order-status accept" : "order-status danger"}>{order.status === 1 ? "Pending" : order.status === 2 ? "Accepted" : "Rejected"}</span></td>
                                                <td><span>$760.50</span></td>
                                                <td><span>$760.50</span></td>

                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>


                       <div className="form-side d-none">
                       <Formik  >
                            <Form className='form-content-profile'>
                                <div className="row align-items-center ">

                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-lg-6">
                                            <div className="form-data-profil">
                                                <Field className="profile-custom-input " type="text" id="firstname" name="firstname" placeholder="First Name" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-data-profil ">
                                                <Field className="profile-custom-input " type="text" id="lastname" name="lastname" placeholder="Last Name" />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6"><div className="form-data-profil ">
                                            <Field className="profile-custom-input " type="email" id="email" name="email" placeholder="Email" />
                                        </div></div>
                                        <div className="col-lg-6">
                                            <div className="form-data-profil">
                                                <Field className="profile-custom-input" type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ">

                                        <div className="col-lg-12">
                                            <div className="form-data-profil">
                                                <Field className="profile-custom-input" type="text" id="address" name="address" placeholder="Address" />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="form-data-profil ">
                                                <Field className="profile-custom-input" type="password" id="currentPassword" name="currentPassword" placeholder="Current Password" />

                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-data-profil ">
                                                <Field className="profile-custom-input " type="password" id="newPassword" name="newPassword" placeholder="New Password" />

                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-data-profil">
                                                <Field className="profile-custom-input " type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="update-btn">
                                    <button type='submit' >Update Profile</button>

                                </div>


                           
                            </Form>

                        </Formik>
                       </div>


                        <div className="my-wishlist-side">
                             <div className="my-wishlist-box d-flex align-items-center justify-content-between">
                                <div className="left-side d-flex align-items-center ">
                                <div className="my-wishlist-img">
                                    <img src={pr1} alt="" />
                                </div>
                                <div className="my-wishlist-content d-flex flex-column ">
                                    <h4 className='content-title' >Product dummy title</h4>
                                    <span className='content-price' >$4569.99</span>
                                    <span className='content-stock' >In Stock</span>
                                </div>
                                </div>
                                <div className="add-to-card">
                                    <button>Add to Cart</button>
                                </div>
                                <FiX className='delete-wish' />
                             </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile