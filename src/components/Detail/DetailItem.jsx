import React from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import { TiStarOutline } from 'react-icons/ti';


const DetailItem = (props) => {
   const { name, rate, category, discountedPrice, brand, colors, sizes, salePrice, gender, desc } = props.product;
   const getStart = (i,index) => {
      return rate >= i ? <TiStarFullOutline key={index} className='full' /> : <TiStarOutline key={index} className='outer' />
   }
   return (
      <>

         <h2 className='pr-name' >{name}</h2>
         <div className="rate d-flex align-items-center">{
            [1, 2, 3, 4, 5].map((i,index) => (

               getStart(i,index)
            ))
         }   <span className='review' >Review</span> </div>

         {
            discountedPrice > 0 ?
               <div className="price d-flex align-items-center gap-3">
                  <span className="new-price">${discountedPrice}</span>
                  <del className="old-price">${salePrice}</del>
               </div> :
               <div className="price d-flex align-items-center gap-3">
                  <span className="new-price">${salePrice}</span>
               </div>
         }


         <div className="category">
            <span className='category-title'>Category :</span>  <span className='category-name'>{category.name}</span>
         </div>

         <div className="brand">
            <span className='brand-title'>Brand :</span>  <span className='brand-name'>{brand.name}</span>
         </div>

         <div className="gender">
            <span className='gender-title' >Gender :</span>  <span className='gender-name'>{gender.name}</span>
         </div>

         <div className="size">
            <span className='size-title' >Sizes :</span>  {sizes.map((size, index) => (
               <span className='size-name' key={index}>
                  {index > 0 && ", "}
                  {size.name}
               </span>
            ))}
         </div>
         <div className="color">
            <span className='color-title' >Colors :</span>  {colors.map((color, index) => (
               <span className='color-name' key={index}>
                  {index > 0 && ", "}
                  {color.name}
               </span>
            ))}
         </div>

         <hr />

         <p className="desc">{desc.substring(0,250)}...</p>

         <hr />

         <div className="basket-side d-flex align-items-center gap-3">
            <span>Qty</span>
            <input type="number" value={1} />
            <a href="#" className='add-btn'>Add to cart</a>
         </div>

         <div className="check-out">
            <a href="#" >Buy it now</a>
         </div>


      </>
   )
}

export default DetailItem