import React from 'react';

function App() {
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#0071e3', marginBottom: '20px' }}>
        Vidya Raut - Portfolio
      </h1>
      <p style={{ fontSize: '18px', color: '#333' }}>
        Welcome to my portfolio website!
      </p>
      <p style={{ fontSize: '16px', color: '#666', marginTop: '20px' }}>
        M.Tech in Energy Technology | Market Analyst | Energy Storage & Power Markets
      </p>
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2>Website Status: ✅ Working!</h2>
        <p>The portfolio website is successfully deployed and running.</p>
      </div>
    </div>
  );
}

export default App;
