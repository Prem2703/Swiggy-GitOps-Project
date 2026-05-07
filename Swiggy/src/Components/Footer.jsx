import React from 'react';

function Footer() {
  return (
    <footer style={{ background: '#1a1a2e', color: '#fff', padding: '40px 24px', marginTop: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '36px', height: '36px', background: '#FC8019', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '16px' }}>S</div>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#FC8019' }}>Swiggy</span>
            </div>
            <p style={{ fontSize: '13px', color: '#aaa', maxWidth: '220px' }}>Order food from the best restaurants near you. Fast delivery guaranteed.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Company</h4>
            {['About Us', 'Careers', 'Blog', 'Press'].map(i => (
              <p key={i} style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px', cursor: 'pointer' }}>{i}</p>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Contact</h4>
            <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>📧 support@swiggy.clone</p>
            <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>📞 1800-123-4567</p>
            <p style={{ fontSize: '13px', color: '#aaa' }}>📍 Mysuru, Karnataka</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #333', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#666' }}>© 2026 Swiggy Clone — MCA Final Year Project. Built with ❤️ using React + Jenkins + Kubernetes</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;