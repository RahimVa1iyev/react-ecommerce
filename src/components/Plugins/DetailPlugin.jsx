import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

const DetailPlugin = (props) => {

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);


  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);


  let slider1 = null;
  let slider2 = null;
  return (
    <>
      <div>

        <Slider
          asNavFor={nav2}
          ref={slider => (slider1 = slider)}
          arrows={false}
        >
          {

            props.images && props.images.map((img,index) => (
              <div key={index} className="detail-poster-img">

                <img className='detail-posterImg' src={img.imageName} alt='my img' />
              </div>

            ))


          }
        </Slider>

        <Slider
          asNavFor={nav1}
          ref={slider => (slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}

        >
          {
            props.images && props.images.map((img,index) => (
              <div key={index} className="alt-img">
                <img className='altImg' src={img.imageName} alt='my img' />

              </div>
            ))
          }
        </Slider>
      </div>
    </>
  )
}

export default DetailPlugin