import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthenticationForm from './Components/Login';
//import RequireAuth from './Components/Employeedet';
import RequireAuth from './Components/Employee';
import Create from './Components/create';
import Read from './Components/read';
import Update from './Components/update';
import WithNavbar from './Components/withNavbar';
import WithoutNavbar from './Components/withoutNavbar'

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<WithoutNavbar/>}>
        <Route path="/" element={<AuthenticationForm isLogin={true}/>}/>
        <Route path="/login" element={<AuthenticationForm isLogin={true}/>} />
        <Route path="/register" element={<AuthenticationForm isLogin={false}/>} />
        </Route>
      <Route element={<WithNavbar/>}>
        <Route path="/employee" element={<RequireAuth/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/read/:id" element ={<Read/>}/>
        <Route path="/edit/:id" element={<Update/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;