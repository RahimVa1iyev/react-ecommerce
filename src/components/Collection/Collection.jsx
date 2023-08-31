import React from 'react'
import img1 from '../../assets/image/collection-1.png';
import img2 from '../../assets/image/collection-2.png';


const Collection = () => {
   return (
      <>

         <div className="container-own">
            <div className="collection-box">
               <div className="row align-items-center justify-content-center g-2 ">
                  <div className="col-lg-6">
                     <div className="collection-left-side">
                        <img src={img1} alt="" />
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="collection-right-side">
                        <img src={img2} alt="" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Collection