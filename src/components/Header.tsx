import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="header-content">
        <h1 className="header-title">Space Apps</h1>
        <p className="header-subtitle">Explora el universo digital</p>
      </div>
    </header>
  );
};

export default Header;
