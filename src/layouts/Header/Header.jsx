import React from 'react'
import TopHeader from "../../components/Header/TopHeader"
import BottomHeader from '../../components/Header/BottomHeader'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedNav } from '../../control/navSlice';

const Header = () => {


  const { selectedNav, selectedRoute } = useSelector(store => store.nav)
  console.log(selectedRoute);
  const dispatch = useDispatch()

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".container-header");



    const toggleClass = "isHeader";


    const currentScroll = window.scrollY;
    if (currentScroll > 150) {
      header.classList.add(toggleClass);



    } else {
      header.classList.remove(toggleClass);


    }
  });
  return (
    <>
      <header>
        <div className="container-header">
          <div className="header-side">
            <TopHeader />
            <BottomHeader />

          </div>
        </div>
      </header>
      {
        selectedNav !== '' ?
          <div className="navigator-head">
            <div className="container-own">
              <ul className='d-flex align-items-center gap-2'>
                <li className='d-flex align-items-center gap-2'>
                  <Link onClick={()=>{dispatch(setSelectedNav(''))}} className='nav-header' to='/' >Home</Link>  <MdOutlineKeyboardArrowRight className='arrow-icon' />
                </li>
                <li>
                  <Link className='nav-header-second' to={selectedRoute} >{selectedNav}</Link>
                </li>
              </ul>
            </div>
          </div> :
          ''
      }

    </>
  )
}

export default Header