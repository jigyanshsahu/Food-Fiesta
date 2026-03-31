import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list, url } = useContext(StoreContext);

  // Filter food list based on selected category
  const filteredList = food_list.filter(item => 
    category === "all" || category === "ALL" || category === item.category
  );

  return (
    <section className='food-display' id='food-display'>
      <div className="food-display__header">
        <h2 className='food-display__title'>Top Dishes Near You</h2>
        <p className="food-display__subtitle">Freshly prepared and delivered with care</p>
      </div>

      {filteredList.length > 0 ? (
        <div className="food-display__list">
          {filteredList.map((item) => (
            <div key={item._id} className="food-display__item-wrapper animate-fade-in">
              <FoodItem
                id={item._id}  
                name={item.name}
                description={item.description}
                price={item.price}
                Image={item.Image.startsWith("http") ? item.Image : url + "/Images/" + item.Image}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="food-display__empty">
          <div className="food-display__empty-icon">🍽️</div>
          <p>No dishes found in this category yet.</p>
        </div>
      )}
    </section>
  );
};

export default FoodDisplay;
