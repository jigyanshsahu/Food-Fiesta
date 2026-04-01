import React, { useContext, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import './Verify.css'
import axios from 'axios'

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderid = searchParams.get("orderid");

  const { url } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      console.log("Verifying payment with:", { success, orderid });
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderid
      });

      if (response.data.success) {
        navigate("/Myorder");
      } else {
        console.warn("Payment verification failed on backend:", response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
