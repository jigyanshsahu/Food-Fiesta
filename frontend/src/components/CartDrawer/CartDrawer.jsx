import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { DELIVERY_FEE } from '../../utils/constants';
import './CartDrawer.css';

const CartDrawer = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cartitem,
    food_list,
    addtocart,
    removefromcart,
    getcarttotalamount,
    url
  } = useContext(StoreContext);

  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const subtotal = getcarttotalamount();
  const freeDeliveryThreshold = 500;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = subtotal > 0 ? (isFreeDelivery ? 0 : DELIVERY_FEE) : 0;
  const total = subtotal + deliveryFee;

  const cartItemCount = Object.values(cartitem || {}).reduce((a, b) => a + b, 0);

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/order');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div className="cart-drawer">
      {/* Backdrop */}
      <div className="cart-drawer__overlay" onClick={() => setIsCartDrawerOpen(false)} />

      {/* Slide-over Content Container */}
      <div className="cart-drawer__container">
        
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__header-title">
            <span>🛒 Your Order</span>
            <strong>({cartItemCount} items)</strong>
          </div>
          <button
            className="cart-drawer__close-btn"
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Close cart drawer"
          >
            ✕
          </button>
        </div>

        {/* Free Delivery Goal Bar */}
        {subtotal > 0 && (
          <div className="cart-drawer__goal">
            <div className="cart-drawer__goal-text">
              {isFreeDelivery ? (
                <span>🎉 You've unlocked <strong>FREE Delivery!</strong></span>
              ) : (
                <span>Add <strong>₹{(freeDeliveryThreshold - subtotal).toFixed(0)}</strong> more for <strong>FREE Delivery</strong></span>
              )}
            </div>
            <div className="cart-drawer__goal-bar">
              <div
                className="cart-drawer__goal-fill"
                style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="cart-drawer__body">
          {subtotal > 0 ? (
            <div className="cart-drawer__items-list">
              {food_list.map((item) => {
                if (cartitem[item._id] > 0) {
                  const imageUrl =
                    item.Image && item.Image.startsWith("http")
                      ? item.Image
                      : url + "/Images/" + item.Image;

                  return (
                    <div key={item._id} className="cart-drawer__item">
                      <img src={imageUrl} alt={item.name} className="cart-drawer__item-img" />
                      
                      <div className="cart-drawer__item-info">
                        <h4 className="cart-drawer__item-name">{item.name}</h4>
                        <span className="cart-drawer__item-price">₹{item.price}</span>
                      </div>

                      {/* Stepper */}
                      <div className="cart-drawer__qty">
                        <button onClick={() => removefromcart(item._id)}>−</button>
                        <span>{cartitem[item._id]}</span>
                        <button onClick={() => addtocart(item._id)}>+</button>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">🍽️</div>
              <h3>Your cart is empty</h3>
              <p>Add some delicious dishes to get started!</p>
            </div>
          )}
        </div>

        {/* Footer Summary & Action Buttons */}
        {subtotal > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__summary-row">
              <span>Subtotal</span>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>

            <div className="cart-drawer__summary-row">
              <span>Delivery Fee</span>
              <strong>{isFreeDelivery ? <span style={{ color: 'var(--success)' }}>FREE</span> : `₹${deliveryFee}`}</strong>
            </div>

            <div className="cart-drawer__summary-row cart-drawer__summary-row--total">
              <span>Total Amount</span>
              <strong className="cart-drawer__total-val">₹{total.toFixed(2)}</strong>
            </div>

            <div className="cart-drawer__actions">
              <button onClick={handleViewCart} className="cart-drawer__btn-cart">
                View Full Cart
              </button>
              <button onClick={handleCheckout} className="cart-drawer__btn-checkout">
                Checkout →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;
