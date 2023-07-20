import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequireAuth(Component) {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If token not found, redirect to the login page
        navigate('/login');
      } else {
        // Verify token on the server side
        axios
          .get('http://localhost:8001/employees', {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            // Token is valid, proceed to render the component
            console.log(res.data);
          })
          .catch((err) => {
            // Token is invalid or expired, navigate to login page
            console.log(err);
            navigate('/login');
          });
      }
    }, [navigate]);

    return <Component {...props} />;
  }
}

function Employeedet() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      axios
        .get('http://localhost:8001/employees', {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
          // Handle error here, such as displaying an error message
        });
    }, []);
  
    // Rest

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
                    <button className="btn btn-sm btn-info">Read</button>
                    <button className="btn btn-sm btn-primary mx-2">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
}

export default RequireAuth(Employeedet);
