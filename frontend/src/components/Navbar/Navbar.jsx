import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setShowlogin }) => {
  const [menu, setmenu] = useState("Home");
  const navigate = useNavigate();
  const { token, settoken, getcarttotalamount } = useContext(StoreContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    navigate("/");
    setOpenDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src={assets.logo} alt="Flavor Fiesta" />
        </Link>

        <ul className="navbar__menu">
          {[
            { key: "Home", label: "Home", action: () => { setmenu("Home"); window.scrollTo({ top: 0, behavior: "smooth" }); }},
            { key: "menu", label: "Menu", action: () => { setmenu("menu"); document.getElementById("exploremenu")?.scrollIntoView({ behavior: "smooth" }); }},
            { key: "mobile-app", label: "App", action: () => { setmenu("mobile-app"); document.getElementById("appdownload")?.scrollIntoView({ behavior: "smooth" }); }},
            { key: "contact-app", label: "Contact", action: () => { setmenu("contact-app"); document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" }); }},
          ].map(({ key, label, action }) => (
            <li
              key={key}
              onClick={action}
              className={`navbar__menu-item ${menu === key ? "navbar__menu-item--active" : ""}`}
            >
              {label}
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Link to="/Cart" className="navbar__cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {getcarttotalamount() > 0 && <span className="navbar__cart-badge" />}
          </Link>

          {!token ? (
            <button
              onClick={() => setShowlogin(true)}
              className="navbar__signin"
            >
              Sign In
            </button>
          ) : (
            <div
              className="navbar__profile"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdown(!openDropdown);
              }}
            >
              <img src={assets.use} alt="Profile" className="navbar__avatar" />

              <ul
                onClick={(e) => e.stopPropagation()}
                className={`navbar__dropdown ${openDropdown ? "navbar__dropdown--open" : ""}`}
              >
                <li onClick={() => { navigate("/Myorder"); setOpenDropdown(false); }} className="navbar__dropdown-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  <span>My Orders</span>
                </li>
                <li onClick={() => { navigate("/Cart"); setOpenDropdown(false); }} className="navbar__dropdown-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  <span>Cart</span>
                </li>
                <div className="navbar__dropdown-divider" />
                <li onClick={logout} className="navbar__dropdown-item navbar__dropdown-item--danger">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
