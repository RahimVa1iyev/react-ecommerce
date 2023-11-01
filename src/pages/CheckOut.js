import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getBasketItems } from '../control/basketSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setSelectedNav, setSelectedRoute } from '../control/navSlice';


const CheckOut = () => {
    const [items, setItems] = useState();
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [order, setOrder] = useState()
    const [totalAmount, setTotalAmount] = useState(0);
    const [clicked, setClicked] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        firstname: order && order.firstName,
        lastname: order && order.lastName,
        email: order && order.email,
        phoneNumber: order && order.phoneNumber,
        address: null,
        subject: null,
        text: null
    }

    const getCheckout = async () => {
        await axios.get(`http://rahimcode-001-site1.ftempurl.com/api/Orders/checkout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setTotalAmount(res.data.totalAmount)
                setItems(res.data.items);
                setOrder(res.data.order)

            });

    }

    const onSubmit = (values) => {
        const createOrder = async () => {
            await axios.post(`http://rahimcode-001-site1.ftempurl.com/api/Orders`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

                .then(res => {
                    toast.success('Order created successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setClicked(clicked + 1)
                    dispatch(setSelectedNav('Profile'))
                    dispatch(setSelectedRoute(`/profile`))
                    navigate('/profile')
                })
                .catch(err => console.log(err.response.data))

        }
        createOrder();
    }

    useEffect(()=>{
        localStorage.getItem('adminToken') !==null && localStorage.removeItem('adminToken')
     },[])
    useEffect(() => {
        getCheckout();
    }, [clicked])

    useEffect(() => {
        dispatch(getBasketItems())
    }, [clicked])
    return (
        <>
            <div className="container-own">
                <div className="check-page">
                    <div className="row align-items-start justify-content-between ">
                        <div className="col-lg-7">
                            <div className="check-page-left">
                                <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} >
                                    <Form className='form-content'>
                                        <div className="row align-items-center ">
                                            <div className="form-data half-div">
                                                <Field disabled={!!token} className="customInput half " type="text" id="firstname" name="firstname" placeholder="First Name" />
                                            </div>
                                            <div className="form-data half-div">
                                                <Field disabled={!!token} className="customInput half " type="text" id="lastname" name="lastname" placeholder="Last Name" />
                                            </div>
                                            <div className="form-data half-div">
                                                <Field disabled={!!token} className="customInput half " type="email" id="email" name="email" placeholder="Email" />
                                            </div>
                                            <div className="form-data half-div">
                                                <Field disabled={!!token} className="customInput half " type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone" />
                                            </div>


                                            <div className="form-data full">
                                                <Field className="customInput full " type="text" id="address" name="address" placeholder="Address" />
                                            </div>
                                            <div className="form-data full">
                                                <Field className="customInput full" type="text" id="subject" name="subject" placeholder="Subject" />

                                            </div>
                                            <div className="form-data full">
                                                <Field className="customInput full " as="textarea" id="text" name="text" placeholder="Message" />

                                            </div>
                                        </div>

                                        <div className="btn-side">
                                            <button type='submit' >Continue to shipping</button>

                                        </div>


                                    </Form>

                                </Formik>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="check-page-right">
                                {
                                    items && items.map((item, index) => (
                                        <div key={index} className="checkout-item-box d-flex align-items-center justify-content-between ">
                                            <div className="check-product-desc d-flex align-items-center gap-2">
                                                <div className="pr-img">
                                                    <img src={item.image} alt="my clock" />
                                                    <div className="pr-count">{item.count}</div>
                                                </div>
                                                <div className="title">
                                                    <p>{item.productName}</p>

                                                </div>
                                            </div>
                                            <div className="check-product-price">
                                                <span className="pr-price">
                                                    ${item.price}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }

                                <div className="item-totalamount">
                                    <span>Total</span>
                                    <span>USD ${totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut