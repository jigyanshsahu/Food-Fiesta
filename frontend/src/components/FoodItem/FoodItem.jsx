import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, Image }) => {
  const { cartitem, addtocart, removefromcart } = useContext(StoreContext);

  return (
    <div className='food-item animate-scale-in'>
      <div className="food-item__img-container">
        <img className='food-item__img' src={Image} alt={name} />
        
        {!cartitem[id] ? (
          <button 
            className="food-item__add-btn" 
            onClick={() => addtocart(id)}
            aria-label="Add to cart"
          >
            <img src={assets.add} alt="" />
          </button>
        ) : (
          <div className="food-item__counter">
            <button onClick={() => removefromcart(id)} className="food-item__counter-btn">
              <img src={assets.minusred} alt="Decrease" />
            </button>
            <span className="food-item__count">{cartitem[id]}</span>
            <button onClick={() => addtocart(id)} className="food-item__counter-btn">
              <img src={assets.plusgreen} alt="Increase" />
            </button>
          </div>
        )}
      </div>

      <div className='food-item__info'>
        <div className="food-item__header">
          <h3 className='food-item__name'>{name}</h3>
          <div className="food-item__rating">
            {/* Hardcoded stars for visual polish */}
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star--dim">★</span>
          </div>
        </div>
        <p className='food-item__desc'>{description}</p>
        <p className='food-item__price'>₹{price}</p>
      </div>
    </div>
  )
}

export default FoodItem