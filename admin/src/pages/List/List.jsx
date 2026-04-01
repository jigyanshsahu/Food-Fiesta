import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      toast.error("Server error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Item removed successfully");
        await fetchList();
      } else {
        toast.error("Error removing item");
      }
    } catch (error) {
      toast.error("Server error while removing item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-container animate-fade-in">
      <header className="page-header">
        <h1 className="page-title">Manage Food List</h1>
        <p className="page-subtitle">View, track, and manage all your menu items</p>
      </header>

      <div className="list-table">
        <div className="table-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="skeleton-row" />
            <div className="skeleton-row" />
            <div className="skeleton-row" />
          </div>
        ) : list.length === 0 ? (
          <div className="empty-state">
            <p>No food items found. Add some to get started!</p>
          </div>
        ) : (
          list.map((item, index) => (
            <div key={index} className="table-row">
              <div className="food-img-container">
                <img
                  src={item.Image.startsWith("http") ? item.Image : `${url}/Images/${item.Image}`}
                  alt={item.name}
                  loading="lazy"
                />
              </div>
              <span className="food-name">{item.name}</span>
              <div className="category-wrapper">
                <span className="food-category">{item.category || "General"}</span>
              </div>
              <span className="food-price">₹{item.price}</span>
              <button 
                onClick={() => removeFood(item._id)} 
                className="remove-btn"
                title="Remove item"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
