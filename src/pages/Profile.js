import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FiX } from 'react-icons/fi'
import pr1 from '../assets/image/pr1.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Modals from '../components/Modal/Modals'
import {  handleOpen, handleView, setOrderItem } from '../control/modalSlice'
import { getOrders } from '../control/fetchSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCount } from '../control/basketSlice'
import { getBasketItems } from '../control/basketSlice';
import { setSelectedNav, setSelectedRoute } from '../control/navSlice'





const Profile = () => {

    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [dataId, setDataId] = useState();
    const [basketClicked, setBasketClicked] = useState(0)
    const [user, setUser] = useState();
    const [wishlistItems, setWishlistItems] = useState();
    const [clicked , setClicked] = useState(0);
    const [toggle,setToggle] = useState(1)
    const [error,setError] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {orders} = useSelector((store)=>store.fetch)


    const initialValues = {
        firstname: user && user.firstName,
        lastname: user && user.lastName,
        email: user && user.email,
        phoneNumber: user && user.phoneNumber,
        username: user && user.userName,
        address: '',
        currentPassword: null,
        newPassword: null,
        confirmPassword: null
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

    const onSubmit = (values) => {
        console.log("values",values);
        const updateUser = async () => {
            await axios.put(`http://rahimcode-001-site1.ftempurl.com/api/Users`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    localStorage.removeItem('authToken');
                    navigate('/login');

                })
                .catch(error =>{
                    if (error.response.status === 400) {
                        {error.response.data.errors.forEach(err => setError(err.errorMessage)); console.log(error.response.data);}
                    } else if (error.response.status === 404) {
                        navigate("*");
                    } else {
                        setError("An unexpected error occurred");
                    }
                })
        }

        updateUser();

    }

    const getUser = async () => {

        if (token) {
            await axios.get('http://rahimcode-001-site1.ftempurl.com/api/Users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUser(response.data)
                })
                .catch(error => {
                    console.error('An error occurred', error);
                });
        }
        else {
            console.log('Token has not found');
        }
    }

    const getWishlistItem = () => {
        let wishlist = localStorage.getItem("wishlist");

        if (wishlist !== undefined) {
            setWishlistItems(JSON.parse(wishlist));
        } else {
            setWishlistItems([]);
        }
    }

    const DeleteHandler = (id) =>{
        setClicked(clicked +1)
        let wishlists = JSON.parse(localStorage.getItem("wishlist"));
        const index = wishlists.indexOf(wishlists.find(c => c.id === id));
        wishlists.splice(index, 1);
        if (JSON.stringify(wishlists) === "[]") {
            localStorage.removeItem("wishlist");
        } else {
            localStorage.setItem("wishlist", JSON.stringify(wishlists));
        }

    }

      const AddBasketHandle = async (id) => {
        
        const values = {id}

        if (token) {
            await axios.post(`http://rahimcode-001-site1.ftempurl.com/api/Shops/`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    toast.success('Product added successfully', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    setDataId(res.data.count);
                    setBasketClicked(basketClicked + 1)
                    dispatch(setCount(res.data.count))
                  

                })
                .catch(err => {
                    err.response && console.log(err.response.data);
                })
        }
        else {
            toast.warning('You must register to add a product', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const toggleHandle = (number) =>{

        setToggle(number)
    }

    const getOrderItems = async (id) =>{
        dispatch(handleView())
        dispatch(handleOpen())
        const token = localStorage.getItem('authToken')
        const response = await axios.get(`http://rahimcode-001-site1.ftempurl.com/api/Orders/orderitems/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(setOrderItem(response.data));

    }



    useEffect(() => {
        getUser()
        dispatch(getOrders());
    }, [])

    useEffect(() =>{
        getWishlistItem();
    },[clicked])

    useEffect(()=>{
        localStorage.getItem('adminToken') !==null && localStorage.removeItem('adminToken')
     },[])
     useEffect(()=>{
        token ===null && navigate('/login')
     },[])

     useEffect(() => {
        dispatch(getBasketItems())
    }, [basketClicked])
    return (
        <>
             <ToastContainer
            position="bottom-right"
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
            <div className="container-own mb-4 ">
               <div className="profile-page">
               <div className="row">
                    <div className="col-lg-4 pb-5">

                        <div className="author-card pb-3">
                            <div className="author-card-cover" ></div>
                            <div className="author-card-profile">
                                <div className="author-card-avatar"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Daniel Adams" />
                                </div>
                                <div className="author-card-details">
                                    <h5 className="author-card-name text-lg">{user && user.lastName} {user && user.firstName}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="wizard">
                            <nav className="profile-nav">

                                <div onClick={()=>toggleHandle(1)} className="nav-box d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className={toggle===1?'active-nav-title' : 'nav-title'}>Orders List</div>
                                    </div>
                                    <span className={toggle===1?'active-nav-title' : 'title-count'}>{orders && orders.length}</span>
                                </div>

                                <div onClick={()=>toggleHandle(2)} className="nav-box">
                                    <div className={toggle===2?'active-nav-title' : 'nav-title'}>
                                        Profile Settings
                                    </div>
                                </div>

                                <div onClick={()=>toggleHandle(3)} className="nav-box d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className={toggle===3?'active-nav-title' : 'nav-title'}>My Wishlist</div>
                                    </div>
                                    <span className={toggle===3?'active-nav-title' : 'title-count'}>{wishlistItems && wishlistItems.length}</span>
                                </div>

                                <div className="nav-box">
                                    <div onClick={()=>{localStorage.removeItem('adminToken') ; navigate('/login') ;   dispatch(setSelectedNav('Login'))
            dispatch(setSelectedRoute('/login'))}}  className='nav-title'>
                                        Log Out
                                    </div>
                                </div>


                            </nav>
                        </div>
                    </div>

                    <div className="col-lg-8 pb-5">

                        <div className={toggle === 1 ? 'table-responsive' : 'd-none'}>
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
                                            <tr key={index}>
                                                <td>{order.totalItem}</td>
                                                <td>{formatDateTime(order.isCreateAt)}</td>
                                                <td><span className={order.status === 1 ? "order-status warning" : order.status === 2 ? "order-status accept" : "order-status danger"}>{order.status === 1 ? "Pending" : order.status === 2 ? "Accepted" : "Rejected"}</span></td>
                                                <td><span>$760.50</span></td>
                                                <td className='view'><button onClick={()=> getOrderItems(order.id)} >View</button></td>

                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>


                        <div className={toggle === 2 ? 'form-side' : 'd-none'}>
                            <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}  >
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
                                            <div className="col-lg-6">
                                                <div className="form-data-profil">
                                                    <Field className="profile-custom-input" type="text" id="username" name="username" placeholder="Username" />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
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
                                    {error && <div className="error-message text-danger ">{error}</div>}


                                    <div className="update-btn mt-2">
                                        <button type='submit' >Update Profile</button>

                                    </div>



                                </Form>

                            </Formik>
                        </div>


                        {
                            wishlistItems && wishlistItems.map((item, index) => (
                                <div  className={toggle ===3 ? 'my-wishlist-side ' : 'd-none' }>

                                    <div className="my-wishlist-box d-flex align-items-center justify-content-between">
                                        <div className="left-side d-flex align-items-center ">
                                            <div className="my-wishlist-img">
                                                {
                                                    item.images.map((img, index) => (
                                                        img.imageStatus && <img src={img.imageName} alt="my img" />
                                                    ))
                                                }
                                            </div>
                                            <div className="my-wishlist-content d-flex flex-column  ">
                                                <h4 className='content-title' >{item.name}</h4>
                                                {
                                                    item.discountedPrice > 0 ?
                                                        <div className="content-price d-flex align-items-center gap-2 ">
                                                            <span className='new-price' >${item.discountedPrice}</span>
                                                            <del className='old-price' >${item.salePrice}</del>
                                                        </div> :
                                                        <div className="content-price">
                                                            <span className='new-price' >${item.salePrice}</span>
                                                        </div>


                                                }
                                                <span className={item.stockStatus ===true? "content-stock inStock"  : "content-stock outStock"} >{item.stockStatus ===true? "In Stock" : "Out Stock"}</span>
                                            </div>
                                        </div>
                                        <div className="add-to-card">
                                            <button onClick={()=>AddBasketHandle(item.id)}>Add to Cart</button>
                                        </div>
                                        <FiX onClick={()=> DeleteHandler(item.id)} className='delete-wish' />
                                    </div>
                                </div>

                            ))
                        }

                    </div>
                </div>
               </div>
            </div>

            <div className="modal">
          <Modals />
        </div>
        </>
    )
}

export default Profile