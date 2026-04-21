import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx"

import Cart from './pages/Cart/Cart';
import Placeorder from './pages/Placeorder/Placeorder.jsx';
import Footer from "./components/Footer/Footer";

import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from "./pages/Verify/Verify.jsx";

import Myorders from './pages/Myorders/Myorders';

const App = () => {
  const [showlogin, setShowlogin] = useState(false);

  return (
    <>
      {showlogin && <LoginPopup setShowlogin={setShowlogin} />}
      
      <div className='app'>
        <Navbar setShowlogin={setShowlogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/Myorder' element={<Myorders />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
