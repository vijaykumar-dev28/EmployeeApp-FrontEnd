import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addEmployee, getEmployees } from '../services/services'

const AddEmployee = () => {
    
    let nav = useNavigate()

    let [employee, setEmployee] = useState({
        "name": "",
        "email": "",
        "department": "",
        "salary": ""
    })

    let [depts, setDepts] = useState([])

    let fetchEmployees = async () => {
        try {
            let response = await getEmployees()
            let data = response.data

            let departments = [...new Set(data.map((emp) => emp.department))]
            setDepts(departments)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleChange = (e) => {
        let { name, value } = e.target
        setEmployee({ ...employee, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEmployee(employee)
            nav("/app/employees")
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="add-employee">
            <div className="employees-top">
                <h2>Add Employee</h2>
                <p>Fill in the details to add a new employee</p>
            </div>
            <div className="add-employee-form">
                <div className="form-top">
                    <div className="form-top-left">
                        {/* <img src="" alt="logo" /> */}
                    </div>
                    <div className="form-top-right">
                        <h3>Employee information</h3>
                        <hr />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter name' name="name" value={employee.name} onChange={handleChange} />
                    <input type="email" placeholder='Enter email' name="email" value={employee.email} onChange={handleChange} />
                    <select name="department" onChange={handleChange}>
                        <option value="">Select department</option>
                        {
                            depts.map((dept, index) => {
                                return (
                                    <option key={index} value={dept}>{dept}</option>
                                )
                            })
                        }
                    </select>
                    <input type="number" placeholder='Enter salary' name="salary" value={employee.salary} onChange={handleChange} />
                    <footer>
                        <button type='submit'>Submit</button>
                        <button type='button' onClick={() => nav("/app/employees")}>Cancel</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee