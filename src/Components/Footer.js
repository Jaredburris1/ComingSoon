// Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px 0',
        textAlign: 'center',
        color: '#fff',
        zIndex: 2,
      }}
    >
      <Container>
        <small>&copy; {new Date().getFullYear()} Wizness. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;