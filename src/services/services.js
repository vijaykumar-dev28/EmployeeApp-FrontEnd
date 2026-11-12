import api from "../api/api"

// login
export const login=(data)=>api.post("/auth/login",data)

// getEmployeesAll
export const getEmployees=()=>api.get("/employee")
export const getEmployeesById=(id)=>api.get(`/employee/${id}`)
export const addEmployee=(data)=>api.post(`/employee`,data)
export const updateEmployee=(id,data)=>api.put(`/employee/${id}`,data)
export const deleteEmployee=(id)=>api.delete(`/employee/${id}`)
export const searchByName=(name)=>api.get(`/employee/search?name=${name}`)

// departments
export const getAllDepartments=()=>api.get("/department")
