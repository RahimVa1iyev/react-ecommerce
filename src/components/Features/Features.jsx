import React from 'react'
import icon1 from '../../assets/image/f-icon1.png';
import icon2 from '../../assets/image/f-icon2.png';
import icon3 from '../../assets/image/f-icon3.png';
import FeaturesItem from './FeaturesItem';


const Features = () => {

    const features = [
        {
            icon: icon1,
            title: "Free Shipping",
            desc: "Free shipping on order"
        },
        {
            icon: icon2,
            title: "Support24/7",
            desc: "Contact us 24 hrs a day"
        },
        {
            icon: icon3,
            title: "Payment Secure",
            desc: "Free shipping on order"
        },


    ]


    return (
        <>

            <div id="feature">
                <div className="container-own">
                   <div className="feature-item-box">
                   <div id="feature-media" className="row align-items-center justify-content-between">
                        {
                            features.map((feature,index) => (

                                <FeaturesItem key={index} feature={feature} />
                            ))
                        }
                    </div>
                   </div>
                </div>
            </div>
        </>
    )
}

export default Features