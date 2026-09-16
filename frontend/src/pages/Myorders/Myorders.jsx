import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./Myorders.css";

const Myorders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeToken = token || localStorage.getItem("token");

  const fetchOrders = async () => {
    const currentToken = token || localStorage.getItem("token");
    if (!currentToken) return;

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        {
          headers: { token: currentToken }
        }
      );
      setOrders(response.data.data || []);
    } catch (err) {
      setError("Failed to load your orders. Please check your internet connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeToken) fetchOrders();
  }, [activeToken]);

  // Map order status string to stepper index (0: Placed, 1: Preparing, 2: Out for delivery, 3: Delivered)
  const getStatusStep = (statusStr = "") => {
    const s = statusStr.toLowerCase();
    if (s.includes("delivered")) return 3;
    if (s.includes("out for delivery")) return 2;
    if (s.includes("food processing") || s.includes("preparing")) return 1;
    return 0; // Default Placed
  };

  return (
    <div className="my-orders-page animate-fade-in">
      <div className="orders-container">
        
        {/* Header */}
        <header className="orders-header">
          <div>
            <span className="orders-badge">ORDER HISTORY</span>
            <h1 className="page-title">My Orders & Live Tracker</h1>
          </div>
          <button onClick={fetchOrders} className="refresh-btn">
            <span>🔄</span> Refresh Status
          </button>
        </header>

        {loading && (
          <div className="orders-loading card">
            <span className="spinner"></span>
            <p>Fetching your delicious orders...</p>
          </div>
        )}
        
        {error && <div className="orders-error card">{error}</div>}

        {!loading && !error && orders.length === 0 && (
          <div className="orders-empty card">
            <div className="empty-icon">🍕</div>
            <h3>No Orders Placed Yet</h3>
            <p>Craving something yummy? Browse our menu and place your first order!</p>
            <button onClick={() => window.location.href = '/menu'} className="orders-empty-btn">
              Browse Menu
            </button>
          </div>
        )}

        <div className="orders-list">
          {orders.map((order) => {
            const currentStep = getStatusStep(order.status);

            return (
              <div key={order._id} className="order-card card shadow-sm">
                
                {/* Order Top Summary */}
                <div className="order-card__header">
                  <div>
                    <span className="order-card__id">Order #{order._id.slice(-8).toUpperCase()}</span>
                    {order.date && (
                      <span className="order-card__date">
                        • {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                  <div className="order-card__price">
                    ₹{order.amount}.00
                  </div>
                </div>

                {/* Live Tracker Stepper Progress Bar */}
                <div className="order-tracker">
                  <div className="order-tracker__steps">
                    
                    <div className={`tracker-step ${currentStep >= 0 ? 'step--completed' : ''} ${currentStep === 0 ? 'step--active' : ''}`}>
                      <div className="tracker-step__icon">📋</div>
                      <span className="tracker-step__label">Order Placed</span>
                    </div>

                    <div className={`tracker-step ${currentStep >= 1 ? 'step--completed' : ''} ${currentStep === 1 ? 'step--active' : ''}`}>
                      <div className="tracker-step__icon">👨‍🍳</div>
                      <span className="tracker-step__label">Preparing</span>
                    </div>

                    <div className={`tracker-step ${currentStep >= 2 ? 'step--completed' : ''} ${currentStep === 2 ? 'step--active' : ''}`}>
                      <div className="tracker-step__icon">🛵</div>
                      <span className="tracker-step__label">On the Way</span>
                    </div>

                    <div className={`tracker-step ${currentStep >= 3 ? 'step--completed' : ''} ${currentStep === 3 ? 'step--active' : ''}`}>
                      <div className="tracker-step__icon">🎉</div>
                      <span className="tracker-step__label">Delivered</span>
                    </div>

                  </div>
                </div>

                {/* Order Items List */}
                <div className="order-card__items-box">
                  <span className="order-items-label">Items ({order.items?.length || 0}):</span>
                  <p className="order-items-list">
                    {order.items?.map((item, idx) => (
                      <span key={idx} className="order-item-chip">
                        {item.name} <strong>x{item.quantity}</strong>
                        {idx < order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="order-card__footer">
                  <div className="order-status-badge">
                    <span className="status-dot-pulse" />
                    <span>Status: <strong>{order.status || "Food Processing"}</strong></span>
                  </div>
                  <button onClick={fetchOrders} className="track-btn">
                    Track Live
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Myorders;
