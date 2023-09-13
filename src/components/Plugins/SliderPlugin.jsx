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
import MyLoader from '../Loader/MyLoader';


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

    const { title, slideshow, plugin, responsiveRow, row, perrow, visible, products } = props

  




    const settings = {

        infinite: true,
        speed: 1000,
        slidesToShow: slideshow,
        slidesToScroll: 1,
        slidesPerRow: perrow,
        row: row,

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

                       
                    </div>

                    <div id='slider-id' className="row flex-wrap align-items-center ">
                        <Slider {...settings}>
                            {
                                plugin === "first" ? products && products.map((pr, index) => (
                                    <PluginItem size={'0'} key={index} product={pr} />

                                ))
                                    : products && products.map((pr, index) => (
                                        <SecondPluginItem key={index} product={pr} />

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