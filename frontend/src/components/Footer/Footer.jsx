import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        
        {/* Column 1: Brand Info */}
        <div className="footer__col footer__col--brand">
          <Link to="/">
            <img className="footer__logo" src={assets.logo} alt="Food Fiesta" />
          </Link>
          <p className="footer__desc">
            Bringing your favorite restaurant dishes straight to your doorstep with express delivery, guaranteed freshness, and unmatched flavor.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook" className="footer__social-btn">📘</a>
            <a href="#" aria-label="Instagram" className="footer__social-btn">📸</a>
            <a href="#" aria-label="Twitter" className="footer__social-btn">🐦</a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Explore Menu</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/myorders">Order History</Link></li>
            <li><Link to="/cart">Cart Summary</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Customer Support</h4>
          <ul className="footer__contact-list">
            <li>📍 Tech Hub, Silicon Valley, CA</li>
            <li>📞 +91 1800 123 4567</li>
            <li>✉️ support@foodfiesta.com</li>
            <li>⏰ Open 24/7 for delivery</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer__col">
          <h4 className="footer__col-title">Subscribe & Save</h4>
          <p className="footer__newsletter-desc">
            Get <strong>₹100 OFF</strong> on your next meal order by subscribing to our secret deal newsletter!
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="footer__newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Join</button>
          </form>
          <div className="footer__payments">
            <span>💳 Safe Payment Partners</span>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="footer__bottom">
        <p>© 2026 Food Fiesta Inc. All Rights Reserved. Crafted for food lovers everywhere.</p>
      </div>
    </footer>
  );
};

export default Footer;
