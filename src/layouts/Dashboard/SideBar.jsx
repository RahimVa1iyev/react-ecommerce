import React, { useState } from 'react'
import { TbBrandDisqus } from 'react-icons/tb';
import { MdTableView } from 'react-icons/md';
import { MdKeyboardArrowDown ,MdKeyboardArrowUp } from 'react-icons/md';
import { FaReact } from 'react-icons/fa';
import {SiBrandfolder} from 'react-icons/si';
import {TbCategory2} from 'react-icons/tb';
import {IoColorPaletteOutline} from 'react-icons/io5';
import {CgAppleWatch} from 'react-icons/cg'
import {RiFontSize2} from 'react-icons/ri';
import {TfiLayoutSlider} from 'react-icons/tfi';     
import { Link } from 'react-router-dom';
import {MdOutlineBorderColor} from 'react-icons/md'
import {RiAdminLine} from 'react-icons/ri';    
import {BiMessageRoundedDots} from 'react-icons/bi';

const SideBar = (props) => {
    const [open , setOpen] = useState(props.openTab )
    const [visible , setVisible] = useState('d-none') 
    const [selected , setSelected] = useState('nonactive')
const tablesHandler = () =>{
   
    setOpen(open === true ? false : true )
    setVisible(visible === 'd-none' ? 'd-block' : 'd-none')
}

const toggleHandle = (e) =>{
   console.log(e.target.className);
   
   
   if (e.target.classList.contains("nonactive")) {
    e.target.classList.remove("nonactive");
    e.target.classList.add("active");
  } else {
    e.target.classList.remove("active");
    e.target.classList.add("nonactive");
  }
}

    return (
        <>

            <div className="dash-side-bar-top">
                <Link to='/dashboard/index'><FaReact className='react-icon' />  <span className='dash-text'>Admin VR</span></Link>
            </div>

            <hr className='horizontal dark mt-3' />

            <div className="dash-side-bar-body">
                <div className="dashboard-link d-flex align-items-center gap-2">
                   <Link to='/dashboard/index'> <TbBrandDisqus className='dash-icon' /> <span className='dash-text'>Dashboard</span></Link>
                </div>
                <div onClick={tablesHandler} className="tables-link d-flex align-items-center gap-2">
                    <MdTableView className='tabs-icon' /> <span className='dash-text'>Tables</span>  {open === true ? <MdKeyboardArrowDown className='arrow-icon' /> : <MdKeyboardArrowUp className='arrow-icon' />}
                    
                </div>
                <div className="dropdown-table">
                         <ul className={open === false ?'dash-drob-tabs d-none ' :'dash-drob-tabs d-block'}>
                            <li ><SiBrandfolder className='brand-logo'/>  <Link onClick={toggleHandle} className={props.active === 'brand' ? 'active' : 'nonactive'} to='/dashboard/brands' >Brands </Link> </li>
                            <li><TbCategory2  className='ct-logo' />  <Link onClick={toggleHandle} className={props.active === 'category' ? 'active' : 'nonactive'} to="/dashboard/categories"> Categories </Link> </li>
                            <li><IoColorPaletteOutline className='color-logo' />  <Link onClick={toggleHandle} className={props.active === 'color' ? 'active' : 'nonactive'} to='/dashboard/colors'> Colors </Link></li>
                            <li><CgAppleWatch className='pr-logo' />  <Link onClick={toggleHandle} className={props.active === 'product' ? 'active' : 'nonactive'} to='/dashboard/products' >Products</Link></li>
                            <li><RiFontSize2 className='size-logo' />  <Link onClick={toggleHandle} className={props.active === 'size' ? 'size-active' : 'size-no-active'} to='/dashboard/sizes' >Sizes</Link></li>
                            <li><TfiLayoutSlider className='slider-logo' />  <Link onClick={toggleHandle} className={props.active === 'slider' ? 'active' : 'nonactive'} to='/dashboard/sliders' >Sliders</Link></li>
                            <li><MdOutlineBorderColor className='order-logo' />  <Link onClick={toggleHandle} className={props.active === 'order' ? 'active' : 'nonactive'} to='/dashboard/orders' >Orders</Link></li>
                            <li><RiAdminLine className='admin-logo' />  <Link onClick={toggleHandle} className={props.active === 'admin' ? 'active' : 'nonactive'} to='/dashboard/admins' >Admins</Link></li>
                            <li><BiMessageRoundedDots className='contact-logo' />  <Link onClick={toggleHandle} className={props.active === 'contact' ? 'active' : 'nonactive'} to='/dashboard/contacts' >Messages</Link></li>


                         </ul>
                    </div>
            </div>


        </>
    )
}

export default SideBar