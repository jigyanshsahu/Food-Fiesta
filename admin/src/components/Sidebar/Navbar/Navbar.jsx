import React from 'react'
import { assets } from '../../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='admin-navbar'>
      <div className="nav-left">
        <img className='admin-logo' src={assets.logo} alt="Food Fiesta" />
        <span className="brand-name">Food Fiesta<span className="brand-badge">Admin</span></span>
      </div>
      
      <div className="nav-right">
        <div className="admin-profile-box">
          <div className="admin-info">
            <span className="admin-name">Admin Dashboard</span>
            <span className="admin-role">Manage Food & Orders</span>
          </div>
          <img className='admin-avatar' src={assets.admin} alt="Profile" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
