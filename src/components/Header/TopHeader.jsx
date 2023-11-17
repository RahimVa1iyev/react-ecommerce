import React, { useEffect, useState } from 'react'
import { TiSocialFacebook } from "react-icons/ti"
import { TiSocialTwitter } from 'react-icons/ti'
import { TfiGoogle } from 'react-icons/tfi'
import { TfiInstagram } from 'react-icons/tfi';
import { TiSocialYoutube } from 'react-icons/ti';
import { MdKeyboardArrowDown } from 'react-icons/md';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedNav, setSelectedRoute } from '../../control/navSlice';

const TopHeader = () => {

    const [show, setShow] = useState("visible")
    const [user, setUser] = useState();
    const [log, setLog] = useState(0)
    const dispatch = useDispatch()

    const DropdownHandler = () => {
        setShow(show === "visible" ? "" : "visible")
    }
    const { token } = useSelector(store => store.fetch);

    let count = 0

    const logOutHandle = (e) => {

        e.preventDefault();

        localStorage.removeItem('authToken')
        setUser(undefined)
    }

    const getData = async () => {
        count++
        console.log("Count", count);
        if (token) {
            await axios.get('https://watch-ecommerce-app.azurewebsites.net/api/Users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUser(response.data)
                })
                .catch(error => {
                    console.log(error.response.data);
                    console.error('An error occurred', error);
                });
        } else {
            console.log('Token has not found');
        }
    }

    useEffect(() => {

        getData();
    }, [show, log]);
    // useEffect(() => {
    //     var ddd = localStorage.getItem('authToken');
    //     if (token && token.length > 0) {
    //         console.log("jwt", jwtDecode(ddd));
    //     }

    // }, [token])

    return (
        <>
            <div id="top-header">
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-4 col-12">
                        <div className="social-side">
                            <div id='social-side-media' className="d-flex align-items-center">
                                <span>Follow Us:</span>


                                <div className="social-icons">
                                    <div className="d-flex align-items-center gap-3 ">
                                        <a target='blank' href='facebook.com' >
                                            <TiSocialFacebook className='iconStyle' />
                                        </a>
                                        <a target='blank' href='twitter.com' >
                                            <TiSocialTwitter className='iconStyle' />
                                        </a>
                                        <a target='blank' href='google.com' >
                                            <TfiGoogle className='iconStyle-2' />
                                        </a>
                                        <a target='blank' href='instagram.com' >
                                            <TfiInstagram className='iconStyle-2' />
                                        </a>
                                        <a target='blank' href='youtube.com' >
                                            <TiSocialYoutube className='iconStyle' />
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="account-side ">
                            <div id='account-side-media' className="d-flex align-items-center  justify-content-end gap-3">
                                <span className='account' onClick={DropdownHandler} >My Account <MdKeyboardArrowDown /></span>

                            </div>


                            <div className={show === "visible" ? "dropdown-account visible" : "dropdown-account"}>
                                {
                                    user === undefined ? <div className="row g-3" >
                                        <Link to="/login" className='login' onClick={() => {

                                            dispatch(setSelectedNav('Login'))
                                            dispatch(setSelectedRoute(`/login`))
                                        }} > Log in </Link>

                                        <Link to="/register" className='createAccount' onClick={() => {

                                            dispatch(setSelectedNav('Register'))
                                            dispatch(setSelectedRoute(`/register`))
                                        }}> Create account </Link>
                                    </div> :
                                        <div className="row g-3" >
                                            <Link to="/profile" className='login' onClick={() => {

                                                dispatch(setSelectedNav('Profile'))
                                                dispatch(setSelectedRoute(`/profile`))
                                            }} > {user && user.userName} </Link>

                                            <Link to='/' onClick={logOutHandle} className='createAccount'> Log Out </Link>
                                        </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>

            </div>



        </>
    )

}

export default TopHeader