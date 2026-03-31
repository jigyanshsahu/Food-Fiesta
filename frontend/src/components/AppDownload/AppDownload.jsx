import React from "react";
import { assets } from "../../assets/assets";
import './AppDownload.css'

const AppDownload = () => {
  return (
    <section className="app-download" id="appdownload">
      <div className="app-download__content">
        <div className="app-download__text-box">
          <span className="app-download__badge">Experience on the go</span>
          <h2 className="app-download__title">
            For A Better Experience<br />
            <span>Download Flavor Fiesta App</span>
          </h2>
          <p className="app-download__desc">
            Get exclusive offers, real-time tracking, and a smoother ordering experience with our mobile app.
          </p>
          <div className="app-download__platforms">
            <a href="#" className="app-download__link">
              <img className="app-download__store-img" src={assets.pla} alt="Download on Play Store" />
            </a>
            <a href="#" className="app-download__link">
              <img className="app-download__store-img" src={assets.aplo} alt="Download on App Store" />
            </a>
          </div>
        </div>
        <div className="app-download__visual">
          <div className="app-download__circle" />
          {/* Using a placeholder for mobile mock since I don't see a phone png in assets */}
          <div className="app-download__emoji">📱🍕</div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
