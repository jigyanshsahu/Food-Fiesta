import React from "react";
import { assets } from "../../../assets/assets";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar w-[18%] h-[126vh] border-l border-black border-[2px]">
      <div className="sidebaroption">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `sidebaroptions pt-[50px] pl-[20%] flex gap-5 ${
              isActive ? "active" : ""
            }`
          }
        >
          <img src={assets.addcircle} alt="" />
          <p>Add items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `sidebaroptions pt-[50px] pl-[20%] flex gap-5 ${
              isActive ? "active" : ""
            }`
          }
        >
          <img src={assets.task} alt="" />
          <p>List item</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `sidebaroptions pt-[50px] pl-[20%] flex gap-5 ${
              isActive ? "active" : ""
            }`
          }
        >
          <img src={assets.box} alt="" />
          <p>Order</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
