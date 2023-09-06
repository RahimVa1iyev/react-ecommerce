import React from 'react'
import TopHeader from "../../components/Header/TopHeader"
import BottomHeader from '../../components/Header/BottomHeader'

const Header = () => {
  return (
    <>
      <div className="container-own">
        <div className="header-side">
          <TopHeader />
          <BottomHeader />
        </div>
      </div>

    </>
  )
}

export default Header