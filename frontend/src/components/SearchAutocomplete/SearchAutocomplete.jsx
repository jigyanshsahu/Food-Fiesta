import React, { useState, useContext, useRef, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import FoodModal from '../FoodModal/FoodModal';
import './SearchAutocomplete.css';

const SearchAutocomplete = ({ placeholder = "Search for pizza, burger, pasta...", className = "" }) => {
  const { food_list, addtocart, url } = useContext(StoreContext);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = query.trim()
    ? (food_list || []).filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(val.trim().length > 0);
  };

  const handleSelectDish = (item) => {
    const imageUrl = item.Image && item.Image.startsWith("http") ? item.Image : url + "/Images/" + item.Image;
    setSelectedFood({ ...item, Image: imageUrl });
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/menu?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className={`search-autocomplete ${className}`} ref={searchRef}>
      
      {/* Detail Modal if selected */}
      {selectedFood && (
        <FoodModal
          item={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="search-autocomplete__form">
        <span className="search-autocomplete__icon">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(query.trim().length > 0)}
          placeholder={placeholder}
          className="search-autocomplete__input"
        />
        {query && (
          <button
            type="button"
            className="search-autocomplete__clear"
            onClick={() => { setQuery(""); setIsOpen(false); }}
          >
            ✕
          </button>
        )}
        <button type="submit" className="search-autocomplete__btn">
          Search
        </button>
      </form>

      {/* Floating Auto-Complete Dropdown */}
      {isOpen && (
        <div className="search-autocomplete__dropdown card shadow-xl animate-scale-in">
          {results.length > 0 ? (
            <div className="search-autocomplete__results">
              <div className="search-autocomplete__header">
                <span>Matching Dishes ({results.length})</span>
              </div>

              {results.map((item) => {
                const imageUrl = item.Image && item.Image.startsWith("http")
                  ? item.Image
                  : url + "/Images/" + item.Image;
                
                const isVeg = !item.name.toLowerCase().includes("chicken") && 
                              !item.name.toLowerCase().includes("mutton") && 
                              !item.name.toLowerCase().includes("fish") && 
                              !item.name.toLowerCase().includes("egg");

                return (
                  <div
                    key={item._id}
                    onClick={() => handleSelectDish(item)}
                    className="search-autocomplete__item"
                  >
                    <img src={imageUrl} alt={item.name} className="search-autocomplete__img" />
                    
                    <div className="search-autocomplete__info">
                      <div className="search-autocomplete__name-row">
                        <span className={`diet-dot-sm ${isVeg ? 'veg' : 'nonveg'}`} />
                        <h4 className="search-autocomplete__name">{item.name}</h4>
                      </div>
                      <span className="search-autocomplete__cat">{item.category}</span>
                    </div>

                    <div className="search-autocomplete__action">
                      <strong className="search-autocomplete__price">₹{item.price}</strong>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addtocart(item._id, true);
                        }}
                        className="search-autocomplete__add-btn"
                      >
                        + ADD
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="search-autocomplete__empty">
              <span>🍕 No dishes found for "{query}"</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default SearchAutocomplete;
