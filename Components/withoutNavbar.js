import React from 'react'
import { Outlet } from 'react-router-dom'

function withoutNavbar() {
  return (
    <Outlet/>
  )
}

export default withoutNavbar