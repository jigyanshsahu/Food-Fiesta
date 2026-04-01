import React from "react";
import { assets } from "../../../assets/assets";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <NavLink to="/add" className="sidebar-option">
        <img src={assets.addcircle} alt="Add" />
        <span className="sidebar-label">Add Items</span>
      </NavLink>

      <NavLink to="/list" className="sidebar-option">
        <img src={assets.task} alt="List" />
        <span className="sidebar-label">List Items</span>
      </NavLink>

      <NavLink to="/orders" className="sidebar-option">
        <img src={assets.box} alt="Orders" />
        <span className="sidebar-label">Orders</span>
      </NavLink>
    </aside>
  );
};

export default Sidebar;
