import React, { useState } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Sophia Chen",
      location: "Downtown NY",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      dish: "BBQ Chicken Supreme Pizza",
      quote: "The pizza arrived scorching hot in under 22 minutes! The crust was incredibly crunchy and cheese pulled perfectly. Food Fiesta is now my go-to Friday night dinner app."
    },
    {
      id: 2,
      name: "Marcus Vance",
      location: "Brooklyn, NY",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      dish: "Hyderabadi Chicken Dum Biryani",
      quote: "Authentic spices, tender chicken, and perfectly long basmati grains. You can tell they use top-quality ingredients. The live order tracking was spot on!"
    },
    {
      id: 3,
      name: "Elena Rostova",
      location: "Manhattan, NY",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      dish: "Creamy Alfredo Fettuccine",
      quote: "Super creamy pasta and the garlic naan was fresh out of the oven! The packaging is leak-proof and eco-friendly. 10/10 service every single time."
    },
    {
      id: 4,
      name: "David Miller",
      location: "Queens, NY",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      dish: "Ribeye Steak with Garlic Butter",
      quote: "Ordering a steak online can be risky, but Food Fiesta delivered a perfectly seared, juicy medium-rare Ribeye. Absolutely blown away by the quality!"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="testimonials">
      <div className="testimonials__header">
        <div>
          <span className="testimonials__badge">CUSTOMER STORIES</span>
          <h2 className="testimonials__title">Loved by 50,000+ Foodies</h2>
          <p className="testimonials__sub">
            Real feedback from verified food lovers who order daily with Food Fiesta.
          </p>
        </div>

        {/* Navigation Arrow Buttons */}
        <div className="testimonials__controls">
          <button onClick={handlePrev} className="testimonials__arrow-btn" aria-label="Previous review">
            ←
          </button>
          <button onClick={handleNext} className="testimonials__arrow-btn" aria-label="Next review">
            →
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="testimonials__grid">
        {reviews.slice(currentIndex, currentIndex + 2).concat(
          reviews.slice(0, Math.max(0, (currentIndex + 2) - reviews.length))
        ).map((rev) => (
          <div key={rev.id} className="testimonial-card card shadow-sm animate-fade-in">
            
            {/* Top Row: User Avatar & Info */}
            <div className="testimonial-card__user">
              <img src={rev.avatar} alt={rev.name} className="testimonial-card__avatar" />
              <div>
                <h4 className="testimonial-card__name">{rev.name}</h4>
                <span className="testimonial-card__loc">📍 {rev.location} • <span className="verified-tag">✔ Verified Buyer</span></span>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="testimonial-card__stars">
              {'⭐'.repeat(rev.rating)}
            </div>

            {/* Quote */}
            <p className="testimonial-card__quote">
              "{rev.quote}"
            </p>

            {/* Dish Tag */}
            <div className="testimonial-card__dish-tag">
              Ordered: <strong>{rev.dish}</strong>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
