import React from 'react'
import Navbar from './components/Sidebar/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List'
import Add from './pages/Add/Add'
import Order from "./pages/Order/Orders";
import './App.css'
import { ToastContainer } from 'react-toastify';

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"

  return (
    <div className='h'>
      <ToastContainer />
      <Navbar />

      <div className="appcontent flex">
        <Sidebar />

        <Routes>
          {/* Default route */}
          <Route path='/' element={<List url={url} />} />

          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          {/* Corrected orders route */}
          <Route path='/orders' element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
  
