import React from 'react'
import { LuEdit } from 'react-icons/lu';
import { Link } from 'react-router-dom'

const MessageTable = (props) => {
    let count =1;
   
    console.log(props.datas);
  

    return (
        <>
            <div className="prtable">

                <div className="table-head d-flex align-items-center justify-content-between">
                    <h6>Messages table</h6> 
                </div>

                <div className="table-body">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Fullname</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Subject</th>
                                <th>Text</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.datas && props.datas.map((data, index) => (
                                    <tr key={index}>
                                        <td >{count++}</td>
                                        <td>{data.fullName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.subject}</td>
                                        <td>{data.text}</td>

                                        <td className='d-flex align-items-center justify-content-center' >


                                            <Link to={`/dashboard/response/${data.id}`} id='response-btn' className='btn btn-primary' >
                                                <LuEdit sName='table-icon' /> Response 
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

export default MessageTable