import React , {useEffect , useState} from 'react'
import SideBar from '../../layouts/Dashboard/SideBar';
import DashNavbar from '../../layouts/Dashboard/DashNavbar';
import FrTable from '../../components/Tables/FrTable';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Category = () => {


    const [categories, setCategories] = useState();
  
    const {Id} = useSelector((store) => store.table)
  
    const getCategories = async () => {
      const response = await axios.get("http://rahimcode-001-site1.ftempurl.com/api/Categories/all")
      setCategories(response.data)
    }
  
  
    useEffect(() => {
      getCategories()
    }, [Id])
  
    const navigate = useNavigate()
    useEffect(()=>{
        localStorage.getItem('adminToken') === null && navigate('/dashboard/login')
      },[])
  
    return (
      <>
         <ToastContainer
            position="top-right"
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
        <div className="top-side">
          <div className="container-fluid">
            <div className="row  ">
              <div className="col-lg-2-5">
                <div className="dash-side-bar">
                  <SideBar openTab = {true} active = 'category' />
                </div>
              </div>
              <div className="col-lg-9-5">
                <div className="dashboard-index">
                  <DashNavbar />
                </div>
                <FrTable route="/dashboard/categories/create" link = "categories" tableName="Category" datas={categories} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
     
}

export default Category