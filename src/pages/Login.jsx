import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/services'
import companyLogo from '../assets/company_logo.png'

const Login = () => {

    let nav=useNavigate()

    let [user,setUser]=useState({
        "username":"",
        "password":""
    })

    let handleChange=(e)=>{
        let {name,value}=e.target
        setUser({...user,[name]:value})
    }

    let handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            let response=await login(user)
            let data=response.data
            localStorage.setItem("token",data.token)
            localStorage.setItem("role",data.role)
            localStorage.setItem("username",data.username)
            nav("/")
        } catch (error) {
            console.log(error);   
        }
    }

    return (
        <div className="login">
            <div className="login-left">
                <div className="login-logo">
                    <img src={companyLogo} alt="companyLogo" />
                    <h2>ABC Corporation</h2>
                </div>
                <p>Empowering Our People</p>
                <p>Building a Stronger Tomorrow</p>
            </div>
            <div className="login-right">
                <h1>Employee Management System</h1>
                <p>Sign in to your account</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username' value={user.username} onChange={handleChange} name='username'/>
                    <input type="password" placeholder='Password' value={user.password} onChange={handleChange} name='password'/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login