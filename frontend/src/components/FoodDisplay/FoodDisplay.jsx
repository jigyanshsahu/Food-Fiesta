import React, { useContext } from 'react';
import './fooddisplay.css';
import { StoreContext } from '../../context/Storecontext';
import fooditem from '../fooditem/fooditem';

const foodDisplay = ({ category }) => {
  const { food_list, url } = useContext(StoreContext);

  return (
    <div className='food-display mt-7' id='food-display'>
      <h2 className='text-3xl font-bold'>Top dishes near You</h2>

      <div className="food-display-list">
        {food_list.map((item) => (
          <fooditem
            key={item._id}
            id={item._id}  
            name={item.name}
            description={item.description}
            price={item.price}
            Image={url + "/Images/" + item.Image}
          />
        ))}
      </div>
    </div>
  );
};

export default foodDisplay;
