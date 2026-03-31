import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Placeorder.css";

const Placeorder = () => {
  const navigate = useNavigate();
  const { getcarttotalamount, token, food_list, cartitem, url } =
    useContext(StoreContext);

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
      address: data,
      items: Orderitem,
      amount: getcarttotalamount() + 40, // Match delivery fee in Cart.jsx
    };

    try {
      let response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Payment gateway error. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Order placement failed.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/Cart");
    } else if (getcarttotalamount() === 0) {
      navigate("/Cart");
    }
  }, [token]);

  const subtotal = getcarttotalamount();
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="place-order-page animate-fade-in">
      <form onSubmit={placeOrder} className="order-container">
        <div className="order-grid">
          {/* LEFT SIDE — DELIVERY FORM */}
          <div className="delivery-form card shadow-md">
            <h2 className="section-title">Delivery Information</h2>
            
            <div className="input-group-row">
              <div className="input-field">
                <label>First Name</label>
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
                <label>Last Name</label>
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
              <label>Email Address</label>
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
              <label>Street Address</label>
              <input
                required
                name="street"
                value={data.street}
                onChange={OnChangehandler}
                type="text"
                placeholder="123 Foodie Lane"
              />
            </div>

            <div className="input-group-row">
              <div className="input-field">
                <label>City</label>
                <input
                  required
                  name="city"
                  value={data.city}
                  onChange={OnChangehandler}
                  type="text"
                  placeholder="San Francisco"
                />
              </div>
              <div className="input-field">
                <label>State</label>
                <input
                  required
                  name="state"
                  value={data.state}
                  onChange={OnChangehandler}
                  type="text"
                  placeholder="CA"
                />
              </div>
            </div>

            <div className="input-group-row">
              <div className="input-field">
                <label>Zip Code</label>
                <input
                  required
                  name="zipcode"
                  value={data.zipcode}
                  onChange={OnChangehandler}
                  type="text"
                  placeholder="94103"
                />
              </div>
              <div className="input-field">
                <label>Country</label>
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
              <label>Phone Number</label>
              <input
                required
                name="phone"
                value={data.phone}
                onChange={OnChangehandler}
                type="tel"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <div className="order-summary-sidebar">
            <div className="order-summary card shadow-lg">
              <h2 className="section-title">Order Summary</h2>

              <div className="summary-details">
                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-item total">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="payment-btn"
              >
                PROCEED TO PAYMENT
              </button>
            </div>
            
            <div className="trust-badges mt-6">
              <p>🔒 Secure Encrypted Payment</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Placeorder;
