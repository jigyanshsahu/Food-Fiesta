import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartitem, food_list, removefromcart, getcarttotalamount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const subtotal = getcarttotalamount();
  const deliveryFee = subtotal > 0 ? 40 : 0; // Standard delivery fee in INR
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-page animate-fade-in">
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <p>Product</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Action</p>
            </div>

            {food_list.map((item) => {
              if (cartitem[item._id] > 0) {
                return (
                  <div key={item._id} className="cart-item">
                    <div className="cart-item__img-wrap">
                      <img src={url + "/Images/" + item.Image} alt={item.name} />
                    </div>
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__price">₹{item.price}</p>
                    <div className="cart-item__qty">
                      <span>{cartitem[item._id]}</span>
                    </div>
                    <p className="cart-item__total">₹{item.price * cartitem[item._id]}</p>
                    <button 
                      onClick={() => removefromcart(item._id)} 
                      className="cart-item__remove"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                );
              }
              return null;
            })}

            {subtotal === 0 && (
              <div className="cart-empty">
                <p>Your cart is empty. Time to order something delicious!</p>
                <button onClick={() => navigate('/')}>Browse Menu</button>
              </div>
            )}
          </div>

          <div className="cart-sidebar">
            <div className="cart-summary shadow-lg">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button
                disabled={subtotal === 0}
                onClick={() => navigate("/Order")}
                className="checkout-btn"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className="promo-code mt-6">
              <p>Have a promo code?</p>
              <div className="promo-input">
                <input type="text" placeholder="Enter code" />
                <button>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
