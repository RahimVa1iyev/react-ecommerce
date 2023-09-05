import React, { useEffect, useState } from 'react'
import logo from '../../assets/image/logo.png';
import { LuShoppingCart } from 'react-icons/lu';
import { AiOutlineBars } from 'react-icons/ai';
import SideBarMenu from './SideBarMenu';
import { useDispatch, useSelector } from 'react-redux';
import img1 from '../../assets/image/pr1.png'
import { FiX } from 'react-icons/fi';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { getBasketItems, setClicked } from '../../control/basketSlice';

const BottomHeader = () => {
    const [toggle, setToggle] = useState("side-bar-off");
    const { count , product } = useSelector((store) => store.basket)
    const [dropdown , setDropdown] = useState(false)
    const [toggleNavlink , setToggleNavlink] = useState(1);
    const [token,setToken] = useState(localStorage.getItem('authToken'));


const dispatch = useDispatch();
    
    const DeletePrHandle = async (id)=>{
          console.log("Id",id);
       await axios.delete(`https://localhost:7039/api/Shops/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
       })
       .then(res=>{
        console.log("Product deleted");
        dispatch(getBasketItems())
      
       })

    }

    const DropdownHandle = () =>{
      setDropdown(dropdown ? false : true )
    }
 


    const SidebarHandler = () => {
        setToggle(toggle === "side-bar-off" ? "side-bar-on" : "side-bar-off")
    }

    const toggleNav = (id) =>{
        console.log(id);
        setToggleNavlink(id)
    }

    
    return (
        <>
            <div id="bottom-header">

                <div id='bottom-header-media' className="row align-items-center justify-content-between">

                    <div className="col-lg-2 col-3">
                        <a href="#" className='logo' > <img src={logo} alt="my image" /> </a>
                    </div>

                    <div id='navbar-media' className="col-lg-6">
                        <div className="navbar-bottom d-flex align-items-center justify-content-around">
                            <Link className={toggleNavlink ===1? "nav-active" : "nav-deactive"} onClick={()=> toggleNav(1)} to="/">Home</Link>
                            <Link className={toggleNavlink ===2? "nav-active" : "nav-deactive"} onClick={()=> toggleNav(2)}  to="/shop" >Shop</Link>
                            <Link className={toggleNavlink ===3? "nav-active" : "nav-deactive"} onClick={()=> toggleNav(3)} to="/contact-us" >Contact</Link>
                        </div>

                    </div>
                    <div className="col-lg-2 col-7">
                        <div id='basket-media' className="basket d-flex align-items-center justify-content-end  gap-1 ">
                            <LuShoppingCart onClick={DropdownHandle} className='basket-icon' /> <span className='count'>{count && count}</span>
                        </div>
                        <div className={dropdown ? "basket-dropdown" : "d-none"}>
                            <div className="dropdown-box  ">
                              
                              {
                                product && product.items.map((item,index)=>(
                                    <div key={index} className="top-side-dropdown d-flex align-items-start gap-2 ">
                                    <div className="basket-img">
                                        {
                                            item.product.images.map((img , index)=>(
                                                <img key={index} src={`https://localhost:7039/uploads/products/${img.imageName}`} alt="my img" />

                                            ))
                                        }
                                    </div>
                                    <div className="basket-info">
                                        <div className="pr-name d-flex justify-content-between">
                                            <p>{item.product.name.substring(0,40)}...</p>
                                            <FiX onClick={()=> DeletePrHandle(item.product.id)} className='delete-basket' />
                                        </div>
                                        <div className="basket-item-price d-flex align-items-center gap-1">
                                            <span className='drop-x' >{item.count }</span>
                                            <span className='drop-x'  >x</span>
                                            <span className='new-price' >{(item.count * (item.product.discountedPrice>0? item.product.discountedPrice : item.product.salePrice)).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                ))
                              }

                                   

                                <div className="links">
                                    <div className="total-price d-flex align-items-center justify-content-between">
                                        <p>Total : </p>
                                        <span className='total' >{product && product.totalAmount}</span>
                                    </div>
                                    <div className="link-button">
      
                                        <Link onClick={()=> setDropdown(false)} to='/basket' className='go-link' >View Cart</Link>
                                        <Link onClick={()=> setDropdown(false)} to='/checkout' className='go-link' >Checkout</Link>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div id='bar' className="col-2">
                        <div className="side-bar">
                            <AiOutlineBars onClick={SidebarHandler} className='bar-icon' />
                        </div>
                    </div>
                </div>


            </div>


            <div id={toggle} className='col-12' >
                <SideBarMenu />
            </div>



        </>
    )
}

export default BottomHeader