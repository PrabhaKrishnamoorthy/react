import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';


function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: '',
    employee_id: '',
    name: '',
    email: '',
    mobile_no: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios
        .get('http://localhost:8001/read/' + id, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
          setValues((prevValues) => ({
            ...prevValues,
            id: res.data[0].id,
            employee_id: res.data[0].employee_id,
            name: res.data[0].name,
            email: res.data[0].email,
            mobile_no: res.data[0].mobile_no,
          }));
        })
        .catch((err) => {
          console.log(err);
          navigate('/employee');
        });
    }
  }, [navigate, id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if(!token){
        navigate('/login');
    }else{
        axios
        .put('http://localhost:8001/update/' + id, values)
        .then((res) => {
          console.log(res);
          navigate('/employee');
        })
        .catch((err) => console.log(err));
    };
    }
   

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-70 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update Employee Details</h2>
          <div className="mb-2">
            <label>id</label>
            <input
              type="number"
              className="form-control"
              value={values.id}
              onChange={(e) =>
                setValues((prevValues) => ({ ...prevValues, id: e.target.value }))
              }
            />
          </div>
          <div className="mb-2">
            <label>employee_id</label>
            <input
              type="number"
              className="form-control"
              value={values.employee_id}
              onChange={(e) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  employee_id: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-2">
            <label>name</label>
            <input
              type="text"
              className="form-control"
              value={values.name}
              onChange={(e) =>
                setValues((prevValues) => ({ ...prevValues, name: e.target.value }))
              }
            />
          </div>
          <div className="mb-2">
            <label>email</label>
            <input
              type="email"
              className="form-control"
              value={values.email}
              onChange={(e) =>
                setValues((prevValues) => ({ ...prevValues, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-2">
            <label>Mobile_no</label>
            <input
              type="tel"
              className="form-control"
              value={values.mobile_no}
              onChange={(e) =>
                setValues((prevValues) => ({ ...prevValues, mobile_no: e.target.value }))
              }
            />
          </div>
          <button className="btn btn-success me-3">Update</button>
          <Link to="/employee" className="btn btn-primary">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
