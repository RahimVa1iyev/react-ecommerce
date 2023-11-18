import React, { useEffect, useState } from 'react';
import SliderItem from './SliderItem';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../../assets/css/main.css";
import axios from 'axios';
import MyLoader from '../Loader/MyLoader';
import SliderLoader from '../Loader/SliderLoader';



const Carousell = () => {

  const [items , setItems] = useState(); 

   useEffect(()=>{
     const getSlider = async () =>{
     await axios.get("https://api-project-ecommerce.azurewebsites.net/api/Sliders/all")    
                .then(res => setItems(res.data))
                .catch(err=> console.log("An unexpected error occured"))
    
    }  
        
    getSlider();
   },[])
  
  
   
  
    return (
  

    

        <Carousel
      showArrows={true}    
      showThumbs={false}   
      showStatus={false}   
      infiniteLoop={true}  
      emulateTouch={true}   
      swipeable={true}      
      dynamicHeight={false}
      
    >


      {items ===undefined ?  <SliderLoader  /> : items.map((item, index) => ( 
        <div key={index}>
          <div className='slid' style={{ backgroundColor: item.background_color  }}>
            <div className="container-own">
              <div id='slider-media' className="row align-items-center justify-content-center   ">
                <SliderItem item={item} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
   
  
  
    );
}

export default Carousell