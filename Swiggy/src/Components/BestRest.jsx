import React from 'react';
import './BestRes.css';

function BestRest({ cart, isOpen, onClose, onChangeQty, onPlaceOrder }) {
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>🛒 Your Cart</h3>
        <button className="cart-close" onClick={onClose}>✕</button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <p className="empty-title">Your cart is empty</p>
            <p className="empty-sub">Add items from a restaurant to get started</p>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div key={`${item.restId}-${item.name}`} className="cart-item">
                <div className="cart-item-left">
                  <span className="cart-item-emoji">{item.emoji}</span>
                  <div>
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{item.price} × {item.qty}</div>
                  </div>
                </div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => onChangeQty(item.restId, item.name, item.price, -1)}>-</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onChangeQty(item.restId, item.name, item.price, 1)}>+</button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="checkout-btn" onClick={onPlaceOrder}>
            Place Order →
          </button>
        </div>
      )}
    </div>
  );
}

export default BestRest;