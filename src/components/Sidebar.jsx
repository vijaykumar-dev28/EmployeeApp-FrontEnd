import React from 'react'
import { NavLink } from 'react-router-dom'
import companyLogo from '../assets/company_logo.png'

const Sidebar = () => {

  let handleLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("role")
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={companyLogo} alt="" />
        <h2>ABC Corporation</h2>
      </div>
      <div className="sidebar-links">
        <NavLink to={"/app/dashboard"}>Dashboard</NavLink>
        <NavLink to={"/app/employees"}>Employees</NavLink>
        <NavLink to={"/app/add-employee"}>Add Employee</NavLink>
        <NavLink to={"/login"} onClick={handleLogout}>Log out</NavLink>
      </div>
    </div>
  )
}

export default Sidebar