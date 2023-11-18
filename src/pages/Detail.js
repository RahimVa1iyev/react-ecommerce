import React, { useEffect, useState } from 'react'


import DetailItem from '../components/Detail/DetailItem';

import DetailPlugin from '../components/Plugins/DetailPlugin';
import TabPlugin from '../components/Plugins/TabPlugin';
import SliderPlugin from '../components/Plugins/SliderPlugin';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState()
  const [relatedProducts, setRelatedProducts] = useState();


  const getProduct = async () => {
    await axios.get(`https://api-project-ecommerce.azurewebsites.net/api/Products/detail/${id}`)
      .then(res => {
        setProduct(res.data.product)
        setRelatedProducts(res.data.relatedProducts)
      }
      )
      .catch(err => console.log("An unexpected error occured"))
  }

  
  useEffect(() => {
    getProduct();
  }, [id])

 


  
  useEffect(()=>{
    localStorage.getItem('adminToken') !==null && localStorage.removeItem('adminToken')
 },[])

  return (
    <>
      <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
      <div className="container-own">
        <div className="col-lg-12">
          <div className="detail-top-side mt-1">
            <div className="row align-items-baseline gap-4">
              <div className="col-lg-6">
                <DetailPlugin images={product && product.images} />
              </div>
              <div className="col-lg-5">
                <div className="product-detail-side">

                  {product && <DetailItem product={product} />}

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="tab-menu-side">

          {product && <TabPlugin product={product} />}
          
          </div>
        </div>
        <div className="col-lg-12">

          <div className="botom-side">
            <SliderPlugin title="Related Product" slideshow={relatedProducts&& relatedProducts.length<4? relatedProducts.length : 4} row={1} responsiveRow={2} perrow={1} products={relatedProducts} plugin="first" visible="d-none" />
          </div>

        </div>
      </div>

    </>
  )
}

export default Detail