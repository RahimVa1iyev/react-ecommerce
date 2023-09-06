import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Detail from './pages/Detail';
import Basket from './pages/Basket';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import CheckOut from './pages/CheckOut';

import Layout from './Layout';
import Index from './pages/Index';
import Product from './dashboards/Product/Product';
import Brand from './dashboards/Brand/Brand';
import BrandPost from './dashboards/Brand/BrandPost';
import BrandPut from './dashboards/Brand/BrandPut';
import NotFound from './pages/NotFound';
import ProductPost from './dashboards/Product/ProductPost';
import ProductPut from './dashboards/Product/ProductPut';
import Slider from './dashboards/Slider/Slider';
import SliderPost from './dashboards/Slider/SliderPost';
import SliderPut from './dashboards/Slider/SliderPut';
import Category from './dashboards/Category/Category';
import CategoryPost from './dashboards/Category/CategoryPost';
import CategoryPut from './dashboards/Category/CategoryPut';
import Size from './dashboards/Size/Size';
import SizePost from './dashboards/Size/SizePost';
import SizePut from './dashboards/Size/SizePut';
import Colour from './dashboards/Colour/Colour';
import ColourPost from './dashboards/Colour/ColourPost';
import ColourPut from './dashboards/Colour/ColourPut';
import Profile from './pages/Profile';
import Order from './dashboards/Order/Order';
import AdminLogin from './dashboards/Login/AdminLogin';
import Admin from './dashboards/Admin/Admin';
import AdminPost from './dashboards/Admin/AdminPost';
import ContactUs from './dashboards/ContactUs/ContactUs';
import Response from './dashboards/ContactUs/Response';



function App() {
  return (
    <div >

      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/contact-us' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/checkout' element={<CheckOut />} />  
            <Route path='/profile' element ={<Profile/>} />       
          </Route>
            <Route path='*' element ={<NotFound />} />
             
            <Route path='/dashboard/index' element ={<Index />} />

            <Route path='/dashboard/products' element ={<Product />} />
            <Route path='/dashboard/products/create' element = {<ProductPost />} />
            <Route path='/dashboard/products/:id' element = {<ProductPut />} />

            <Route path='/dashboard/brands' element ={<Brand />}/>
            <Route path='/dashboard/brands/create' element ={<BrandPost />} />
            <Route path='/dashboard/brands/:id'  element = {<BrandPut />} />

            <Route path='/dashboard/colors' element ={<Colour />}/>
            <Route path='/dashboard/colors/create' element ={<ColourPost />} />
            <Route path='/dashboard/colors/:id'  element = {<ColourPut />} />

            <Route path='/dashboard/categories' element ={<Category />}/>
            <Route path='/dashboard/categories/create' element ={<CategoryPost />} />
            <Route path='/dashboard/categories/:id'  element = {<CategoryPut />} />

            <Route path='/dashboard/sizes' element ={<Size />}/>
            <Route path='/dashboard/sizes/create' element ={<SizePost />} />
            <Route path='/dashboard/sizes/:id'  element = {<SizePut />} />

            <Route path='/dashboard/sliders' element ={<Slider/>} />
            <Route path='/dashboard/sliders/create' element={<SliderPost/>} />
            <Route path='/dashboard/sliders/:id' element={<SliderPut />} />

            <Route path='/dashboard/orders' element={<Order />} /> 

            <Route  path='dashboard/login' element ={<AdminLogin />}/>

            <Route  path='/dashboard/admins' element={<Admin/>} />
            <Route  path='/dashboard/admins/create' element={<AdminPost/>}/>

            <Route  path='/dashboard/contacts' element = {<ContactUs />} /> 
            <Route path='/dashboard/response/:id' element = {<Response />} />
                 
        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
