import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import FoodModal from '../FoodModal/FoodModal';

const FoodDisplay = ({ category, searchQuery = "" }) => {
  const { food_list, foodLoading, url } = useContext(StoreContext);
  const [filterType, setFilterType] = useState("all");
  const [selectedFood, setSelectedFood] = useState(null);

  // Filter food items based on category, search text, and active filter chip
  const filteredList = (food_list || []).filter(item => {
    const matchCategory = category === "all" || category === "ALL" || category === item.category;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchFilter = true;
    if (filterType === "veg") {
      const nameLower = item.name.toLowerCase();
      matchFilter = !nameLower.includes("chicken") && !nameLower.includes("mutton") && !nameLower.includes("fish") && !nameLower.includes("egg");
    } else if (filterType === "budget") {
      matchFilter = item.price <= 200;
    }

    return matchCategory && matchSearch && matchFilter;
  });

  return (
    <section className='food-display' id='food-display'>
      
      {/* Dish Modal popup */}
      {selectedFood && (
        <FoodModal
          item={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}

      {/* Header & Filter Controls */}
      <div className="food-display__header">
        <div>
          <span className="food-display__badge">FRESHLY PREPARED</span>
          <h2 className='food-display__title'>
            {category === "all" ? "Top Dishes Near You" : `${category.replace(/-/g, " ")} Specialities`}
          </h2>
          <p className="food-display__subtitle">
            Showing {filteredList.length} delicious options ready for express delivery
          </p>
        </div>

        {/* Quick Filter Pills */}
        <div className="food-display__filter-pills">
          <button
            onClick={() => setFilterType("all")}
            className={`food-display__filter-btn ${filterType === "all" ? "food-display__filter-btn--active" : ""}`}
          >
            All Dishes
          </button>
          <button
            onClick={() => setFilterType("veg")}
            className={`food-display__filter-btn ${filterType === "veg" ? "food-display__filter-btn--active" : ""}`}
          >
            🥗 Pure Veg
          </button>
          <button
            onClick={() => setFilterType("budget")}
            className={`food-display__filter-btn ${filterType === "budget" ? "food-display__filter-btn--active" : ""}`}
          >
            💰 Under ₹200
          </button>
        </div>
      </div>

      {/* Grid List */}
      {foodLoading ? (
        <div className="food-display__list">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="food-display__item-wrapper">
              <div className="food-item food-item--skeleton card">
                <div className="skeleton-shimmer" style={{ height: '200px', width: '100%' }} />
                <div className="food-item__info" style={{ padding: '16px' }}>
                  <div className="skeleton-shimmer" style={{ height: '20px', width: '70%', borderRadius: '6px', marginBottom: '10px' }} />
                  <div className="skeleton-shimmer" style={{ height: '14px', width: '90%', borderRadius: '6px', marginBottom: '8px' }} />
                  <div className="skeleton-shimmer" style={{ height: '14px', width: '50%', borderRadius: '6px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredList.length > 0 ? (
        <div className="food-display__list">
          {filteredList.map((item) => (
            <div key={item._id} className="food-display__item-wrapper animate-fade-in">
              <FoodItem
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                category={item.category}
                Image={item.Image && item.Image.startsWith("http") ? item.Image : url + "/Images/" + item.Image}
                onOpenModal={(foodData) => setSelectedFood(foodData)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="food-display__empty card">
          <div className="food-display__empty-icon">🍕</div>
          <h3>No dishes found</h3>
          <p>Try searching for something else or clearing your category filters.</p>
        </div>
      )}
    </section>
  );
};

export default FoodDisplay;
