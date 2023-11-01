import axios from 'axios'
import React from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setId } from '../../control/dashboardSlice'
import { toast } from 'react-toastify'

const AdminTable = (props) => {

    let count =1
    const navigate = useNavigate();
    const disPatch = useDispatch();

    const deleteHandle = async (id) => {
        console.log(id);
        await axios.delete(`http://rahimcode-001-site1.ftempurl.com/api/Accounts/${id}`)
                .then(response => 
                    toast.error('Admin deleted successfully', {
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
          navigate(`/dashboard/admins`)
          disPatch(setId(id))
    }
    return (
        <>
            <div className="prtable">

                <div className="table-head d-flex align-items-center justify-content-between">
                    <h6>Admin table</h6>  <Link to={props.route} id='cr-btn' className='btn btn-success'  >Create</Link>
                </div>

                <div className="table-body">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Fullname</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.datas && props.datas.map((data, index) => (
                                    <tr key={index}>
                                        <td >{count++}</td>
                                        <td>{data.fullName}</td>
                                        <td>{data.userName}</td>
                                        <td>{data.role.map((rl,index) =>(
                                            rl
                                        ) )}</td>


                                        <td className='d-flex align-items-center justify-content-center gap-3' >
                                           

                                            <Link onClick={() => deleteHandle(data.id)} id='dlt-btn' className='btn btn-danger' >
                                                <MdDeleteForever sName='table-icon' /> Delete
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

export default AdminTable