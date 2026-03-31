import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./Myorders.css";

const Myorders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      setOrders(response.data.data || []);
    } catch (err) {
      setError("Failed to load your orders. Please check your connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="my-orders-page animate-fade-in">
      <div className="orders-container">
        <header className="orders-header">
          <h1 className="page-title">My Orders</h1>
          <button onClick={fetchOrders} className="refresh-btn">
            <span>🔄</span> Refresh
          </button>
        </header>

        {loading && (
          <div className="orders-loading">
            <span className="spinner"></span>
            <p>Fetching your delicioso meals...</p>
          </div>
        )}
        
        {error && <div className="orders-error">{error}</div>}

        {!loading && !error && orders.length === 0 && (
          <div className="orders-empty card">
            <div className="empty-icon">📦</div>
            <h3>No orders yet</h3>
            <p>Hungry? Explore our menu and place your first order!</p>
            <button onClick={() => window.location.href = '/'}>Go To Menu</button>
          </div>
        )}

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card card shadow-sm">
              <div className="order-main">
                <div className="order-icon-box">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/679/679922.png"
                    alt="Package"
                  />
                </div>
                
                <div className="order-details">
                  <p className="order-items-list">
                    {order.items?.map((item, idx) => (
                      <span key={idx}>
                        {item.name} <small>x{item.quantity}</small>
                        {idx < order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <p className="order-date">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
                </div>

                <div className="order-stats">
                  <p className="order-amount">₹{order.amount}.00</p>
                  <p className="order-count">{order.items?.length || 0} Items</p>
                </div>

                <div className="order-status-box">
                  <div className={`status-badge ${order.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="dot"></span>
                    <p>{order.status || "Processing"}</p>
                  </div>
                </div>

                <div className="order-actions">
                  <button onClick={fetchOrders} className="track-btn">Track Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Myorders;
