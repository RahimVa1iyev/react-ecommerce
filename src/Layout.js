import Header from './layouts/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './layouts/Footer/Footer'

function Layout() {
 


  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout