import React from 'react'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'
import ProductRoute from './components/ProductRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<ProductRoute><Layout/></ProductRoute>}>
          <Route index element={<Navigate to={'/app/dashboard'}/>}/>
          <Route path='/app/dashboard' element={<Dashboard/>}/>
          <Route path='/app/employees' element={<Employees/>}/>
          <Route path='/app/add-employee' element={<AddEmployee/>}/>
          <Route path='/app/edit-employee/:id' element={<EditEmployee/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App