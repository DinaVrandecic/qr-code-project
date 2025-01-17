import { Link } from 'react-router-dom'; // Ispravan import za navigaciju
import React, { useState } from 'react';

const Dashboard = () => {
  const [hoveredLink, setHoveredLink] = useState(null); // Praćenje hover stanja za svaki link

  const getButtonStyle = (link) => ({
    padding: '10px 20px',
    backgroundColor: hoveredLink === link ? '#668dc0' : '#304a6e', // Promjena boje pri hoveru
    color: hoveredLink === link ? '#f0f8ff' : '#c2c6ce', // Promjena boje teksta
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    textAlign: 'center',
    width: '250px',
    marginTop: '20px',
    transition: 'background-color 0.5s, color 0.5s', // Glatka tranzicija
    border: hoveredLink === link ? '2px solid #f0f8ff' : '2px solid transparent'
  });

  return (
    <div
      style={{
        backgroundColor: '#668DC0',
        WebkitBackgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <div style={{ padding: '20px' }}>
        <div style={{ textAlign: 'center', WebkitTextFillColor: '#0f1c30' }}>
          <h1>Sustav evidencije prisutnosti na nastavi</h1>
          <h2>Odaberi predmet!</h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginTop: '20px',
            alignItems: 'center',
          }}
        >
          {[
            { to: '/business-info-systems', label: 'Poslovni informacijski sustavi' },
            { to: '/grid-computer-systems', label: 'Grid računalni sustavi' },
            { to: '/urs', label: 'Ugradbeni računalni sustavi' },
            { to: '/multimedija', label: 'Multimedijski sustavi' },
            { to: '/medicinski', label: 'Medicinski uređaji' },
            { to: '/paralelno', label: 'Paralelno programiranje' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={getButtonStyle(link.to)}
              onMouseEnter={() => setHoveredLink(link.to)} // Postavlja hovered link
              onMouseLeave={() => setHoveredLink(null)} // Resetira hovered link
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
