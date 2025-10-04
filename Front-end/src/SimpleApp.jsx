import React from 'react';

function SimpleApp() {
  return (
    <div style={{ 
      padding: '50px', 
      background: '#0a0e27', 
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#3b82f6' }}>
        🔭 Exoplanet Hunter
      </h1>
      <h2 style={{ color: '#60a5fa' }}>NASA Space Apps Challenge 2025</h2>
      
      <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
        <h3>✅ Estado del Sistema:</h3>
        <ul style={{ fontSize: '1.2rem', lineHeight: '2' }}>
          <li>✅ React funcionando</li>
          <li>✅ Servidor iniciado</li>
          <li>⏳ Cargando componentes principales...</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', color: '#fbbf24' }}>
        <p><strong>Si ves esto, React está funcionando correctamente.</strong></p>
        <p>Revisando componentes completos...</p>
      </div>
    </div>
  );
}

export default SimpleApp;
