import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import './FoodModal.css';

const FoodModal = ({ item, onClose }) => {
  const { cartitem, addtocart, removefromcart } = useContext(StoreContext);
  const toast = useToast();

  const [spiceLevel, setSpiceLevel] = useState("Medium");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [portionQty, setPortionQty] = useState(cartitem[item._id] || 1);

  if (!item) return null;

  const isVeg = !item.name.toLowerCase().includes("chicken") && 
                !item.name.toLowerCase().includes("mutton") && 
                !item.name.toLowerCase().includes("fish") && 
                !item.name.toLowerCase().includes("egg");

  const addonsList = [
    { name: "Extra Cheese 🧀", price: 40 },
    { name: "Garlic Dip 🧄", price: 25 },
    { name: "Extra Sauce 🌶️", price: 20 },
  ];

  const toggleAddon = (addonName) => {
    setSelectedAddons(prev => 
      prev.includes(addonName) ? prev.filter(a => a !== addonName) : [...prev, addonName]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, name) => {
    const addon = addonsList.find(a => a.name === name);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const finalUnitPrice = item.price + addonsTotal;
  const grandTotal = finalUnitPrice * portionQty;

  const handleAddToCart = () => {
    // Call store context add to cart for the required quantity
    for (let i = (cartitem[item._id] || 0); i < portionQty; i++) {
      addtocart(item._id);
    }
    toast.success(`Added ${portionQty}x ${item.name} to cart!`);
    onClose();
  };

  return (
    <div className="food-modal">
      <div className="food-modal__overlay" onClick={onClose} />
      
      <div className="food-modal__container card animate-scale-in">
        
        {/* Close Button */}
        <button className="food-modal__close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Modal Hero Image Header */}
        <div className="food-modal__img-wrap">
          <img src={item.Image} alt={item.name} />
          <div className="food-modal__img-overlay" />
          
          <div className="food-modal__badges">
            <span className={`food-modal__diet ${isVeg ? 'diet--veg' : 'diet--nonveg'}`}>
              <span className="diet-dot" />
              {isVeg ? 'Pure Veg' : 'Non-Veg'}
            </span>
            <span className="food-modal__rating">⭐ 4.8 (120+ reviews)</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="food-modal__body">
          <h2 className="food-modal__title">{item.name}</h2>
          <p className="food-modal__desc">{item.description}</p>

          <div className="food-modal__meta-row">
            <div className="food-modal__meta-item">
              <span>⏱️ Prep Time</span>
              <strong>20-25 mins</strong>
            </div>
            <div className="food-modal__meta-item">
              <span>🔥 Calories</span>
              <strong>~420 kcal</strong>
            </div>
            <div className="food-modal__meta-item">
              <span>🥗 Category</span>
              <strong style={{ textTransform: 'capitalize' }}>{item.category || 'Special'}</strong>
            </div>
          </div>

          {/* Spice Level Selector */}
          <div className="food-modal__section">
            <label className="food-modal__section-label">Select Spice Level</label>
            <div className="food-modal__options">
              {['Mild 🌶️', 'Medium 🌶️🌶️', 'Hot 🌶️🌶️🌶️'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceLevel(level)}
                  className={`food-modal__option-btn ${spiceLevel === level ? 'active' : ''}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons Selector */}
          <div className="food-modal__section">
            <label className="food-modal__section-label">Customize Add-ons (Optional)</label>
            <div className="food-modal__addons-list">
              {addonsList.map((addon) => (
                <label key={addon.name} className="food-modal__addon-item">
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addon.name)}
                    onChange={() => toggleAddon(addon.name)}
                  />
                  <span>{addon.name}</span>
                  <strong>+₹{addon.price}</strong>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="food-modal__footer">
          <div className="food-modal__qty-stepper">
            <button
              onClick={() => setPortionQty(prev => Math.max(1, prev - 1))}
              disabled={portionQty <= 1}
            >
              −
            </button>
            <span>{portionQty}</span>
            <button onClick={() => setPortionQty(prev => prev + 1)}>
              +
            </button>
          </div>

          <button onClick={handleAddToCart} className="food-modal__add-btn">
            <span>Add to Cart</span>
            <strong>₹{grandTotal}</strong>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FoodModal;
