import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function WithNavbar() {
  return (
    <div>
        <Navbar/>
        <Outlet />
    </div>
  )
}

export default WithNavbar