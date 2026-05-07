import React from 'react';

function OrderHistory({ orders, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', zIndex: 400,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '0',
        maxWidth: '480px', width: '90%', maxHeight: '80vh',
        overflow: 'hidden', display: 'flex', flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>📦 Order History</h2>
          <button onClick={onClose} style={{ background: '#f5f5f5', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' }}>✕</button>
        </div>

        <div style={{ overflowY: 'auto', padding: '16px 24px' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '60px', marginBottom: '16px' }}>📦</div>
              <p style={{ fontWeight: '600', color: '#555' }}>No orders yet</p>
              <p style={{ fontSize: '13px', color: '#999', marginTop: '8px' }}>Your order history will appear here</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} style={{ background: '#f8f8f8', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '15px' }}>{order.restaurantEmoji} {order.restaurantName}</p>
                    <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{order.date} at {order.time}</p>
                  </div>
                  <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', height: 'fit-content' }}>
                    ✅ Delivered
                  </span>
                </div>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                      <span>{item.emoji} {item.name} × {item.qty}</span>
                      <span>₹{item.price * item.qty}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '14px', borderTop: '1px solid #eee', marginTop: '8px', paddingTop: '8px' }}>
                    <span>Total</span>
                    <span style={{ color: '#FC8019' }}>₹{order.totalAmount}</span>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>📍 {order.deliveryAddress}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;