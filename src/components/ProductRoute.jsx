import React from 'react'
import { Navigate } from 'react-router-dom'

const ProductRoute = ({children}) => {
    let token=localStorage.getItem("token")
    if(!token){
        return <Navigate to={"/login"}/>
    }
    return children
}

export default ProductRoute