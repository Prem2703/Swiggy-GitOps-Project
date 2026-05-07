import React, { useState, useEffect } from 'react';
import './App.css';
import Navigate from './Components/Navigate';
import OffersBanner from './Components/OffersBanner';
import RestaurentChain from './Components/RestaurentChain';
import RestaurentOnline from './Components/RestaurentOnline';
import BestRest from './Components/BestRest';
import Footer from './Components/Footer';
import AuthModal from './Components/AuthModal';
import OrderHistory from './Components/OrderHistory';
import { useAuth } from './AuthContext';

function App() {
  const { user, logout, getUserData, updateLocation, saveOrder, getOrders } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [toast, setToast] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [location, setLocation] = useState('Mysuru');

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  useEffect(() => {
    if (user) {
      const data = getUserData();
      if (data) setLocation(data.location || 'Mysuru');
    }
  }, [user]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleAddToCart = (restId, name, emoji, price, restName, restEmoji) => {
    setCart(prev => {
      const existing = prev.find(c => c.name === name && c.restId === restId);
      if (existing) return prev.map(c =>
        c.name === name && c.restId === restId ? { ...c, qty: c.qty + 1 } : c
      );
      return [...prev, { restId, name, emoji, price, qty: 1, restName, restEmoji }];
    });
    showToast(`✅ ${name} added to cart!`);
  };

  const handleChangeQty = (restId, name, price, delta) => {
    setCart(prev =>
      prev.map(c =>
        c.name === name && c.restId === restId ? { ...c, qty: c.qty + delta } : c
      ).filter(c => c.qty > 0)
    );
  };

  const handlePlaceOrder = () => {
    if (!user) {
      setShowAuth(true);
      showToast('Please login to place order!');
      return;
    }
    const restName = cart[0]?.restName || 'Restaurant';
    const restEmoji = cart[0]?.restEmoji || '🍽️';
    const total = cart.reduce((a, c) => a + c.price * c.qty, 0);
    const order = {
      id: Date.now(),
      restaurantName: restName,
      restaurantEmoji: restEmoji,
      items: cart.map(c => ({ name: c.name, emoji: c.emoji, price: c.price, qty: c.qty })),
      totalAmount: total,
      deliveryAddress: location,
      status: 'placed',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    saveOrder(order);
    setLastOrder(order);
    setCart([]);
    setCartOpen(false);
    setOrderPlaced(true);
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    if (user) updateLocation(newLocation);
  };

  const handleLogout = async () => {
    await logout();
    showToast('Logged out successfully!');
    setLocation('Mysuru');
  };

  return (
    <div>
      <Navigate
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onSearch={setSearchQuery}
        user={user}
        location={location}
        onLocationChange={handleLocationChange}
        onLoginClick={() => setShowAuth(true)}
        onLogout={handleLogout}
        onOrdersClick={() => setShowOrders(true)}
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
        user={user}
        location={location}
      />

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => {
            setShowAuth(false);
            showToast('Welcome to Swiggy! 🎉');
          }}
        />
      )}

      {showOrders && (
        <OrderHistory
          orders={getOrders()}
          onClose={() => setShowOrders(false)}
        />
      )}

      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%',
          transform: 'translateX(-50%)', background: '#333',
          color: '#fff', padding: '12px 24px', borderRadius: '12px',
          fontSize: '14px', fontWeight: '600', zIndex: 999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>{toast}</div>
      )}

      {orderPlaced && lastOrder && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', zIndex: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '40px',
            textAlign: 'center', maxWidth: '380px', width: '90%'
          }}>
            <div style={{ fontSize: '70px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Order Placed!</h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
              From {lastOrder.restaurantEmoji} {lastOrder.restaurantName}
            </p>
            <div style={{ background: '#f8f8f8', borderRadius: '10px', padding: '12px', marginBottom: '16px', textAlign: 'left' }}>
              {lastOrder.items.map((item, i) => (
                <div key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                  {item.emoji} {item.name} × {item.qty} — ₹{item.price * item.qty}
                </div>
              ))}
              <div style={{ borderTop: '1px solid #eee', marginTop: '8px', paddingTop: '8px', fontWeight: '700', fontSize: '14px' }}>
                Total: ₹{lastOrder.totalAmount}
              </div>
            </div>
            <div style={{ background: '#fff8f0', border: '1px solid #FC8019', borderRadius: '10px', padding: '12px', marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', color: '#FC8019', fontWeight: '600' }}>Estimated Delivery</p>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#FC8019' }}>30-40 mins</h3>
              <p style={{ fontSize: '12px', color: '#999' }}>To: {lastOrder.deliveryAddress}</p>
            </div>
            <button
              onClick={() => setOrderPlaced(false)}
              style={{
                background: '#FC8019', color: '#fff', border: 'none',
                padding: '14px 32px', borderRadius: '12px', fontSize: '15px',
                fontWeight: '700', cursor: 'pointer', width: '100%',
                fontFamily: 'Poppins, sans-serif'
              }}
            >Continue Ordering</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;