import React, { useEffect, useState } from 'react'
import { deleteEmployee, getAllDepartments, getEmployees, searchByName } from '../services/services'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Employees = () => {

    let nav = useNavigate()

    let [employees, setEmployees] = useState([])
    let [depts, setDepts] = useState([])
    let [deptsFilter, setDeptsFilter] = useState("")

    let [search, setSearch] = useState("")

    let fetchEmployees = async () => {
        let response4EmployeesAll = await getEmployees();
        let data = response4EmployeesAll.data
        setEmployees(data)

        let response4departmentsAll = await getAllDepartments();
        let departments = response4departmentsAll.data
        setDepts(departments)

        console.log("Departments", departments);

    }

    let handleSearch = async (e) => {
        let value = e.target.value
        setSearch(value)

        if (value.trim() === "") {
            fetchEmployees()
        } else {
            let response = await searchByName(value)
            setEmployees(response.data)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    let handleEdit = (id) => {
        nav(`/app/edit-employee/${id}`)
    }

    let handleDelete = async (id) => {
        let confirmed = window.confirm("Are you sure want to delete?")
        if (confirmed) {
            try {
                await deleteEmployee(id)
                fetchEmployees();
                toast.success("Employee deleted!")
            } catch (error) {
                toast.error("something went wrong!")
            }
        }
    }

    let filteredEmployees = employees.filter((emp) => emp.department === deptsFilter || deptsFilter === "")

    return (
        <div className="employees">
            <div className="employees-top">
                <h2>Employees</h2>
                <p>Manage your employee records</p>
            </div>
            <div className="employee-middle">
                <select name="department" onChange={(e) => setDeptsFilter(e.target.value)}>
                    <option value="">Select department</option>
                    {
                        depts.map((dept, index) => <option key={index} value={dept}>{dept}</option>)
                    }
                </select>
                <input type="text" onChange={handleSearch} value={search} placeholder='Search by name...' />
                <button onClick={() => nav("/app/add-employee")}>+Add Employee</button>
            </div>
            <div className="employee-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredEmployees.map((e) => {
                                return (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.department}</td>
                                        <td>{e.salary}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => handleEdit(e.id)}>Edit</button>
                                            <button className='btn-delete' onClick={() => handleDelete(e.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Employees