import React, { useEffect, useState } from 'react'


import DetailItem from '../components/Detail/DetailItem';

import DetailPlugin from '../components/Plugins/DetailPlugin';
import TabPlugin from '../components/Plugins/TabPlugin';
import SliderPlugin from '../components/Plugins/SliderPlugin';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState()
  const [relatedProducts, setRelatedProducts] = useState();


  const getProduct = async () => {
    await axios.get(`https://localhost:7039/api/Products/detail/${id}`)
      .then(res => {
        setProduct(res.data.product)
        setRelatedProducts(res.data.relatedProducts)
      }
      )
      .catch(err => console.log("An unexpected error occured"))
  }
  console.log(relatedProducts &&  relatedProducts);


  useEffect(() => {
    getProduct();


  }, [id])

  // const product =
  // {
  //   name: "Product dummy title",
  //   rate: 5,
  //   category: "A",
  //   discountedPrice: 85.00,
  //   sizes: ["X", " XL ", " L "],
  //   costPrice: 105.00,
  //   posterImg: pr1,
  //   gender: "Men",
  //   images: [pr1, pr2, pr3, pr4],
  //   desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."

  // };





  return (
    <>
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
            <TabPlugin desc={product && product.desc} />
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