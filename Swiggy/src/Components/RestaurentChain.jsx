import React from 'react';
import './RestaurentChain.css';

const categories = [
  { name: 'All', emoji: '🍽️', color: '#fff3e8', filter: 'all' },
  { name: 'Pizza', emoji: '🍕', color: '#fff3e8', filter: 'Pizza' },
  { name: 'Burgers', emoji: '🍔', color: '#fff0f0', filter: 'Burger' },
  { name: 'Biryani', emoji: '🍛', color: '#f0fff4', filter: 'Biryani' },
  { name: 'Chinese', emoji: '🍜', color: '#f0f8ff', filter: 'Chinese' },
  { name: 'Desserts', emoji: '🍰', color: '#fff8e1', filter: 'Dessert' },
  { name: 'South Indian', emoji: '🥘', color: '#f5fff0', filter: 'South Indian' },
  { name: 'Rolls', emoji: '🌯', color: '#fef9e7', filter: 'Rolls' },
];

function RestaurentChain({ onFilter }) {
  return (
    <div className="categories-section">
      <h2 className="section-title">What's on your mind?</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="category-card"
            onClick={() => onFilter(cat.filter)}
          >
            <div className="category-icon" style={{ background: cat.color }}>
              {cat.emoji}
            </div>
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurentChain;