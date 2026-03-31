import React from 'react'
import { assets } from '../../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar  border-b border-black border-[2px] flex justify-between items-center p-3 '>
      <img className='logo h-20 w-20' src={assets.logo} alt="" />
      <img className='profile h-20 w-20' src={assets.admin  } alt="" />

    </div>
  )
}

export default Navbar
