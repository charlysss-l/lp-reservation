import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Copyright © 2024 LaunchPad CoWorking | All rights reserved |
          <a href="/terms-and-conditions"> Terms and Conditions</a>
        </p>
  

        <ul className="credits-list">
          <li>Charlize Mikaela Nadela</li>
          <li>Jojo Maninang</li>
          <li>Kristine Ella Rojas</li>
          <li>Kevin Joshnel Mesina</li>
          <li>Kelly Soberano</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
