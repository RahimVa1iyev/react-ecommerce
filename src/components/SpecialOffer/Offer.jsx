import React, { useEffect, useState } from 'react'
import img1 from '../../assets/image/offer-img.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Offer = () => {
    const [offer, setOffer] = useState();

    const getOffer = async () => {
        var response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/Features/all`)
             setOffer(response.data)
             console.log(response.data);
    }
    useEffect(()=>{
      getOffer();
    },[])
    return (
        <>

            <div className="conatiner-own">
                <div id="Offer">
                    {
                        offer && offer.map((item, index) => (
                            <div className="row align-items-center g-4">

                                <div className="col-lg-5 col-12">
                                    <div className="offer-box-left">
                                        <span>{item.fTitle}</span>
                                        <h3>{item.sTitle}</h3>
                                        <h1>{item.tTitle}</h1>
                                        <p>{item.desc}</p>
                                        <Link to='/shop'>Explore The Shop</Link>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-12">
                                    <div className="offer-box-right">
                                        <img src={item.imageUri} alt="my img" />
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>


        </>
    )
}

export default Offer