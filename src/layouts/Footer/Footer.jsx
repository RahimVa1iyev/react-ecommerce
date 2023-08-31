import React from 'react'
import logo from '../../assets/image/logo.png';
import {BsFacebook} from 'react-icons/bs';
import {AiFillTwitterCircle,AiFillGooglePlusCircle} from 'react-icons/ai';
import {SiYoutubemusic} from 'react-icons/si';

const Footer = () => {
    return (
        <>
            <div className="container-own">
               <div className="footer">
               <div className="row align-items-baseline justify-content-between">
                    <div className="col-lg-4 col-12">
                        <div className="footer-left-side">
                            <img src={logo} alt="my img" />

                            <div className="social-media-icons d-flex align-items-center gap-3">
                            <BsFacebook className='fb-icon' />
                            <AiFillTwitterCircle className='twitter-icon' />
                            <AiFillGooglePlusCircle className='google-icon' />
                            <SiYoutubemusic className='youtube-icon' />
                        </div>
                        </div>
                      
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="footer-middle-side">
                            <div className="adress">
                                <span>Address</span>
                                <p>4710-4890 Breckinridge St, UK Burlington, VT 05401</p>
                            </div>

                            <div className="mobile-phone">
                                <span>Need Help?</span>
                                <p>Call: 1-800-345-6789</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="footer-right-side">
                            <span>About Menu</span>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Shop</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">About</a></li>

                            </ul>
                        </div>
                    </div>
                </div>
               </div>
            </div>

        </>
    )
}

export default Footer