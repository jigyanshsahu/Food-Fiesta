import React from "react";
import { useNavigate } from "react-router-dom";
import SearchAutocomplete from "../SearchAutocomplete/SearchAutocomplete";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const quickCategories = [
    { label: "Pizza 🍕", category: "Pizza" },
    { label: "Burgers 🍔", category: "Burger" },
    { label: "Rolls 🌯", category: "Rolls" },
    { label: "Desserts 🍰", category: "Deserts" },
    { label: "Salads 🥗", category: "Salad" },
  ];

  return (
    <section className="header" id="header">
      <div className="header__inner">

        {/* Left Column: Text & Search */}
        <div className="header__content">
          <span className="header__badge animate-fade-in">
            <span className="header__badge-dot" />
            ⚡ #1 Fast Food Delivery App
          </span>

          <h1 className="header__title animate-fade-in-up">
            Hungry? We've Got <br />
            <span className="header__title-gradient">Your Favorite Meals</span>
          </h1>

          <p className="header__subtitle animate-fade-in-up">
            Order from top local restaurants and get hot, delicious food delivered straight to your door in 30 minutes or less.
          </p>

          {/* Hero Live Search Box with Auto-Complete */}
          <div className="header__search-container animate-fade-in-up">
            <SearchAutocomplete placeholder="Search for pizza, burger, pasta..." />
          </div>

          {/* Quick Category Chips */}
          <div className="header__quick-chips">
            <span className="header__quick-label">Popular:</span>
            {quickCategories.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => navigate("/menu")}
                className="header__chip"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Trust Highlights */}
          <div className="header__trust-row">
            <div className="header__trust-item">
              <span className="header__trust-number">30 Min</span>
              <span className="header__trust-label">Avg. Delivery Time</span>
            </div>
            <div className="header__trust-divider" />
            <div className="header__trust-item">
              <span className="header__trust-number">4.9 ★</span>
              <span className="header__trust-label">Customer Rating</span>
            </div>
            <div className="header__trust-divider" />
            <div className="header__trust-item">
              <span className="header__trust-number">10k+</span>
              <span className="header__trust-label">Daily Deliveries</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Hero Banner Card & Floating Badges */}
        <div className="header__visual">
          <div className="header__visual-bg-glow" />
          
          <div className="header__main-card card">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
              alt="Delicious Pizza"
              className="header__hero-img"
            />
            
            <div className="header__hero-img-overlay" />

            {/* Floating Badge 1: Hot Deal */}
            <div className="header__float-badge header__float-badge--top">
              <span className="header__float-icon">🔥</span>
              <div>
                <p className="header__float-title">50% OFF</p>
                <p className="header__float-sub">On your first order</p>
              </div>
            </div>

            {/* Floating Badge 2: Delivery Guarantee */}
            <div className="header__float-badge header__float-badge--bottom">
              <span className="header__float-icon">🚴</span>
              <div>
                <p className="header__float-title">Express Delivery</p>
                <p className="header__float-sub">Fresh & piping hot</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Header;
