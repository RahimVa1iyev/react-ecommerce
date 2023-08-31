import React, { useEffect, useState } from 'react'
import { TiSocialFacebook } from "react-icons/ti"
import { TiSocialTwitter } from 'react-icons/ti'
import { TfiGoogle } from 'react-icons/tfi'
import { TfiInstagram } from 'react-icons/tfi';
import { TiSocialYoutube } from 'react-icons/ti';
import { MdKeyboardArrowDown } from 'react-icons/md';
import axios from 'axios';

const TopHeader = () => {

    const [show, setShow] = useState("visible")
    const [user, setUser] = useState();
    const [token,setToken] = useState(localStorage.getItem('authToken'));

    const DropdownHandler = () => {
        setShow(show === "visible" ? "" : "visible")
    }
    


    const getData= async()=>{
    
        if (token) {
         await axios.get('https://localhost:7039/api/Users', {
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
        } else {
          console.log('Token has not found');
        }
    }
    
    useEffect( () => {
        getData();
    },[token]);

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
                                    <TiSocialFacebook className='iconStyle' />
                                    <TiSocialTwitter className='iconStyle' />
                                    <TfiGoogle className='iconStyle-2' />
                                    <TfiInstagram className='iconStyle-2' />
                                    <TiSocialYoutube className='iconStyle' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12">
                    <div className="account-side ">
                        <div id='account-side-media' className="d-flex align-items-center  justify-content-end gap-3">
                            <span className='account' onClick={DropdownHandler} >My Account <MdKeyboardArrowDown /></span>
                            <span className='seperator' >|</span>
                            <span className='language' >AZ</span>
                        </div>


                        <div className={show === "visible" ? "dropdown-account visible" : "dropdown-account"}>
                           {
                            user === undefined ? <div className="row g-3" >
                                <a href="#" className='login'> Log in </a>

                                <a href="#" className='createAccount'> Create account </a>
                            </div> :
                            <div className="row g-3" >
                            <a href="#" className='login'> { user && user.userName} </a>

                            <a href="#" className='createAccount'> Log Out </a>
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