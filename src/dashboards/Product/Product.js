import React, { useState ,useEffect ,CSSProperties } from 'react'
import SideBar from '../../layouts/Dashboard/SideBar'
import DashNavbar from '../../layouts/Dashboard/DashNavbar'
import PrTable from '../../components/Tables/PrTable'
import ClockLoader from "react-spinners/ClockLoader";
import axios from 'axios';


const Product = () => {

    const override = {
        display: "block",
        margin: "220px auto 0 auto",
        borderColor: "#f9706a",
        border : "2px solid #f0706a"
      };
    var [products , setProducts] = useState();
    let [loading, setLoading] = useState(true); 

    const getProducts = async () => {

         const response = await axios.get("https://localhost:7039/api/Products/all")
         setProducts(response.data)   
         setLoading(false)
    }

    useEffect(() => {
      
      getProducts();
     
    }, [])
    
    
    return (
        <>
            <div className="top-side">
                <div className="container-fluid">
                    <div className="row  ">
                        <div className="col-lg-2-5">
                            <div className="dash-side-bar">
                                <SideBar openTab = {true} active = 'product' />
                            </div>
                        </div>
                        <div className="col-lg-9-5">
                            <div className="dashboard-index">

                               <DashNavbar />
                            </div>

                           {
                            loading === true ?  <ClockLoader
                            color= "#f9706a"
                            loading={loading}
                            cssOverride={override}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />  :  <PrTable products = {products} />
                           }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product