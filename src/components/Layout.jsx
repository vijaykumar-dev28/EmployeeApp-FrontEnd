import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const Layout = () => {
  return (
    <div className="layout">
        <Sidebar/>
        <div className="main-content">
            <NavBar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout