import React,{ useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthenticationForm({isLogin}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8001/`)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>console.log(err));
    },[]);

    const handleUsernameChange =(e)=>{
        setUsername(e.target.value);
    };

    const handlePasswordChange =(e)=>{
        setPassword(e.target.value);
    };

    const handleSubmit =(e)=>{
        e.preventDefault();

        const user = {
            username,
            password
        };

        if (isLogin){
            //login request
            axios.post(`http://localhost:8001/login`,user)
            .then(res=>{
                console.log(res.data);
                localStorage.setItem('token',res.data.token);
                navigate('/employee');
            })
            .catch(err=>{
                console.log(err);
            })
        }else {
            //register request
            axios.post(`http://localhost:8001/register`, user)
            .then(res=>{
                console.log(res.data);
            })
            .catch (err=>{
                console.log(err);
            })
        }
    };

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-30 bg-white rounded p-3">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit = {handleSubmit}>
                    <div className="d-grid">
                    <label htmlFor="username">Username:</label>
                    <input 
                    type="text"
                    id="usename"
                    value={username}
                    onChange={handleUsernameChange}
                    />
                    <br>
                    </br>
                    <label htmlFor="password">Password:</label>
                    <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
                    <br />
                    </div>
                    <button type="submit">{isLogin ? 'Login' :'Register'}</button>
                    <br />
                    {isLogin ? (
                        <Link to="/register">Don't have an accound? Register here</Link>
                    ):(
                        <Link to="/login">Already have an accound? Login here</Link>
                    )}
                </form>
            </div>
        </div>
    );
}
export default AuthenticationForm;