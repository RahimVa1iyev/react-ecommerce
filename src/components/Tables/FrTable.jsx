import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuEdit } from 'react-icons/lu';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setId } from '../../control/dashboardSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const FrTable = (props) => {

 let navigate = useNavigate();
 let dishPatch = useDispatch();
 let count =1;

  const deleteHandle = async (id) => {
      await axios.delete(`http://rahimcode-001-site1.ftempurl.com/api/${props.link}/${id}`)
              .then(response =>
                toast.error(`${props.tableName} deleted successfully`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  })
      
                )
              .catch(error => console.log(error))
        navigate(`/dashboard/${props.link}`)
        dishPatch(setId(id))
  }
   
  return (
    <>

      <div className="prtable">

        <div className="table-head d-flex align-items-center justify-content-between">
          <h6>{props.tableName} table</h6>  <Link to={props.route} id='cr-btn' className='btn btn-success'  >Create</Link>
        </div>

        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Products Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                props.datas && props.datas.map((data, index) => (
                  <tr key={index}>
                    <td >{count++}</td>
                    <td>{data.name}</td>
                    <td>{data.productsCount}</td>
                    <td className='d-flex align-items-center justify-content-center gap-3' >
                      <Link  to={`/dashboard/${props.link}/${data.id}`} id='up-btn' className='btn btn-warning d-flex align-items-center gap-1'>
                        <LuEdit className='table-icon' /> Edit
                      </Link>
                        
                         <Link onClick={() => deleteHandle(data.id)} id='dlt-btn' className='btn btn-danger' >
                           <MdDeleteForever className='table-icon' /> Delete
                         </Link> 
                           
                           </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default FrTable