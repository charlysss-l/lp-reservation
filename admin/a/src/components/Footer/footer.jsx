import React from 'react';
import './footer.css';  

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          {/* Content for the left side of the footer */}
        </div>

        <div className="contact-info">
          <h2>Operating Hours</h2>
          <h3>Launchpad Commercenter:</h3>
          <p>Mon-Fri 8am-7pm</p>
          <p>Sat 10am-5pm</p>
        
          <h2>Contact Us</h2>
          <p>
            <strong>Email Inquiries:</strong> 
            <a href="mailto:hello@launchpadcoworkingph.com">hello@launchpadcoworkingph.com</a>
          </p>
          <p>
            <strong>Marketing:</strong> 
            <a href="mailto:marketing@launchpadcoworkingph.com">marketing@launchpadcoworkingph.com</a>
          </p>
          <p>
            <strong>Website:</strong> 
            <a href="http://www.launchpadcoworkingph.com" target="_blank" rel="noopener noreferrer">
              www.launchpadcoworkingph.com
            </a>
          </p>

          <h2>Phone</h2>
          <p>
            <strong>Commercenter:</strong> 
            (02) 8 776 3321
            <br />
            <strong>Globe:</strong> 
            +63 956 395 8065
          </p>
        </div>

        <div className="footer-right">
          <p>
            Copyright © 2024 LaunchPad CoWorking | All rights reserved | Terms and Conditions
            <a href="/terms-and-conditions"> Terms and Conditions</a>
          </p>
          <ul className="credits-list">
            <li>Charlize Mikaela Nadela</li>
            <li>Kristine Ella Rojas</li>
            <li>Jojo Maninang</li>
            <li>Kevin Joshnel Mesina</li>
            <li>Kelly Soberano</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
