import React from "react";
import "./aboutpage.styles.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-box">
        <div className="about-desc">
          <p>This is a chat application.</p>
          <ul className="about-stack">
            <li>Frontend - React</li>
            <li>Backend - Node.js</li>
          </ul>
        </div>
        <div className="about-img">
          <img src="'https://i.ibb.co/d5RgxfH/user-blank.png'" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
