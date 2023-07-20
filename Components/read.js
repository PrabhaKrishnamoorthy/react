import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';


function Read() {
    const {id}=useParams();
    const navigate = useNavigate();
    const [employee, setEmployee]=useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login');
        }else{
        axios.get('http://localhost:8001/read/' +id,{
            headers:{
                Authorization:token,
            },
        })
        .then(res=>{
            console.log(res)
            setEmployee(res.data[0]);
        })
        .catch(err=>console.log(err))
    }
    },[navigate,id]);
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <h2>Employee Details</h2>
                <div className="p-2">
                    <h2>{employee.id}</h2>
                    <h2>{employee.employee_id}</h2>
                    <h2>{employee.name}</h2>
                    <h2>{employee.email}</h2>
                    <h2>{employee.mobile_no}</h2>
                </div>
                <Link to="/employee" className="btn btn-primary me-2">Back</Link>
                <Link to={`/edit/${employee.id}`} className="btn btn-info">Edit</Link>
            </div>
        </div>
    )
}

export default Read;