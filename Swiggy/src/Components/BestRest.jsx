import React, { useState } from 'react';
import './BestRes.css';

function BestRest({ cart, isOpen, onClose, onChangeQty, onPlaceOrder, user, onLoginRequired }) {
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePayNow = () => {
    if (!paymentMethod) {
      alert('Please select a payment method!');
      return;
    }
    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter UPI ID!');
      return;
    }
    if (paymentMethod === 'card' && cardNumber.length < 16) {
      alert('Please enter valid card number!');
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowPayment(false);
      setPaymentMethod('');
      setUpiId('');
      setCardNumber('');
      onPlaceOrder();
    }, 2000);
  };

  return (
    <>
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

              {/* Bill Summary */}
              <div style={{ background: '#f8f8f8', borderRadius: '12px', padding: '14px', margin: '12px 0' }}>
                <p style={{ fontWeight: '700', fontSize: '14px', marginBottom: '10px' }}>Bill Summary</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginBottom: '6px' }}>
                  <span>Item Total</span><span>₹{total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginBottom: '6px' }}>
                  <span>Delivery Fee</span><span style={{ color: '#2e7d32' }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginBottom: '6px' }}>
                  <span>GST (5%)</span><span>₹{Math.round(total * 0.05)}</span>
                </div>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '15px' }}>
                  <span>To Pay</span>
                  <span style={{ color: '#FC8019' }}>₹{total + Math.round(total * 0.05)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            {user ? (
              <button className="checkout-btn" onClick={() => setShowPayment(true)}>
                Proceed to Pay ₹{total + Math.round(total * 0.05)} →
              </button>
            ) : (
              <button className="checkout-btn" onClick={onLoginRequired}
                style={{ background: '#555' }}>
                🔒 Login to Place Order
              </button>
            )}
          </div>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', zIndex: 400,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '28px',
            maxWidth: '400px', width: '90%'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800' }}>💳 Payment</h2>
              <button onClick={() => setShowPayment(false)}
                style={{ background: '#f5f5f5', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            {/* Amount */}
            <div style={{ background: '#fff8f0', border: '1px solid #FC8019', borderRadius: '12px', padding: '14px', marginBottom: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: '#FC8019', fontWeight: '600' }}>Amount to Pay</p>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#FC8019' }}>
                ₹{total + Math.round(total * 0.05)}
              </h2>
            </div>

            {/* Payment Methods */}
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#555', marginBottom: '12px' }}>Select Payment Method</p>

            {/* UPI */}
            <div onClick={() => setPaymentMethod('upi')}
              style={{ border: `2px solid ${paymentMethod === 'upi' ? '#FC8019' : '#eee'}`, borderRadius: '12px', padding: '14px', marginBottom: '10px', cursor: 'pointer', background: paymentMethod === 'upi' ? '#fff8f0' : '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: paymentMethod === 'upi' ? '12px' : '0' }}>
                <span style={{ fontSize: '24px' }}>📱</span>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '14px' }}>UPI</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>GPay, PhonePe, Paytm</p>
                </div>
              </div>
              {paymentMethod === 'upi' && (
                <input
                  type="text" placeholder="Enter UPI ID (e.g. name@upi)"
                  value={upiId} onChange={e => setUpiId(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #FC8019', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Poppins, sans-serif' }}
                  onClick={e => e.stopPropagation()}
                />
              )}
            </div>

            {/* Card */}
            <div onClick={() => setPaymentMethod('card')}
              style={{ border: `2px solid ${paymentMethod === 'card' ? '#FC8019' : '#eee'}`, borderRadius: '12px', padding: '14px', marginBottom: '10px', cursor: 'pointer', background: paymentMethod === 'card' ? '#fff8f0' : '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: paymentMethod === 'card' ? '12px' : '0' }}>
                <span style={{ fontSize: '24px' }}>💳</span>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '14px' }}>Credit / Debit Card</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>Visa, Mastercard, Rupay</p>
                </div>
              </div>
              {paymentMethod === 'card' && (
                <div>
                  <input
                    type="text" placeholder="Card Number (16 digits)"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #FC8019', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Poppins, sans-serif', marginBottom: '8px' }}
                    onClick={e => e.stopPropagation()}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" placeholder="MM/YY"
                      style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #FC8019', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Poppins, sans-serif' }}
                      onClick={e => e.stopPropagation()} />
                    <input type="text" placeholder="CVV"
                      style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #FC8019', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Poppins, sans-serif' }}
                      onClick={e => e.stopPropagation()} />
                  </div>
                </div>
              )}
            </div>

            {/* COD */}
            <div onClick={() => setPaymentMethod('cod')}
              style={{ border: `2px solid ${paymentMethod === 'cod' ? '#FC8019' : '#eee'}`, borderRadius: '12px', padding: '14px', marginBottom: '20px', cursor: 'pointer', background: paymentMethod === 'cod' ? '#fff8f0' : '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>💵</span>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '14px' }}>Cash on Delivery</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>Pay when food arrives</p>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayNow}
              disabled={processing}
              style={{
                width: '100%', padding: '14px', background: processing ? '#999' : '#FC8019',
                color: '#fff', border: 'none', borderRadius: '12px',
                fontSize: '16px', fontWeight: '700', cursor: processing ? 'not-allowed' : 'pointer',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              {processing ? '⏳ Processing Payment...' : `Pay ₹${total + Math.round(total * 0.05)}`}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BestRest;