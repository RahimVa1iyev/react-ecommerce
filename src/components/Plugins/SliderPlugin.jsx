import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pr1 from '../../assets/image/pr1.png';
import pr2 from '../../assets/image/pr2.png';
import pr3 from '../../assets/image/pr3.png';
import pr4 from '../../assets/image/pr4.png';
import PluginItem from './PluginItem';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import SecondPluginItem from './SecondPluginItem';


const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
            <MdOutlineKeyboardArrowLeft />
        </div>
    );
};


const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-next-arrow" onClick={onClick}>
            <MdOutlineKeyboardArrowRight />
        </div>
    );
};
const SliderPlugin = (props) => {

   const [remainingTime, setRemainingTime] = useState(86400);
   const{title,slideshow,plugin,responsiveRow, row,perrow,visible,products} = props

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    // const products = [

    //     {
    //         name: "Product dummy title",
    //         rate: 5,
    //         discountedPrice: 85.00,
    //         costPrice: 105.00,
    //         posterImg: pr1,
    //         hoverImg: pr2,
    //         desc :"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."

    //     },
    //     {
    //         name: "Product dummy title",
    //         rate: 4,
    //         discountedPrice: 75.00,
    //         costPrice: 95.00,
    //         posterImg: pr2,
    //         hoverImg: pr3,
    //         desc :"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."


    //     },
    //     {
    //         name: "Product dummy title",
    //         rate: 3,
    //         discountedPrice: 35.00,
    //         costPrice: 45.00,
    //         posterImg: pr3,
    //         hoverImg: pr1,
    //         desc :"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."


    //     },
    //     {
    //         name: "Product dummy title",
    //         rate: 5,
    //         discountedPrice: 125.00,
    //         costPrice: 135.00,
    //         posterImg: pr4,
    //         hoverImg: pr1,
    //         desc :"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."


    //     },
    //     {
    //         name: "Product dummy title",
    //         rate: 5,
    //         discountedPrice: 45.00,
    //         costPrice: 65.00,
    //         posterImg: pr2,
    //         hoverImg: pr1,
    //         desc :"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."


    //     },
    //     {
    //         name: "Product dummy title",
    //         rate: 4,
    //         discountedPrice: 65.00,
    //         costPrice: 85.00,
    //         posterImg: pr3,
    //         hoverImg: pr2,
    //         desc :"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."


    //     },
    //     {
    //         name: "Product dummy title",
    //         rate: 4,
    //         discountedPrice: 65.00,
    //         costPrice: 85.00,
    //         posterImg: pr3,
    //         hoverImg: pr2,
    //         desc :"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."


    //     },  {
    //         name: "Product dummy title",
    //         rate: 4,
    //         discountedPrice: 65.00,
    //         costPrice: 85.00,
    //         posterImg: pr3,
    //         hoverImg: pr2,
    //         desc :"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."


    //     },
    //     {
    //         name: "Product dummy title",
    //         rate: 4,
    //         discountedPrice: 65.00,
    //         costPrice: 85.00,
    //         posterImg: pr3,
    //         hoverImg: pr2,
    //         desc :"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."


    //     },
    //     {
    //         name: "Product dummy title",
    //         rate: 4,
    //         discountedPrice: 65.00,
    //         costPrice: 85.00,
    //         posterImg: pr3,
    //         hoverImg: pr2,
    //         desc :"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."


    //     },


    // ]

    const settings = {

        infinite: true,
        speed: 1000,
        slidesToShow: slideshow,
        slidesToScroll: 1,
        slidesPerRow: perrow,
        row:row,

        initialSlide: 0,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: responsiveRow,
                    slidesToScroll: responsiveRow,
                    initialSlide: responsiveRow
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>

            <div className="container-own">
                <div className="discounted-box">
                    <div className="discounted-top-side ">
                        <h2>{title}</h2>

                        <div className={visible==="d-block"?"count-timer d-block":"count-timer d-none"}>
                            {remainingTime !== null ? (
                                <p>
                                    Ends in:{" "}
                                    {Math.floor(remainingTime / 3600)}h{" "}
                                    {Math.floor((remainingTime % 3600) / 60)}m{" "}
                                    {remainingTime % 60}s
                                </p>
                            ) : (
                                <p>Ends in: 0h 0m 0s</p>
                            )}
                        </div>
                    </div>

                    <div id='slider-id' className="row flex-wrap align-items-center ">
                        <Slider {...settings}>
                            {
                               plugin==="first"? products && products.map((pr,index) => (
                                    <PluginItem key={index} product={pr}  />
                                    
                                )) : products && products.map((pr,index) => (
                                    <SecondPluginItem key={index} product={pr}  />
                                    
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </div>

        </>
    )
}



export default SliderPlugin