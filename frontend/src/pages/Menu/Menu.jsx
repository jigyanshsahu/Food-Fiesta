import React, { useState } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import './Menu.css';

const Menu = () => {
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="menu-page animate-fade-in">
      {/* Page Hero Banner */}
      <div className="menu-page__hero">
        <div className="menu-page__hero-glow" />
        <span className="menu-page__badge">🍽️ Fresh & Delicious</span>
        <h1 className="menu-page__title">
          Our <span>Menu</span>
        </h1>
        <p className="menu-page__subtitle">
          Bold flavors, fresh ingredients — pick your favourite and we'll deliver in minutes.
        </p>

        {/* Search Bar */}
        <div className="menu-page__search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="menu-page__search-input"
          />
          {searchQuery && (
            <button className="menu-page__search-clear" onClick={() => setSearchQuery("")}>×</button>
          )}
        </div>
      </div>

      {/* Category Filter + Food Grid */}
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchQuery={searchQuery} />
    </main>
  );
};

export default Menu;
