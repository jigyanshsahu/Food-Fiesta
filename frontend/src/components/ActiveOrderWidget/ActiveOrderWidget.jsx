import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ActiveOrderWidget.css';

const ActiveOrderWidget = () => {
  const { token, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeOrder, setActiveOrder] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const fetchActiveOrder = async () => {
    if (!token) {
      setActiveOrder(null);
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      const orders = response.data.data || [];
      if (orders.length > 0) {
        const sorted = [...orders].reverse();
        // Find latest order that is not Delivered
        const latest = sorted.find(o => o.status?.toLowerCase() !== "delivered");
        if (latest) {
          setActiveOrder(latest);
        } else {
          setActiveOrder(null);
        }
      } else {
        setActiveOrder(null);
      }
    } catch (err) {
      console.error("Failed to fetch active order for widget:", err);
    }
  };

  useEffect(() => {
    fetchActiveOrder();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") fetchActiveOrder();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") fetchActiveOrder();
    }, 30000);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [token, url]);

  // Don't show widget on /myorders page or if no active order or dismissed
  if (!activeOrder || dismissed || location.pathname === "/myorders") {
    return null;
  }

  const getStatusIcon = (statusStr = "") => {
    const s = statusStr.toLowerCase();
    if (s.includes("out for delivery")) return "🛵";
    if (s.includes("preparing") || s.includes("processing")) return "👨‍🍳";
    return "📋";
  };

  const statusText = activeOrder.status || "Food Processing";
  const statusIcon = getStatusIcon(statusText);

  return (
    <div className="active-order-widget">
      {minimized ? (
        <button
          className="active-order-widget__bubble card shadow-lg"
          onClick={() => setMinimized(false)}
          title="Click to view live order status"
        >
          <span className="active-order-widget__pulse-dot" />
          <span className="active-order-widget__bubble-icon">{statusIcon}</span>
        </button>
      ) : (
        <div className="active-order-widget__bar card shadow-xl animate-fade-in-up">
          <div className="active-order-widget__left">
            <span className="active-order-widget__pulse-dot" />
            <span className="active-order-widget__icon">{statusIcon}</span>
            <div className="active-order-widget__info">
              <span className="active-order-widget__tag">LIVE ORDER STATUS</span>
              <p className="active-order-widget__status">
                #{activeOrder._id.slice(-6).toUpperCase()} • <strong>{statusText}</strong>
              </p>
            </div>
          </div>

          <div className="active-order-widget__right">
            <button
              onClick={() => navigate("/myorders")}
              className="active-order-widget__btn"
            >
              Track Order →
            </button>
            
            <button
              onClick={() => setMinimized(true)}
              className="active-order-widget__min-btn"
              title="Minimize"
              aria-label="Minimize order tracker"
            >
              −
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="active-order-widget__close-btn"
              title="Dismiss"
              aria-label="Close order tracker"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveOrderWidget;
