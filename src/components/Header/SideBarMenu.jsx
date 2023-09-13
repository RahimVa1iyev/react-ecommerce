import React from 'react'
import { Link } from 'react-router-dom'

const SideBarMenu = () => {
  return (
    <>
          <div id="side-bar-menu" >
            <ul>
                <li><Link to='/'> Home </Link></li>
                <li><Link to='/shop'> Shop </Link></li>
                <li><Link to='/contact-us'> Contact </Link></li>
            </ul>

            </div>    
        
    </>
  )
}

export default SideBarMenu
