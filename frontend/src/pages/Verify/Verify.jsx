import React, { useContext, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import './Verify.css'
import axios from 'axios'

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  const success = searchParams.get("success");
  const orderid = searchParams.get("orderid") || searchParams.get("orderId") || searchParams.get("order_id");

  const { url, setcartitem } = useContext(StoreContext);

  const verifyPayment = async () => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    if (!orderid) {
      console.warn("No order id found in payment return URL");
      navigate("/myorders", { replace: true });
      return;
    }

    try {
      console.log("Verifying payment with:", { success, orderid });
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderid
      });

      if (response.data.success) {
        if (setcartitem) setcartitem({});
        navigate("/order-confirmation", { replace: true, state: { orderId: orderid } });
      } else {
        console.warn("Payment verification failed on backend:", response.data.message);
        navigate("/cart", { replace: true });
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      navigate("/", { replace: true });
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
