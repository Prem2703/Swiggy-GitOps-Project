import React, { useState } from 'react';
import './Navigate.css';

const cities = ['Mysuru', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];

function Navigate({ cartCount, onCartClick, onSearch, user, location, onLocationChange, onLoginClick, onLogout, onOrdersClick }) {
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <div className="logo-icon">S</div>
        <span className="logo-text">Swiggy</span>
      </div>

      <div className="nav-location" onClick={() => setShowLocationPicker(!showLocationPicker)}>
        📍 <span>{location}</span> ▾
        {showLocationPicker && (
          <div style={{
            position: 'absolute', top: '100%', left: 0,
            background: '#fff', border: '1px solid #eee',
            borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            zIndex: 200, minWidth: '180px', padding: '8px 0', marginTop: '8px'
          }}>
            {cities.map(city => (
              <div key={city} onClick={() => { onLocationChange(city); setShowLocationPicker(false); }}
                style={{ padding: '10px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: location === city ? '700' : '400', color: location === city ? '#FC8019' : '#333' }}
                onMouseOver={e => e.target.style.background = '#f8f8f8'}
                onMouseOut={e => e.target.style.background = 'transparent'}
              >
                📍 {city}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="nav-search">
        <span className="search-icon">🔍</span>
        <input
          type="text" placeholder="Search restaurants, cuisines..."
          value={query}
          onChange={e => { setQuery(e.target.value); onSearch(e.target.value); }}
        />
      </div>

      <div className="nav-actions">
        {user ? (
          <div style={{ position: 'relative' }}>
            <div onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: '#fff8f0', border: '1.5px solid #FC8019', padding: '8px 14px', borderRadius: '10px' }}>
              <div style={{ width: '28px', height: '28px', background: '#FC8019', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px' }}>
                {user.displayName ? user.displayName[0].toUpperCase() : '👤'}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#FC8019' }}>
                {user.displayName || 'User'}
              </span>
            </div>
            {showUserMenu && (
              <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 200, minWidth: '180px', padding: '8px 0' }}>
                <div style={{ padding: '10px 16px', fontSize: '13px', color: '#999', borderBottom: '1px solid #f5f5f5' }}>
                  {user.email}
                </div>
                <div onClick={() => { onOrdersClick(); setShowUserMenu(false); }}
                  style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                  onMouseOver={e => e.target.style.background = '#f8f8f8'}
                  onMouseOut={e => e.target.style.background = 'transparent'}
                >
                  📦 My Orders
                </div>
                <div onClick={() => { onLogout(); setShowUserMenu(false); }}
                  style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#e53e3e' }}
                  onMouseOver={e => e.target.style.background = '#f8f8f8'}
                  onMouseOut={e => e.target.style.background = 'transparent'}
                >
                  🚪 Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="nav-btn-outline" onClick={onLoginClick}>Login</button>
        )}
        <button className="cart-btn" onClick={onCartClick}>
          🛒 Cart <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navigate;