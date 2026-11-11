import React from 'react'

const NavBar = () => {
        
    const username=localStorage.getItem("username")
    return (
        <nav>
            <div className="profile">
                <span>👤</span>
                <span className='admin-name'>{username}</span>
            </div>
        </nav>
    )
}

export default NavBar