import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RequireAuth() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios
        .get('http://localhost:8001/employees', {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setData(res.data)  
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          navigate('/login');
        });
    }
  }, [navigate]);

  const handleDelete=(id)=>{
    const token =localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }else{
    axios.delete(`http://localhost:8001/delete/`+id,{
      headers:{
        Authorization:token,
      }
    })
    .then(res=>{
        toast.success("record deleted successfully!",{
            autoClose:15000
        });
        window.location.reload();
    })
    .catch(err=>console.log(err));
  }
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-70 bg-white rounded p-3">
        <h2>Employee Details</h2>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Create +
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>employee_id</th>
              <th>name</th>
              <th>email</th>
              <th>mobile_no</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{employee.id}</td>
                  <td>{employee.employee_id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobile_no}</td>
                  <td>
                  <Link to={`/read/${employee.id}`} className="btn btn-sm btn-info">Read</Link>
                  <Link to={`/edit/${employee.id}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
                  <button onClick={()=>handleDelete(employee.id)} className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default RequireAuth;
