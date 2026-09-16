import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = ({ setShowlogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, settoken, getcarttotalamount, cartitem, url, setIsCartDrawerOpen } = useContext(StoreContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [latestOrderStatus, setLatestOrderStatus] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Total cart item count & total amount
  const cartCount = Object.values(cartitem || {}).reduce((a, b) => a + b, 0);
  const cartTotal = getcarttotalamount();

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    setLatestOrderStatus("");
    navigate("/");
    setOpenDropdown(false);
  };

  const fetchLatestOrder = async () => {
    if (token) {
      try {
        const response = await axios.post(
          url + "/api/order/userorders",
          {},
          { headers: { token } }
        );
        const orders = response.data.data;
        if (orders && orders.length > 0) {
          const sortedOrders = [...orders].reverse();
          const activeOrder = sortedOrders.find(o => o.status?.toLowerCase() !== "delivered");
          if (activeOrder) {
            setLatestOrderStatus(activeOrder.status);
          } else {
            setLatestOrderStatus("");
          }
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    }
  };

  useEffect(() => {
    if (!token) {
      setLatestOrderStatus("");
      return;
    }
    fetchLatestOrder();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") fetchLatestOrder();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") fetchLatestOrder();
    }, 60000);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [token]);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path === "/menu") return "menu";
    if (path === "/about") return "about";
    if (path === "/myorders") return "myorder";
    return "";
  };

  const activeTab = getActiveTab();

  const menuItems = [
    { key: "Home",    label: "Home",    action: () => navigate("/") },
    { key: "menu",   label: "Menu",    action: () => navigate("/menu") },
    token && { key: "myorder", label: latestOrderStatus ? `Status: ${latestOrderStatus}` : "My Orders", action: () => navigate("/myorders") },
    { key: "about",  label: "About Us", action: () => navigate("/about") },
  ].filter(Boolean);

  const handleCartClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/cart") {
      // If already on cart page, stay there
      return;
    }
    // Otherwise open slide-over cart drawer
    setIsCartDrawerOpen(true);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        
        {/* Brand Logo */}
        <Link to="/" className="navbar__logo">
          <img src={assets.logo} alt="Food Fiesta" />
        </Link>

        {/* Deliver To Location Widget */}
        <div className="navbar__location">
          <div className="navbar__location-icon">📍</div>
          <div className="navbar__location-info">
            <span className="navbar__location-label">DELIVER TO</span>
            <span className="navbar__location-val">Downtown, NY • ⚡ 25-30 min</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <ul className={`navbar__menu ${mobileMenuOpen ? 'navbar__menu--open' : ''}`}>
          {menuItems.map(({ key, label, action }) => (
            <li
              key={key}
              onClick={() => { action(); setMobileMenuOpen(false); }}
              className={`navbar__menu-item ${activeTab === key ? "navbar__menu-item--active" : ""} ${key === 'myorder' && latestOrderStatus ? 'navbar__menu-item--status' : ''}`}
            >
              {key === 'myorder' && latestOrderStatus && <span className="status-ping"></span>}
              {label}
            </li>
          ))}
        </ul>

        {/* Right Action Items */}
        <div className="navbar__actions">
          {/* Hamburger Icon */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span /><span /><span />
          </button>

          {/* Cart Pill with Icon + Count + Amount */}
          <button onClick={handleCartClick} className="navbar__cart-btn" aria-label="Shopping Cart">
            <div className="navbar__cart-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
            </div>
            <span className="navbar__cart-text">
              {cartTotal > 0 ? `₹${cartTotal}` : "Cart"}
            </span>
          </button>

          {/* User Sign In / Profile Dropdown */}
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
              <img src={assets.use} alt="User Profile" className="navbar__avatar" />
              <ul
                onClick={(e) => e.stopPropagation()}
                className={`navbar__dropdown ${openDropdown ? "navbar__dropdown--open" : ""}`}
              >
                <li onClick={() => { navigate("/myorders"); setOpenDropdown(false); }} className="navbar__dropdown-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  <span>My Orders</span>
                </li>
                <li onClick={() => { setIsCartDrawerOpen(true); setOpenDropdown(false); }} className="navbar__dropdown-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  <span>Quick Cart ({cartCount})</span>
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
