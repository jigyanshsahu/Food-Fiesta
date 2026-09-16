import React from 'react';
import AppDownload from '../../components/AppDownload/AppDownload';
import './About.css';

const About = () => {
  return (
    <main className="about-page animate-fade-in">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__glow" />
        <span className="about-hero__badge">🚀 Who We Are</span>
        <h1 className="about-hero__title">
          Fueled by <span>Passion</span>,<br />Delivered with Care
        </h1>
        <p className="about-hero__subtitle">
          Food Fiesta is on a mission to connect food lovers with the best local restaurants —
          fresh, fast, and always satisfying.
        </p>
      </section>

      {/* Features Grid */}
      <section className="about-features">
        <div className="about-features__grid">
          <div className="about-feature-card">
            <div className="about-feature-card__icon">🚀</div>
            <h3>Lightning Delivery</h3>
            <p>30 minutes or less, every time. We don't keep you waiting.</p>
          </div>
          <div className="about-feature-card">
            <div className="about-feature-card__icon">🥦</div>
            <h3>Fresh Ingredients</h3>
            <p>Sourced daily from local farms. Quality you can taste in every bite.</p>
          </div>
          <div className="about-feature-card">
            <div className="about-feature-card__icon">💳</div>
            <h3>Secure Payments</h3>
            <p>100% encrypted checkout powered by Stripe. Pay with total confidence.</p>
          </div>
          <div className="about-feature-card">
            <div className="about-feature-card__icon">📍</div>
            <h3>Live Order Tracking</h3>
            <p>Follow your order from kitchen to doorstep in real time.</p>
          </div>
          <div className="about-feature-card">
            <div className="about-feature-card__icon">🎁</div>
            <h3>Exclusive Deals</h3>
            <p>Members get early access to discounts, combos, and seasonal offers.</p>
          </div>
          <div className="about-feature-card">
            <div className="about-feature-card__icon">🌙</div>
            <h3>Late Night Orders</h3>
            <p>Craving something at midnight? We're open. Always.</p>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="about-stats">
        <div className="about-stats__grid">
          <div className="about-stats__item">
            <span className="about-stats__number">50K+</span>
            <span className="about-stats__label">Happy Customers</span>
          </div>
          <div className="about-stats__item">
            <span className="about-stats__number">200+</span>
            <span className="about-stats__label">Menu Items</span>
          </div>
          <div className="about-stats__item">
            <span className="about-stats__number">30 min</span>
            <span className="about-stats__label">Avg Delivery Time</span>
          </div>
          <div className="about-stats__item">
            <span className="about-stats__number">4.9 ★</span>
            <span className="about-stats__label">Average Rating</span>
          </div>
        </div>
      </section>

      {/* App Download */}
      <AppDownload />

      {/* Contact */}
      <section className="about-contact" id="contact">
        <h2>Get In Touch</h2>
        <p className="about-contact__sub">Have a question or feedback? We'd love to hear from you.</p>
        <div className="about-contact__cards">
          <div className="about-contact__card">
            <span>📞</span>
            <p>+91 1800 123 456</p>
          </div>
          <div className="about-contact__card">
            <span>✉️</span>
            <p>hello@foodfiesta.com</p>
          </div>
          <div className="about-contact__card">
            <span>📍</span>
            <p>Tech Hub, Silicon Valley, CA</p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;
