import React, { useEffect, useState } from 'react'
import { getAllDepartments, getEmployees } from '../services/services'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import totalEmployees from '../assets/total_employees.png'
import totatDepartment from '../assets/total_departments.png'
import activeEmployees from '../assets/active_employees.png'

const Dashboard = () => {

    let username = localStorage.getItem("username")

    let [employees, setEmployees] = useState([])
    let [depts, setDepts] = useState([])

    let fetchEmployeesAndDepartments = async () => {
        try {

            let [response4EmployeesAll, response4departmentsAll] = await Promise.all([getEmployees(), getAllDepartments()])

            let data = response4EmployeesAll.data
            setEmployees(data)

            let data2 = response4departmentsAll.data
            setDepts(data2)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchEmployeesAndDepartments()
    }, [])

    let total_emps = employees.length
    let total_dept = depts.length

    let chart_data = depts.map(dept=>({
        department:dept,
        count:employees.filter(emp=>emp.department===dept).length
    }))
    
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back, {username}!</p>
            </div>
            <div className="dashboard-boxes">
                <div className="box">
                    <div className="box-image">
                        <img src={totalEmployees} alt="total_employees" />
                    </div>
                    <div className="box-cont">
                        <p>Total employees</p>
                        <h2>{total_emps}</h2>
                    </div>
                </div>
                <div className="box">
                    <div className="box-image">
                        <img src={totatDepartment} alt="total_department" />
                    </div>
                    <div className="box-cont">
                        <p>Total Departments</p>
                        <h2>{total_dept}</h2>
                    </div>
                </div>
                <div className="box">
                    <div className="box-image">
                        <img src={activeEmployees} alt="active_employees" />
                    </div>
                    <div className="box-cont">
                        <p>Active Employees</p>
                        <h2>{total_emps}</h2>
                    </div>
                </div>
            </div>
            <div className="dashboard-chart">
                <h3>Employees Per Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chart_data}>
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="department" />
                        <YAxis allowDecimals={false}/>
                        <Tooltip />
                        <Bar dataKey="count" fill="#1e3a5f" label={{ position: 'top' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Dashboard