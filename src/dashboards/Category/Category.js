import React , {useEffect , useState} from 'react'
import SideBar from '../../layouts/Dashboard/SideBar';
import DashNavbar from '../../layouts/Dashboard/DashNavbar';
import FrTable from '../../components/Tables/FrTable';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Category = () => {


    const [categories, setCategories] = useState();
  
    const {Id} = useSelector((store) => store.table)
  
    const getCategories = async () => {
      const response = await axios.get("https://localhost:7039/api/Categories/all")
      setCategories(response.data)
    }
  
  
    useEffect(() => {
      getCategories()
    }, [Id])
  
  
    return (
      <>
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