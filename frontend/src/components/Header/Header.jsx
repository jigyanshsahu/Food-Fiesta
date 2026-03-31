import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <section className="header" id="header">
      <div className="header__overlay" />
      <div className="header__content">
        <span className="header__badge">🔥 #1 Food Delivery</span>
        <h1 className="header__title">
          Delicious Food,<br />
          <span className="header__title-highlight">Delivered Fast</span>
        </h1>
        <p className="header__subtitle">
          Explore our curated menu of mouth-watering dishes — from sizzling pizzas to aromatic curries — delivered fresh to your doorstep.
        </p>
        <button
          onClick={() => document.getElementById("exploremenu")?.scrollIntoView({ behavior: "smooth" })}
          className="header__cta"
        >
          Explore Menu
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Header;
