import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { DELIVERY_FEE } from "../../utils/constants";
import axios from "axios";
import "./Placeorder.css";

const Placeorder = () => {
  const navigate = useNavigate();
  const { getcarttotalamount, token, food_list, cartitem, url } =
    useContext(StoreContext);
  const toast = useToast();

  const [deliveryNote, setDeliveryNote] = useState("doorstep");

  const [data, setdata] = useState({
    firstName: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const OnChangehandler = (event) => {
    const { name, value } = event.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let Orderitem = [];
    food_list.forEach((item) => {
      if (cartitem[item._id] > 0) {
        Orderitem.push({ ...item, quantity: cartitem[item._id] });
      }
    });

    let orderData = {
      address: { ...data, deliveryNote },
      items: Orderitem,
      amount: getcarttotalamount() + DELIVERY_FEE,
    };

    try {
      let response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: {
            token
          }
        }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error("Payment gateway error. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Order placement failed. Please check your network.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getcarttotalamount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  const subtotal = getcarttotalamount();
  const deliveryFee = subtotal >= 500 ? 0 : (subtotal > 0 ? DELIVERY_FEE : 0);
  const total = subtotal + deliveryFee;

  return (
    <div className="place-order-page animate-fade-in">
      <div className="checkout-container">
        
        {/* Breadcrumb Steps */}
        <div className="checkout-stepper">
          <div className="checkout-step completed">1. Cart</div>
          <div className="checkout-step-line" />
          <div className="checkout-step active">2. Delivery Info</div>
          <div className="checkout-step-line" />
          <div className="checkout-step">3. Payment</div>
        </div>

        <form onSubmit={placeOrder} className="order-container">
          <div className="order-grid">
            
            {/* LEFT SIDE — DELIVERY FORM */}
            <div className="delivery-form card shadow-md">
              <div className="form-header">
                <h2>📍 Delivery Address</h2>
                <p>Enter the location where you want your meal delivered</p>
              </div>
              
              <div className="input-group-row">
                <div className="input-field">
                  <label>First Name *</label>
                  <input
                    required
                    name="firstName"
                    value={data.firstName}
                    onChange={OnChangehandler}
                    type="text"
                    placeholder="John"
                  />
                </div>
                <div className="input-field">
                  <label>Last Name *</label>
                  <input
                    required
                    name="lastname"
                    value={data.lastname}
                    onChange={OnChangehandler}
                    type="text"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="input-field">
                <label>Email Address *</label>
                <input
                  required
                  name="email"
                  value={data.email}
                  onChange={OnChangehandler}
                  type="email"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div className="input-field">
                <label>Street Address *</label>
                <input
                  required
                  name="street"
                  value={data.street}
                  onChange={OnChangehandler}
                  type="text"
                  placeholder="123 Foodie Lane, Apt 4B"
                />
              </div>

              <div className="input-group-row">
                <div className="input-field">
                  <label>City *</label>
                  <input
                    required
                    name="city"
                    value={data.city}
                    onChange={OnChangehandler}
                    type="text"
                    placeholder="New York"
                  />
                </div>
                <div className="input-field">
                  <label>State *</label>
                  <input
                    required
                    name="state"
                    value={data.state}
                    onChange={OnChangehandler}
                    type="text"
                    placeholder="NY"
                  />
                </div>
              </div>

              <div className="input-group-row">
                <div className="input-field">
                  <label>Zip Code *</label>
                  <input
                    required
                    name="zipcode"
                    value={data.zipcode}
                    onChange={OnChangehandler}
                    type="text"
                    placeholder="10001"
                  />
                </div>
                <div className="input-field">
                  <label>Country *</label>
                  <input
                    required
                    name="country"
                    value={data.country}
                    onChange={OnChangehandler}
                    type="text"
                    placeholder="USA"
                  />
                </div>
              </div>

              <div className="input-field">
                <label>Phone Number *</label>
                <input
                  required
                  name="phone"
                  value={data.phone}
                  onChange={OnChangehandler}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Delivery Instructions Selector */}
              <div className="delivery-instructions">
                <label className="instructions-label">Delivery Preferences</label>
                <div className="instructions-options">
                  <button
                    type="button"
                    onClick={() => setDeliveryNote("doorstep")}
                    className={`instruction-btn ${deliveryNote === 'doorstep' ? 'active' : ''}`}
                  >
                    🚪 Leave at Doorstep
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryNote("call")}
                    className={`instruction-btn ${deliveryNote === 'call' ? 'active' : ''}`}
                  >
                    📞 Call Upon Arrival
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryNote("ring")}
                    className={`instruction-btn ${deliveryNote === 'ring' ? 'active' : ''}`}
                  >
                    🔔 Ring Doorbell
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE — ORDER SUMMARY */}
            <div className="order-summary-sidebar">
              <div className="order-summary card shadow-lg">
                <h2 className="section-title">Order Summary</h2>

                <div className="summary-details">
                  <div className="summary-item">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : `₹${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-item total">
                    <span>Total Amount</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="payment-btn"
                >
                  PROCEED TO PAYMENT →
                </button>
                
                <div className="trust-badges">
                  <p>🔒 256-Bit Encrypted Stripe Checkout</p>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Placeorder;
