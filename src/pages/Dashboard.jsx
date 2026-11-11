import React, { useEffect, useState } from 'react'
import { getEmployees } from '../services/services'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import totalEmployees from '../assets/total_employees.png'
import totatDepartment from '../assets/total_departments.png'
import activeEmployees from '../assets/active_employees.png'

const Dashboard = () => {

    let username = localStorage.getItem("username")

    let [employees, setEmployees] = useState([])

    let fetchEmployees = async () => {
        try {
            let response = await getEmployees()
            let data = response.data
            setEmployees(data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    let total_emps = employees.length
    let total_dept = new Set(employees.map((emp) => emp.department)).size

    let chart_data = []
    employees.forEach((emp) => {
        let exist = chart_data.find(item => item.department === emp.department)
        if (exist) {
            exist.count++;
        } else {
            chart_data.push({ department: emp.department, count: 1 })
        }
    })
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
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis/>
                        <Tooltip />
                        <Bar dataKey="count" fill="#1e3a5f" label={{ position: 'top' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Dashboard