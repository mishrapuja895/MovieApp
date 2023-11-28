import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div style={{ display: 'flex', padding: '0.5' }}>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <h1>Movies App</h1>
      </Link>
      <Link to='/favourites' style={{ textDecoration: 'none' }}>
        <h2 style={{ marginLeft: '2rem', marginTop: '0.7rem' }}>Favourites</h2>
      </Link>
    </div>
  );
};

export default NavBar;