import React from 'react';
import './footer.css';  

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
          <p>
            Copyright © 2024 LaunchPad CoWorking | All rights reserved | 
            <a href="/terms-and-conditions"> Terms and Conditions</a>
            <p1>
            Launchpad Commercenter:
Mon-Fri 8am-7pm
Sat 10am-5pm

Launchpad One Griffinstone
Mon-Fri 9am-7pm
            </p1>
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
