import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addEmployee, getEmployees, getEmployeesById, updateEmployee } from '../services/services'

const EditEmployee = () => {
    let nav = useNavigate()
    let { id } = useParams()
    let [employee, setEmployee] = useState({
        "name": "",
        "email": "",
        "department": "",
        "salary": ""
    })

    let [depts, setDepts] = useState([])

    let fetchEmployees = async () => {
        try {

            let [response4EmployeeById, reponse4EmployeeAll] = await Promise.all([getEmployeesById(id), getEmployees()])
            let data = response4EmployeeById.data
            let data2 = reponse4EmployeeAll.data

            setEmployee({
                name: data.name,
                email: data.email,
                department: data.department,
                salary: data.salary,
            })

            let departments = [...new Set(data2.map((emp) => emp.department))]
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
            await updateEmployee(id, employee)
            nav("/app/employees")
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="add-employee">
            <div className="employees-top">
                <h2>Edit Employee</h2>
                <p>Modify the details to edit the employee</p>
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
                    <select name="department" value={employee.department} onChange={handleChange}>
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

export default EditEmployee