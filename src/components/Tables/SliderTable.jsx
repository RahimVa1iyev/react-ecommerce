import React, { useState ,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuEdit } from 'react-icons/lu';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setId } from '../../control/dashboardSlice';
import { toast } from 'react-toastify';


const SliderTable = (props) => {
  
  const navigate = useNavigate();
  const dishPatch = useDispatch();
let count = 1;
  const deleteHandle = async (id) => {
    await axios.delete(`https://localhost:7039/api/sliders/${id}`)
            .then(response => 
              toast.error('Slider deleted successfully', {
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
      navigate("/dashboard/sliders")
      dishPatch(setId(id))
}
    
    return (
        <>

            <div className="prtable">

            <div className="table-head d-flex align-items-center justify-content-between">
          <h6>Slider table</h6>  <Link to='/dashboard/sliders/create' id='cr-btn' className='btn btn-success'  >Create</Link>
        </div>

                <div className="table-body">
                  <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>First Title</th>
                            <th>Second Title</th>
                            <th>Button Text</th>
                            <th>Button Url</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    
                    </thead>
                  
                    <tbody>
                      {
                       props.sliders && props.sliders.map((sr, index)=>(
                        
                            <tr key={index}>
                            <td >{count++}</td>
                            <td>{sr.title}</td>
                            <td>{sr.secondTitle}</td>
                            <td>{sr.buttonText}</td>
                            <td>{sr.buttonUrl}</td>
                            
                            <td> 
                            <img  width={60} src={sr.imageUri} alt='my img' />
                             </td>
                        <td className='p-4 d-flex align-items-center justify-content-center gap-3' >
                          <Link  to={`/dashboard/sliders/${sr.id}`} id='up-btn' className='btn btn-warning d-flex align-items-center gap-1'>
                           <LuEdit className='table-icon' /> Edit
                          </Link> 
                            
                            <Link onClick={() => deleteHandle(sr.id)}   id='dlt-btn' className='btn btn-danger' > 
                            <MdDeleteForever className='table-icon' /> Delete
                            </Link> </td>

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

export default SliderTable