import React, { useState } from 'react';
import './Navigate.css';

function Navigate({ cartCount, onCartClick, onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <div className="logo-icon">S</div>
        <span className="logo-text">Swiggy</span>
      </div>

      <div className="nav-location">
        📍 <span>Mysuru</span> ▾
      </div>

      <div className="nav-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search restaurants, cuisines..."
          value={query}
          onChange={handleSearch}
        />
      </div>

      <div className="nav-actions">
        <button className="nav-btn-outline">Login</button>
        <button className="cart-btn" onClick={onCartClick}>
          🛒 Cart <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navigate;