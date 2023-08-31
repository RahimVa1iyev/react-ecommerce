import React from 'react'
import Carousell from '../components/Carousel/Carousell'
import Features from '../components/Features/Features'
import SliderPlugin from '../components/Plugins/SliderPlugin';
import Offer from '../components/SpecialOffer/Offer';
import Collection from '../components/Collection/Collection';
import Modals from '../components/Modal/Modals';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Home = () => {
   const [products , setProducts] =useState({
      
    relatedProducts : [],
    newProducts : [],
    featuredProducts : [],
    mowstViewProducts : []

   })

   const getRelatedPr = async () => {
       
      await axios.get("https://localhost:7039/api/Products/discounted")
                 .then(res=> setProducts(previousState => {return {...previousState , relatedProducts : res.data}}) )
                 .catch(err => console.log("An unexpected error occured"))

   }

   const getNewestPr = async () =>{
    await axios.get("https://localhost:7039/api/Products/new")
               .then(res=> setProducts(previousState => {return {...previousState , newProducts : res.data}}) )
               .catch(err => console.log("An unexpected error occured"))
   }

   const getFeaturedPr = async () => {
    await axios.get("https://localhost:7039/api/Products/featured")
               .then(res=> setProducts(previousState => {return {...previousState , featuredProducts : res.data}}) )
               .catch(err => console.log("An unexpected error occured"))
   }

   const getMostViewPr = async () => {
    await axios.get("https://localhost:7039/api/Products/mostview")
               .then(res=> setProducts(previousState => {return {...previousState , mowstViewProducts : res.data}}) )
               .catch(err => console.log("An unexpected error occured"))
   }
  
  

  

    useEffect(()=>{
         getRelatedPr();
         getNewestPr();
         getFeaturedPr();
         getMostViewPr();
    },[])

  return (
    <>
      <Carousell />
      <Features />
      <SliderPlugin title="Today's Deals" slideshow={4} row={1} responsiveRow={2} perrow={1} plugin="first" products = {products.relatedProducts}  visible="d-block" />
      <Offer />
      <SliderPlugin title="New Products" slideshow={4} row={2} responsiveRow={2} perrow={2} plugin="first"  products = {products.newProducts}  visible="d-none" />
      <Collection />
      <div className="container-own">
        <div className="row align-content-center justify-content-center ">
          <div className="col-lg-4 col-12 mt-3 ">
            <SliderPlugin title="Featured Products" slideshow={1} responsiveRow={1} row={3} perrow={3} plugin="second" products ={products.featuredProducts} visible="d-none" />
          </div>
          <div className="col-lg-4 col-12 mt-3">
            <SliderPlugin title="Most View Products" slideshow={1} responsiveRow={1} row={3} perrow={3} plugin="second" products = {products.mowstViewProducts  } visible="d-none" />
          </div>
          <div className="col-lg-4 col-12 mt-3 ">
            <SliderPlugin title="Bestseller Products" slideshow={1} responsiveRow={1} row={3} perrow={3} plugin="second" visible="d-none" />
          </div>
        </div>
      </div>

        <div className="modal">
          <Modals />
        </div>

    </>
  )
}

export default Home