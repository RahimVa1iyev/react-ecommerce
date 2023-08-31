import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux';
import { handleOpen, removeFromCompareProduct, setCompareProduct } from '../../control/modalSlice';
import { handleClose } from '../../control/modalSlice';
import DetailItem from '../Detail/DetailItem';
import  {FiX} from "react-icons/fi"
import { act } from 'react-dom/test-utils';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Modals = () => {
  const { modalOpen, selectedProduct,compareProduct,activeIcon,orderItems } = useSelector((store) => store.modal)
  const disPatch = useDispatch()
  const handleOpenModal = () => {
    disPatch(handleOpen());
  };
  console.log("orderitems",orderItems);

  const handleCloseModal = () => {
    disPatch(handleClose());
  };

  const handleDeletePr = (id) =>{
    
    var removablePr = document.querySelectorAll(`[data-product-id="${id}"]`);
    removablePr.forEach((pr)=>{
      const parent = pr.parentNode;
      
      parent.removeChild(pr)
    })
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpenModal}>Open Child Modal</Button>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 998 , height : 700}}>
          <div className="main-modal">
          {activeIcon==="eye"?  <div className="row ">
              <div className="col-lg-6">
                <div className="modal-img">
                  {
                    selectedProduct.images && selectedProduct.images.map((img,index)=>(
                      
                      img.imageStatus === true && <img key={index} src={img.imageName} alt='my clock'/>
                      
                    ))
                  }

                </div>
              </div>
              <div className="col-lg-6">
                <div className="modal-title">
              

                  <DetailItem  product = {selectedProduct} />

                </div>
              </div>
            </div>:
            activeIcon === "scale"?
            <div className='compare-table'>
               
               <div className="compare-modal-header">
                <h1>Compare Product</h1>
                <span  className='close-btn' ><FiX onClick={handleCloseModal}/></span>
               </div>

               <div className="modal-body">
                <div className="table-wrapper">
                  <table className='table table-hover table-responsive' >
                   <thead>
                    <tr className='th-compare'>
                      <td>Action</td>
                      {
                       compareProduct && compareProduct.map((pr,index)=>(
                          <th  data-product-id={pr.id}  key={index} onClick={()=> handleDeletePr(pr.id)} className='text-center' >x</th>
                        ))
                      }
                    </tr>
                   </thead>
                   <tbody className='table-compare'>
                      <tr>
                      <th className='table-head' >Product Name</th>
                       {
                      compareProduct &&  compareProduct.map((pr,index)=>(
                           <td  data-product-id={pr.id} key={index} className='product-d' >{pr.name}</td>       
                        ))
                       }
                      </tr>

                      <tr>
                        <th className='table-head' >Product Image</th>
                        {
                     compareProduct &&     compareProduct.map((pr,index)=>(
                             <td   data-product-id ={pr.id} key={index} className='product-d '>
                                  <div className='compare-img' ><img src={pr.image} alt="my clock" /></div>
                                  <div className='compare-price ' > ${pr.salePrice} </div>
                                  <a href="#">VIEW PRODUCT</a>
                             </td>
                          ))
                        }
                      </tr>

                      <tr>
                        <th className='table-head' >Product Description</th>

                        {
                     compareProduct &&     compareProduct.map((pr,index)=>(
                            <td key={index}  data-product-id={pr.id} className='product-d' ><p>{pr.desc && pr.desc.substring(0,60)}...</p></td>
                          ))
                        }
                      </tr>
                      <tr>
                        <th className='table-head' > Availability </th>
                        {
                       compareProduct &&   compareProduct.map((pr,index)=>(
                            <td key={index}  data-product-id={pr.id} className='product-d' > <span> {pr.stockStatus === true? "In Stock" : "Out Stock" } </span> </td>
                          ))
                        }
                      </tr>
                   </tbody>
                  </table>

                </div>
               </div>

            </div> :
            <div>
              {
                orderItems && orderItems.map((item,index)=>(
                  <div  className='my-wishlist-side '>

                  <div className="my-wishlist-box d-flex align-items-center justify-content-between">
                      <div className="left-side d-flex align-items-center ">
                          <div className="my-wishlist-img">
                             <img src={item.image} alt="my img" />
                                
                              
                          </div>
                          <div className="my-wishlist-content d-flex flex-column  ">
                              <h4 className='content-title' >{item.name}</h4>
                              {
                                  item.discountedPrice > 0 ?
                                      <div className="content-price d-flex align-items-center gap-2 ">
                                          <span className='new-price' >${item.discountedPrice}</span>
                                          <del className='old-price' >${item.salePrice}</del>
                                      </div> :
                                      <div className="content-price">
                                          <span className='new-price' >${item.salePrice}</span>
                                      </div>


                              }
                              <span className={item.stockStatus ===true? "content-stock inStock"  : "content-stock outStock"} >{item.stockStatus ===true? "In Stock" : "Out Stock"}</span>
                          </div>
                      </div>
                    
                  </div>
              </div>
                ))
              }
            </div>
            }
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default Modals