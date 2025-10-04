import React from 'react';

function TestApp() {
  return (
    <div style={{ 
      padding: '20px', 
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)', 
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🔭 Exoplanet Hunter - TEST</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '10px' }}>✅ React está funcionando correctamente</p>
      <p style={{ fontSize: '1.2rem', color: '#60a5fa' }}>NASA Space Apps Challenge 2025</p>
      
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '10px' 
      }}>
        <h2>🧪 Test de Componentes:</h2>
        <ul style={{ fontSize: '1.1rem', lineHeight: '2' }}>
          <li>✅ React cargado</li>
          <li>✅ JavaScript funcionando</li>
          <li>✅ Estilos aplicados</li>
          <li>⏳ Componentes principales cargando...</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => alert('¡React está funcionando perfectamente!')}
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '15px 30px',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🚀 Probar Interactividad
        </button>
      </div>
    </div>
  );
}

export default TestApp;
