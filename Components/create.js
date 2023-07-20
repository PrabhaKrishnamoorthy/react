import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Create() {
    const [values, setValues]=useState({
        id:'',
        employee_id:'',
        name:'',
        email:'',
        mobile_no:''
    })

    const navigate=useNavigate();
    const token = localStorage.getItem('token');

    useEffect(()=>{
        if(!token){
            navigate('/');
        }
    },[navigate,token]);
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8001/create',values,{
            headers:{
                Authorization:token,
            },
        })
        .then(res=>{
            console.log(res);
            navigate('/employee')
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleSubmit}>
                <h2>Add Employee</h2>
                <div className="mb-2">
                <label htmlFor="">Id</label>
                <input type="number" placeholder="Enter id" className="form-control"
                onChange={e=>setValues({...values, id:e.target.value})}
                /> 
                </div>
                <div className="mb-2">
                <label htmlFor="">Employee-Id</label>
                <input type="number" placeholder="Enter Employee-id" className="form-control"
                onChange={e=>setValues({...values, employee_id:e.target.value})}
                /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter Employee Name" className="form-control"
                    onChange={e=>setValues({...values, name:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter email"
                    onChange={e=>setValues({...values, email:e.target.value})}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Mobile No</label>
                    <input type="tel" placeholder="Enter mobile no"
                    onChange={e=>setValues({...values, mobile_no:e.target.value})}
                    />
                </div>
                <button className="btn btn-success me-3">Submit</button>
                <Link to="/employee" className="btn btn-primary">Cancel</Link>
            </form>
        </div>
    </div>
  )
}

export default Create;

