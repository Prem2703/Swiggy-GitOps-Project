import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

function AuthModal({ onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name) { setError('Name is required'); setLoading(false); return; }
        await register(name, email, password);
      }
      onSuccess();
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(.*\)/, ''));
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', zIndex: 400,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '40px',
        maxWidth: '400px', width: '90%', position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: '#f5f5f5', border: 'none', width: '32px',
          height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px'
        }}>✕</button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🍔</div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#333' }}>
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>
            {isLogin ? 'Login to order your favourite food' : 'Join Swiggy today!'}
          </p>
        </div>

        {error && (
          <div style={{ background: '#fff5f5', border: '1px solid #ffcccc', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#e53e3e' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Full Name</label>
              <input
                type="text" placeholder="Enter your name"
                value={name} onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #ddd', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: 'Poppins, sans-serif' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Email</label>
            <input
              type="email" placeholder="Enter your email"
              value={email} onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #ddd', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: 'Poppins, sans-serif' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Password</label>
            <input
              type="password" placeholder="Enter your password"
              value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #ddd', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: 'Poppins, sans-serif' }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px', background: '#FC8019',
            color: '#fff', border: 'none', borderRadius: '12px',
            fontSize: '15px', fontWeight: '700', cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif', opacity: loading ? 0.7 : 1
          }}>
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#666' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ color: '#FC8019', fontWeight: '700', cursor: 'pointer' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;