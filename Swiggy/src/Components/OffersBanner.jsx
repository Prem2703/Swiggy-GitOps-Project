import React from 'react';
import './OfferBanner.css';

function OffersBanner({ onSearch }) {
  return (
    <div className="hero">
      <h1>🍔 Hungry? We've Got You!</h1>
      <p>Order food from the best restaurants in Mysuru</p>
      <div className="hero-search">
        <input
          type="text"
          placeholder="Search for restaurants, cuisines, dishes..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <button>Search</button>
      </div>
      <div className="hero-stats">
        <div className="stat">🍽️ <strong>500+</strong> Restaurants</div>
        <div className="stat">⚡ <strong>30 min</strong> Delivery</div>
        <div className="stat">🏷️ <strong>Best</strong> Offers</div>
      </div>
    </div>
  );
}

export default OffersBanner;