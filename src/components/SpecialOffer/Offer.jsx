import React from 'react'
import img1 from '../../assets/image/offer-img.png';

const Offer = () => {
  return (
    <>
          
          <div className="conatiner-own">
           <div id="Offer">
           <div className="row align-items-center g-4">
                <div className="col-lg-5 col-12">
                    <div className="offer-box-left">
                        <span>SPECIAL OFFER</span>
                        <h3>SUCCULENT GARDEN</h3>
                        <h1>GIFT BOXES</h1>
                        <p>From planter materials to style options, discover which planter is best for your space.</p>
                        <a href="#">Explore The Shop</a>
                    </div>
                </div>
                <div className="col-lg-7 col-12">
                    <div className="offer-box-right">
                        <img src={img1} alt="my img" />
                    </div>
                </div>
            </div>
           </div>
          </div>
         
       
    </>
  )
}

export default Offer