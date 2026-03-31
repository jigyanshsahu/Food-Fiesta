import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import "./order.css";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  const statusHandler = async (event, orderid) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderid,
        status: event.target.value,
      });

      if (response.data.success) {
        toast.success("Order status updated");
        fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">

            <img src={assets.parcel} alt="" />

            <div>
              <p className="order-item-food">
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? item.name + " x " + item.quantity
                    : item.name + " x " + item.quantity + ", "
                )}
              </p>

              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastname}
              </p>

              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="food Processing">food Processing</option>
              <option value="Out for delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
