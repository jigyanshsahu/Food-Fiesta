import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { DELIVERY_FEE } from "../../utils/constants";
import "./Cart.css";

const Cart = () => {
  const { cartitem, food_list, addtocart, removefromcart, getcarttotalamount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");

  const subtotal = getcarttotalamount();
  const freeDeliveryThreshold = 500;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = subtotal > 0 ? (isFreeDelivery ? 0 : DELIVERY_FEE) : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    const codeUpper = promoCode.trim().toUpperCase();
    if (codeUpper === "FIESTA50" || codeUpper === "FREEDEL" || codeUpper === "COMBO20") {
      setDiscount(50);
      setAppliedCode(codeUpper);
      toast.success(`Coupon "${codeUpper}" applied! Saved ₹50`);
    } else {
      toast.error("Invalid coupon code. Try 'FIESTA50'");
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCode("");
    setPromoCode("");
    toast.info("Coupon removed");
  };

  const cartItemCount = Object.values(cartitem || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="cart-page animate-fade-in">
      <div className="cart-container">
        
        {/* Page Header */}
        <div className="cart-header-title">
          <div>
            <span className="cart-badge">YOUR ORDER</span>
            <h1 className="cart-title">Shopping Cart ({cartItemCount} items)</h1>
          </div>
          {subtotal > 0 && (
            <button onClick={() => navigate("/menu")} className="cart-continue-btn">
              + Add More Items
            </button>
          )}
        </div>

        {subtotal > 0 ? (
          <div className="cart-content">
            
            {/* LEFT SIDE — CART ITEMS LIST */}
            <div className="cart-left">
              
              {/* Free Delivery Goal Bar */}
              <div className="cart-delivery-goal card">
                <div className="cart-delivery-goal__text">
                  {isFreeDelivery ? (
                    <span>🎉 You've unlocked <strong>FREE Delivery!</strong></span>
                  ) : (
                    <span>Add <strong>₹{(freeDeliveryThreshold - subtotal).toFixed(0)}</strong> more for <strong>FREE Delivery</strong></span>
                  )}
                </div>
                <div className="cart-delivery-goal__bar">
                  <div
                    className="cart-delivery-goal__fill"
                    style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="cart-items-list card">
                {food_list.map((item) => {
                  if (cartitem[item._id] > 0) {
                    const imageUrl =
                      item.Image && item.Image.startsWith("http")
                        ? item.Image
                        : url + "/Images/" + item.Image;

                    return (
                      <div key={item._id} className="cart-item">
                        <div className="cart-item__img-wrap">
                          <img src={imageUrl} alt={item.name} />
                        </div>
                        
                        <div className="cart-item__details">
                          <h4 className="cart-item__name">{item.name}</h4>
                          <span className="cart-item__unit-price">₹{item.price} each</span>
                        </div>

                        {/* Stepper Controls */}
                        <div className="cart-item__qty">
                          <button
                            onClick={() => removefromcart(item._id)}
                            className="cart-item__qty-btn"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="cart-item__qty-count">{cartitem[item._id]}</span>
                          <button
                            onClick={() => addtocart(item._id)}
                            className="cart-item__qty-btn"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="cart-item__total-price">
                          ₹{item.price * cartitem[item._id]}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Promo Coupon Box */}
              <div className="cart-promo-box card">
                <h4>Have a Promo Code?</h4>
                {appliedCode ? (
                  <div className="cart-promo-applied">
                    <span>🎉 <strong>{appliedCode}</strong> applied (-₹{discount})</span>
                    <button onClick={removeCoupon} className="cart-promo-remove">Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="cart-promo-form">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. FIESTA50)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="cart-promo-input"
                    />
                    <button type="submit" className="cart-promo-submit">
                      Apply
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* RIGHT SIDE — ORDER SUMMARY */}
            <div className="cart-sidebar">
              <div className="cart-summary card shadow-lg">
                <h3>Order Breakdown</h3>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>{isFreeDelivery ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : `₹${deliveryFee.toFixed(2)}`}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-row summary-discount">
                    <span>Promo Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-divider" />
                
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <button
                  disabled={subtotal === 0}
                  onClick={() => navigate("/order")}
                  className="checkout-btn"
                >
                  PROCEED TO CHECKOUT →
                </button>

                <div className="cart-trust-note">
                  🔒 100% Secure Checkout & Money Back Guarantee
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="cart-empty card shadow-md">
            <div className="cart-empty__icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any delicious food yet.</p>
            <button onClick={() => navigate("/menu")} className="cart-empty__btn">
              Explore Our Menu
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
