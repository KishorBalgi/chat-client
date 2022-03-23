import React from "react";
import "./aboutpage.styles.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-box">
        <div className="about-desc">
          <h3>Chat Application</h3>
          <p>
            A simple chat application, that can be used to send real time text
            messages.
          </p>
          <ul>
            <li>
              Front-end :{" "}
              <a href="https://reactjs.org/" target={"_blank"}>
                React
              </a>{" "}
            </li>
            <li>
              Backend-end :{" "}
              <a href="https://nodejs.org/" target={"_blank"}>
                Node.js
              </a>
              (
              <a href="https://expressjs.com/" target={"_blank"}>
                Express.js
              </a>
              )
            </li>
            <li>
              Web-Socket :{" "}
              <a href="https://socket.io/" target={"_blank"}>
                socket.io
              </a>
            </li>
            <li>
              Database :{" "}
              <a href="https://www.mongodb.com/" target={"_blank"}>
                MongoDB
              </a>
            </li>
          </ul>
        </div>
        <div className="about-img">
          <img src="https://i.ibb.co/d5RgxfH/user-blank.png" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
