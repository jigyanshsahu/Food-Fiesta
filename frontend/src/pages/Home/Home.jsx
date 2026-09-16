import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Testimonials from '../../components/Testimonials/Testimonials';
import AppDownload from '../../components/AppDownload/AppDownload';
import './Home.css';

const Home = () => {
  const [category, setCategory] = useState("all");

  const promoOffers = [
    {
      code: "FIESTA50",
      title: "50% OFF",
      sub: "On your first 3 orders above ₹199",
      bg: "linear-gradient(135deg, #FF5200 0%, #FF7A38 100%)",
      icon: "🎉"
    },
    {
      code: "FREEDEL",
      title: "FREE DELIVERY",
      sub: "Zero delivery fee on all orders today",
      bg: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      icon: "🚴"
    },
    {
      code: "COMBO20",
      title: "FLAT ₹100 OFF",
      sub: "Save big on family size pizza combos",
      bg: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
      icon: "🍕"
    }
  ];

  return (
    <main className="home-page animate-fade-in">
      
      {/* 1. Hero Header */}
      <Header />

      {/* 2. Promotional Offers Banner Bar */}
      <section className="home-promos">
        <div className="home-promos__grid">
          {promoOffers.map((offer, index) => (
            <div
              key={index}
              className="home-promo-card"
              style={{ background: offer.bg }}
            >
              <div className="home-promo-card__icon">{offer.icon}</div>
              <div className="home-promo-card__info">
                <span className="home-promo-card__code">USE CODE: {offer.code}</span>
                <h3 className="home-promo-card__title">{offer.title}</h3>
                <p className="home-promo-card__sub">{offer.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Category Explorer */}
      <ExploreMenu category={category} setCategory={setCategory} />

      {/* 4. Top Dishes Display Grid */}
      <FoodDisplay category={category} />

      {/* 5. Why Choose Us / Trust Badges */}
      <section className="home-features">
        <div className="home-features__header">
          <span className="home-features__badge">OUR PROMISE</span>
          <h2>Why Order From Food Fiesta?</h2>
        </div>
        <div className="home-features__grid">
          <div className="home-feature-card card">
            <div className="home-feature-icon">⚡</div>
            <h3>30-Min Express Delivery</h3>
            <p>Piping hot meals brought right to your door with live GPS tracking.</p>
          </div>
          <div className="home-feature-card card">
            <div className="home-feature-icon">🥦</div>
            <h3>100% Fresh Ingredients</h3>
            <p>Our partner chefs use only daily-sourced, premium fresh ingredients.</p>
          </div>
          <div className="home-feature-card card">
            <div className="home-feature-icon">🛡️</div>
            <h3>Hygienic Safe Packaging</h3>
            <p>Tamper-evident, eco-friendly heat-sealed containers for safety.</p>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials Carousel */}
      <Testimonials />

      {/* 7. Mobile App Download Section */}
      <AppDownload />

    </main>
  );
};

export default Home;
