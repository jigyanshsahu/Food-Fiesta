import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const orderId = state?.orderId;

  return (
    <main className="order-conf animate-fade-in">
      <div className="order-conf__card">
        <div className="order-conf__icon">
          <svg viewBox="0 0 52 52" className="checkmark">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h1 className="order-conf__title">Order Confirmed! 🎉</h1>
        <p className="order-conf__subtitle">
          Your payment was successful. Our team is already preparing your delicious food!
        </p>

        {orderId && (
          <div className="order-conf__id">
            Order ID: <strong>#{orderId.slice(-8).toUpperCase()}</strong>
          </div>
        )}

        <div className="order-conf__steps">
          <div className="order-conf__step order-conf__step--done">
            <span>✓</span>
            <p>Order Placed</p>
          </div>
          <div className="order-conf__step-line order-conf__step-line--done" />
          <div className="order-conf__step order-conf__step--active">
            <span>🍳</span>
            <p>Preparing</p>
          </div>
          <div className="order-conf__step-line" />
          <div className="order-conf__step">
            <span>🛵</span>
            <p>On the Way</p>
          </div>
          <div className="order-conf__step-line" />
          <div className="order-conf__step">
            <span>🏠</span>
            <p>Delivered</p>
          </div>
        </div>

        <div className="order-conf__actions">
          <Link to="/myorders" className="order-conf__btn order-conf__btn--primary">
            Track My Order
          </Link>
          <Link to="/menu" className="order-conf__btn order-conf__btn--secondary">
            Order More Food
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
