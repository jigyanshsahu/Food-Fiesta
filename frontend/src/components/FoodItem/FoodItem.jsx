import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, Image, category, onOpenModal }) => {
  const { cartitem, addtocart, removefromcart } = useContext(StoreContext);

  const rating = (4.3 + (id.charCodeAt(id.length - 1) % 7) * 0.1).toFixed(1);
  const prepTime = 20 + (id.charCodeAt(0) % 15);
  const isVeg = !name.toLowerCase().includes("chicken") && 
                !name.toLowerCase().includes("mutton") && 
                !name.toLowerCase().includes("fish") && 
                !name.toLowerCase().includes("meat") &&
                !name.toLowerCase().includes("egg");

  const handleCardClick = (e) => {
    // If click was on button, don't trigger modal
    if (e.target.closest('button')) return;
    if (onOpenModal) {
      onOpenModal({ id, name, price, description, Image, category });
    }
  };

  return (
    <div className='food-item card animate-scale-in' onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      
      {/* Food Image Container */}
      <div className="food-item__img-container">
        <img className='food-item__img' src={Image} alt={name} loading="lazy" />
        <div className="food-item__img-overlay" />
        
        {/* Top Badges */}
        <div className="food-item__top-badges">
          <span className={`food-item__diet-badge ${isVeg ? 'diet--veg' : 'diet--nonveg'}`}>
            <span className="diet-dot" />
          </span>
          <span className="food-item__rating-badge">
            ⭐ {rating}
          </span>
        </div>

        {/* Prep Time Tag */}
        <div className="food-item__time-tag">
          ⏱️ {prepTime} min
        </div>
      </div>

      {/* Food Details Info */}
      <div className='food-item__info'>
        <div className="food-item__header">
          <h3 className='food-item__name'>{name}</h3>
        </div>

        <p className='food-item__desc'>{description}</p>
        
        <div className="food-item__footer">
          <div className="food-item__price-box">
            <span className="food-item__price-currency">₹</span>
            <span className="food-item__price-val">{price}</span>
          </div>

          {/* Add to Cart Stepper Button */}
          {!cartitem[id] ? (
            <button 
              className="food-item__add-btn" 
              onClick={(e) => { e.stopPropagation(); addtocart(id); }}
              aria-label="Add item to cart"
            >
              <span>ADD</span>
              <span className="food-item__add-plus">+</span>
            </button>
          ) : (
            <div className="food-item__counter" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => removefromcart(id)} 
                className="food-item__counter-btn"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="food-item__count">{cartitem[id]}</span>
              <button 
                onClick={() => addtocart(id)} 
                className="food-item__counter-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default FoodItem;