import React from 'react'
import Navbar from './components/Sidebar/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List'
import Add from './pages/Add/Add'
import Order from "./pages/Order/Orders";
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"

  return (
    <div className='admin-app'>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Navbar />
      <div className="admin-content">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<List url={url} />} />
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/orders' element={<Order url={url} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
