import React from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';
const SecondPluginItem = (props) => {
    const { name, rate, discountedPrice, salePrice, images } = props.product


    const getStarIcon = (i) => {
        return i <= rate ? <TiStarFullOutline key={i} className='full' /> : <TiStarOutline key={i} className='outer' />;
    };
    return (
        <>

            <div key={props.key} className="container-own">
                <div className="second-plugin-box d-flex align-items-center gap-2 p-1 ">

                    <div className="second-pl-left">

                        {images.map((img, index) => (
                            img.imageStatus === true && <img key={index} src={img.imageName} alt="my clock" />
                        ))

                        }
                    </div>
                    <div className="second-pl-right">

                        <div className="second-pl-box">

                            <h4>
                                {name.substring(0, 20)}...
                            </h4>

                            <div className="stars">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    getStarIcon(i)
                                ))}
                            </div>



                            {
                                discountedPrice > 0 ?
                                    <div className="s-price d-flex align-items-center gap-3">
                                        <span className='s-new-price'>${discountedPrice}</span>
                                        <del className='s-old-price'>${salePrice}</del>
                                    </div> :
                                    <div className="s-price d-flex align-items-center gap-3">
                                        <span className='s-new-price'>${salePrice}</span>
                                    </div>

                            }





                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SecondPluginItem