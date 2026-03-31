import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer' id='footer'>
      <div className='footer__container'>
        <div className='footer__main-grid'>
          {/* Logo & About */}
          <div className="footer__section footer__section--brand">
            <div className="footer__logo-wrap">
              <img src={assets.logo} alt="Flavor Fiesta" />
            </div>
            <p className='footer__about'>
              Elevating your dining experience with the freshest ingredients and fastest delivery. Flavor Fiesta brings your favorite cuisines right to your doorstep, day or night.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <img src={assets.facebook} alt="" />
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <img src={assets.linkdin} alt="" />
              </a>
              <a href="#" className="footer__social-link" aria-label="X">
                <img src={assets.x} alt="" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h4 className='footer__heading'>Company</h4>
            <ul className='footer__links'>
              <li><a href="/">Home</a></li>
              <li><a href="#exploremenu">About Us</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer__section">
            <h4 className='footer__heading'>Get In Touch</h4>
            <ul className='footer__contact'>
              <li>
                <span className="icon">📞</span>
                +91 1800 123 456
              </li>
              <li>
                <span className="icon">✉️</span>
                hello@flavorfiesta.com
              </li>
              <li>
                <span className="icon">📍</span>
                Tech Hub, Silicon Valley, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <hr className='footer__divider' />
          <p className="footer__copyright">
            © {currentYear} Flavor Fiesta. All Rights Reserved. Crafted with ❤️ for foodies.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
