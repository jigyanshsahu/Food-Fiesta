import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/Storecontext";
import axios from "axios";

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
      setError("Failed to load orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  

 return (
  <div className="mt-24 h-[100vh] p-6">
    <h1 className="text-3xl font-semibold mb-6">My Orders</h1>

    {loading && <p className="text-gray-600">Loading your orders...</p>}
    {error && <p className="text-red-500">{error}</p>}

    {!loading && !error && orders.length === 0 && (
      <p className="text-gray-500">You have not placed any orders yet.</p>
    )}

    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-[#d5c4b2] rounded-xl p-6 flex items-center justify-between shadow-sm"
        >
          {/* LEFT ICON */}
          <div className="flex items-start gap-4 w-1/3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/679/679922.png"
              alt="Package"
              className="w-14 h-14"
            />
            <p className="text-gray-700 leading-relaxed">
              {order.items
                ?.map((item) => `${item.name} x ${item.quantity}`)
                .join(", ")}
            </p>
          </div>

          {/* MIDDLE */}
          <div className="flex flex-col items-center w-1/5">
            <p className="font-medium text-gray-800">
              ₹{order.amount}.00
            </p>
            <p className="text-gray-600 text-sm">
              Items: {order.items?.length || 0}
            </p>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2 w-1/5">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <p className="text-gray-700 font-medium">
              {order.status || "food Processing"}
            </p>
          </div>

          {/* BUTTON */}
          <div className="w-1/6 flex justify-end">
            <button onClick={fetchOrders} className="bg-[#f7d5d5] text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-[#f2c7c7] transition">
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default Myorders;
