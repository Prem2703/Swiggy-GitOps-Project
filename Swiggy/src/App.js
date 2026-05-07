import React, { useState } from 'react';
import './App.css';
import Navigate from './Components/Navigate';
import OffersBanner from './Components/OffersBanner';
import RestaurentChain from './Components/RestaurentChain';
import RestaurentOnline from './Components/RestaurentOnline';
import BestRest from './Components/BestRest';
import Footer from './Components/Footer';

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [toast, setToast] = useState('');

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleAddToCart = (restId, name, emoji, price) => {
    setCart(prev => {
      const existing = prev.find(c => c.name === name && c.restId === restId);
      if (existing) {
        return prev.map(c =>
          c.name === name && c.restId === restId
            ? { ...c, qty: c.qty + 1 }
            : c
        );
      }
      return [...prev, { restId, name, emoji, price, qty: 1 }];
    });
    showToast(`✅ ${name} added to cart!`);
  };

  const handleChangeQty = (restId, name, price, delta) => {
    setCart(prev =>
      prev.map(c =>
        c.name === name && c.restId === restId
          ? { ...c, qty: c.qty + delta }
          : c
      ).filter(c => c.qty > 0)
    );
  };

  const handlePlaceOrder = () => {
    setCart([]);
    setCartOpen(false);
    setOrderPlaced(true);
  };

  return (
    <div>
      <Navigate
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onSearch={setSearchQuery}
      />
      <OffersBanner onSearch={setSearchQuery} />
      <RestaurentChain onFilter={setCategoryFilter} />
      <RestaurentOnline
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        cart={cart}
        onAddToCart={handleAddToCart}
        onChangeQty={handleChangeQty}
      />
      <Footer />

      <BestRest
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onChangeQty={handleChangeQty}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* TOAST */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%',
          transform: 'translateX(-50%)', background: '#333',
          color: '#fff', padding: '12px 24px', borderRadius: '12px',
          fontSize: '14px', fontWeight: '600', zIndex: 999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          {toast}
        </div>
      )}

      {/* ORDER SUCCESS */}
      {orderPlaced && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', zIndex: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '40px',
            textAlign: 'center', maxWidth: '360px', width: '90%'
          }}>
            <div style={{ fontSize: '70px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Order Placed!</h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
              Your delicious food is being prepared
            </p>
            <div style={{
              background: '#fff8f0', border: '1px solid #FC8019',
              borderRadius: '10px', padding: '12px 20px', marginBottom: '20px'
            }}>
              <p style={{ fontSize: '13px', color: '#FC8019', fontWeight: '600' }}>
                Estimated Delivery Time
              </p>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#FC8019' }}>
                30-40 mins
              </h3>
            </div>
            <button
              onClick={() => setOrderPlaced(false)}
              style={{
                background: '#FC8019', color: '#fff', border: 'none',
                padding: '14px 32px', borderRadius: '12px', fontSize: '15px',
                fontWeight: '700', cursor: 'pointer', width: '100%',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Continue Ordering
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;