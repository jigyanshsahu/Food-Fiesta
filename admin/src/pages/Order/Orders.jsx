import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import "./Order.css";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders([...response.data.data].reverse());
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Server error while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderid) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderid,
        status: event.target.value,
      });

      if (response.data.success) {
        toast.success("Status updated to " + event.target.value);
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orders-container animate-fade-in">
      <header className="page-header">
        <h1 className="page-title">Manage Orders</h1>
        <p className="page-subtitle">Track and update customer orders in real-time</p>
      </header>

      {loading ? (
        <div className="loading-state">
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state card">
          <img src={assets.parcel} alt="Empty" className="empty-icon" />
          <h3>No orders yet</h3>
          <p>Orders will appear here once customers place them.</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card card">
              <img src={assets.parcel} alt="Parcel" className="parcel-icon" />
              
              <div className="order-details-col">
                <p className="items-summary">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} <small>x{item.quantity}</small>
                      {i < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                
                <div className="customer-info">
                  <p className="customer-name">
                    {order.address.firstName} {order.address.lastname}
                  </p>
                  <p className="customer-address">
                    {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} {order.address.zipcode}
                  </p>
                  <p className="customer-phone">{order.address.phone}</p>
                </div>
              </div>

              <div className="order-stats-col">
                <span className="stats-label">Items</span>
                <p className="stats-value">{order.items.length}</p>
              </div>

              <div className="order-stats-col">
                <span className="stats-label">Amount</span>
                <p className="stats-value order-total">₹{order.amount}</p>
              </div>

              <div className="status-select-wrapper">
                <span className="stats-label">Update Status</span>
                <select
                  className="status-select"
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  <option value="food processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
