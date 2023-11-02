import React, { useEffect, useState } from 'react'
import icon1 from '../../assets/image/f-icon1.png';
import icon2 from '../../assets/image/f-icon2.png';
import icon3 from '../../assets/image/f-icon3.png';
import FeaturesItem from './FeaturesItem';
import axios from 'axios';


const Features = () => {

    const [features, setFeatures] = useState();

  

    const getFeatures = async () => {
        var response = await axios.get('http://rahimfront-001-site1.anytempurl.com/api/Offers/all')
        setFeatures(response.data)
    }

    useEffect(() => {
        getFeatures();
    }, [])

    return (
        <>

            <div id="feature">
                <div className="container-own">
                    <div className="feature-item-box">
                        <div id="feature-media" className="row align-items-center justify-content-between">
                            {
                               features && features.map((feature, index) => (

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